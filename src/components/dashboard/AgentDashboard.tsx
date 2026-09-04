import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Eye, 
  Upload, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';

export const AgentDashboard: React.FC = () => {
  const { 
    currentUser, 
    applications, 
    updateApplicationStatus, 
    setActiveChatApplicationId,
    showToast 
  } = useApp();

  // Find cases assigned to this agent (or show all in demo if matches or fallback)
  const agentApps = applications.filter(a => a.agentId === currentUser.id || currentUser.role === 'AGENT');
  
  const [selectedAppForReview, setSelectedAppForReview] = useState<Application | null>(agentApps[0] || null);
  const [govtTokenInput, setGovtTokenInput] = useState('MH/REV/2026/091244');
  const [statusNote, setStatusNote] = useState('');

  // Metrics
  const activeCases = agentApps.filter(a => a.status !== 'COMPLETED' && a.status !== 'REJECTED');
  const pendingDocReviews = agentApps.filter(a => a.status === 'DOCUMENTS_SUBMITTED');
  const completedCases = agentApps.filter(a => a.status === 'COMPLETED');
  const totalEarned = agentApps.filter(a => a.status === 'COMPLETED').reduce((acc, a) => acc + a.agentFee, 0);

  const handleAdvanceStatus = (newStatus: ApplicationStatus) => {
    if (!selectedAppForReview) return;
    
    updateApplicationStatus(selectedAppForReview.id, newStatus, statusNote || undefined);
    
    // Update local selected state
    setSelectedAppForReview(prev => prev ? ({
      ...prev,
      status: newStatus,
      governmentApplicationNumber: newStatus === 'OFFICIAL_SUBMITTED' ? govtTokenInput : prev.governmentApplicationNumber
    }) : null);

    setStatusNote('');
  };

  const handleRequestExtraDoc = () => {
    if (!selectedAppForReview) return;
    setActiveChatApplicationId(selectedAppForReview.id);
    showToast(`Opening client chat to request additional documentation for ${selectedAppForReview.id}`, 'info');
  };

  return (
    <div id="agent-portal-dashboard" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Agent Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full text-white ring-2 ring-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700 font-mono">
                  GovEase Verified Professional
                </span>
                <span className="text-xs text-slate-400">Agent ID: AGT-PUN-082</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                {currentUser.name} • Workspace
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Pune & Haveli Revenue Jurisdiction • Notary & Document Facilitator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Escrow Earnings</span>
              <div className="text-xl font-mono font-black text-emerald-400">₹{totalEarned + 18400}</div>
            </div>
          </div>
        </div>

        {/* 4 Agent KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Assigned</span>
            <div className="text-2xl font-black text-slate-900">{activeCases.length}</div>
            <p className="text-[11px] text-blue-600 font-medium">In client preparation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Doc Review</span>
            <div className="text-2xl font-black text-amber-600">{pendingDocReviews.length}</div>
            <p className="text-[11px] text-amber-700 font-medium">Requires initial check</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Cases</span>
            <div className="text-2xl font-black text-emerald-600">{completedCases.length + 1240}</div>
            <p className="text-[11px] text-emerald-700 font-medium">99.4% approval success</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rating Score</span>
            <div className="text-2xl font-black text-amber-500">4.85 ★</div>
            <p className="text-[11px] text-slate-500 font-medium">From 142 citizen reviews</p>
          </div>
        </div>

        {/* Workspace: Left Queue, Right Review Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5 Cols: Assigned Cases Queue */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Client Applications Queue</h2>
              <span className="text-xs text-slate-500 font-medium">{agentApps.length} cases</span>
            </div>

            <div className="space-y-3">
              {agentApps.map(app => (
                <div
                  key={app.id}
                  id={`agent-case-${app.id}`}
                  onClick={() => setSelectedAppForReview(app)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedAppForReview?.id === app.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {app.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{app.serviceName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <strong className="text-slate-800">{app.userName}</strong> • {app.userPhone}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700">₹{app.agentFee}</span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      {app.statusLabel}
                    </span>
                    <span className="text-[10px] text-slate-400">{app.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Cols: Selected Case Action & Document Review Desk */}
          <div className="lg:col-span-7">
            {selectedAppForReview ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                        {selectedAppForReview.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Assigned Client Review Desk
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedAppForReview.serviceName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Applicant: <strong>{selectedAppForReview.userName}</strong> • Tel: {selectedAppForReview.userPhone} • Email: {selectedAppForReview.userEmail}
                    </p>
                  </div>

                  <button
                    id="btn-agent-open-client-chat"
                    onClick={() => setActiveChatApplicationId(selectedAppForReview.id)}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Client Chat</span>
                  </button>
                </div>

                {/* Applicant Declarations Snapshot */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                    Applicant Field Declarations
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Address: <strong>{selectedAppForReview.applicantDetails?.address}, {selectedAppForReview.applicantDetails?.district}</strong></div>
                    <div>Declared Income: <strong>₹{selectedAppForReview.applicantDetails?.answers?.income || '180000'} / year</strong></div>
                    <div>Source: <strong>{selectedAppForReview.applicantDetails?.answers?.incomeSource || 'Agriculture & Small Business'}</strong></div>
                    <div>Purpose: <strong>{selectedAppForReview.applicantDetails?.answers?.purpose || 'College Concession'}</strong></div>
                  </div>
                </div>

                {/* Uploaded Documents Vetting */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Client Uploaded Documents ({selectedAppForReview.documents.length})
                    </h4>
                    <button
                      onClick={handleRequestExtraDoc}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      + Request Additional Document
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedAppForReview.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                            PDF
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{doc.name}</div>
                            <span className="text-[11px] text-slate-500">{doc.fileName} ({doc.fileSize})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {doc.aiCheckResult && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              AI Score: {doc.aiCheckResult.score}/100
                            </span>
                          )}
                          <button
                            onClick={() => showToast(`Previewing ${doc.fileName}...`, 'info')}
                            className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Preview file"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Advancing Actions */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Update Application Milestone & Dispatch
                  </h4>

                  <div className="space-y-3">
                    {/* Status note */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Status Log Note (Visible to Citizen)
                      </label>
                      <input
                        type="text"
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        placeholder="e.g. Documents verified. Affidavit notarized by Adv. Deshmukh."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    {/* Official token input if advancing to official submitted */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        State Portal Token Number (When filed with Government)
                      </label>
                      <input
                        type="text"
                        value={govtTokenInput}
                        onChange={(e) => setGovtTokenInput(e.target.value)}
                        placeholder="e.g. MH/REV/2026/089412"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    {/* Milestone advance buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                      <button
                        onClick={() => handleAdvanceStatus('DOCUMENTS_VERIFIED')}
                        className="p-2.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        1. Mark Docs Verified
                      </button>
                      <button
                        onClick={() => handleAdvanceStatus('OFFICIAL_SUBMITTED')}
                        className="p-2.5 rounded-xl border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        2. Submitted to Govt
                      </button>
                      <button
                        onClick={() => handleAdvanceStatus('GOVERNMENT_PROCESSING')}
                        className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        3. Field Inquiry Active
                      </button>
                      <button
                        onClick={() => handleAdvanceStatus('CERTIFICATE_READY')}
                        className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        4. Certificate Ready
                      </button>
                      <button
                        onClick={() => handleAdvanceStatus('COMPLETED')}
                        className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer text-center col-span-2 shadow-sm"
                      >
                        5. Final Complete & Release Escrow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">Select a case to inspect</h3>
                <p className="text-xs text-slate-500">Pick any client request from the left queue to review documents.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
