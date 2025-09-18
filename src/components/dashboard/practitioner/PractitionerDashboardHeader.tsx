import React from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  Menu,
  Calendar,
  Plus
} from 'lucide-react';

interface PractitionerDashboardHeaderProps {
  practitionerName?: string;
  notificationCount?: number;
}

const PractitionerDashboardHeader: React.FC<PractitionerDashboardHeaderProps> = ({
  practitionerName = "Dr. Meera",
  notificationCount = 3
}) => {
  return (
    <>
      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold tracking-tight">AS</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-base font-medium tracking-tight text-slate-900">AyurSutra</p>
                <p className="text-[11px] text-slate-500">Practitioner Dashboard</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button className="inline-flex items-center gap-2 text-slate-900 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1 transition-all duration-200 hover:bg-emerald-50">
                <LayoutDashboard className="h-4 w-4 text-emerald-600" />
                <span className="border-b-2 border-emerald-500 pb-1">Dashboard</span>
              </button>
              <button className="text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1 hover:bg-slate-50">Patients</button>
              <button className="text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1 hover:bg-slate-50">Appointments</button>
              <button className="text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1 hover:bg-slate-50">Reports</button>
              <button className="text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1 hover:bg-slate-50">Profile</button>
            </nav>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <button className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm" aria-label="Notifications">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-white text-[10px] leading-4 text-center animate-pulse">{notificationCount}</span>
              </button>
              <div className="hidden sm:flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 hover:border-slate-300 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=96&auto=format&fit=crop" alt="Practitioner" className="h-8 w-8 rounded-lg object-cover border border-slate-200" />
                <div>
                  <div className="text-sm font-medium tracking-tight text-slate-900">{practitionerName}</div>
                  <div className="text-[11px] text-slate-500">Ayurvedic Practitioner</div>
                </div>
              </div>
              <button className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl tracking-tight font-semibold text-slate-900">Good morning, {practitionerName}</h1>
            <p className="text-sm text-slate-500 mt-1">Here's a calm overview of what needs your attention today.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-sm">
              <Calendar className="h-4 w-4 text-emerald-600" />
              Today
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-3.5 py-2 text-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-lg">
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PractitionerDashboardHeader;
