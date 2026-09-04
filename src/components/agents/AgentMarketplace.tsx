import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Briefcase, 
  SlidersHorizontal,
  UserCheck,
  Languages,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Agent } from '../../types';
import { AgentProfileModal } from './AgentProfileModal';

export const AgentMarketplace: React.FC = () => {
  const { agents, navigateToApply } = useApp();

  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeProfileAgent, setActiveProfileAgent] = useState<Agent | null>(null);

  const states = ['All', 'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Rajasthan'];
  const serviceOptions = [
    'All',
    'Income Certificate',
    'Caste Certificate',
    'Domicile Certificate',
    'EWS Certificate',
    'MSME Registration',
    'Driving License',
    'Property Registration'
  ];

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchSearch = 
        agent.fullName.toLowerCase().includes(search.toLowerCase()) ||
        agent.bio.toLowerCase().includes(search.toLowerCase()) ||
        agent.location.district.toLowerCase().includes(search.toLowerCase());

      const matchState = selectedState === 'All' || agent.location.state === selectedState;
      const matchService = selectedService === 'All' || agent.servicesOffered.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));
      const matchVerified = !verifiedOnly || agent.platformVerified;

      return matchSearch && matchState && matchService && matchVerified;
    });
  }, [agents, search, selectedState, selectedService, verifiedOnly]);

  return (
    <div id="agent-marketplace-page" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Verified Broker Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Verified Service Agents
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Connect with vetted independent document professionals, notary coordinators, and local facilitation experts. Compare transparent assistance fees and verified citizen ratings.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-agent-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agent by name, district, or expertise..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
              />
            </div>

            {/* State filter */}
            <div className="md:col-span-3">
              <select
                id="filter-agent-state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {states.map(st => (
                  <option key={st} value={st}>{st === 'All' ? 'All Locations / States' : st}</option>
                ))}
              </select>
            </div>

            {/* Service filter */}
            <div className="md:col-span-4">
              <select
                id="filter-agent-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {serviceOptions.map(srv => (
                  <option key={srv} value={srv}>{srv === 'All' ? 'All Services & Certificates' : srv}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
              <input
                type="checkbox"
                id="checkbox-verified-agents-only"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Show GovEase Verified Agents Only</span>
            </label>

            <span className="text-slate-500">
              Showing <strong>{filteredAgents.length}</strong> available documentation specialists
            </span>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              id={`agent-card-${agent.id}`}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Agent Header */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={agent.avatar}
                      alt={agent.fullName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    {agent.platformVerified && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center ring-2 ring-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {agent.fullName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{agent.location.district}, {agent.location.state}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {agent.rating}
                      </span>
                      <span className="text-slate-400">({agent.reviewCount} reviews)</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-semibold">{agent.totalApplicationsCompleted} cases</span>
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {agent.bio}
                </p>

                {/* Services handled chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specializations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.servicesOffered.slice(0, 3).map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
                      >
                        {srv}
                      </span>
                    ))}
                    {agent.servicesOffered.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{agent.servicesOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Micro info bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{agent.experienceYears} Years Exp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[120px]">{agent.languagesSpoken.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Pricing row */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Assistance Fee:</span>
                  <span className="text-sm font-bold text-blue-600">
                    ₹{agent.serviceFeeRange.min} – ₹{agent.serviceFeeRange.max}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  id={`btn-view-agent-profile-${agent.id}`}
                  onClick={() => setActiveProfileAgent(agent)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  id={`btn-book-agent-${agent.id}`}
                  onClick={() => navigateToApply('srv_income', agent.id)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <span>Book Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing detailed agent profile */}
        {activeProfileAgent && (
          <AgentProfileModal
            agent={activeProfileAgent}
            onClose={() => setActiveProfileAgent(null)}
          />
        )}
      </div>
    </div>
  );
};
