import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';
import DashboardHeader from './patient/DashboardHeader';
import NextAppointmentCard from './patient/NextAppointmentCard';
import AISuggestionsCard from './patient/AISuggestionsCard';
import CurrentTreatmentCard from './patient/CurrentTreatmentCard';
import SymptomTrackingCard from './patient/SymptomTrackingCard';
import TreatmentTimeline from './patient/TreatmentTimeline';
import ProgressChartCard from './patient/ProgressChartCard';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const todayLabel = useMemo(() => {
    const now = new Date()
    return now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader greetingName={user?.fullName || 'Patient'} todayLabel={todayLabel} />

        <div className="mt-4 grid grid-cols-12 gap-6">
          <aside className="col-span-12 sm:col-span-4 md:col-span-3">
            <NextAppointmentCard title="Abhyanga Therapy" dateLabel="Tomorrow" timeLabel="10:00 AM" location="Wellness Center • Room A2" />
            <div className="mt-4">
              <AISuggestionsCard tips={[
                { icon: 'leaf', text: 'Morning slots are best for your Vata constitution.' },
                { icon: 'cup-soda', text: 'Sip warm water with ginger 20 minutes before therapy.' },
                { icon: 'stretch-horizontal', text: 'Try gentle evening stretches to ease joint stiffness.' }
              ]} />
            </div>
          </aside>

          <section className="col-span-12 sm:col-span-8 md:col-span-9">
            <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm p-5 md:p-6 flex flex-col">
              <div className="grid grid-cols-12 gap-4">
                <CurrentTreatmentCard programName="21-day Panchakarma Program" dayLabel="Day 8 of 21" progressPct={38} startedText="Started 1 week ago" etaText="Estimated completion in 13 days" />
                <SymptomTrackingCard label="Rate your joint stiffness" beforeLabel="Before 8/10" nowValue={4} />
              </div>
              <div className="mt-4 grid grid-cols-12 gap-4">
                <TreatmentTimeline totalDays={21} currentDay={8} />
                <ProgressChartCard labels={["Day 1","Day 3","Day 5","Day 7","Day 9","Day 11","Day 13"]} data={[8,7,6.5,6,5.2,4.6,4]} />
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-end gap-2">
                <button className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition">
                  <i data-lucide="refresh-ccw" className="h-3.5 w-3.5"></i>
                  <span className="font-medium">Sync data</span>
                </button>
                <button className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
                  <span className="font-medium">Update symptoms</span>
                  <i data-lucide="check" className="h-3.5 w-3.5"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
