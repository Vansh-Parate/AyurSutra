import React from 'react'

interface DashboardHeaderProps {
  greetingName: string
  subtitle?: string
  todayLabel: string
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ greetingName, todayLabel }) => {
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-5 md:p-6 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] md:text-[28px] font-semibold tracking-tight text-slate-900">Welcome back, {greetingName}</h1>
          <p className="text-[13px] text-slate-600 mt-1">Here’s a snapshot of your healing journey today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[12px] text-slate-600">
          <i data-lucide="calendar-clock" className="h-4 w-4"></i>
          <span>{todayLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader


