import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickSearch: React.FC = () => {
  const { services, navigateToService, setActiveTab, setSearchQuery: setGlobalSearch } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularQueries = [
    'Income Certificate',
    'Caste Certificate',
    'Residence Certificate',
    'Birth Certificate',
    'Death Certificate',
    'Domicile Certificate',
    'EWS Certificate',
    'Marriage Certificate',
    'Character Certificate',
    'Business Registration (MSME)',
    'Driving License'
  ];

  const filteredServices = query.trim() === ''
    ? []
    : services.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectService = (serviceId: string) => {
    setIsOpen(false);
    navigateToService(serviceId);
  };

  const handleQuickChip = (chip: string) => {
    setQuery(chip);
    const matched = services.find(s => s.name.toLowerCase().includes(chip.toLowerCase()) || chip.toLowerCase().includes(s.name.toLowerCase()));
    if (matched) {
      navigateToService(matched.id);
    } else {
      setGlobalSearch(chip);
      setActiveTab('services');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="quick-search-section" className="relative -mt-10 z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div 
        ref={containerRef}
        className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 p-4 sm:p-6 transition-all"
      >
        <label htmlFor="service-search-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          What government service do you need?
        </label>
        
        <div className="relative">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus-within:border-blue-600 focus-within:bg-white transition-all px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="service-search-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search by certificate (e.g., Income Certificate, Domicile, EWS, Caste, MSME)..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
            />
            {query && (
              <button 
                id="btn-clear-search-input"
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="btn-search-explore-all"
              onClick={() => {
                setGlobalSearch(query);
                setActiveTab('services');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && filteredServices.length > 0 && (
            <div 
              id="search-autocomplete-dropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 divide-y divide-slate-100 z-50 max-h-80 overflow-y-auto"
            >
              <div className="p-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Matching Government Services ({filteredServices.length})
              </div>
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  id={`search-suggestion-${service.id}`}
                  onClick={() => handleSelectService(service.id)}
                  className="p-3.5 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                        <span>Est: {service.estimatedProcessingTime}</span>
                        <span>•</span>
                        <span>{service.requiredDocuments.length} Documents Required</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Quick Suggestions Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <span className="font-semibold text-slate-500 flex items-center gap-1 text-[11px] mr-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Popular:
          </span>
          {popularQueries.slice(0, 6).map((chip, idx) => (
            <button
              key={idx}
              id={`quick-search-chip-${idx}`}
              onClick={() => handleQuickChip(chip)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium transition-colors cursor-pointer text-[11px]"
            >
              {chip}
            </button>
          ))}
          <button
            id="quick-search-view-all-chip"
            onClick={() => setActiveTab('services')}
            className="text-blue-600 hover:text-blue-800 font-semibold ml-1 cursor-pointer text-[11px]"
          >
            + View all 10+ services
          </button>
        </div>
      </div>
    </section>
  );
};
