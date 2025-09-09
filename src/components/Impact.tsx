export default function Impact() {
  return (
    <section id="impact" className="relative mt-16 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-zinc-200">
          <div className="flex items-end justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">Real-world impact</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl p-5 ring-1 ring-zinc-200 bg-gradient-to-br from-emerald-50/70 to-white">
              <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-xl"></div>
              <div className="text-emerald-700 text-3xl sm:text-4xl font-semibold tracking-tight">−40%</div>
              <p className="mt-2 text-xs text-zinc-600">Reduced wait times</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl p-5 ring-1 ring-zinc-200 bg-gradient-to-br from-lime-50/70 to-white">
              <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-lime-200/60 blur-xl"></div>
              <div className="text-emerald-700 text-3xl sm:text-4xl font-semibold tracking-tight">+28%</div>
              <p className="mt-2 text-xs text-zinc-600">Improved clinical efficiency</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl p-5 ring-1 ring-zinc-200 bg-gradient-to-br from-emerald-50/70 to-white">
              <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-xl"></div>
              <div className="text-emerald-700 text-3xl sm:text-4xl font-semibold tracking-tight">4.7/5</div>
              <p className="mt-2 text-xs text-zinc-600">Patient satisfaction</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl p-5 ring-1 ring-zinc-200 bg-gradient-to-br from-lime-50/70 to-white">
              <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-lime-200/60 blur-xl"></div>
              <div className="text-emerald-700 text-3xl sm:text-4xl font-semibold tracking-tight">99.9%</div>
              <p className="mt-2 text-xs text-zinc-600">Uptime & reliability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


