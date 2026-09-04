import React from 'react';
import { Hero } from './Hero';
import { QuickSearch } from './QuickSearch';
import { PopularServices } from './PopularServices';
import { HowItWorks } from './HowItWorks';
import { TrustSection } from './TrustSection';

export const HomeLanding: React.FC = () => {
  return (
    <div id="home-landing-page" className="w-full">
      <Hero />
      <QuickSearch />
      <PopularServices />
      <HowItWorks />
      <TrustSection />
    </div>
  );
};
