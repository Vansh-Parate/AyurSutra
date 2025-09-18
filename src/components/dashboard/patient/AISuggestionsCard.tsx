import React from 'react'

interface AISuggestionsCardProps {
  tips: { icon: string; text: string }[]
  onGenerate?: () => void
  loading?: boolean
  initialLoading?: boolean
}

const AISuggestionsCard: React.FC<AISuggestionsCardProps> = ({ tips, onGenerate, loading, initialLoading }) => {
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">AI Suggestions</span>
        </div>
        <span className="text-[11px] text-slate-500">{loading ? 'Generating…' : 'Personalized'}</span>
      </div>
      <div className="space-y-2.5">
        {initialLoading ? (
          // Skeleton loader for initial load
          Array.from({ length: 3 }, (_, idx) => (
            <div key={`skeleton-${idx}`} className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-2.5 animate-pulse">
              <div className="flex items-start gap-2">
                <div className="h-4 w-4 bg-emerald-200 rounded mt-0.5"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-emerald-200 rounded w-3/4"></div>
                  <div className="h-3 bg-emerald-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          tips.map((t, idx) => (
            <div key={`${t.icon}-${idx}`} className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-2.5">
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0-9-9"/><path d="M3 12h9v9"/></svg>
                <div className="text-[13px] text-slate-700 leading-relaxed">{t.text}</div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-emerald-100">
        <button onClick={onGenerate} disabled={loading} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 4V2"/>
            <path d="M15 8v-2"/>
            <path d="M20 15h2"/>
            <path d="M3 15h2"/>
            <path d="M18.364 5.636 17 7"/>
            <path d="M6.636 17.364 8 16"/>
            <path d="M14 14 5 21l2-7 7-7 3 3-3 3z"/>
          </svg>
          <span className="font-medium">Generate more tips</span>
        </button>
      </div>
    </div>
  )
}
export default AISuggestionsCard


