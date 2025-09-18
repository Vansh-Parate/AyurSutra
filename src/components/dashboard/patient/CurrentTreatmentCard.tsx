import React from 'react'

interface CurrentTreatmentCardProps {
  programName: string
  dayLabel: string
  progressPct: number
  startedText: string
  etaText: string
}

const CurrentTreatmentCard: React.FC<CurrentTreatmentCardProps> = ({ programName, dayLabel, progressPct, startedText, etaText }) => {
  return (
    <div className="col-span-12 lg:col-span-7 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2.69 7.05 8.64a6.99 6.99 0 1 0 9.9 0L12 2.69z"/></svg>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Current Treatment</span>
        </div>
        <span className="text-[12px] text-slate-600">{dayLabel}</span>
      </div>
      <div className="mt-2">
        <div className="text-[15px] font-medium tracking-tight text-emerald-900">{programName}</div>
        <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(0, Math.min(100, progressPct))}%` }}></div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] text-slate-600">
          <span>{startedText}</span>
          <span>{etaText}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentTreatmentCard


