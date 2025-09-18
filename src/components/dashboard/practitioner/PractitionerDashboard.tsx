import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import BackgroundMotifs from '../../BackgroundMotifs';
import PractitionerDashboardHeader from './PractitionerDashboardHeader';
import TodayScheduleCard from './TodayScheduleCard';
import PatientInsightsCard from './PatientInsightsCard';
import TreatmentProgressCard from './TreatmentProgressCard';
import AlertsNotificationsCard from './AlertsNotificationsCard';

const PractitionerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white text-slate-800 antialiased" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}>
      <BackgroundMotifs />
      
      <PractitionerDashboardHeader practitionerName={user?.fullName || "Dr. Meera"} />

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        {/* Grid: 5 main cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodayScheduleCard />
          <PatientInsightsCard />
          <TreatmentProgressCard />
          <AlertsNotificationsCard />
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500 flex items-center justify-between">
          <p>&copy; 2025 AyurSutra. For clinical use by authorized practitioners.</p>
          <div className="hidden sm:flex items-center gap-4">
            <button className="hover:text-slate-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1">Privacy</button>
            <span className="h-4 w-px bg-slate-200"></span>
            <button className="hover:text-slate-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 rounded-md px-2 py-1">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PractitionerDashboard;
