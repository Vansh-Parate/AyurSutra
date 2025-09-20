import React, { useState } from 'react';
import { Star, Users, Send } from 'lucide-react';

const CTA: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // Reset form after showing success
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <section id="cta" className="relative mt-16 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white ring-1 ring-zinc-200 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-emerald-600" />
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900">Begin your Ayurveda journey</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">Start with the Dosha Assessment and receive an onboarding kit tailored to your clinic or home practice.</p>
            <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-xs text-zinc-600">Email</span>
                <input 
                  type="email" 
                  required 
                  placeholder="you@clinic.com" 
                  className="mt-1 w-full rounded-md border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-200 cursor-pointer"
                />
              </label>
              <label className="block">
                <span className="text-xs text-zinc-600">Role</span>
                <select className="mt-1 w-full rounded-md border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-200 cursor-pointer">
                  <option>Practitioner</option>
                  <option>Clinic admin</option>
                  <option>Patient</option>
                  <option>Researcher</option>
                </select>
              </label>
              <button 
                type="submit" 
                className="mt-1 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-medium text-white ring-1 ring-emerald-500 hover:bg-emerald-700 hover:ring-emerald-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95"
              >
                Request access
                <Send className="h-4 w-4" />
              </button>
              {showSuccess && (
                <p className="text-xs text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100 rounded-md px-3 py-2">
                  Thank you! We'll be in touch shortly.
                </p>
              )}
            </form>
          </div>
          <div className="rounded-2xl ring-1 ring-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-emerald-900">
              <Users className="h-5 w-5" />
              <h3 className="text-xl font-semibold tracking-tight">What you get</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                Guided dosha assessment with personalized results.
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                Clinic templates for scheduling and check-ins.
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                HIPAA-ready architecture and best practices.
              </li>
            </ul>
            <div className="mt-5 rounded-lg bg-white ring-1 ring-emerald-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-900">Onboarding time</span>
                <span className="text-sm font-semibold text-emerald-700">Under 1 week</span>
              </div>
              <div className="mt-3 h-2 w-full rounded bg-emerald-100 overflow-hidden">
                <div className="h-2 rounded bg-emerald-500 w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
