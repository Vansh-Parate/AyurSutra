import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer">Features</a>
            <a href="#journeys" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer">Journeys</a>
            <a href="#assessment" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer">Assessment</a>
            <a href="#impact" className="text-zinc-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors duration-200 cursor-pointer">Impact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 hover:ring-emerald-300 hover:bg-emerald-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95">
              <PlayCircle className="h-4 w-4" />
              <span>Live demo</span>
            </button>
            <Link to="/auth/signup" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-500 hover:bg-emerald-700 hover:ring-emerald-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 cursor-pointer active:scale-95">
              <span>Get started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
