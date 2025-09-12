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

function SimpleChoiceStep<T extends string>(props: SimpleChoiceStepProps<T>) {
  const { title, subtitle, options, value, onChange } = props
  const PILL_BASE = 'group w-full flex items-start justify-between gap-3 rounded-full border border-emerald-100 bg-white hover:bg-emerald-50/60 hover:border-emerald-200 transition p-4 pr-5 focus:outline-none shadow-sm'
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
      <div className="space-y-3">
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
              <div className="text-left">
                <div className="text-[16px] font-medium tracking-tight text-slate-900">{opt.title}</div>
                {opt.desc && <div className="text-[12px] text-slate-600 mt-0.5">{opt.desc}</div>}
              </div>
              <div className={`shrink-0 h-6 w-6 rounded-full grid place-items-center transition ${selected ? 'bg-emerald-100 border border-emerald-400' : 'bg-white border border-emerald-300'}`}>
                <i data-lucide="check" className={`h-3.5 w-3.5 text-emerald-600 ${selected ? '' : 'hidden'}`}></i>
              </div>
            </button>
          )
        })}
      </div>
    </StepCard>
  )
}

export default SimpleChoiceStep


