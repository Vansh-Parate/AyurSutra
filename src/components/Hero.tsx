export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 py-16 md:py-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
              Traditional Panchakarma meets modern efficiency
            </h1>
            <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-600">
              AyurSutra blends ancient wisdom with AI-driven workflows to streamline care, personalize treatment, and bring calm back to clinics and homes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-500 hover:bg-emerald-700 hover:ring-emerald-600 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/60">
                Explore features
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <button className="inline-flex gap-2 ring-1 ring-zinc-200 hover:bg-white/70 hover:ring-emerald-200 transition-all text-sm font-medium text-emerald-900 rounded-md pt-2.5 pr-4 pb-2.5 pl-4 items-center justify-center">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>
                How it works
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="Happy patient" className="h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop" alt="Practitioner" className="h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" alt="Clinic admin" className="h-8 w-8 rounded-full ring-2 ring-white object-cover" />
              </div>
              <p className="text-xs text-zinc-600">Trusted by clinics and wellness centers worldwide</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              <div className="rounded-xl bg-white/80 backdrop-blur ring-1 ring-zinc-200 shadow-sm p-4">
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-zinc-800">AyurSutra Console</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C7 2 3 6 3 11c0 5 4 10 9 10s9-5 9-10c0-5-4-9-9-9z"/></svg>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="col-span-2 rounded-lg border border-zinc-200 p-3 hover:border-emerald-200 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-700">Today’s Schedule</span>
                      <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 12v4l3 1"/></svg>
                    </div>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center justify-between text-xs text-zinc-600">
                        <span>09:00 - Abhyanga</span>
                        <span className="text-emerald-700 font-medium">Room 2</span>
                      </li>
                      <li className="flex items-center justify-between text-xs text-zinc-600">
                        <span>10:30 - Shirodhara</span>
                        <span className="text-emerald-700 font-medium">Room 1</span>
                      </li>
                      <li className="flex items-center justify-between text-xs text-zinc-600">
                        <span>11:30 - Consultation</span>
                        <span className="text-emerald-700 font-medium">Telehealth</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-zinc-200 p-3 hover:border-emerald-200 transition">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>
                      <span className="text-xs font-medium text-zinc-700">AI Insights</span>
                    </div>
                    <p className="mt-2 text-[11.5px] leading-5 text-zinc-600">
                      Recommend <span className="font-medium text-emerald-700">Pitta</span> calming protocol; add <span className="font-medium">Triphala</span>.
                    </p>
                  </div>
                  <div className="col-span-3 rounded-lg border border-zinc-200 p-3 hover:border-emerald-200 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-700">Progress</span>
                      <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-md bg-emerald-50 text-emerald-900 px-2 py-2 text-[11px] ring-1 ring-emerald-100">Sleep +18%</div>
                      <div className="rounded-md bg-emerald-50 text-emerald-900 px-2 py-2 text-[11px] ring-1 ring-emerald-100">Stress −23%</div>
                      <div className="rounded-md bg-emerald-50 text-emerald-900 px-2 py-2 text-[11px] ring-1 ring-emerald-100">Energy +14%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  HIPAA-ready, secure by design
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


