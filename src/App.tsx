

import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import BackgroundMotifs from './components/BackgroundMotifs'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Journeys from './components/Journeys'
import Impact from './components/Impact'
import Cta from './components/CTA'
import ProtectedRoute from './components/ProtectedRoute'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import GoogleSuccess from './auth/GoogleSuccess'
import PatientDashboard from './components/dashboard/PatientDashboard'
import PractitionerDashboard from './components/dashboard/practitioner/PractitionerDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'
import AssessmentPage from './components/assessment/AssessmentPage'
import AssessmentSummaryPage from './components/assessment/AssessmentSummaryPage.tsx'

function LandingPage() {
	return (
		<>
			<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-sm focus:ring-1 focus:ring-emerald-400">Skip to content</a>
			<BackgroundMotifs />
			<div>
				<Header />
				<main id="main">
					<Hero />
					<Features />
					<Journeys />
					<Impact />
                    <Cta />
				</main>
			</div>
		</>
	)
}

function Dashboard() {
	const { user } = useAuth()
	
	// Convert role to lowercase for comparison since backend stores in uppercase
	const userRole = user?.role?.toLowerCase()
	
	if (userRole === 'patient') {
		return <PatientDashboard />
	} else if (userRole === 'practitioner') {
		return <PractitionerDashboard />
	} else if (userRole === 'admin') {
		return <AdminDashboard />
	}
	
	return <Navigate to="/" replace />
}

function App() {
	useEffect(() => {
		// Safely hydrate Lucide icons after React renders
		(window as Window & { lucide?: { createIcons?: () => void } }).lucide?.createIcons?.()
	}, [])
	
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/auth/signin" element={<Signin />} />
					<Route path="/auth/signup" element={<Signup />} />
					<Route path="/auth/google-success" element={<GoogleSuccess />} />
                    <Route 
                        path="/assessment"
                        element={
                            <ProtectedRoute requiredRole={'patient'}>
                                <AssessmentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/assessment/summary"
                        element={
                            <ProtectedRoute requiredRole={'patient'}>
                                <AssessmentSummaryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
