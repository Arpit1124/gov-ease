import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Building2, 
  UserCheck, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Compass,
  CornerDownLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    closeSearchModal, 
    services, 
    agents, 
    applications, 
    navigateToService, 
    navigateToAgent, 
    navigateToTrack,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(normalizedQuery) ||
    s.category.toLowerCase().includes(normalizedQuery) ||
    s.issuingAuthority.toLowerCase().includes(normalizedQuery)
  ).slice(0, 4);

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(normalizedQuery) ||
    a.specialties.some(sp => sp.toLowerCase().includes(normalizedQuery)) ||
    a.location.state.toLowerCase().includes(normalizedQuery) ||
    a.location.district.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const filteredApplications = applications.filter(app =>
    app.id.toLowerCase().includes(normalizedQuery) ||
    app.serviceName.toLowerCase().includes(normalizedQuery) ||
    app.userPhone.includes(normalizedQuery)
  ).slice(0, 2);

  const handleSelectService = (serviceId: string) => {
    navigateToService(serviceId);
    closeSearchModal();
  };

  const handleSelectAgent = (agentId: string) => {
    navigateToAgent(agentId);
    closeSearchModal();
  };

  const handleSelectApplication = (appId: string) => {
    navigateToTrack(appId);
    closeSearchModal();
  };

  const handleGoToSupport = () => {
    setActiveTab('support');
    closeSearchModal();
  };

  const hasResults = filteredServices.length > 0 || filteredAgents.length > 0 || filteredApplications.length > 0;

  return (
    <div 
      id="quick-search-modal-backdrop" 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={closeSearchModal}
    >
      <div 
        id="quick-search-dialog" 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-800 gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            id="quick-search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search certificates, services, agents, or Case ID (e.g. Income, GE-2026-001245)..."
            className="w-full bg-transparent text-white text-base focus:outline-none placeholder-slate-400"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
              <span>ESC</span> to close
            </div>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-6 divide-y divide-slate-800/60">
          {/* Quick Shortcuts when empty */}
          {!query && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Popular Citizen Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.slice(0, 4).map(srv => (
                  <button
                    key={srv.id}
                    id={`quick-search-item-${srv.id}`}
                    onClick={() => handleSelectService(srv.id)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-blue-300">
                          {srv.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {srv.category} • {srv.estimatedDays}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Quick jumps:</span>
                <button
                  onClick={handleGoToSupport}
                  className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                  Support & FAQs
                </button>
                <button
                  onClick={() => { setActiveTab('agents'); closeSearchModal(); }}
                  className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Agents Directory
                </button>
                <button
                  onClick={() => { setActiveTab('tracking'); closeSearchModal(); }}
                  className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Track Existing Case
                </button>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <>
              {/* Active Applications Match */}
              {filteredApplications.length > 0 && (
                <div className="space-y-2 pt-3 first:pt-0">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Applications & Cases ({filteredApplications.length})
                  </div>
                  <div className="space-y-2">
                    {filteredApplications.map(app => (
                      <button
                        key={app.id}
                        id={`search-res-app-${app.id}`}
                        onClick={() => handleSelectApplication(app.id)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-left transition-all cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                              {app.id}
                            </span>
                            <span className="text-sm font-medium text-white group-hover:text-amber-200">
                              {app.serviceName}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Status: <strong className="text-slate-300">{app.statusLabel}</strong> • {app.userPhone}
                          </div>
                        </div>
                        <span className="text-xs text-amber-400 flex items-center gap-1">
                          Track <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Government Services Match */}
              {filteredServices.length > 0 && (
                <div className="space-y-2 pt-3 first:pt-0">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Government Services & Certificates ({filteredServices.length})
                  </div>
                  <div className="space-y-2">
                    {filteredServices.map(srv => (
                      <button
                        key={srv.id}
                        id={`search-res-srv-${srv.id}`}
                        onClick={() => handleSelectService(srv.id)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 text-left transition-all cursor-pointer group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                            {srv.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Authority: {srv.issuingAuthority} • Govt Fee: ₹{srv.governmentFee} • Timeline: {srv.estimatedDays}
                          </div>
                        </div>
                        <span className="text-xs text-blue-400 flex items-center gap-1">
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Agents Match */}
              {filteredAgents.length > 0 && (
                <div className="space-y-2 pt-3 first:pt-0">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    Verified Facilitation Agents ({filteredAgents.length})
                  </div>
                  <div className="space-y-2">
                    {filteredAgents.map(agt => (
                      <button
                        key={agt.id}
                        id={`search-res-agent-${agt.id}`}
                        onClick={() => handleSelectAgent(agt.id)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={agt.avatar} 
                            alt={agt.name} 
                            className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:text-emerald-300">
                                {agt.name}
                              </span>
                              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/40">
                                Verified
                              </span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {agt.location.district}, {agt.location.state} • ★ {agt.rating} ({agt.totalReviews} reviews)
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          Profile <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {!hasResults && (
                <div className="text-center py-10 text-slate-400 space-y-3">
                  <Compass className="w-10 h-10 mx-auto text-slate-600 animate-bounce" />
                  <div className="text-base font-medium text-slate-300">
                    No results found for "{query}"
                  </div>
                  <p className="text-xs max-w-sm mx-auto text-slate-400">
                    Try searching for common terms like "Income", "Caste", "Domicile", "GST", or search by your 10-digit phone number.
                  </p>
                  <button
                    onClick={handleGoToSupport}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Visit Support Center FAQs
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-[10px]">Ctrl</span> + <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-[10px]">K</span> to toggle
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Press <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-[10px]">ESC</span> to close</span>
          </div>
          <span className="text-[11px] text-slate-400">GovEase Quick Search</span>
        </div>
      </div>
    </div>
  );
};
