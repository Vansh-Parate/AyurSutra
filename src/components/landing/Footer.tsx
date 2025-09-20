import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid gap-8 sm:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="AyurSutra Home">
              <div className="h-8 w-8 rounded-md bg-emerald-600 text-white flex items-center justify-center ring-1 ring-emerald-500/70">
                <span className="text-[12px] font-semibold">AS</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-zinc-900">AyurSutra</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-600">AI-powered Ayurveda workflows for calm, efficient care.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:col-span-2">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">Product</h4>
              <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                <li><a href="#features" className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Features</a></li>
                <li><a href="#assessment" className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Assessment</a></li>
                <li><a href="#impact" className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">Company</h4>
              <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                <li><Link to="/auth/signup" className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Get started</Link></li>
                <li><button className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Privacy</button></li>
                <li><button className="hover:text-emerald-700 transition-colors duration-200 cursor-pointer">Terms</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
          <span>© {currentYear} AyurSutra. All rights reserved.</span>
          <span>Made with care and balance.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
