import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface DashboardHeaderProps {
  userName?: string
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
  }
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 bg-white/85 backdrop-blur-sm border-b border-emerald-100">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center shadow-sm">
          <span className="text-sm font-medium tracking-tight">AS</span>
        </div>
        <nav className="hidden md:flex items-center gap-2 ml-4 text-[14px]">
          <a href="/dashboard" className="px-4 py-2 rounded-lg text-emerald-800 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 font-medium">Dashboard</a>
          <a href="/assessment" className="px-4 py-2 rounded-lg text-emerald-800 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 font-medium">Assessment</a>
          <a href="/plans" className="px-4 py-2 rounded-lg text-emerald-800 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 font-medium">Plans</a>
          <a href="/appointments" className="px-4 py-2 rounded-lg text-emerald-800 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 font-medium">Appointments</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
          <span className="text-sm">Good day{userName ? `, ${userName.split(' ')[0]}` : ''}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 px-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[12px] flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-orange-500" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
            <span className="font-medium">3</span>
          </div>
          <div className="h-8 px-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[12px] flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
            <span className="font-medium">XP 120</span>
          </div>
          <button 
            className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 grid place-items-center text-emerald-700 cursor-pointer relative" 
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User profile menu"
          >
            <span className="text-[11px] font-medium tracking-tight">{userName ? userName[0] : 'U'}</span>
            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white border border-emerald-100 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                <button 
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader


