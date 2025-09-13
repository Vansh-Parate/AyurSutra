import React from 'react'

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
}

const StepCard: React.FC<StepCardProps> = ({ 
  title, 
  subtitle, 
  children, 
  canContinue, 
  isLast, 
  onBack, 
  onSkip, 
  onContinue, 
  onFinish, 
  hideSkip = false 
}) => {
  return (
    <div className="w-full h-[calc(100vh-8rem)] md:h-auto rounded-xl md:rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm flex flex-col">
      {/* Header Section */}
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-[16px] md:text-[26px] lg:text-[28px] font-semibold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] md:text-[13px] text-slate-600 mt-1 md:mt-1.5 leading-tight">
                {subtitle}
              </p>
            )}
          </div>
          <img 
            alt="leaf" 
            src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" 
            className="hidden md:block h-12 w-16 lg:h-16 lg:w-24 object-cover rounded-xl border border-emerald-100 shadow-sm ml-3"
          />
        </div>
      </div>

      {/* Content Section - Flexible Height with more space */}
      <div className="px-4 md:px-5 lg:px-6 pb-6 md:pb-8 lg:pb-10 flex-1 min-h-0 flex flex-col justify-center">
        {children}
      </div>

      {/* Action Buttons Section - Always Visible with more spacing */}
      <div className="px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 border-t border-slate-100 bg-slate-50/30">
        <div className="flex items-center justify-center gap-1.5 md:gap-3">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-1 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm"
          >
            <i data-lucide="arrow-left" className="h-3 w-3 md:h-4 md:w-4"></i>
            <span className="text-[10px] md:text-[13px] font-medium">Back</span>
          </button>
          
          {!isLast && !hideSkip && (
            <button 
              onClick={onSkip} 
              className="inline-flex items-center gap-1 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-transparent transition"
            >
              <i data-lucide="skip-forward" className="h-3 w-3 md:h-4 md:w-4"></i>
              <span className="text-[10px] md:text-[13px] font-medium">Skip</span>
            </button>
          )}
          
          {isLast ? (
            <button 
              onClick={onFinish} 
              className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
            >
              <span className="text-[10px] md:text-[13px] font-medium">Finish</span>
              <i data-lucide="check" className="h-3 w-3 md:h-4 md:w-4"></i>
            </button>
          ) : (
            <button 
              disabled={!canContinue} 
              onClick={onContinue} 
              className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 disabled:bg-emerald-400/60 disabled:cursor-not-allowed"
            >
              <span className="text-[10px] md:text-[13px] font-medium">Continue</span>
              <i data-lucide="chevron-right" className="h-3 w-3 md:h-4 md:w-4"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepCard