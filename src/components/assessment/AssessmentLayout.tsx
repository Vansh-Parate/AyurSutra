import React from 'react'

interface AssessmentLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-white">
      <header className="h-16 flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center shadow-sm">
            <span className="text-sm font-medium tracking-tight">AS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] md:text-[18px] font-medium tracking-tight">AyurSutra Assessment</span>
            <span className="text-xs text-slate-500">Personalized dosha profiling</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-10 pb-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3">
            {sidebar}
          </aside>
          <section className="col-span-12 sm:col-span-8 md:col-span-9 lg:col-span-9 xl:col-span-9">
            {children}
          </section>
        </div>
      </main>
    </div>
  )
}

export default AssessmentLayout


