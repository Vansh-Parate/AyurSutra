export default function BackgroundMotifs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent"></div>
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl"></div>
      <div className="absolute top-20 right-8 text-emerald-300/40">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-lucide="leaf" className="lucide lucide-leaf h-10 w-10"></svg>
      </div>
      <div className="absolute bottom-28 left-10 text-emerald-300/40">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-lucide="leaf" className="lucide lucide-leaf h-8 w-8"></svg>
      </div>
    </div>
  )
}


