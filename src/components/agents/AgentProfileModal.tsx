import React from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  Languages, 
  Phone, 
  Mail, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Agent } from '../../types';
import { useApp } from '../../context/AppContext';

interface AgentProfileModalProps {
  agent: Agent;
  onClose: () => void;
}

export const AgentProfileModal: React.FC<AgentProfileModalProps> = ({ agent, onClose }) => {
  const { navigateToApply, setActiveChatApplicationId, reviews } = useApp();

  const agentReviews = reviews.filter(r => r.agentId === agent.id);

  const handleBookService = (serviceName: string) => {
    onClose();
    navigateToApply('srv_income', agent.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Hero */}
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 p-6 sm:p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.fullName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                referrerPolicy="no-referrer"
              />
              {agent.platformVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black">{agent.fullName}</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  GovEase Verified
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-blue-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>{agent.location.address}, {agent.location.district}, {agent.location.state} - {agent.location.pincode}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{agent.rating}</span>
                  <span className="text-blue-200">({agent.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">{agent.totalApplicationsCompleted} cases successfully completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About & Professional Experience</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{agent.bio}</p>
          </div>

          {/* Verification Credentials Pill Badges */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified GovEase Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Identity & Aadhaar</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Bar/Notary Registry</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Background Checked</span>
              </div>
            </div>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Experience</span>
              <strong className="text-slate-900 text-sm mt-0.5 block">{agent.experienceYears} Years in Service</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Operating Hours</span>
              <strong className="text-slate-900 text-sm mt-0.5 block">{agent.workingHours}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Languages</span>
              <strong className="text-slate-900 text-sm mt-0.5 block">{agent.languagesSpoken.join(', ')}</strong>
            </div>
          </div>

          {/* Services & Fixed Rates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Assisted Services & Assistance Escrow Fees
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agent.servicesOffered.map((srv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{srv}</span>
                  <span className="font-bold text-blue-600">₹{agent.serviceFeeRange.min}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Reviews */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Recent Citizen Reviews ({agentReviews.length})
              </h3>
              <div className="text-xs font-bold text-amber-500 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{agent.rating} Average</span>
              </div>
            </div>

            {agentReviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet for this agent.</p>
            ) : (
              <div className="space-y-2.5">
                {agentReviews.map(r => (
                  <div key={r.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{r.userName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-600 font-medium">{r.serviceName}</span>
                    <p className="text-slate-600">{r.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => handleBookService('Income Certificate')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Agent for Assistance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
