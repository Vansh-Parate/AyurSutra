import React from 'react'
import StepCard from '../StepCard'

export type BodyFrameValue = 'light' | 'medium' | 'sturdy'

interface BodyFrameStepProps {
  value: BodyFrameValue | null
  onChange: (val: BodyFrameValue) => void
  onBack: () => void
  onSkip: () => void
  onContinue: () => void
  onFinish: () => void
  canContinue: boolean
  isLast: boolean
}

const PILL_BASE = 'option-pill group w-full flex items-start justify-between gap-2.5 md:gap-3 rounded-xl md:rounded-full border border-emerald-100 bg-white hover:bg-emerald-50/60 hover:border-emerald-200 transition p-3 md:p-4 pr-4 md:pr-5 focus:outline-none shadow-sm'

const BodyFrameStep: React.FC<BodyFrameStepProps> = ({ value, onChange, onBack, onSkip, onContinue, onFinish, canContinue, isLast }) => {
  const options: { key: BodyFrameValue; title: string; desc: string }[] = [
    { key: 'light', title: 'Light / Slender', desc: 'Fine bones, narrow shoulders.' },
    { key: 'medium', title: 'Medium / Proportionate', desc: 'Balanced build, moderate muscle.' },
    { key: 'sturdy', title: 'Sturdy / Broad', desc: 'Broader frame, gains easily.' }
  ]

  function handleSelect(next: BodyFrameValue) {
    onChange(next)
  }

  return (
    <StepCard
      title="Which best describes your body frame?"
      subtitle="Choose the option that most closely matches your natural build."
      canContinue={canContinue}
      isLast={isLast}
      onBack={onBack}
      onSkip={onSkip}
      onContinue={onContinue}
      onFinish={onFinish}
    >
      <div className="space-y-3 md:space-y-4">
        {options.map(opt => {
          const selected = value === opt.key
          return (
            <button
              type="button"
              key={opt.key}
              className={`${PILL_BASE} ${selected ? 'ring-2 ring-emerald-200 bg-emerald-50' : ''}`}
              data-value={opt.key}
              tabIndex={0}
              onClick={() => handleSelect(opt.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(opt.key)
                }
              }}
            >
              <div className="text-left flex-1 min-w-0">
                <div className="text-[13px] md:text-[16px] font-medium tracking-tight text-slate-900 leading-tight">{opt.title}</div>
                <div className="text-[10px] md:text-[12px] text-slate-600 mt-1 leading-relaxed">{opt.desc}</div>
              </div>
              <div className={`shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full grid place-items-center transition ${selected ? 'bg-emerald-100 border border-emerald-400' : 'bg-white border border-emerald-300'}`}>
                {selected && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 md:h-3.5 md:w-3.5 text-emerald-600" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </StepCard>
  )
}

export default BodyFrameStep


