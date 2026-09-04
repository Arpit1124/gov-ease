import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  MessageSquare, 
  ArrowRight, 
  Plus, 
  Building2, 
  User, 
  Calendar,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Printer,
  Search,
  Filter,
  ArrowUpDown,
  Mail,
  RefreshCw,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';

export const UserDashboard: React.FC = () => {
  const { 
    currentUser, 
    applications, 
    navigateToTrack, 
    setActiveTab, 
    setActiveChatApplicationId,
    showToast,
    payments,
    openPrintableReceipt,
    emailNotificationLogs,
    setSelectedEmailPreview,
    simulateStatusChangeWithEmail,
    triggerApplicationUpdate
  } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'APPLICATIONS' | 'PAYMENTS' | 'NOTIFICATIONS_LOG'>('APPLICATIONS');
  
  // Status filter and sort system for 'My Applications'
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'DATE_DESC' | 'DATE_ASC' | 'NAME_ASC'>('DATE_DESC');
  const [searchFilter, setSearchFilter] = useState('');

  // User applications
  const userApps = useMemo(() => {
    return applications.filter(a => a.userId === currentUser.id || currentUser.role === 'USER');
  }, [applications, currentUser]);

  // Calculate status counts for filter badges and dropdown
  const pendingCount = userApps.filter(a => 
    ['REQUEST_CREATED', 'DOCUMENTS_SUBMITTED'].includes(a.status)
  ).length;

  const underReviewCount = userApps.filter(a => 
    ['AGENT_ASSIGNED', 'DOCUMENTS_VERIFIED', 'OFFICIAL_SUBMITTED', 'GOVERNMENT_PROCESSING'].includes(a.status)
  ).length;

  const completedCount = userApps.filter(a => 
    ['CERTIFICATE_READY', 'COMPLETED'].includes(a.status)
  ).length;
  const approvedCount = completedCount;

  const rejectedCount = userApps.filter(a => a.status === 'REJECTED').length;

  // Filtered and sorted applications based on status filter, sort order, and search query
  const filteredApps = useMemo(() => {
    const list = userApps.filter(app => {
      // Status filtering
      let matchesStatus = true;
      if (statusFilter === 'PENDING') {
        matchesStatus = ['REQUEST_CREATED', 'DOCUMENTS_SUBMITTED'].includes(app.status);
      } else if (statusFilter === 'UNDER_REVIEW') {
        matchesStatus = ['AGENT_ASSIGNED', 'DOCUMENTS_VERIFIED', 'OFFICIAL_SUBMITTED', 'GOVERNMENT_PROCESSING'].includes(app.status);
      } else if (statusFilter === 'COMPLETED') {
        matchesStatus = ['CERTIFICATE_READY', 'COMPLETED'].includes(app.status);
      } else if (statusFilter === 'REJECTED') {
        matchesStatus = app.status === 'REJECTED';
      } else if (statusFilter !== 'ALL') {
        matchesStatus = app.status === statusFilter;
      }

      // Text query filtering
      const q = searchFilter.toLowerCase().trim();
      const matchesQuery = !q || 
        app.id.toLowerCase().includes(q) ||
        app.serviceName.toLowerCase().includes(q) ||
        (app.governmentApplicationNumber && app.governmentApplicationNumber.toLowerCase().includes(q)) ||
        (app.officialAcknowledgementNumber && app.officialAcknowledgementNumber.toLowerCase().includes(q)) ||
        (app.agentName && app.agentName.toLowerCase().includes(q));

      return matchesStatus && matchesQuery;
    });

    // Date & Name sorting
    return list.sort((a, b) => {
      if (sortOrder === 'DATE_DESC') {
        const timeA = new Date(a.submittedAt).getTime() || 0;
        const timeB = new Date(b.submittedAt).getTime() || 0;
        return timeB - timeA;
      }
      if (sortOrder === 'DATE_ASC') {
        const timeA = new Date(a.submittedAt).getTime() || 0;
        const timeB = new Date(b.submittedAt).getTime() || 0;
        return timeA - timeB;
      }
      if (sortOrder === 'NAME_ASC') {
        return a.serviceName.localeCompare(b.serviceName);
      }
      return 0;
    });
  }, [userApps, statusFilter, searchFilter, sortOrder]);

  const handleDownload = (docName: string) => {
    showToast(`Downloading ${docName}...`, 'success');
  };

  const handleOpenLatestEmail = (appId: string) => {
    const matchingLog = emailNotificationLogs.find(l => l.applicationId === appId);
    if (matchingLog) {
      setSelectedEmailPreview(matchingLog);
    } else {
      showToast(`No email dispatch log found yet for ${appId}`, 'info');
    }
  };

  return (
    <div id="citizen-user-dashboard" className="py-10 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider bg-blue-500/20 px-2.5 py-0.5 rounded border border-blue-400/30">
                  Citizen Portal
                </span>
                <span className="text-xs text-slate-300">Aadhaar Linked: Verified</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                {currentUser.email} • +91 {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              id="btn-user-dash-apply-new"
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-500 hover:bg-blue-400 text-white shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Apply for New Service</span>
            </button>
            <button
              id="btn-user-dash-track"
              onClick={() => navigateToTrack('GE-2026-001245')}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Track Active Request</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Applications</span>
            <div className="text-2xl font-black text-slate-900">{userApps.length}</div>
            <p className="text-[11px] text-blue-600 font-medium">{pendingCount} in progress, {approvedCount} completed</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Approved / Ready</span>
            <div className="text-2xl font-black text-emerald-600">{approvedCount}</div>
            <p className="text-[11px] text-slate-500 font-medium">Ready for pristine PDF download</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Escrow Protected</span>
            <div className="text-2xl font-black text-slate-900">
              ₹{userApps.reduce((acc, a) => acc + a.totalPaid, 0)}
            </div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 inline" /> 100% money-back guarantee
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Automated Dispatches</span>
            <div className="text-2xl font-black text-indigo-600">
              {emailNotificationLogs.length}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Email & SMS alerts delivered</p>
          </div>
        </div>

        {/* Primary View Navigation */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-sm">
          <button
            id="tab-my-applications"
            onClick={() => setActiveMainTab('APPLICATIONS')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'APPLICATIONS'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Applications ({userApps.length})</span>
          </button>
          <button
            id="tab-payment-receipts"
            onClick={() => setActiveMainTab('PAYMENTS')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'PAYMENTS'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment Receipts & Invoices ({payments.length})</span>
          </button>
          <button
            id="tab-email-dispatches"
            onClick={() => setActiveMainTab('NOTIFICATIONS_LOG')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'NOTIFICATIONS_LOG'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Automated Alerts Log ({emailNotificationLogs.length})</span>
          </button>
        </div>

        {/* SECTION 1: MY APPLICATIONS WITH FILTER SYSTEM */}
        {activeMainTab === 'APPLICATIONS' && (
          <div className="space-y-5">
            {/* Filter System & Sort Controls Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                {/* Filter and Sort Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Filter Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="select-status-filter" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                      <Filter className="w-3.5 h-3.5 text-blue-600" />
                      Filter Status:
                    </label>
                    <select
                      id="select-status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    >
                      <optgroup label="Broad Stages">
                        <option value="ALL">All Statuses ({userApps.length})</option>
                        <option value="PENDING">Pending ({pendingCount})</option>
                        <option value="UNDER_REVIEW">Under Review ({underReviewCount})</option>
                        <option value="COMPLETED">Completed ({completedCount})</option>
                        <option value="REJECTED">Rejected ({rejectedCount})</option>
                      </optgroup>
                      <optgroup label="Granular Milestones">
                        <option value="REQUEST_CREATED">1. Request Created</option>
                        <option value="DOCUMENTS_SUBMITTED">2. Documents Submitted</option>
                        <option value="AGENT_ASSIGNED">3. Agent Assigned</option>
                        <option value="DOCUMENTS_VERIFIED">4. Documents Verified by Agent</option>
                        <option value="OFFICIAL_SUBMITTED">5. Official Govt Submitted</option>
                        <option value="GOVERNMENT_PROCESSING">6. Government Processing</option>
                        <option value="CERTIFICATE_READY">7. Certificate Ready</option>
                        <option value="COMPLETED">8. Completed</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="select-sort-order" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                      <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
                      Sort by:
                    </label>
                    <select
                      id="select-sort-order"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as any)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="DATE_DESC">Date (Newest First)</option>
                      <option value="DATE_ASC">Date (Oldest First)</option>
                      <option value="NAME_ASC">Service Name (A to Z)</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar inside Applications */}
                <div className="relative w-full xl:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-filter-applications"
                    type="text"
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    placeholder="Search by ID, certificate, or token..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Status Filter Quick Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100" id="application-status-filters">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Select:</span>
                <button
                  id="filter-status-all"
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({userApps.length})
                </button>

                <button
                  id="filter-status-pending"
                  onClick={() => setStatusFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'PENDING'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Pending ({pendingCount})</span>
                </button>

                <button
                  id="filter-status-gov"
                  onClick={() => setStatusFilter('UNDER_REVIEW')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'UNDER_REVIEW'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Under Review ({underReviewCount})</span>
                </button>

                <button
                  id="filter-status-approved"
                  onClick={() => setStatusFilter('COMPLETED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'COMPLETED'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Completed ({completedCount})</span>
                </button>

                <button
                  id="filter-status-rejected"
                  onClick={() => setStatusFilter('REJECTED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === 'REJECTED'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Rejected ({rejectedCount})</span>
                </button>
              </div>

              {/* Status active banner info */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 gap-2">
                <div>
                  Showing <strong>{filteredApps.length}</strong> of {userApps.length} applications
                  {statusFilter !== 'ALL' && <span className="ml-1 text-blue-600 font-semibold">(Filtered by: {statusFilter})</span>}
                  <span className="ml-2 text-slate-400">
                    • Sorted by: {sortOrder === 'DATE_DESC' ? 'Date (Newest First)' : sortOrder === 'DATE_ASC' ? 'Date (Oldest First)' : 'Service Name (A-Z)'}
                  </span>
                </div>
                {(statusFilter !== 'ALL' || searchFilter || sortOrder !== 'DATE_DESC') && (
                  <button
                    onClick={() => { setStatusFilter('ALL'); setSearchFilter(''); setSortOrder('DATE_DESC'); }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    Reset All Filters & Sorting
                  </button>
                )}
              </div>
            </div>

            {/* Applications List */}
            {filteredApps.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No applications found matching your filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try switching the status filter back to "All" or clearing your search term.
                </p>
                <button
                  onClick={() => { setStatusFilter('ALL'); setSearchFilter(''); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Reset Filter View
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApps.map(app => {
                  const isCompleted = app.status === 'COMPLETED' || app.status === 'CERTIFICATE_READY';
                  const isRejected = app.status === 'REJECTED';
                  const isGovProcessing = app.status === 'OFFICIAL_SUBMITTED' || app.status === 'GOVERNMENT_PROCESSING';

                  return (
                    <div
                      key={app.id}
                      id={`user-app-card-${app.id}`}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                            {app.id}
                          </span>
                          <span className="text-xs text-slate-400">
                            Submitted on {app.submittedAt}
                          </span>
                          {app.governmentApplicationNumber && (
                            <span className="text-xs bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                              Govt Token: {app.governmentApplicationNumber}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900">{app.serviceName}</h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span>Assigned Agent: <strong className="text-slate-800">{app.agentName || 'Marketplace Queue'}</strong></span>
                          <span>•</span>
                          <span>Total Paid: <strong className="text-slate-800">₹{app.totalPaid}</strong></span>
                          <span>•</span>
                          <span className="text-slate-500">{app.documents.length} verified documents</span>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            isCompleted 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : isRejected 
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : isGovProcessing
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isCompleted ? 'bg-emerald-500' : isRejected ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'
                            }`} />
                            {app.statusLabel}
                          </span>

                          <button
                            onClick={() => handleOpenLatestEmail(app.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 cursor-pointer"
                            title="View simulated email notification sent to citizen"
                          >
                            <Mail className="w-3 h-3" />
                            <span>View Email Alert Log</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Action Bar */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                        {/* Service Layer Status Quick Update */}
                        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap pl-1">Stage:</span>
                          <select
                            id={`select-status-update-${app.id}`}
                            value={app.status}
                            onChange={(e) => triggerApplicationUpdate(app.id, e.target.value as ApplicationStatus, 'Status updated via service layer trigger')}
                            className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer w-full"
                            title="Update status using triggerApplicationUpdate service function"
                          >
                            <option value="REQUEST_CREATED">Pending: Request Created</option>
                            <option value="DOCUMENTS_SUBMITTED">Pending: Documents Submitted</option>
                            <option value="AGENT_ASSIGNED">Under Review: Agent Assigned</option>
                            <option value="DOCUMENTS_VERIFIED">Under Review: Documents Verified</option>
                            <option value="OFFICIAL_SUBMITTED">Under Review: Official Submitted</option>
                            <option value="GOVERNMENT_PROCESSING">Under Review: Govt Processing</option>
                            <option value="CERTIFICATE_READY">Completed: Certificate Ready</option>
                            <option value="COMPLETED">Completed: Fully Finished</option>
                            <option value="REJECTED">Rejected: Application Rejected</option>
                          </select>
                        </div>

                        <button
                          onClick={() => navigateToTrack(app.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Track Milestone Lifecycle</span>
                        </button>

                        {/* Simulated Notification Service Trigger */}
                        <button
                          id={`btn-simulate-notify-${app.id}`}
                          onClick={() => simulateStatusChangeWithEmail(app.id)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          title="Simulate advancing status & dispatching automated email/SMS"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Simulate Next Stage & Email</span>
                        </button>

                        {app.agentName && (
                          <button
                            onClick={() => setActiveChatApplicationId(app.id)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                            <span>Message Agent</span>
                          </button>
                        )}

                        {isCompleted && (
                          <button
                            onClick={() => handleDownload(`${app.serviceName}_Certificate.pdf`)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Official Certificate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: PAYMENT RECEIPTS & TAX INVOICES */}
        {activeMainTab === 'PAYMENTS' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Payment Transactions & Escrow Receipts</h3>
                <p className="text-xs text-slate-500">
                  Itemized tax receipts separating statutory government fees from agent assistance & escrow protection
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>GovEase Escrow Protection Active</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Invoice / Txn ID</th>
                    <th className="py-3 px-4">Application / Service</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Govt Statutory Fee</th>
                    <th className="py-3 px-4">Agent Assistance Fee</th>
                    <th className="py-3 px-4">Total Paid</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{txn.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">{txn.applicationName}</td>
                      <td className="py-3.5 px-4 text-slate-500">{txn.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{txn.method}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {txn.breakdown.governmentFee === 0 ? '₹0.00 (Zero-rated)' : `₹${txn.breakdown.governmentFee}`}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">₹{txn.breakdown.agentFee}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">₹{txn.amount}</td>
                      <td className="py-3.5 px-4">
                        <button
                          id={`btn-print-receipt-${txn.id}`}
                          onClick={() => openPrintableReceipt(txn)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Open clean printable PDF receipt"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print / PDF Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: AUTOMATED NOTIFICATION & EMAIL DISPATCH LEDGER */}
        {activeMainTab === 'NOTIFICATIONS_LOG' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Automated Notification & Email Dispatch Ledger</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time record of all automated email and SMS status alerts dispatched to citizens whenever application milestones update
                </p>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                SMTP Service: <span className="text-emerald-600 font-bold">ONLINE (250 OK)</span>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-3">
              {emailNotificationLogs.map(log => (
                <div
                  key={log.id}
                  id={`email-log-${log.id}`}
                  onClick={() => setSelectedEmailPreview(log)}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {log.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {log.subject}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span>To: <strong>{log.recipientEmail}</strong></span>
                      <span>•</span>
                      <span>Case: <strong className="text-blue-600">{log.applicationId}</strong></span>
                      <span>•</span>
                      <span>Status: <strong className="text-slate-700">{log.statusLabel}</strong></span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {log.deliveryStatus}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedEmailPreview(log); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Preview Email Body
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
