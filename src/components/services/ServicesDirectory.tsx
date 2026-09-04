import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Award, 
  FileSpreadsheet, 
  Home, 
  Baby, 
  HeartHandshake, 
  Briefcase, 
  Car, 
  FileCheck,
  ShieldCheck,
  ExternalLink,
  MapPin,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, GovernmentService } from '../../types';

export const ServicesDirectory: React.FC = () => {
  const { services, navigateToService, navigateToApply, searchQuery: initialSearch, setSearchQuery } = useApp();
  
  const [search, setSearch] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('All');

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const categories: ('All' | ServiceCategory)[] = [
    'All',
    'Certificates',
    'Identity & Documentation',
    'Business',
    'Property',
    'Licenses'
  ];

  const states = [
    'All',
    'Maharashtra',
    'Delhi NCR',
    'Karnataka',
    'Telangana',
    'Rajasthan',
    'Uttar Pradesh',
    'West Bengal'
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchSearch = 
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase()) ||
        service.purpose.toLowerCase().includes(search.toLowerCase());

      const matchCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchState = selectedState === 'All' || service.stateAvailability.includes(selectedState) || service.stateAvailability === 'All States' || service.stateAvailability.includes('All');

      return matchSearch && matchCategory && matchState;
    });
  }, [services, search, selectedCategory, selectedState]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
      case 'Award': return <Award className="w-5 h-5 text-indigo-600" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-600" />;
      case 'Baby': return <Baby className="w-5 h-5 text-sky-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-600" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-600" />;
      default: return <FileCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div id="services-directory-page" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Central & State Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Government Services Directory
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Search across certified government services, discover step-by-step documentation rules, check eligibility criteria, and choose between verified broker assistance or direct official portal submission.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="services-search-bar"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by service name, certificate type, purpose..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800"
              />
            </div>

            {/* State filter */}
            <div className="md:col-span-3">
              <select
                id="filter-state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="All">All States / Central</option>
                {states.filter(s => s !== 'All').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Category select for compact screens */}
            <div className="md:col-span-3">
              <select
                id="filter-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills on larger screens */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Categories:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                id={`cat-pill-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredServices.length}</strong> government services</span>
          <span className="text-slate-400">All fees displayed include verified statutory government charges</span>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching services found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any services matching "{search}". Try searching for common certificates like "Income", "Caste", "Domicile", or "MSME".
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedState('All'); }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div
                key={service.id}
                id={`service-directory-card-${service.id}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Stats list */}
                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Est. Processing:
                      </span>
                      <span className="font-semibold text-slate-800">{service.estimatedProcessingTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        Required Docs:
                      </span>
                      <span className="font-semibold text-slate-800">{service.requiredDocuments.length} Documents</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Jurisdiction:
                      </span>
                      <span className="font-medium text-slate-700 truncate max-w-[150px]">{service.stateAvailability}</span>
                    </div>
                  </div>

                  {/* Fee comparison */}
                  <div className="pt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Govt Fee</span>
                      <span className="font-bold text-slate-800">
                        {service.isGovernmentFeeFree ? 'Free (₹0)' : `₹${service.governmentFee}`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase">Assistance Escrow</span>
                      <span className="font-bold text-blue-600">₹{service.agentAssistanceFee}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    id={`btn-dir-details-${service.id}`}
                    onClick={() => navigateToService(service.id)}
                    className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    View Guidelines
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-dir-apply-${service.id}`}
                      onClick={() => navigateToApply(service.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
