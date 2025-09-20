import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'AI scheduling',
      description: 'Reduce bottlenecks with automated slots, resource allocation, and reminders.',
      icon: (
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8.5" y="12.5" width="31" height="26" rx="4.5"></rect>
          <line x1="16" y1="7.5" x2="16" y2="13"></line>
          <line x1="32" y1="7.5" x2="32" y2="13"></line>
          <line x1="8.5" y1="18" x2="39.5" y2="18"></line>
          <circle cx="29" cy="27" r="6"></circle>
          <line x1="29" y1="27" x2="29" y2="23.5"></line>
          <line x1="29" y1="27" x2="32" y2="27"></line>
          <path d="M13.5 25.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"></path>
        </svg>
      )
    },
    {
      title: 'Personalized recommendations',
      description: 'Personalized treatment plans guided by dosha profiling and evidence.',
      icon: (
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="14.5" cy="18.5" r="4"></circle>
          <path d="M7.5 30.5c1.8-3.5 5.2-5.5 9-5.5s7.2 2 9 5.5"></path>
          <path d="M34 12c5 6.5 3.5 16-4.5 20.5C24 35 20 35 16 34c4-6 9-9 18-22z"></path>
          <path d="M37.5 28v6"></path>
          <path d="M34.5 31h6"></path>
        </svg>
      )
    },
    {
      title: 'Progress tracking',
      description: 'Track outcomes with simple check-ins, symptoms, sleep, and stress trends.',
      icon: (
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 36h32"></path>
          <path d="M10 28l6-6 5 5 7-9 6 6" fill="none"></path>
          <path d="M30.5 16.5c1.7-1.7 4.3-1.7 6 0 1.7 1.7 1.7 4.3 0 6l-3 3-3-3c-1.7-1.7-1.7-4.3 0-6z"></path>
        </svg>
      )
    },
    {
      title: 'Admin analytics',
      description: 'Clinic-wide insights on capacity, outcomes, and satisfaction—at a glance.',
      icon: (
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M24 7c6 4 12 4 16 4v11c0 8-5 12-16 17-11-5-16-9-16-17V11c4 0 10 0 16-4z"></path>
          <rect x="14" y="22" width="4" height="10" rx="1"></rect>
          <rect x="22" y="19" width="4" height="13" rx="1"></rect>
          <rect x="30" y="25" width="4" height="7" rx="1"></rect>
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">Key features</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="group rounded-xl bg-white p-5 ring-1 ring-zinc-200 hover:ring-emerald-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-full ring-1 ring-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 flex items-center justify-center">
                  {feature.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-emerald-600 transition-colors duration-200" />
              </div>
              <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-zinc-900">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
