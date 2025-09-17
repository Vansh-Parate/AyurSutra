import React from 'react'

const TreatmentCard: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-7 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i data-lucide="droplets" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Current Treatment</span>
        </div>
        <span className="text-[12px] text-slate-600">Day 8 of 21</span>
      </div>
      <div className="mt-2">
        <div className="text-[15px] font-medium tracking-tight text-emerald-900">21-day Panchakarma Program</div>
        <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }}></div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] text-slate-600">
          <span>Started 1 week ago</span>
          <span>Estimated completion in 13 days</span>
        </div>
      </div>
    </div>
  )
}

export default TreatmentCard


