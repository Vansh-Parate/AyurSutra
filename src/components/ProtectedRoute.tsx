import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function getApiBase(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  if (envUrl) return envUrl.replace(/\/$/, '')
  const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
  return `${proto}//localhost:6969`
}
const API_BASE_URL = getApiBase()

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'practitioner' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading, token } = useAuth();
  const location = useLocation();
  const [hasAssessment, setHasAssessment] = useState<boolean | null>(null);
  const [checkingAssessment, setCheckingAssessment] = useState(false);

  // Check if user has completed assessment
  useEffect(() => {
    const checkAssessment = async () => {
      console.log('[ProtectedRoute] checkAssessment start', {
        path: location.pathname,
        isAuthenticated,
        hasToken: !!token
      })
      if (!isAuthenticated || !token || location.pathname !== '/dashboard') {
        setHasAssessment(true);
        setCheckingAssessment(false);
        console.log('[ProtectedRoute] skipping assessment check (not dashboard or unauth). Allowing access.')
        return;
      }

      setCheckingAssessment(true);
      
      // Fallback timeout to prevent infinite loading
      const fallbackTimeout = setTimeout(() => {
        console.log('[ProtectedRoute] fallback timeout triggered - allowing access')
        setHasAssessment(true);
        setCheckingAssessment(false);
      }, 8000); // 8 second fallback

      try {
        console.time('[ProtectedRoute] assessment_latest_request')
        const response = await axios.get(`${API_BASE_URL}/api/v1/assessment/latest`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000 // 5 second timeout
        });
        
        // If user has an assessment, allow dashboard access
        setHasAssessment(!!response.data.assessment);
        console.log('[ProtectedRoute] assessment check success', {
          hasAssessment: !!response.data.assessment,
          assessmentId: response.data.assessment?.id
        })
      } catch (error) {
        console.error('Failed to check assessment:', error);
        // If API fails, allow access (fallback)
        setHasAssessment(true);
        console.log('[ProtectedRoute] API failed, allowing access as fallback')
      } finally {
        clearTimeout(fallbackTimeout);
        console.timeEnd('[ProtectedRoute] assessment_latest_request')
        setCheckingAssessment(false);
        console.log('[ProtectedRoute] checkAssessment end', { checkingAssessment: false })
      }
    };

    checkAssessment();
  }, [isAuthenticated, token, location.pathname]);

  if (loading || checkingAssessment) {
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
          <div className="text-zinc-800 text-lg font-semibold">
            {checkingAssessment ? 'Checking assessment...' : 'Loading...'}
          </div>
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

  // Redirect to assessment if user hasn't completed it and is trying to access dashboard
  if (location.pathname === '/dashboard' && hasAssessment === false) {
    return <Navigate to="/assessment" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
