import React from 'react'

interface AISuggestionsCardProps {
  tips: { icon: string; text: string }[]
  onGenerate?: () => void
}

const AISuggestionsCard: React.FC<AISuggestionsCardProps> = ({ tips, onGenerate }) => {
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <i data-lucide="sparkles" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">AI Suggestions</span>
        </div>
        <span className="text-[11px] text-slate-500">Personalized</span>
      </div>
      <ul className="space-y-2.5">
        {tips.map((t, idx) => (
          <li key={`${t.icon}-${idx}`} className="flex items-start gap-2">
            <i data-lucide={t.icon} className="h-4 w-4 text-emerald-600 mt-0.5"></i>
            <div className="text-[13px] text-slate-700">{t.text}</div>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-emerald-100">
        <button onClick={onGenerate} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition">
          <i data-lucide="wand-2" className="h-3.5 w-3.5"></i>
          <span className="font-medium">Generate more tips</span>
        </button>
      </div>
    </div>
  )
}

export default AISuggestionsCard


