import React from 'react';
import { 
  FileSpreadsheet, 
  Award, 
  Home, 
  Baby, 
  HeartHandshake, 
  Briefcase, 
  Car, 
  FileCheck, 
  Clock, 
  FileText, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GovernmentService } from '../../types';

export const PopularServices: React.FC = () => {
  const { services, navigateToService, navigateToApply, setActiveTab } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6 text-blue-600" />;
      case 'Award': return <Award className="w-6 h-6 text-indigo-600" />;
      case 'Home': return <Home className="w-6 h-6 text-emerald-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-sky-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'Car': return <Car className="w-6 h-6 text-purple-600" />;
      default: return <FileCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  const popularServices = services.filter(s => s.isPopular);

  return (
    <section id="popular-services-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Citizen Certificate Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Government Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Browse the most requested certificates and legal documentation services. Review verified state requirements, fee structures, and required document checklists before applying.
            </p>
          </div>
          <button
            id="btn-view-all-services-catalog"
            onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore All 10+ Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <div
              key={service.id}
              id={`popular-service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400/80 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Header with Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {service.category}
                  </span>
                </div>

                {/* Title and Short Description */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Est: <strong className="text-slate-800">{service.estimatedProcessingTime.split(' ')[0]}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-800">{service.requiredDocuments.length}</strong> Documents</span>
                  </div>
                </div>

                {/* Pricing disclosure */}
                <div className="pt-3 flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    Govt Fee: <span className="font-semibold text-slate-900">{service.isGovernmentFeeFree ? 'Free (₹0)' : `₹${service.governmentFee}`}</span>
                  </div>
                  <div className="text-slate-500">
                    Assistance: <span className="font-semibold text-blue-600">₹{service.agentAssistanceFee}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  id={`btn-view-details-${service.id}`}
                  onClick={() => navigateToService(service.id)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  id={`btn-apply-card-${service.id}`}
                  onClick={() => navigateToApply(service.id)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
