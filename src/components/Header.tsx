import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F7FAF7]/80 border-b border-zinc-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="AyurSutra Home">
            <div className="h-8 w-8 rounded-md bg-emerald-600 text-white flex items-center justify-center ring-1 ring-emerald-500/70 group-hover:ring-emerald-400 transition-all duration-200 tracking-tight">
              <span className="text-[12px] font-semibold">AS</span>
            </div>
            <span className="text-[15px] sm:text-[16px] font-semibold tracking-tight">AyurSutra</span>
          </Link>
          
          {!isAuthenticated ? (
            <>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#features" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4">Features</a>
                <a href="#journeys" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4">Journeys</a>
                <a href="#impact" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4">Impact</a>
              </nav>
              <div className="flex items-center gap-3">
                <button className="hidden sm:inline-flex items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 hover:ring-emerald-300 hover:bg-emerald-50 transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  <span>Live demo</span>
                </button>
                <Link to="/auth/signin" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-500 hover:bg-emerald-700 hover:ring-emerald-600 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/60">
                  <span>Get started</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-600">
                <span>Welcome, {user?.fullName}</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-medium text-zinc-600 ring-1 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-50 transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


