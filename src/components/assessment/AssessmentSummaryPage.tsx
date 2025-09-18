import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AssessmentSummary from './AssessmentSummary'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

interface LocationState {
  insights?: { title: string; description: string }[]
  progress?: { label: string; percent: number; color: string }[]
  scores?: { vata: number; pitta: number; kapha: number }
  answers?: Record<string, unknown>
}

function getApiBase(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  if (envUrl) return envUrl.replace(/\/$/, '')
  const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
  return `${proto}//localhost:6969`
}
const API_BASE_URL = getApiBase()

const AssessmentSummaryPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state || {}) as LocationState
  const { token } = useAuth()
  // non-blocking background load
  const setLoading = useState(false)[1]
  const [serverAssessment, setServerAssessment] = useState<{
    vataScore?: number
    pittaScore?: number
    kaphaScore?: number
    dominantDosha?: string
    balanceStatus?: string
    recommendations?: string[] | string
  } | null>(null)
  const [plan, setPlan] = useState<string>('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function fetchLatest() {
      setLoading(true)
      console.log('[Summary] fetching latest assessment...')
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/assessment/latest`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal,
          timeout: 7000
        })
        if (!isMounted) return
        if (res.data?.success) {
          setServerAssessment(res.data.assessment)
          console.log('[Summary] latest assessment loaded', res.data.assessment)
        } else {
          console.log('[Summary] latest assessment response not successful', res.data)
        }
      } catch {
        console.warn('[Summary] failed to load latest assessment, falling back to client state')
      } finally {
        if (isMounted) setLoading(false)
        console.log('[Summary] fetch complete, loading=false')
      }
    }
    fetchLatest()
    return () => { isMounted = false; controller.abort() }
  }, [token, setLoading])

  // Fetch AI treatment plan (returns { title, summary, plan } or fallback plan)
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function fetchPlan() {
      try {
        const scores = serverAssessment
          ? { vata: Math.round(serverAssessment.vataScore || 0), pitta: Math.round(serverAssessment.pittaScore || 0), kapha: Math.round(serverAssessment.kaphaScore || 0) }
          : state.scores || { vata: 0, pitta: 0, kapha: 0 }
        const dominant = serverAssessment?.dominantDosha
        const insights = (serverAssessment ? [] : state.insights) || []
        const answers = state.answers || {}
        const res = await axios.post(`${API_BASE_URL}/api/v1/ai/plan`, {
          patient: {}, scores, dominant, insights, answers
        }, { headers: token ? { Authorization: `Bearer ${token}` } : undefined, signal: controller.signal, timeout: 12000 })
        if (!isMounted) return
        if (res.data?.success) {
          if (res.data.title || res.data.summary) {
            // Store both title/summary into a single plan string to keep UI rendering simple
            const title = res.data.title || 'Personalized plan'
            const summary = res.data.summary || ''
            const body = res.data.plan || ''
            setPlan([title, summary, body].filter(Boolean).join('\n'))
          } else if (res.data.plan) {
            setPlan(res.data.plan)
          }
        }
      } catch {
        // ignore; no on-screen error
      }
    }
    fetchPlan()
    return () => { isMounted = false; controller.abort() }
  }, [serverAssessment, state.scores, state.insights, state.answers, token])

  const progress = useMemo(() => {
    if (serverAssessment) {
      return [
        { label: 'Vata', percent: Math.round(serverAssessment.vataScore ?? 0), color: '#6366f1' },
        { label: 'Pitta', percent: Math.round(serverAssessment.pittaScore ?? 0), color: '#f59e0b' },
        { label: 'Kapha', percent: Math.round(serverAssessment.kaphaScore ?? 0), color: '#10b981' }
      ]
    }
    return state.progress
  }, [serverAssessment, state.progress])

  const insights = useMemo(() => {
    if (serverAssessment) {
      const dominant = serverAssessment.dominantDosha
      const balance = serverAssessment.balanceStatus
      const rec = serverAssessment.recommendations
      const recShort = Array.isArray(rec)
        ? rec[0]
        : (typeof rec === 'string' ? rec : undefined)
      const items = [
        dominant ? { title: `${dominant} dominant`, description: `${dominant} appears most expressed in your profile.` } : undefined,
        balance ? { title: 'Balance status', description: String(balance) } : undefined,
        recShort ? { title: 'AI recommendation', description: recShort } : undefined
      ].filter(Boolean) as { title: string; description: string }[]
      return items.length ? items : state.insights
    }
    return state.insights
  }, [serverAssessment, state.insights])

  const recommendationTitle = useMemo(() => {
    if (plan) {
      const firstLine = (plan.split(/\n+/)[0] || '').trim()
      if (firstLine) return firstLine.length > 60 ? 'Personalized 14‑day plan' : firstLine
      return 'Personalized 14‑day plan'
    }
    if (serverAssessment?.recommendations) {
      const rec = serverAssessment.recommendations
      if (Array.isArray(rec) && rec[0]) return rec[0]
      if (typeof rec === 'string') return rec
    }
    return 'Personalized plan'
  }, [serverAssessment, plan])

  const recommendationText = useMemo(() => {
    if (plan) {
      const lines = plan.split(/\n+/).map(s => s.trim()).filter(Boolean)
      // Prefer 2-3 lines after the title as a short description
      const desc = lines.slice(1, 3).join(' ')
      return desc || plan
    }
    if (serverAssessment?.recommendations) {
      const rec = serverAssessment.recommendations
      if (Array.isArray(rec)) return rec.slice(0, 3).join('. ')
      if (typeof rec === 'string') return rec
    }
    return ''
  }, [serverAssessment, plan])

  // Do not block rendering on loading; we'll always show content


  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-emerald-50 via-green-50 to-white">
      <AssessmentSummary
        heading="Assessment Summary"
        insights={insights}
        progress={progress}
        recommendationTitle={recommendationTitle}
        recommendationText={recommendationText}
        planLoading={!recommendationText}
        onViewPlan={() => navigate('/dashboard')}
        onChooseDifferent={() => navigate('/plans')}
      />
    </div>
  )
}

export default AssessmentSummaryPage


