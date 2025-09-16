import React from 'react'

type Insight = { title: string; description: string; icon?: React.ReactNode }
type ProgressStat = { label: string; percent: number; color: string }

interface AssessmentSummaryProps {
  heading?: string
  insights?: Insight[]
  progress?: ProgressStat[]
  recommendationTitle?: string
  recommendationText?: string
  onViewPlan?: () => void
  onBookSession?: () => void
  onDownload?: () => void
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
    { label: 'Balance', percent: 72, color: '#10b981' },
    { label: 'Energy', percent: 64, color: '#f59e0b' },
    { label: 'Recovery', percent: 81, color: '#3b82f6' }
  ],
  recommendationTitle = 'Recommended: Abhyanga + Swedana protocol, 14 days',
  recommendationText = 'Daily warm oil massage followed by gentle steam therapy. Add ginger, cinnamon, and regular sleep timing for grounding.',
  onViewPlan,
  onBookSession,
  onDownload
}) => {
  return (
    <div className="min-h-[70vh] rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 p-4 md:p-6 border border-emerald-100">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 grid place-items-center h-14 w-14 rounded-full bg-emerald-100">
            <CheckCircleIcon className="h-7 w-7 text-emerald-600" />
          </div>
          <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-emerald-900">{heading}</h1>
          <p className="text-sm text-emerald-700 mt-1">A calm snapshot of your current healing journey</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Insights */}
          <div className="lg:col-span-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <LeafIcon className="h-5 w-5 text-emerald-500" />
              <h2 className="text-[18px] font-medium text-emerald-900">Personalized Insights</h2>
            </div>
            <ul className="space-y-3">
              {insights.map((ins) => (
                <li key={`${ins.title}-${ins.description}`} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-white hover:bg-emerald-50/50 transition p-3">
                  <div className="h-8 w-8 rounded-lg grid place-items-center bg-emerald-50 border border-emerald-100 text-emerald-600">
                    {ins.icon ?? <LeafIcon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-emerald-900 leading-tight">{ins.title}</div>
                    <div className="text-[12px] text-emerald-700 mt-0.5 leading-relaxed">{ins.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-5">
            <h2 className="text-[18px] font-medium text-emerald-900 mb-4">Journey Progress</h2>
            <div className="flex flex-col items-center gap-5">
              {progress.map((p) => (
                <ProgressRing key={`ring-${p.label}`} percent={p.percent} label={p.label} color={p.color} size={112} stroke={10} />
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <LeafIcon className="h-12 w-12 text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 md:p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="shrink-0 h-12 w-12 rounded-xl bg-white border border-emerald-100 grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-600" aria-hidden="true"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.2.9-5.5-4-3.9 5.5-.8L12 3z" fill="currentColor" opacity="0.9" /></svg>
            </div>
            <div className="flex-1">
              <div className="text-[16px] font-semibold text-emerald-900">{recommendationTitle}</div>
              <p className="text-[13px] text-emerald-800 mt-1 leading-relaxed">{recommendationText}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-emerald-700">
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 bg-emerald-400 rounded-full"></span> Confidence 94%</span>
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 bg-amber-400 rounded-full"></span> Gentle, warming</span>
              </div>
            </div>
            <div className="hidden md:block"><LeafIcon className="h-16 w-16 text-emerald-200" /></div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onViewPlan} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            View Treatment Plan
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={onBookSession} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            Book Next Session
          </button>
          <button onClick={onDownload} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            Download Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentSummary


