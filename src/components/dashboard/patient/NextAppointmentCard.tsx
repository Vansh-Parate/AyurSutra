import React from 'react'

interface NextAppointmentCardProps {
  title: string
  dateLabel: string
  timeLabel: string
  location: string
  onView?: () => void
  onRemind?: () => void
}

const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({ title, dateLabel, timeLabel, location, onView, onRemind }) => {
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Next Appointment</span>
        </div>
        <span className="text-[11px] text-slate-500">{dateLabel}</span>
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 11.5V8a3 3 0 0 0-6 0v5"/><path d="M10 10V7a3 3 0 0 0-6 0v6a8 8 0 0 0 8 8h3a6 6 0 0 0 6-6"/></svg>
            <span className="text-[13px] font-medium tracking-tight text-emerald-900">{title}</span>
          </div>
          <span className="text-[12px] text-emerald-700">{timeLabel}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-slate-600">
          <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s8-7.6 8-13a8 8 0 1 0-16 0c0 5.4 8 13 8 13z"/><circle cx="12" cy="8" r="3"/></svg>
          <span>{location}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={onView} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition active:scale-[.98] focus:outline-2 focus:outline-emerald-300">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
            <span className="font-medium">View details</span>
          </button>
          <button type="button" onClick={onRemind} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-200 text-slate-700 bg-emerald-100/60 hover:bg-emerald-100 transition active:scale-[.98] focus:outline-2 focus:outline-emerald-300">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>
            <span className="font-medium">Remind me</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NextAppointmentCard


