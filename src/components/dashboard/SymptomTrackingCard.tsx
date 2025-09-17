import React, { useEffect, useRef, useState } from 'react'

const SymptomTrackingCard: React.FC = () => {
  const sliderRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState(4)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const pct = (value / (Number(slider.max) - Number(slider.min))) * 100
    slider.style.background = `linear-gradient(90deg, rgb(16 185 129) ${pct}%, rgb(229 231 235) ${pct}%)`
  }, [value])

  return (
    <div className="col-span-12 lg:col-span-5 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i data-lucide="activity" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Symptom Tracking</span>
        </div>
        <span className="text-[11px] text-slate-500">Daily</span>
      </div>
      <div className="mt-2">
        <div className="text-[13px] text-slate-700">Rate your joint stiffness</div>
        <div className="mt-1 flex items-center gap-2 text-[12px] text-slate-600">
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">Before 8/10</span>
          <i data-lucide="arrow-right" className="h-3.5 w-3.5 text-slate-500"></i>
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700">Now {value}/10</span>
        </div>
        <div className="mt-3">
          <input ref={sliderRef} type="range" min="0" max="10" step="1" value={value} onChange={(e) => setValue(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ appearance: 'none', height: 10, borderRadius: 9999, outline: 'none' as any }} />
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><i data-lucide="frown" className="h-3.5 w-3.5"></i> 0</span>
            <span className="flex items-center gap-1"><i data-lucide="grip-horizontal" className="h-3.5 w-3.5"></i> drag</span>
            <span className="flex items-center gap-1">10 <i data-lucide="smile" className="h-3.5 w-3.5"></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomTrackingCard


