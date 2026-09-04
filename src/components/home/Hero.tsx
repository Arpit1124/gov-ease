import React from 'react';
import { 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  Sparkles, 
  Users, 
  FileText,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { setActiveTab, navigateToTrack } = useApp();

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Independent Citizen Service & Brokerage Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Government Services, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Find certificates, understand requirements, submit service requests, and get assistance from verified professionals — all from one platform.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="btn-hero-explore-services"
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Government Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-track-application"
                onClick={() => navigateToTrack('GE-2026-001245')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Track Application</span>
              </button>
            </div>

            {/* Micro value badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-slate-800/80 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Verified Agents</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">15+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Certificate Types</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">₹0</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Hidden Charges</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity Digital GovTech Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer interactive card frame */}
              <div 
                id="hero-interactive-case-preview"
                onClick={() => navigateToTrack('GE-2026-001245')}
                className="bg-slate-900/90 rounded-2xl border border-slate-700/80 hover:border-blue-500/80 shadow-2xl p-5 backdrop-blur-xl space-y-4 cursor-pointer transition-all hover:scale-[1.01] group"
                title="Click to track live demo application GE-2026-001245"
              >
                {/* Header bar of card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase group-hover:text-blue-400 transition-colors">
                      Live Case Dashboard • Click to Track
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 flex items-center gap-1">
                    <span>ID: GE-2026-001245</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>

                {/* Primary Certificate Item */}
                <div className="bg-slate-850/80 rounded-xl p-3.5 border border-slate-750 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Income Certificate</h4>
                      <p className="text-xs text-slate-400">Revenue & Tehsil Jurisdiction • Maharashtra</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Documents Under Review
                    </span>
                  </div>

                  {/* Visual Stepper preview */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                      <span className="text-emerald-400 font-semibold">Docs Verified</span>
                      <span className="text-amber-400 font-semibold">e-District Filing</span>
                      <span>Ready</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 h-2 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>

                {/* Verified Agent Card preview */}
                <div className="bg-slate-850/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Assigned Agent"
                      className="w-10 h-10 rounded-full object-cover border border-blue-500/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Raj Kumar</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700 font-medium">
                          ✓ Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Assigned Document Professional</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-400">★ 4.85</div>
                    <div className="text-[10px] text-slate-500">1,245 cases</div>
                  </div>
                </div>

                {/* AI Document Pre-check pill */}
                <div className="bg-blue-950/40 rounded-xl p-3 border border-blue-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-xs font-semibold text-blue-200">AI Pre-Check Score</div>
                      <div className="text-[10px] text-slate-400">Readability & Completeness Verified</div>
                    </div>
                  </div>
                  <span className="text-sm font-black text-blue-300">96 / 100</span>
                </div>

                {/* Clear distinction note */}
                <div className="text-[10px] text-slate-500 text-center italic pt-1">
                  *GovEase internal assistance phase. Official submission to state portal next.
                </div>
              </div>

              {/* Floating highlight badge */}
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold flex items-center gap-1.5 border border-blue-400/40">
                <FileCheck2 className="w-4 h-4" />
                <span>Zero Bribery & Pure Transparency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
