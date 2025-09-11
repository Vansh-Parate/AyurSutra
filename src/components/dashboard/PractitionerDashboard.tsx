import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';

const PractitionerDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7FAF7]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900">Good morning, Dr. {user?.fullName}</h1>
          <p className="text-zinc-600 mt-2">Manage your schedule and patient care efficiently</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="font-medium text-zinc-900">Asha Patel</p>
                  <p className="text-sm text-zinc-600">Abhyanga Therapy</p>
                </div>
                <span className="text-sm font-medium text-emerald-600">09:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                <div>
                  <p className="font-medium text-zinc-900">Raj Kumar</p>
                  <p className="text-sm text-zinc-600">Consultation</p>
                </div>
                <span className="text-sm font-medium text-zinc-600">10:30 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                <div>
                  <p className="font-medium text-zinc-900">Meera Singh</p>
                  <p className="text-sm text-zinc-600">Shirodhara</p>
                </div>
                <span className="text-sm font-medium text-zinc-600">02:00 PM</span>
              </div>
            </div>
          </div>

          {/* Patient Queue */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Patient Queue</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg bg-emerald-50">
                <div>
                  <p className="font-medium text-zinc-900">3 patients waiting</p>
                  <p className="text-sm text-zinc-600">Average wait: 8 minutes</p>
                </div>
                <span className="text-sm font-medium text-emerald-600">Active</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Next: Priya Sharma</span>
                  <span className="text-zinc-400">Room 2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Then: Vikram Joshi</span>
                  <span className="text-zinc-400">Room 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Today's Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Patients seen</span>
                <span className="text-lg font-semibold text-emerald-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Treatments completed</span>
                <span className="text-lg font-semibold text-emerald-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Avg. session time</span>
                <span className="text-lg font-semibold text-emerald-600">45 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-white rounded-xl p-6 ring-1 ring-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">AI Clinical Insights</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Treatment Effectiveness</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your Abhyanga treatments show 23% better outcomes this month. Consider extending session duration for Vata patients.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-purple-900">Schedule Optimization</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    Moving consultation slots to afternoon could reduce patient wait times by 15 minutes on average.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PractitionerDashboard;
