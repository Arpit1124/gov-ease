import React from 'react';
import { 
  UserCheck, 
  IndianRupee, 
  Activity, 
  Lock, 
  BellRing, 
  Headphones, 
  ShieldAlert, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrustSection: React.FC = () => {
  const { setActiveTab, navigateToLegal } = useApp();

  const trustPillars = [
    {
      title: 'Verified Service Agents',
      description: 'Every independent agent undergoes strict identity, criminal background, and certification credential scrutiny before acceptance.',
      icon: UserCheck
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear itemized breakdown between official government statutory fees, platform charges, and professional agent fees. No surprise bribes or cash demands.',
      icon: IndianRupee
    },
    {
      title: 'Application Tracking',
      description: 'Clear distinction between internal GovEase document vetting and official government department processing stages.',
      icon: Activity
    },
    {
      title: 'Secure Document Handling',
      description: 'Bank-grade 256-bit encryption for stored PDFs and images. Documents are strictly accessible only to authorized assigned agents.',
      icon: Lock
    },
    {
      title: 'Real-Time Notifications',
      description: 'Instant alerts via in-app notification center and SMS on stage progression, missing documents, or certificate issuance.',
      icon: BellRing
    },
    {
      title: 'Dedicated Support',
      description: 'Friendly support team and ticketing helpdesk to answer questions and resolve bottlenecks with municipal offices.',
      icon: Headphones
    }
  ];

  return (
    <section id="trust-section" className="py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Peace of Mind
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Citizens Choose GovEase
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Navigating bureaucratic procedures shouldn't be stressful. We combine independent professional expertise with digital accountability.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                id={`trust-pillar-${idx}`}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 border border-blue-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent Non-Government Disclaimer Card */}
        <div className="mt-12 bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-xl shrink-0 mt-1">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-amber-950">
                Independent Assistance Platform Disclaimer
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed max-w-3xl">
                GovEase is an independent citizen-service assistance platform and is not a government department or official government website. We provide information, document preparation, and verified broker assistance. Final decisions, statutory fees, and certificate issuance rest solely with the relevant competent government authorities.
              </p>
            </div>
          </div>
          <button
            id="btn-trust-view-disclaimer"
            onClick={() => navigateToLegal('disclaimer')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-900 hover:bg-amber-950 text-white transition-colors shrink-0 cursor-pointer shadow"
          >
            Read Full Disclaimer
          </button>
        </div>

        {/* Section 36: Homepage Final CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Trusted by 10,000+ Citizens Nationwide
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Need help with a government service?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mt-3 leading-relaxed">
              Find the right service, understand the requirements, and get assistance from verified independent professionals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="btn-final-cta-explore-services"
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-blue-900 hover:bg-blue-50 transition-all cursor-pointer shadow-lg"
              >
                Explore Services
              </button>
              <button
                id="btn-final-cta-find-agent"
                onClick={() => { setActiveTab('agents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-950/60 hover:bg-blue-950/90 text-white border border-blue-400/40 transition-all cursor-pointer"
              >
                Find an Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
