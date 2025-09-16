import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AssessmentSummary from './AssessmentSummary'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

interface LocationState {
  insights?: { title: string; description: string }[]
  progress?: { label: string; percent: number; color: string }[]
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
  const [loading, setLoading] = useState(false)
  const [serverAssessment, setServerAssessment] = useState<{
    vataScore?: number
    pittaScore?: number
    kaphaScore?: number
    dominantDosha?: string
    balanceStatus?: string
    recommendations?: string[] | string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function fetchLatest() {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/assessment/latest`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal,
          timeout: 7000
        })
        if (!isMounted) return
        if (res.data?.success) {
          setServerAssessment(res.data.assessment)
        } else {
          setError('Failed to load latest assessment')
        }
      } catch {
        if (!isMounted) return
        setError('Failed to load latest assessment')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchLatest()
    return () => { isMounted = false; controller.abort() }
  }, [token, reloadKey])

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
      const recShort = Array.isArray(rec) ? rec[0] : (typeof rec === 'string' ? rec : undefined)
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
    if (serverAssessment?.recommendations) {
      const rec = serverAssessment.recommendations
      if (Array.isArray(rec) && rec[0]) return rec[0]
      if (typeof rec === 'string') return rec
    }
    return 'Recommended: Abhyanga + Swedana protocol, 14 days'
  }, [serverAssessment])

  const recommendationText = useMemo(() => {
    if (serverAssessment?.recommendations) {
      const rec = serverAssessment.recommendations
      if (Array.isArray(rec)) return rec.slice(0, 3).join('. ')
      if (typeof rec === 'string') return rec
    }
    return 'Daily warm oil massage followed by gentle steam. Add ginger and cinnamon. Keep a steady sleep routine for grounding.'
  }, [serverAssessment])

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-3 text-emerald-700">
        <div className="h-10 w-10 rounded-full border-2 border-emerald-300 border-t-emerald-600 animate-spin"></div>
        <div className="text-sm">Loading your summary…</div>
      </div>
    )
  }

  const showFallbackBanner = !!error

  return (
    <div className="p-4 md:p-6">
      {showFallbackBanner && (
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="text-red-600 text-sm">{error}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setReloadKey(k => k + 1)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Try again</button>
            <button onClick={() => navigate('/assessment', { replace: true })} className="px-4 py-2 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50">Retake</button>
          </div>
          {(state.insights || state.progress) && (
            <div className="text-[12px] text-slate-600">Showing your latest local results below.</div>
          )}
        </div>
      )}
      <AssessmentSummary
        heading="Assessment Summary"
        insights={insights}
        progress={progress}
        recommendationTitle={recommendationTitle}
        recommendationText={recommendationText}
        onViewPlan={() => navigate('/plan')}
        onBookSession={() => navigate('/sessions/new')}
        onDownload={() => window.print()}
      />
    </div>
  )
}

export default AssessmentSummaryPage


