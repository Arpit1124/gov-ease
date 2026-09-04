import React from 'react';
import { Search, ClipboardCheck, UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setActiveTab } = useApp();

  const steps = [
    {
      stepNumber: '01',
      title: 'Select Service',
      description: 'Choose the certificate or government service you require from our catalog of 15+ central and state schemes.',
      icon: Search,
      highlight: 'Direct or search-guided'
    },
    {
      stepNumber: '02',
      title: 'Check Requirements',
      description: 'Review eligibility rules, required document checklists, government statutory fees, and realistic processing times.',
      icon: ClipboardCheck,
      highlight: 'Zero hidden clauses'
    },
    {
      stepNumber: '03',
      title: 'Submit Request',
      description: 'Upload required documents with instant GovEase AI pre-check for readability, choose an agent, and authorize escrow.',
      icon: UploadCloud,
      highlight: 'End-to-end encryption'
    },
    {
      stepNumber: '04',
      title: 'Track Progress',
      description: 'Monitor real-time progress through distinct internal assistance and official state portal tracking stages.',
      icon: CheckCircle2,
      highlight: 'SMS & in-app alerts'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Simple, Transparent, Accountable
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How GovEase Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Eliminate tedious queueing, ambiguous clerk inquiries, and document rejections. Our 4-step assistance workflow keeps you in full control.
          </p>
        </div>

        {/* 4-step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                id={`how-it-works-step-${step.stepNumber}`}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                {/* Step indicator tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors font-mono">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Micro highlight tag */}
                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
                    ✓ {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-12 text-center">
          <button
            id="btn-how-it-works-cta"
            onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
          >
            <span>Start an Assistance Request Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
