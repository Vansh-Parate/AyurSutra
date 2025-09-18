import React from 'react'

type Insight = { title: string; description: string; icon?: React.ReactNode }
type ProgressStat = { label: string; percent: number; color: string }

interface AssessmentSummaryProps {
  heading?: string
  insights?: Insight[]
  progress?: ProgressStat[]
  recommendationTitle?: string
  recommendationText?: string
  planLoading?: boolean
  onViewPlan?: () => void
  onChooseDifferent?: () => void
}

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" fill="currentColor" opacity="0.12" />
    <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LeafIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M21 3c-6 1-10 3-13 6-3 3-4 7-3 9 2 1 6 0 9-3 3-3 5-7 7-12Z" fill="currentColor" opacity="0.2" />
    <path d="M8 21c0-4 4-8 8-8M5 19c0-5 5-10 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ProgressRing: React.FC<{ percent: number; label: string; color: string; size?: number; stroke?: number }> = ({ percent, label, color, size = 96, stroke = 8 }) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-emerald-100" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-[stroke-dashoffset] duration-700 ease-out" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-sm font-semibold text-emerald-700">{percent}%</div>
          <div className="text-[11px] text-emerald-600">{label}</div>
        </div>
      </div>
    </div>
  )
}

const AssessmentSummary: React.FC<AssessmentSummaryProps> = ({
  heading = 'Assessment Summary',
  insights = [
    { title: 'Detected Vata imbalance', description: 'Air element elevated; prioritize grounding routines.' },
    { title: 'Energy improving', description: 'Reported fatigue improved from 6/10 to 3/10.' },
    { title: 'Sleep quality steady', description: 'Average sleep duration is 7h 20m last week.' }
  ],
  progress = [
    { label: 'Vata', percent: 72, color: '#6366f1' },
    { label: 'Pitta', percent: 64, color: '#f59e0b' },
    { label: 'Kapha', percent: 81, color: '#10b981' }
  ],
  recommendationTitle = 'Personalized 14‑day plan',
  recommendationText = 'Daily warm oil massage followed by gentle steam therapy. Add ginger, cinnamon, and regular sleep timing for grounding.',
  planLoading = false,
  onViewPlan,
  onChooseDifferent
}) => {
  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto h-full grid place-items-center">
        <div className="w-full rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur-sm shadow-sm p-5 md:p-7">
          <div className="text-center mb-5">
            <div className="mx-auto mb-3 grid place-items-center h-12 w-12 rounded-full bg-emerald-100">
              <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight text-emerald-900">{heading}</h1>
            <p className="text-sm text-emerald-700 mt-1">A calm snapshot tailored to your doshas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {progress.map((p) => (
              <div key={`ring-${p.label}`} className="flex items-center justify-center rounded-xl border border-emerald-100 bg-white p-3">
                <ProgressRing percent={p.percent} label={p.label} color={p.color} size={96} stroke={8} />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-white border border-emerald-100 grid place-items-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-600" aria-hidden="true"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.2.9-5.5-4-3.9 5.5-.8L12 3z" fill="currentColor" opacity="0.9" /></svg>
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-semibold text-emerald-900">{planLoading ? 'Generating your personalized plan…' : recommendationTitle}</div>
                <p className="text-[13px] text-emerald-800 mt-1 leading-relaxed">{planLoading ? 'Please wait a moment while we craft gentle, effective steps for you.' : recommendationText}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-emerald-700">
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 bg-emerald-400 rounded-full"></span> Soft, grounding focus</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 bg-amber-400 rounded-full"></span> Dosha-balanced</span>
                </div>
              </div>
              <div className="hidden md:block"><LeafIcon className="h-16 w-16 text-emerald-200" /></div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onViewPlan} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
              View Plan
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={onChooseDifferent} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
              Choose Different Plan
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2">
            <div className="flex items-start gap-3 text-emerald-800">
              <div className="h-7 w-7 rounded-lg grid place-items-center bg-emerald-50 border border-emerald-100 text-emerald-600">
                <LeafIcon className="h-4 w-4" />
              </div>
              <div className="text-[12px] leading-relaxed">
                {insights[0]?.title ? (
                  <>
                    <span className="font-medium">{insights[0].title}: </span>
                    <span>{insights[0].description}</span>
                  </>
                ) : (
                  <span>Gentle recommendations curated from your answers and dosha balance.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentSummary


