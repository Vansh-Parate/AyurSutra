import React from 'react'

const Timeline: React.FC = () => {
  const totalDays = 21
  const currentDay = 8
  const days = Array.from({ length: totalDays }, (_, i) => i + 1)
  return (
    <div className="col-span-12 xl:col-span-7 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i data-lucide="route" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Treatment Timeline</span>
        </div>
        <span className="text-[12px] text-slate-600">Day 1 → Day 21</span>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {days.map(d => {
            const base = 'shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border text-[12px] transition outline-offset-2 focus:outline focus:outline-2 focus:outline-emerald-300'
            const cls = d < currentDay
              ? `${base} bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600`
              : d === currentDay
                ? `${base} bg-amber-400 text-amber-900 border-amber-500 hover:bg-amber-500`
                : `${base} bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200`
            return (
              <button key={d} className={cls}>{d}</button>
            )
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600"></span>
            Completed
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500"></span>
            Today
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200"></span>
            Upcoming
          </span>
        </div>
      </div>
    </div>
  )
}

export default Timeline


