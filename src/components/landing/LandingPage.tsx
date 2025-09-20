import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Journeys from './Journeys';
import Impact from './Impact';
import Cta from './CTA';
import Footer from './Footer';
import BackgroundMotifs from '../BackgroundMotifs';
import Assessment from './Assessment';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FAF7] text-zinc-800 antialiased selection:bg-emerald-200/60 selection:text-emerald-900" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-sm focus:ring-1 focus:ring-emerald-400">
        Skip to content
      </a>

      {/* Background motifs */}
      <BackgroundMotifs />
      
      {/* Header */}
      <Header />

      {/* Main content */}
      <main id="main">
        <Hero />
        <Features />
        <Assessment />
        <Journeys />
        <Impact />
        <Cta />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
