import React from 'react'

interface AssessmentLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-white">
      <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 lg:px-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-xl bg-emerald-600 text-white grid place-items-center shadow-sm">
            <span className="text-xs md:text-sm font-medium tracking-tight">AS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] md:text-[17px] lg:text-[18px] font-medium tracking-tight">AyurSutra Assessment</span>
            <span className="text-[10px] md:text-xs text-slate-500 hidden sm:block">Personalized dosha profiling</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 lg:px-10 pb-4 md:pb-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <aside className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3">
            {sidebar}
          </aside>
          <section className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-9">
            {children}
          </section>
        </div>
      </main>
    </div>
  )
}

export default AssessmentLayout


