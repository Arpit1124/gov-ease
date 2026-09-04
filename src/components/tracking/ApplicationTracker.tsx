import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  User, 
  MessageSquare, 
  Download, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  Calendar, 
  ArrowRight,
  Printer,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';

export const ApplicationTracker: React.FC = () => {
  const { 
    applications, 
    trackingQuery, 
    setTrackingQuery, 
    setActiveChatApplicationId, 
    addReview, 
    showToast,
    navigateToService
  } = useApp();

  const [inputQuery, setInputQuery] = useState(trackingQuery || 'GE-2026-001245');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    if (trackingQuery) {
      setInputQuery(trackingQuery);
    }
  }, [trackingQuery]);

  // Find matching application
  const currentApp = applications.find(
    a => a.id.toLowerCase() === inputQuery.trim().toLowerCase() ||
         a.userPhone === inputQuery.trim()
  ) || applications[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = applications.find(
      a => a.id.toLowerCase() === inputQuery.trim().toLowerCase() ||
           a.userPhone === inputQuery.trim()
    );
    if (!found) {
      showToast('No application matching that ID or phone number. Showing demo case GE-2026-001245.', 'info');
      setInputQuery('GE-2026-001245');
    } else {
      setTrackingQuery(inputQuery.trim());
      showToast(`Found case: ${found.serviceName}`, 'success');
    }
  };

  const handleDownloadDoc = (docName: string) => {
    showToast(`Downloading secure digital copy of ${docName}...`, 'success');
  };

  const submitAgentReview = () => {
    if (!reviewComment) {
      showToast('Please enter a brief review comment', 'error');
      return;
    }
    addReview({
      agentId: currentApp.agentId,
      applicationId: currentApp.id,
      serviceName: currentApp.serviceName,
      rating: reviewRating,
      review: reviewComment
    });
    setReviewModalOpen(false);
    setReviewComment('');
  };

  return (
    <div id="application-tracking-page" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Status & Lifecycle Monitoring
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Application Status
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Transparently track your application through both internal document verification stages and official state government processing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-tracking-id"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter Application ID (e.g. GE-2026-001245) or 10-digit registered phone..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900 font-medium font-mono"
              />
            </div>
            <button
              id="btn-submit-track-search"
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <span>Track Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold">Quick Demo Cases:</span>
            {applications.slice(0, 3).map(app => (
              <button
                key={app.id}
                type="button"
                onClick={() => { setInputQuery(app.id); setTrackingQuery(app.id); }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-mono text-[11px] cursor-pointer"
              >
                {app.id} ({app.serviceName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Application Overview Card */}
        {currentApp && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Timeline & Status Progression */}
            <div className="lg:col-span-8 space-y-6">
              {/* Primary Case Banner */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                        {currentApp.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Submitted on {currentApp.submittedAt}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {currentApp.serviceName}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Applicant: <strong className="text-slate-700">{currentApp.userName}</strong> • Mobile: {currentApp.userPhone}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className="text-right sm:self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      {currentApp.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Government Token Number Alert if present */}
                {currentApp.governmentApplicationNumber && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start justify-between gap-3 text-xs text-emerald-950">
                    <div>
                      <span className="font-bold block uppercase tracking-wider text-[10px] text-emerald-800">
                        Official Government Portal Token
                      </span>
                      <div className="font-mono text-sm font-black text-emerald-900 mt-0.5">
                        {currentApp.governmentApplicationNumber}
                      </div>
                      <p className="text-[11px] text-emerald-800 mt-1">
                        Application officially indexed on State e-District portal. Official inquiry officer assigned.
                      </p>
                    </div>
                    <a
                      href="https://serviceonline.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors shrink-0 flex items-center gap-1"
                    >
                      <span>State Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {/* Important Distinction Guide Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
                    <span className="font-bold text-blue-900 flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Phase 1: GovEase Assistance
                    </span>
                    <p className="text-blue-800/80 leading-relaxed text-[11px]">
                      Document review, legal affidavit formatting, notary verification, and application readiness.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs">
                    <span className="font-bold text-indigo-900 flex items-center gap-1 mb-1">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      Phase 2: Government Processing
                    </span>
                    <p className="text-indigo-800/80 leading-relaxed text-[11px]">
                      Tehsildar review, field officer inquiry, and final digital signature certificate generation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete 8-Step Timeline */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Application Lifecycle Milestones</h3>
                  <span className="text-xs text-slate-500">
                    Est. Completion: <strong className="text-slate-700">{currentApp.estimatedCompletionDate || '7-10 days'}</strong>
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
                  {currentApp.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Milestone Icon */}
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 relative z-10 shadow-sm ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : step.current
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : step.stepIndex}
                      </div>

                      {/* Step Details Card */}
                      <div className={`flex-1 p-4 rounded-xl border transition-all ${
                        step.current 
                          ? 'bg-blue-50/50 border-blue-300 shadow-sm' 
                          : step.completed 
                          ? 'bg-slate-50 border-slate-200' 
                          : 'bg-white border-slate-100 opacity-60'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{step.stageName}</h4>
                            <span className={`text-[10px] px-2 py-0.2 rounded font-semibold ${
                              step.category === 'GovEase Processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {step.category}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-500 font-medium">
                            {step.date !== 'Pending' ? `${step.date} (${step.time})` : 'Pending'}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>

                        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          <span>Responsible Authority: <strong className="text-slate-600">{step.responsibleParty}</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Assigned Agent, Escrow & Documents */}
            <div className="lg:col-span-4 space-y-6">
              {/* Assigned Agent Card */}
              {currentApp.agentName ? (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Assigned Documentation Specialist
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                      alt={currentApp.agentName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{currentApp.agentName}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        ✓ Verified Agent
                      </span>
                      <p className="text-xs text-slate-500 mt-1">Pune & Haveli Division Specialist</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      id="btn-track-message-agent"
                      onClick={() => setActiveChatApplicationId(currentApp.id)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Message Agent</span>
                    </button>
                    <button
                      id="btn-track-rate-agent"
                      onClick={() => setReviewModalOpen(true)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Rate agent"
                    >
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>Rate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2 text-center">
                  <User className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">Self-Service Application</h4>
                  <p className="text-xs text-slate-500">
                    This request is logged under Self-Service direct portal assistance.
                  </p>
                </div>
              )}

              {/* Secure Download Center */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Download Documents
                  </h4>
                  <span className="text-[10px] text-slate-400">Encrypted Storage</span>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => handleDownloadDoc('Application Summary Sheet')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Application Summary Sheet</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleDownloadDoc('Escrow Payment Receipt')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Escrow Payment Tax Receipt</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                  </button>

                  {/* Certificate download when ready */}
                  {currentApp.certificateDownloadUrl ? (
                    <button
                      onClick={() => handleDownloadDoc('Official Digitally Signed Certificate')}
                      className="w-full p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-between text-xs font-bold cursor-pointer shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Download Official Certificate</span>
                      </div>
                      <Download className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center">
                      Official Certificate PDF will unlock once issued by the revenue officer.
                    </div>
                  )}
                </div>
              </div>

              {/* Escrow Status Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Escrow Balance</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">● Funds Protected</span>
                </div>
                <div className="text-2xl font-black font-mono">₹{currentApp.totalPaid}</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your funds remain safely held in GovEase escrow. The agent fee is only disbursed after your verification milestones are achieved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review Agent Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <h3 className="text-lg font-bold text-slate-900">
                Rate Agent: {currentApp?.agentName}
              </h3>
              <p className="text-xs text-slate-500">
                Your feedback helps maintain high service standards across the GovEase marketplace.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star 
                        className={`w-7 h-7 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{reviewRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review & Comments</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How was the agent's communication, document clarity, and speed?"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-600 text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitAgentReview}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
