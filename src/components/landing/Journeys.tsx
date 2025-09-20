import React from 'react';
import { User, Stethoscope, Settings, Bell, Calendar, Search, SlidersHorizontal, Download, Smile } from 'lucide-react';

const Journeys: React.FC = () => {
  const journeys = [
    {
      role: 'Patient',
      icon: User,
      platform: 'Mobile',
      description: 'Simple check-ins, reminders, and personalized recommendations keep patients engaged.',
      mockContent: (
        <div className="rounded-lg border border-zinc-200 overflow-hidden">
          <div className="flex items-center justify-between bg-zinc-50 px-3 py-2 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" alt="Patient avatar" className="h-6 w-6 rounded-full object-cover" />
              <span className="text-xs font-medium text-zinc-800">Namaste, Asha</span>
            </div>
            <Bell className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="p-3">
            <div className="rounded-md bg-emerald-50 ring-1 ring-emerald-100 px-3 py-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-700">
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>
                </svg>
                <span className="text-[12px] text-emerald-900">Suggested: Cooling diet + Shirodhara</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="rounded-md border border-zinc-200 px-3 py-2 text-[12px] text-zinc-700 hover:border-emerald-200 hover:text-emerald-800 transition-all duration-200 cursor-pointer">
                Book session
              </button>
              <button className="rounded-md bg-emerald-600 text-white px-3 py-2 text-[12px] hover:bg-emerald-700 transition-all duration-200 cursor-pointer">
                Check-in
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      role: 'Practitioner',
      icon: Stethoscope,
      platform: 'Tablet',
      description: 'A calm, focused workspace that reduces clicks and decision fatigue.',
      mockContent: (
        <div className="rounded-lg border border-zinc-200 overflow-hidden">
          <div className="flex items-center justify-between bg-zinc-50 px-3 py-2 border-b border-zinc-200">
            <span className="text-xs font-medium text-zinc-800">Today</span>
            <div className="flex items-center gap-2 text-zinc-500">
              <Calendar className="h-4 w-4" />
              <Search className="h-4 w-4" />
            </div>
          </div>
          <div className="p-3 grid grid-cols-3 gap-2">
            <div className="col-span-2 rounded-md ring-1 ring-zinc-200 p-2">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] text-zinc-700">Queue</span>
                <span className="text-[11px] text-emerald-700">3 waiting</span>
              </div>
              <ul className="mt-1 space-y-1">
                <li className="flex items-center justify-between text-[11.5px]">
                  <span className="text-zinc-700">Asha</span><span className="text-zinc-500">09:00</span>
                </li>
                <li className="flex items-center justify-between text-[11.5px]">
                  <span className="text-zinc-700">Raj</span><span className="text-zinc-500">09:45</span>
                </li>
                <li className="flex items-center justify-between text-[11.5px]">
                  <span className="text-zinc-700">Meera</span><span className="text-zinc-500">10:15</span>
                </li>
              </ul>
            </div>
            <div className="rounded-md ring-1 ring-zinc-200 p-2">
              <span className="text-[11.5px] text-zinc-700">AI Notes</span>
              <p className="mt-1 text-[11px] text-zinc-600 leading-5">Consider Pitta-pacifying herbs; monitor HRV.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      role: 'Admin',
      icon: Settings,
      platform: 'Desktop',
      description: 'Insights and controls to keep operations smooth and transparent.',
      mockContent: (
        <div className="rounded-lg border border-zinc-200 overflow-hidden">
          <div className="flex items-center justify-between bg-zinc-50 px-3 py-2 border-b border-zinc-200">
            <span className="text-xs font-medium text-zinc-800">Overview</span>
            <div className="flex items-center gap-2 text-zinc-500">
              <SlidersHorizontal className="h-4 w-4" />
              <Download className="h-4 w-4" />
            </div>
          </div>
          <div className="p-3 grid grid-cols-3 gap-2">
            <div className="rounded-md ring-1 ring-zinc-200 p-2">
              <span className="text-[11.5px] text-zinc-700">Utilization</span>
              <div className="mt-2 h-2 w-full rounded bg-zinc-100">
                <div className="h-2 w-4/5 rounded bg-emerald-500"></div>
              </div>
              <span className="mt-1 block text-[11px] text-zinc-500">80%</span>
            </div>
            <div className="rounded-md ring-1 ring-zinc-200 p-2">
              <span className="text-[11.5px] text-zinc-700">Wait time</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-[13px] font-semibold text-emerald-700">−32%</span>
                <span className="text-[11px] text-zinc-500">MoM</span>
              </div>
            </div>
            <div className="rounded-md ring-1 ring-zinc-200 p-2">
              <span className="text-[11.5px] text-zinc-700">Satisfaction</span>
              <div className="mt-2 flex items-center gap-1 text-emerald-700">
                <Smile className="h-4 w-4" />
                <span className="text-[13px] font-semibold">4.7/5</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="journeys" className="relative mt-14 sm:mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">User journeys</h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {journeys.map((journey) => {
            const IconComponent = journey.icon;
            return (
              <div key={journey.role} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 hover:ring-emerald-200 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center ring-1 ring-emerald-200">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h3 className="text-[15.5px] font-semibold tracking-tight text-zinc-900">{journey.role}</h3>
                  </div>
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 ring-1 ring-emerald-100 px-2 py-1 rounded-full">{journey.platform}</span>
                </div>
                {journey.mockContent}
                <p className="mt-3 text-sm text-zinc-600">
                  {journey.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Journeys;
