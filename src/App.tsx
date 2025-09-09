

import { useEffect } from 'react'
import BackgroundMotifs from './components/BackgroundMotifs'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Journeys from './components/Journeys'
import Impact from './components/Impact'
import CTA from './components/CTA'

function App() {
	useEffect(() => {
		// Safely hydrate Lucide icons after React renders
		(window as Window & { lucide?: { createIcons?: () => void } }).lucide?.createIcons?.()
	}, [])
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
					<CTA />
				</main>
			</div>
		</>
	)
}

export default App
