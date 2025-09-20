import React from 'react';
import Header from '../landing/Header';

const AdminDashboard: React.FC = () => {

  return (
    <div className="min-h-screen bg-[#F7FAF7]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900">Admin Dashboard</h1>
          <p className="text-zinc-600 mt-2">Monitor clinic operations and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Total Patients</p>
                <p className="text-2xl font-semibold text-zinc-900">1,247</p>
                <p className="text-sm text-emerald-600">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Revenue</p>
                <p className="text-2xl font-semibold text-zinc-900">₹2.4M</p>
                <p className="text-sm text-emerald-600">+18% this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Avg. Wait Time</p>
                <p className="text-2xl font-semibold text-zinc-900">8 min</p>
                <p className="text-sm text-emerald-600">-40% improvement</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600">Satisfaction</p>
                <p className="text-2xl font-semibold text-zinc-900">4.7/5</p>
                <p className="text-sm text-emerald-600">+0.3 this month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Resource Utilization */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Resource Utilization</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Treatment Rooms</span>
                  <span className="text-sm font-medium text-zinc-900">85%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Practitioners</span>
                  <span className="text-sm font-medium text-zinc-900">92%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-600">Equipment</span>
                  <span className="text-sm font-medium text-zinc-900">78%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">New patient registered</p>
                  <p className="text-xs text-zinc-600">Priya Sharma - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">Treatment completed</p>
                  <p className="text-xs text-zinc-600">Abhyanga session - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">Appointment scheduled</p>
                  <p className="text-xs text-zinc-600">Raj Kumar - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">Payment received</p>
                  <p className="text-xs text-zinc-600">₹2,500 - 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analytics */}
        <div className="mt-8 bg-white rounded-xl p-6 ring-1 ring-zinc-200">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">AI-Powered Insights</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-medium text-emerald-900 mb-2">Efficiency Optimization</h4>
              <p className="text-sm text-emerald-800">
                AI scheduling has improved resource utilization by 28% and reduced patient wait times by 40%.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Treatment Success</h4>
              <p className="text-sm text-blue-800">
                Personalized treatment plans show 35% better patient outcomes compared to standard protocols.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Predictive Analytics</h4>
              <p className="text-sm text-purple-800">
                Early intervention alerts have prevented 12 potential complications this month.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
