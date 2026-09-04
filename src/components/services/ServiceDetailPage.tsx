import React, { useState } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  HelpCircle, 
  ArrowRight,
  Share2,
  Printer,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ServiceDetailPage: React.FC = () => {
  const { 
    selectedServiceId, 
    services, 
    setActiveTab, 
    navigateToApply, 
    setSelectedAgentId,
    showToast,
    setIsAiChatOpen
  } = useApp();

  const [activeTabSection, setActiveTabSection] = useState<'overview' | 'documents' | 'process' | 'rejections' | 'faq'>('overview');

  const service = services.find(s => s.id === selectedServiceId) || services[0];

  if (!service) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Service not found.</p>
        <button onClick={() => setActiveTab('services')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Back to Directory
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Service link copied to clipboard!', 'info');
  };

  return (
    <div id="service-detail-page" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="btn-back-to-directory"
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-share-service"
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-medium"
              title="Share service"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              id="btn-print-checklist"
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-medium"
              title="Print checklist"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Checklist</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  {service.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {service.stateAvailability}
                </span>
                {service.isPopular && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> High Demand
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {service.name}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Issuing Authority: <strong className="text-slate-800">{service.issuingAuthority}</strong></span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                {service.description}
              </p>
            </div>

            {/* Quick Action Side Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 w-full lg:w-80 shrink-0 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Official Govt Fee:</span>
                  <span className="font-bold text-slate-900">
                    {service.isGovernmentFeeFree ? 'Free (₹0)' : `₹${service.governmentFee}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Agent Assistance Escrow:</span>
                  <span className="font-bold text-blue-600">₹{service.agentAssistanceFee}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Platform Convenience:</span>
                  <span className="font-medium text-slate-700">₹{service.platformFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Est. Total:</span>
                  <span className="text-sm text-slate-900">
                    ₹{service.governmentFee + service.agentAssistanceFee + service.platformFee}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  id="btn-apply-for-assistance-main"
                  onClick={() => navigateToApply(service.id)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="btn-find-agent-for-service"
                  onClick={() => {
                    setActiveTab('agents');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Find an Agent for this Service</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 text-center">
                <a
                  id="btn-official-portal-outbound"
                  href={service.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  <span>Official Government Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] text-slate-400 mt-1">Direct state submission without broker</p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Timeline</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-blue-600" />
                {service.estimatedProcessingTime}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Validity</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {service.validityPeriod}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Required Documents</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                <FileText className="w-4 h-4 text-indigo-600" />
                {service.requiredDocuments.length} Verified Docs
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Processing Mode</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                <Building2 className="w-4 h-4 text-amber-600" />
                {service.processingMode}
              </span>
            </div>
          </div>
        </div>

        {/* Detail Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-sm overflow-x-auto">
          {[
            { id: 'overview', label: 'Purpose & Eligibility' },
            { id: 'documents', label: `Required Documents (${service.requiredDocuments.length})` },
            { id: 'process', label: 'Step-by-Step Process' },
            { id: 'rejections', label: 'Common Rejection Reasons' },
            { id: 'faq', label: 'Frequently Asked Questions' }
          ].map(tab => (
            <button
              key={tab.id}
              id={`tab-service-detail-${tab.id}`}
              onClick={() => setActiveTabSection(tab.id as any)}
              className={`py-4 px-4 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 cursor-pointer transition-colors ${
                activeTabSection === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Eligibility */}
        {activeTabSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Purpose of the Certificate
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.purpose}
              </p>
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
                <strong className="block font-bold">Standard Use Cases:</strong>
                <p>• College/university fee concessions and scholarship schemes</p>
                <p>• Subsidized housing or ration card family inclusion</p>
                <p>• Government competitive examinations and quota verification</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {service.eligibility.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Required Documents Checklist */}
        {activeTabSection === 'documents' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Required Documents Checklist</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Ensure documents are clear scans in PDF/JPG format (max 5MB each). Original documents will need to be produced if summoned for physical verification.
                </p>
              </div>
              <button
                onClick={() => setIsAiChatOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Ask AI to check my documents</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.requiredDocuments.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${doc.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'}`}>
                        {doc.isMandatory ? 'Mandatory' : 'Optional / If Applicable'}
                      </span>
                      <span className="text-[10px] text-slate-400">PDF, JPG, PNG &lt; 5MB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Step-by-Step Application Process */}
        {activeTabSection === 'process' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Step-by-Step Application Roadmap</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {service.applicationSteps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 relative z-10 shadow">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900">Step {idx + 1}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Common Rejection Reasons */}
        {activeTabSection === 'rejections' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">Common Application Rejection Reasons</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on historical data from state revenue portals, over 38% of applications are rejected due to minor administrative oversights. Review these points to ensure your application passes first time:
            </p>

            <div className="space-y-3">
              {service.commonRejectionReasons.map((reason, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-rose-950">{reason}</h4>
                    <p className="text-xs text-rose-800/80 mt-0.5">
                      Ensure your uploaded scan is high-resolution with clear stamps and valid dates.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: FAQs */}
        {activeTabSection === 'faq' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Dual Path Card: Self-Service vs Agent Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Path 1: Self-Service Direct */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                Self-Service / Free
              </span>
              <h3 className="text-lg font-bold text-slate-900">Direct Official Portal Submission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you are confident filling out state forms, have all notarized affidavits ready, and possess an active Aadhaar OTP, you can file directly on the government portal at statutory cost.
              </p>
            </div>
            <a
              id="btn-self-service-official-portal"
              href={service.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Go to Official {service.issuingAuthority} Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Path 2: GovEase Assisted */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Assisted & Escrow Protected
              </span>
              <h3 className="text-lg font-bold text-white">Full Service Professional Brokerage</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Have a verified local document specialist review your paperwork, draft legal declarations, coordinate jurisdiction filings, and monitor official state dispatch.
              </p>
            </div>
            <button
              id="btn-bottom-apply-assisted"
              onClick={() => navigateToApply(service.id)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-400 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Apply with Verified Agent Assistance (₹{service.agentAssistanceFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
