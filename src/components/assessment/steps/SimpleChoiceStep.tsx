import StepCard from '../StepCard'

export interface ChoiceOption<T extends string> {
  key: T
  title: string
  desc?: string
}

interface SimpleChoiceStepProps<T extends string> {
  title: string
  subtitle?: string
  options: ChoiceOption<T>[]
  value: T | null
  onChange: (v: T) => void
  onBack: () => void
  onSkip: () => void
  onContinue: () => void
  onFinish: () => void
  canContinue: boolean
  isLast: boolean
}

function SimpleChoiceStep<T extends string>(props: Readonly<SimpleChoiceStepProps<T>>) {
  const { title, subtitle, options, value, onChange } = props
  const PILL_BASE = 'group w-full flex items-start justify-between gap-2.5 md:gap-3 rounded-xl md:rounded-full border border-emerald-100 bg-white hover:bg-emerald-50/60 hover:border-emerald-200 transition p-3 md:p-4 pr-4 md:pr-5 focus:outline-none shadow-sm'
  return (
    <StepCard
      title={title}
      subtitle={subtitle}
      canContinue={props.canContinue}
      isLast={props.isLast}
      onBack={props.onBack}
      onSkip={props.onSkip}
      onContinue={props.onContinue}
      onFinish={props.onFinish}
    >
      <div className="space-y-3 md:space-y-4">
        {options.map(opt => {
          const selected = value === opt.key
          return (
            <button
              type="button"
              key={opt.key}
              className={`${PILL_BASE} ${selected ? 'ring-2 ring-emerald-200 bg-emerald-50' : ''}`}
              onClick={() => onChange(opt.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange(opt.key)
                }
              }}
            >
              <div className="text-left flex-1 min-w-0">
                <div className="text-[13px] md:text-[16px] font-medium tracking-tight text-slate-900 leading-tight">{opt.title}</div>
                {opt.desc && <div className="text-[10px] md:text-[12px] text-slate-600 mt-1 leading-relaxed">{opt.desc}</div>}
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

export default SimpleChoiceStep


