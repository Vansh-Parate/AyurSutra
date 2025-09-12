import React, { useEffect, useMemo, useState } from 'react'
import AssessmentLayout from './AssessmentLayout'
import AssessmentSidebar from './AssessmentSidebar'
import BodyFrameStep, { type BodyFrameValue } from './steps/BodyFrameStep'
import SimpleChoiceStep from './steps/SimpleChoiceStep'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6969'

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

const steps: StepKey[] = ['body', 'skin', 'digestion', 'energy', 'sleep', 'climate', 'mind', 'review']

type StepStatus = 'pending' | 'answered' | 'skipped'

const AssessmentPage: React.FC = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<AssessmentData>(() => {
    try {
      const raw = localStorage.getItem('assessment:data')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })
  const [statuses, setStatuses] = useState<Record<StepKey, StepStatus>>(() => {
    try {
      const raw = localStorage.getItem('assessment:statuses')
      return raw ? JSON.parse(raw) : {} as Record<StepKey, StepStatus>
    } catch {
      return {} as Record<StepKey, StepStatus>
    }
  })
  const totalSteps = steps.length

  useEffect(() => {
    ;(window as any).lucide?.createIcons?.()
  }, [currentStep, data])

  useEffect(() => {
    localStorage.setItem('assessment:data', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem('assessment:statuses', JSON.stringify(statuses))
  }, [statuses])

  const [dosha, setDosha] = useState({ vata: 33.3, pitta: 33.3, kapha: 33.3 })
  const [isScoring, setIsScoring] = useState(false)

  // Debounced dosha scoring to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsScoring(true)
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
          setDosha(response.data.analysis.scores)
        }
      } catch (error) {
        console.error('Failed to score dosha:', error)
        // Fallback to simple scoring if API fails
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
        setDosha({ vata: (vata/total)*100, pitta: (pitta/total)*100, kapha: (kapha/total)*100 })
      } finally {
        setIsScoring(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [data])

  // const canContinue = useMemo(() => {
  //   const key = steps[currentStep]
  //   switch (key) {
  //     case 'body': return !!data.body
  //     case 'skin': return !!data.skin
  //     case 'digestion': return !!data.digestion
  //     case 'energy': return !!data.energy
  //     case 'sleep': return !!data.sleep
  //     case 'climate': return !!data.climate
  //     case 'mind': return !!data.mind
  //     case 'review': return true
  //     default: return true
  //   }
  // }, [currentStep, data])

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
    try {
      // send to backend to record completion
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
      localStorage.setItem('assessment:completed', 'true')
      navigate('/dashboard', { replace: true })
    } catch {
      // fallback: still navigate
      navigate('/dashboard', { replace: true })
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
          <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-6 min-h-[560px]">
            <h2 className="text-[24px] font-semibold tracking-tight mb-4">Review</h2>
            <div className="text-sm text-slate-700">Body frame: <span className="font-medium capitalize">{data.body || '—'}</span></div>
          </div>
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

  return (
    <AssessmentLayout
      sidebar={<AssessmentSidebar currentStep={currentStep} totalSteps={totalSteps} stepStatuses={statuses} dosha={dosha} onStepClick={handleStepClick} isScoring={isScoring} />}
    >
      {stepNode}
    </AssessmentLayout>
  )
}

export default AssessmentPage


