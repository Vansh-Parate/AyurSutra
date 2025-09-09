export default function CTA() {
  return (
    <section id="cta" className="relative mt-16 sm:mt-20 mb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl text-white ring-1 ring-emerald-500/70 p-6 sm:p-8 overflow-hidden relative bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-lime-300/30 blur-2xl" aria-hidden="true"></div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ready to elevate care?</h3>
              <p className="mt-1 text-sm text-white/90">Join clinics using AyurSutra to streamline operations and improve outcomes.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/30 hover:bg-white/15 hover:ring-white/40 transition">
                Book a demo
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-lucide="video" className="lucide lucide-video h-4 w-4"></svg>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-emerald-900 ring-1 ring-white/20 hover:bg-white/90 transition">
                Get started
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right h-4 w-4"></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


