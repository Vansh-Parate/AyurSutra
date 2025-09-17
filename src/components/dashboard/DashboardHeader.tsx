import React from 'react'

interface DashboardHeaderProps {
  userName?: string
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-emerald-100">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center shadow-sm">
          <span className="text-sm font-medium tracking-tight">AS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[17px] md:text-[18px] font-medium tracking-tight">AyurSutra Patient Dashboard</span>
          <span className="text-xs text-slate-500">Warm, professional care — tailored to you</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <i data-lucide="sunrise" className="h-4 w-4"></i>
          <span className="text-sm">Good morning{userName ? `, ${userName.split(' ')[0]}` : ''}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 grid place-items-center text-emerald-700">
            <span className="text-[11px] font-medium tracking-tight">{userName ? userName[0] : 'U'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader


