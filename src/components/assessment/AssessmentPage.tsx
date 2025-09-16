import React, { useEffect, useState } from 'react'
import AssessmentLayout from './AssessmentLayout'
import AssessmentSidebar from './AssessmentSidebar'
import BodyFrameStep, { type BodyFrameValue } from './steps/BodyFrameStep'
import SimpleChoiceStep from './steps/SimpleChoiceStep'
import ReviewStep from './steps/ReviewStep'
// Summary rendered on a dedicated route
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

function getApiBase(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  if (envUrl) return envUrl.replace(/\/$/, '')
  const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
  return `${proto}//localhost:6969`
}
const API_BASE_URL = getApiBase()

type StepKey = 'body' | 'skin' | 'digestion' | 'energy' | 'sleep' | 'climate' | 'mind' | 'review'

interface AssessmentData {
  body?: BodyFrameValue
  skin?: 'dry' | 'normal' | 'oily'
  digestion?: 'irregular' | 'sharp' | 'slow'
  energy?: 'variable' | 'intense' | 'steady'
  sleep?: 'light' | 'moderate' | 'heavy'
  climate?: 'cold' | 'warm' | 'damp'
  mind?: 'anxious' | 'irritable' | 'calm'
}

const baseSteps: StepKey[] = ['body', 'skin', 'digestion', 'energy', 'sleep', 'climate', 'mind', 'review']

type StepStatus = 'pending' | 'answered' | 'skipped'

const AssessmentPage: React.FC = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<AssessmentData>({})
  const [statuses, setStatuses] = useState<Record<StepKey, StepStatus>>({} as Record<StepKey, StepStatus>)
  const [steps, setSteps] = useState<StepKey[]>(baseSteps)
  const totalSteps = steps.length

  useEffect(() => {
    ;(window as Window & { lucide?: { createIcons?: () => void } }).lucide?.createIcons?.()
  }, [currentStep, data])

  // Randomize order per session: keep 'body' first and 'review' last
  useEffect(() => {
    const middle = baseSteps.filter(s => s !== 'body' && s !== 'review')
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = middle[i]
      middle[i] = middle[j]
      middle[j] = tmp
    }
    setSteps(['body', ...middle, 'review'])
  }, [])


  const [dosha, setDosha] = useState({ vata: 33.3, pitta: 33.3, kapha: 33.3 })
  const [isScoring, setIsScoring] = useState(false)

  // Debounced dosha scoring to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsScoring(true)
      try {
        // Use client-side scoring as primary method for real-time updates
        // API call runs in background for additional analysis
        console.log('Calculating dosha scores for data:', data)
        
        let vata = 0, pitta = 0, kapha = 0
        if (data.body === 'light') vata += 2
        if (data.body === 'medium') pitta += 2
        if (data.body === 'sturdy') kapha += 2
        if (data.skin === 'dry') vata += 1
        if (data.skin === 'normal') pitta += 1
        if (data.skin === 'oily') kapha += 1
        if (data.digestion === 'irregular') vata += 1.5
        if (data.digestion === 'sharp') pitta += 1.5
        if (data.digestion === 'slow') kapha += 1.5
        if (data.energy === 'variable') vata += 1
        if (data.energy === 'intense') pitta += 1
        if (data.energy === 'steady') kapha += 1
        if (data.sleep === 'light') vata += 1
        if (data.sleep === 'moderate') pitta += 1
        if (data.sleep === 'heavy') kapha += 1
        if (data.climate === 'warm') vata += 0.5
        if (data.climate === 'cold') pitta += 0.5
        if (data.climate === 'damp') kapha += 0.5
        if (data.mind === 'anxious') vata += 1
        if (data.mind === 'irritable') pitta += 1
        if (data.mind === 'calm') kapha += 1
        
        const total = vata + pitta + kapha || 1
        const newDosha = { 
          vata: Math.round((vata/total)*100 * 10) / 10, 
          pitta: Math.round((pitta/total)*100 * 10) / 10, 
          kapha: Math.round((kapha/total)*100 * 10) / 10 
        }
        
        console.log('Calculated dosha scores:', newDosha)
        setDosha(newDosha)
        
        // Try API call as well (optional)
        try {
          const response = await axios.post(`${API_BASE_URL}/api/v1/assessment/score`, {
            body: data.body,
            skin: data.skin,
            digestion: data.digestion,
            energy: data.energy,
            sleep: data.sleep,
            climate: data.climate,
            mind: data.mind
          })
          
          if (response.data.success) {
            console.log('API dosha scoring response:', response.data.analysis.scores)
            setDosha(response.data.analysis.scores)
          }
        } catch (apiError) {
          console.log('API call failed, using fallback scoring:', apiError)
        }
        
      } catch (error) {
        console.error('Failed to score dosha:', error)
      } finally {
        setIsScoring(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [data])


  function handleBack() {
    if (currentStep === 0) {
      navigate('/dashboard')
    } else {
      setCurrentStep(s => Math.max(0, s - 1))
    }
  }

  function handleContinue() {
    const key = steps[currentStep]
    setStatuses(prev => ({ ...prev, [key]: (prev[key] === 'skipped' ? 'skipped' : 'answered') }))
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => Math.min(totalSteps - 1, s + 1))
    }
  }

  function handleStepClick(stepIndex: number) {
    // Allow navigation to current step or previous steps, or to steps that have been answered/skipped
    const key = steps[stepIndex]
    const status = statuses[key] || 'pending'
    
    if (stepIndex <= currentStep || status !== 'pending') {
      setCurrentStep(stepIndex)
    }
  }

  async function handleFinish() {
    const insights = [
      (() => {
        const entries = [
          { name: 'Vata', value: dosha.vata },
          { name: 'Pitta', value: dosha.pitta },
          { name: 'Kapha', value: dosha.kapha }
        ]
        const sorted = [...entries].sort((a, b) => b.value - a.value)
        const top = sorted[0]
        return { title: `${top.name} prominent`, description: `${top.name} is currently the most expressed dosha.` }
      })(),
      data.energy ? { title: 'Energy pattern', description: `Reported energy is ${data.energy}.` } : { title: 'Sleep pattern', description: `Sleep tends to be ${data.sleep ?? 'balanced'}.` },
      data.climate ? { title: 'Climate preference', description: `Prefers ${data.climate} conditions.` } : { title: 'Mind state', description: `Mind feels ${data.mind ?? 'calm'}.` }
    ]

    const progress = [
      { label: 'Vata', percent: Math.round(dosha.vata), color: '#6366f1' },
      { label: 'Pitta', percent: Math.round(dosha.pitta), color: '#f59e0b' },
      { label: 'Kapha', percent: Math.round(dosha.kapha), color: '#10b981' }
    ]

    try {
      await axios.post(`${API_BASE_URL}/api/v1/assessment`, {
        body: data.body,
        skin: data.skin,
        digestion: data.digestion,
        energy: data.energy,
        sleep: data.sleep,
        climate: data.climate,
        mind: data.mind
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
    } catch {
      // ignore errors; navigation will still happen
    } finally {
      navigate('/assessment/summary', { replace: true, state: { insights, progress } })
    }
  }

  const stepNode = (() => {
    const key = steps[currentStep]
    switch (key) {
      case 'body':
        return (
          <BodyFrameStep
            value={data.body ?? null}
            onChange={(v) => {
              setData(prev => ({ ...prev, body: v }))
              setStatuses(prev => ({ ...prev, body: 'answered' }))
            }}
            onBack={handleBack}
            onSkip={() => {
              const k = steps[currentStep]
              setStatuses(prev => ({ ...prev, [k]: 'skipped' }))
              if (currentStep < totalSteps - 1) setCurrentStep(s => s + 1)
            }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.body}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'review':
        return (
          <ReviewStep
            data={data}
            onBack={handleBack}
            onFinish={handleFinish}
            onEditStep={(stepIndex) => setCurrentStep(stepIndex)}
            finishPath="/assessment/summary"
          />
        )
      case 'skin':
        return (
          <SimpleChoiceStep
            title="How would you describe your skin and hair?"
            subtitle="Pick the option that fits most of the time."
            options={[
              { key: 'dry', title: 'Dry / Rough', desc: 'Dry skin, dry scalp, frizzy hair' },
              { key: 'normal', title: 'Sensitive / Warm', desc: 'Tends to be warm, sensitive or reddish' },
              { key: 'oily', title: 'Oily / Smooth', desc: 'Oily, thick, smooth, lustrous hair' }
            ]}
            value={data.skin ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, skin: v })); setStatuses(prev => ({ ...prev, skin: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, skin: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.skin}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'digestion':
        return (
          <SimpleChoiceStep
            title="How is your appetite and digestion?"
            options={[
              { key: 'irregular', title: 'Irregular / Variable', desc: 'Sometimes hungry, sometimes not' },
              { key: 'sharp', title: 'Strong / Sharp', desc: 'Get hungry quickly, strong digestion' },
              { key: 'slow', title: 'Slow / Steady', desc: 'Slow digestion, feel heavy after meals' }
            ]}
            value={data.digestion ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, digestion: v })); setStatuses(prev => ({ ...prev, digestion: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, digestion: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.digestion}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'energy':
        return (
          <SimpleChoiceStep
            title="How would you describe your energy and activity?"
            options={[
              { key: 'variable', title: 'Variable / Bursts', desc: 'Energy comes in bursts' },
              { key: 'intense', title: 'Intense / Driven', desc: 'High energy, competitive' },
              { key: 'steady', title: 'Steady / Enduring', desc: 'Consistent and grounded' }
            ]}
            value={data.energy ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, energy: v })); setStatuses(prev => ({ ...prev, energy: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, energy: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.energy}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'sleep':
        return (
          <SimpleChoiceStep
            title="How are your sleep patterns?"
            options={[
              { key: 'light', title: 'Light / Interrupted', desc: 'Hard to fall or stay asleep' },
              { key: 'moderate', title: 'Moderate / Average', desc: 'Generally okay sleep' },
              { key: 'heavy', title: 'Deep / Long', desc: 'Sleep deeply and longer' }
            ]}
            value={data.sleep ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, sleep: v })); setStatuses(prev => ({ ...prev, sleep: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, sleep: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.sleep}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'climate':
        return (
          <SimpleChoiceStep
            title="Which climate do you prefer?"
            options={[
              { key: 'warm', title: 'Warm / Dry' },
              { key: 'cold', title: 'Cool / Fresh' },
              { key: 'damp', title: 'Moist / Humid' }
            ]}
            value={data.climate ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, climate: v })); setStatuses(prev => ({ ...prev, climate: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, climate: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.climate}
            isLast={currentStep === totalSteps - 1}
          />
        )
      case 'mind':
        return (
          <SimpleChoiceStep
            title="What best describes your mind and emotions?"
            options={[
              { key: 'anxious', title: 'Anxious / Restless' },
              { key: 'irritable', title: 'Irritable / Intense' },
              { key: 'calm', title: 'Calm / Content' }
            ]}
            value={data.mind ?? null}
            onChange={(v) => { setData(prev => ({ ...prev, mind: v })); setStatuses(prev => ({ ...prev, mind: 'answered' })) }}
            onBack={handleBack}
            onSkip={() => { setStatuses(prev => ({ ...prev, mind: 'skipped' })); setCurrentStep(s => s + 1) }}
            onContinue={handleContinue}
            onFinish={handleFinish}
            canContinue={!!data.mind}
            isLast={currentStep === totalSteps - 1}
          />
        )
      default:
        return (
          <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-6 min-h-[560px]">
            <h2 className="text-[24px] font-semibold tracking-tight">Coming soon</h2>
            <p className="text-sm text-slate-600 mt-2">This step will be implemented next.</p>
          </div>
        )
    }
  })()

  // Normal flow rendering

  return (
    <AssessmentLayout
      sidebar={<AssessmentSidebar currentStep={currentStep} totalSteps={totalSteps} stepStatuses={statuses} dosha={dosha} onStepClick={handleStepClick} isScoring={isScoring} steps={steps.map(s => {
        const meta: Record<StepKey, { label: string; icon: string }> = {
          body: { label: 'Body Frame', icon: 'ruler' },
          skin: { label: 'Skin & Hair', icon: 'sparkles' },
          digestion: { label: 'Appetite & Digestion', icon: 'flame' },
          energy: { label: 'Energy & Activity', icon: 'zap' },
          sleep: { label: 'Sleep Patterns', icon: 'moon' },
          climate: { label: 'Temperature & Climate', icon: 'thermometer' },
          mind: { label: 'Mind & Emotions', icon: 'smile' },
          review: { label: 'Review', icon: 'check-circle' }
        }
        return { key: s, ...meta[s] }
      })} />}
    >
      {stepNode}
    </AssessmentLayout>
  )
}

export default AssessmentPage


