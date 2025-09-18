import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TopNav from './DashboardHeader';
import DashboardHeader from './patient/DashboardHeader';
import NextAppointmentCard from './patient/NextAppointmentCard';
import AISuggestionsCard from './patient/AISuggestionsCard';
import CurrentTreatmentCard from './patient/CurrentTreatmentCard';
import SymptomTrackingCard from './patient/SymptomTrackingCard';
import TreatmentTimeline from './patient/TreatmentTimeline';
import ProgressChartCard from './patient/ProgressChartCard';
import ChatWidget from '../ChatWidget';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const todayLabel = useMemo(() => {
    const now = new Date()
    return now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
  }, [])

  function getApiBase(): string {
    const envUrl = (import.meta.env.VITE_API_URL as string) || ''
    if (envUrl) return envUrl.replace(/\/$/, '')
    const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
    return `${proto}//localhost:6969`
  }
  const API_BASE_URL = getApiBase()

  const { token } = useAuth()

  const [tips, setTips] = useState<{ icon: string; text: string }[]>([])
  const [genLoading, setGenLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  async function generateTips() {
    try {
      setGenLoading(true)
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(`${API_BASE_URL}/api/v1/ai/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ topic: 'ayurveda daily suggestions', persona: 'patient vata' }),
        signal: controller.signal
      }).finally(() => clearTimeout(timer))
      if (!res.ok) throw new Error('Failed to generate suggestions')
      const data = await res.json()
      const next: { icon: string; text: string }[] = (data.tips || []).slice(0, 4).map((t: string) => ({ icon: 'sparkles', text: t }))
      if (next.length) setTips(next)
    } catch (error: unknown) {
      const err = error as { name?: string } | undefined
      if (err?.name === 'AbortError') {
        console.warn('AI suggestions request timed out; showing defaults')
      } else {
        console.error('Failed to generate AI suggestions:', error)
      }
      // Fallback to default tips if API fails
      setTips([
        { icon: 'leaf', text: 'Morning slots are best for your Vata constitution.' },
        { icon: 'cup-soda', text: 'Sip warm water with ginger 20 minutes before therapy.' },
        { icon: 'stretch-horizontal', text: 'Try gentle evening stretches to ease joint stiffness.' }
      ])
    } finally {
      setGenLoading(false)
    }
  }

  // Load initial tips on component mount
  React.useEffect(() => {
    generateTips().finally(() => setInitialLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white">
      <TopNav userName={user?.fullName} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 grid grid-cols-12 gap-3">
          <div className="col-span-12 rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 text-[13px]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-orange-500" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
              <span className="font-medium">Daily streak: 3</span>
              <span className="mx-2 h-1 w-1 rounded-full bg-emerald-400"></span>
              <span>Next reward in 2 check-ins</span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
              Claim
            </button>
          </div>
        </div>
        <DashboardHeader greetingName={user?.fullName || 'Patient'} todayLabel={todayLabel} />

        <div className="mt-4 grid grid-cols-12 gap-6">
          <aside className="col-span-12 sm:col-span-4 md:col-span-3">
            <NextAppointmentCard title="Abhyanga Therapy" dateLabel="Tomorrow" timeLabel="10:00 AM" location="Wellness Center • Room A2" />
            <div className="mt-4">
              <AISuggestionsCard tips={tips} loading={genLoading} onGenerate={generateTips} initialLoading={initialLoading} />
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
                <button className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3v6h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Sync data</span>
                </button>
                <button className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-lg">
                  <span className="font-medium">Update symptoms</span>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
};

export default PatientDashboard;

