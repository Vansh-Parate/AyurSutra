import React from 'react'
import { useNavigate } from 'react-router-dom'

interface StepCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  canContinue: boolean
  isLast: boolean
  onBack: () => void
  onSkip: () => void
  onContinue: () => void
  onFinish: () => void
  hideSkip?: boolean
  finishPath?: string
}

const StepCard: React.FC<StepCardProps> = ({ title, subtitle, children, canContinue, isLast, onBack, onSkip, onContinue, onFinish, hideSkip = false, finishPath }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-5 md:p-6 flex flex-col min-h-[560px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] md:text-[28px] font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="text-[13px] text-slate-600 mt-1">{subtitle}</p>}
        </div>
        <img alt="leaf" src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" className="hidden md:block h-16 w-24 object-cover rounded-xl border border-emerald-100 shadow-sm"/>
      </div>

      <div className="mt-6">{children}</div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-center gap-3">
          <button type="button" onClick={onBack} className="inline-flex items-center cursor-pointer gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm">
            <i data-lucide="arrow-left" className="h-4 w-4"></i>
            <span className="text-[13px] font-medium">Back</span>
          </button>
          {!isLast && !hideSkip && (
            <button type="button" onClick={onSkip} className="inline-flex items-center cursor-pointer gap-2 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-transparent transition">
              <i data-lucide="skip-forward" className="h-4 w-4"></i>
              <span className="text-[13px] font-medium">Skip</span>
            </button>
          )}
          {isLast ? (
            <button type="button" onClick={() => { try { onFinish() } finally { if (finishPath) navigate(finishPath, { replace: true }) } }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 cursor-pointer">
              <span className="text-[13px] font-medium">Finish</span>
              <i data-lucide="check" className="h-4 w-4"></i>
            </button>
          ) : (
            <button type="button" disabled={!canContinue} onClick={onContinue} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 disabled:bg-emerald-400/60 disabled:cursor-not-allowed cursor-pointer">
              <span className="text-[13px] font-medium">Continue</span>
              <i data-lucide="chevron-right" className="h-4 w-4"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default StepCard


