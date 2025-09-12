import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'practitioner' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAF7]">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-md bg-emerald-600 text-white flex items-center justify-center ring-1 ring-emerald-500/70">
              <span className="text-[12px] font-semibold">AS</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900">AyurSutra</span>
          </div>
          <span className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-6"></span>
          <div className="text-zinc-800 text-lg font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Force assessment before dashboard if not completed
  const isDashboard = location.pathname === '/dashboard'
  const assessmentDone = localStorage.getItem('assessment:completed') === 'true'
  if (isDashboard && !assessmentDone) {
    return <Navigate to="/assessment" replace />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
