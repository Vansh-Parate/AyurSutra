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
          <i data-lucide="calendar" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Next Appointment</span>
        </div>
        <span className="text-[11px] text-slate-500">{dateLabel}</span>
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i data-lucide="hand" className="h-4 w-4 text-emerald-700"></i>
            <span className="text-[13px] font-medium tracking-tight text-emerald-900">{title}</span>
          </div>
          <span className="text-[12px] text-emerald-700">{timeLabel}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-slate-600">
          <i data-lucide="map-pin" className="h-4 w-4 text-slate-500"></i>
          <span>{location}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={onView} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition">
            <i data-lucide="eye" className="h-3.5 w-3.5"></i>
            <span className="font-medium">View details</span>
          </button>
          <button onClick={onRemind} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-200 text-slate-700 bg-emerald-100/60 hover:bg-emerald-100 transition">
            <i data-lucide="bell" className="h-3.5 w-3.5"></i>
            <span className="font-medium">Remind me</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NextAppointmentCard


