import React from 'react'

interface AssessmentSidebarProps {
  currentStep: number
  totalSteps: number
  stepStatuses: Record<string, 'pending' | 'answered' | 'skipped'>
  dosha: { vata: number; pitta: number; kapha: number }
  onStepClick: (stepIndex: number) => void
  isScoring?: boolean
  steps: { key: string; label: string; icon: string }[]
}

const AssessmentSidebar: React.FC<AssessmentSidebarProps> = ({ currentStep, totalSteps, stepStatuses, dosha, onStepClick, isScoring = false, steps }) => {
  const getButtonClassName = (isCurrent: boolean, isClickable: boolean) => {
    const baseClasses = "w-full flex items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 border transition"
    
    if (isCurrent) {
      return `${baseClasses} bg-emerald-50 border-emerald-100`
    }
    
    if (isClickable) {
      return `${baseClasses} hover:bg-emerald-50/60 border-transparent hover:border-emerald-100 cursor-pointer`
    }
    
    return `${baseClasses} border-transparent cursor-not-allowed opacity-50`
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {/* Mobile Journey - Ultra Compact */}
      <div className="md:hidden w-full rounded-lg bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium tracking-tight text-slate-800">Step {currentStep + 1} of {totalSteps}</span>
          <div className="flex-1 h-1 rounded-full bg-emerald-100 overflow-hidden mx-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(currentStep + 1) * (100 / totalSteps)}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          {steps.map((s, idx) => {
            const status = stepStatuses[s.key] || 'pending'
            const isCurrent = idx === currentStep
            const isClickable = idx <= currentStep || status !== 'pending'
            return (
              <button
                key={s.key}
                onClick={() => isClickable && onStepClick(idx)}
                disabled={!isClickable}
                className={`w-6 h-6 rounded-md border transition relative flex items-center justify-center ${
                  isCurrent 
                    ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-100' 
                    : isClickable 
                      ? 'hover:bg-emerald-50/60 border-emerald-200 hover:border-emerald-300 cursor-pointer' 
                      : 'border-slate-200 cursor-not-allowed opacity-50'
                }`}
                title={s.label}
              >
                <i data-lucide={s.icon} className={`h-3.5 w-3.5 ${isCurrent ? 'text-emerald-600' : 'text-slate-500'}`}></i>
                {status !== 'pending' && (
                  <span className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${status === 'answered' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop Journey - Full Layout */}
      <div className="hidden md:flex w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-4 flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-medium tracking-tight text-slate-800">Your Journey</span>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{totalSteps} steps</span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-sm text-slate-600">Step {currentStep + 1} of {totalSteps}</span>
          <div className="w-32 h-2 rounded-full bg-emerald-100 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(currentStep + 1) * (100 / totalSteps)}%` }} />
          </div>
        </div>
        <div className="relative mt-1">
          <div className="absolute left-[14px] top-0 bottom-0 w-px bg-emerald-100" />
          <ul className="space-y-2 pr-2">
            {steps.map((s, idx) => {
              const status = stepStatuses[s.key] || 'pending'
              const isCurrent = idx === currentStep
              const isClickable = idx <= currentStep || status !== 'pending'
              return (
                <li key={s.key} className="relative pl-8">
                  <span className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-white ${isCurrent ? 'border-2 border-emerald-500 ring-4 ring-emerald-100' : 'border border-emerald-200'}`}></span>
                  <button
                    onClick={() => isClickable && onStepClick(idx)}
                    disabled={!isClickable}
                    className={getButtonClassName(isCurrent, isClickable)}
                  >
                    <div className="flex items-center gap-2.5">
                      <i data-lucide={s.icon} className={`h-4 w-4 ${isCurrent ? 'text-emerald-600' : 'text-slate-500'}`}></i>
                      <span className={`text-[13px] ${isCurrent ? 'font-medium tracking-tight text-emerald-800' : 'text-slate-700'}`}>{s.label}</span>
                    </div>
                    {status !== 'pending' && (
                      <i data-lucide={status === 'answered' ? 'check' : 'minus'} className={`h-4 w-4 ${status === 'answered' ? 'text-emerald-600' : 'text-slate-400'}`}></i>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Dosha Balance - Ultra Compact on Mobile */}
      <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-2 md:p-3 lg:p-4">
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            <i data-lucide="leaf" className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-emerald-600"></i>
            <span className="text-[10px] md:text-[12px] lg:text-[14px] font-medium tracking-tight text-slate-900">Dosha Balance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`h-1 w-1 md:h-1.5 md:w-1.5 lg:h-2 lg:w-2 rounded-full ${isScoring ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            <span className="text-[9px] md:text-[10px] lg:text-[11px] text-emerald-600">{isScoring ? 'Updating...' : 'Live'}</span>
          </div>
        </div>
        <div className="space-y-1.5 md:space-y-2 lg:space-y-3">
          {[
            { name: 'Vata', pct: Math.round(dosha.vata), color: 'bg-indigo-400', bgColor: 'bg-indigo-50' },
            { name: 'Pitta', pct: Math.round(dosha.pitta), color: 'bg-amber-400', bgColor: 'bg-amber-50' },
            { name: 'Kapha', pct: Math.round(dosha.kapha), color: 'bg-emerald-500', bgColor: 'bg-emerald-50' }
          ].map(bar => (
            <div key={bar.name} className="group">
              <div className="flex items-center justify-between text-[9px] md:text-[10px] lg:text-[12px] mb-0.5 md:mb-1">
                <span className="text-slate-700 font-medium">{bar.name}</span>
                <span className="text-slate-500 font-mono">{bar.pct}%</span>
              </div>
              <div className="h-1 md:h-1.5 lg:h-2 rounded-full bg-slate-100 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${bar.color} transition-all duration-500 ease-out relative`} 
                  style={{ width: `${bar.pct}%` }}
                >
                  <div className={`absolute inset-0 ${bar.bgColor} opacity-20 animate-pulse`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1.5 md:mt-2 lg:mt-3 pt-1.5 md:pt-2 lg:pt-3 border-t border-slate-100">
          <div className="text-[8px] md:text-[9px] lg:text-[11px] text-slate-500 text-center">
            Updates as you answer questions
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentSidebar


