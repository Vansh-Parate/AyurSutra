import React from 'react';
import { TrendingUp, Smile, Check, Clock, ArrowRight } from 'lucide-react';

const Impact: React.FC = () => {
  const metrics = [
    {
      title: 'Wait times',
      value: '−32%',
      description: 'After optimizing schedules',
      icon: TrendingUp,
      progress: 'w-2/3',
      color: 'emerald'
    },
    {
      title: 'Satisfaction',
      value: '4.7/5',
      description: 'Based on patient NPS',
      icon: Smile,
      chart: (
        <div className="mt-3 flex items-end gap-1 h-14">
          <div className="w-2 flex-1 bg-emerald-100 rounded"></div>
          <div className="w-2 flex-1 bg-emerald-200 rounded h-8"></div>
          <div className="w-2 flex-1 bg-emerald-300 rounded h-10"></div>
          <div className="w-2 flex-1 bg-emerald-400 rounded h-12"></div>
          <div className="w-2 flex-1 bg-emerald-500 rounded h-14"></div>
        </div>
      ),
      color: 'emerald'
    },
    {
      title: 'Adherence',
      value: '+26%',
      description: 'Daily check-ins completed',
      icon: Check,
      progress: 'w-3/4',
      color: 'emerald'
    },
    {
      title: 'Time saved',
      value: '6h/week',
      description: 'Per practitioner',
      icon: Clock,
      tags: ['+ Automations', '+ Templates'],
      color: 'emerald'
    }
  ];

  return (
    <section id="impact" className="relative mt-16 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-zinc-200">
          <div className="flex items-end justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">Measured impact</h2>
            <p className="text-xs sm:text-sm text-zinc-600">Clinics report meaningful operational and patient outcomes within weeks.</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <div key={metric.title} className="group rounded-xl ring-1 ring-zinc-200 p-5 bg-white hover:ring-emerald-200 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-700">{metric.title}</span>
                    <IconComponent className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-emerald-700">{metric.value}</div>
                  <p className="mt-1 text-xs text-zinc-500">{metric.description}</p>
                  {metric.progress && (
                    <div className="mt-3 h-2 w-full rounded bg-zinc-100 overflow-hidden">
                      <div className={`h-2 ${metric.progress} bg-emerald-500 rounded`}></div>
                    </div>
                  )}
                  {metric.chart}
                  {metric.tags && (
                    <div className="mt-3 flex items-center gap-2 text-[11.5px] text-zinc-600">
                      {metric.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-zinc-50 ring-1 ring-zinc-200 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9"/>
                  <path d="M16 4h-3a2 2 0 0 0-2 2v12"/>
                  <path d="M7 9h5"/>
                </svg>
                <p className="text-xs sm:text-sm text-zinc-700">Fully anonymized analytics with role-based access.</p>
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white ring-1 ring-emerald-500 hover:bg-emerald-700 hover:ring-emerald-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95">
                See how it works
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
