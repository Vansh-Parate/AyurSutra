import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7FAF7]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900">Welcome back, {user?.fullName}</h1>
          <p className="text-zinc-600 mt-2">Track your wellness journey and manage your treatments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Current Treatment */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Current Treatment</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Panchakarma Program</span>
                <span className="text-sm font-medium text-emerald-600">Day 8 of 21</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
              <p className="text-xs text-zinc-500">Next: Abhyanga Therapy - Tomorrow 10:00 AM</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                Book Appointment
              </button>
              <button className="w-full border border-zinc-200 text-zinc-700 py-2 px-4 rounded-lg hover:bg-zinc-50 transition-colors">
                Check Progress
              </button>
              <button className="w-full border border-zinc-200 text-zinc-700 py-2 px-4 rounded-lg hover:bg-zinc-50 transition-colors">
                View Treatment Plan
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-zinc-600">Completed Abhyanga session</span>
                <span className="text-xs text-zinc-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-zinc-600">Progress check-in submitted</span>
                <span className="text-xs text-zinc-400 ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-zinc-600">Appointment scheduled</span>
                <span className="text-xs text-zinc-400 ml-auto">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8 bg-white rounded-xl p-6 ring-1 ring-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">AI Recommendations</h3>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-emerald-900">Personalized Treatment Suggestion</h4>
                <p className="text-sm text-emerald-800 mt-1">
                  Based on your Vata constitution and current progress, we recommend adding Shirodhara therapy to your treatment plan. This will help balance your nervous system and improve sleep quality.
                </p>
                <button className="mt-3 text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                  Learn more →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
