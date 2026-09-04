import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, navigateToLegal, setSelectedServiceId, setSearchQuery } = useApp();

  const handleServiceClick = (cat: string) => {
    setSearchQuery(cat);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="govease-main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Gov<span className="text-blue-400">Ease</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Government service assistance made simpler. We connect Indian citizens with verified independent documentation professionals and provide transparent step-by-step guidance.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@govease-assistance.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>1800-889-EASE (Toll Free, 9 AM – 7 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>GovEase Citizen Hub, FC Road, Shivajinagar, Pune, Maharashtra 411005</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  id="footer-link-certificates"
                  onClick={() => handleServiceClick('Certificates')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Certificates (Income, Caste, Domicile)
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-business"
                  onClick={() => handleServiceClick('Business')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  MSME & Business Registrations
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-licenses"
                  onClick={() => handleServiceClick('Licenses')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Driving License Assistance
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-property"
                  onClick={() => handleServiceClick('Property')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Property & Land Record Guidance
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-find-agent"
                  onClick={() => { setActiveTab('agents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Find Verified Service Agents →
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company & Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  id="footer-link-about"
                  onClick={() => navigateToLegal('about')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About GovEase
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-help-center"
                  onClick={() => { setActiveTab('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-raise-ticket"
                  onClick={() => { setActiveTab('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Raise Support Ticket
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-agent-terms"
                  onClick={() => navigateToLegal('agent-terms')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Become an Agent / Join Network
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal & Trust</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  id="footer-link-disclaimer"
                  onClick={() => navigateToLegal('disclaimer')} 
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
                >
                  Platform Disclaimer
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-terms"
                  onClick={() => navigateToLegal('terms')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-privacy"
                  onClick={() => navigateToLegal('privacy')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-refund"
                  onClick={() => navigateToLegal('refund')} 
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Refund & Escrow Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Prominent Mandatory Independent Disclaimer */}
        <div className="py-6 border-b border-slate-800">
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              IMPORTANT REGULATORY NOTICE
            </p>
            <p>
              GovEase is an independent citizen-service assistance and facilitation platform and is not a government department, ministry, or official government website. Official government applications, decisions, approvals, processing timelines, and statutory fees remain the exclusive prerogative of the respective Central, State, and Municipal Government Authorities. GovEase provides advisory documentation, preparation assistance, and independent brokerage services through verified agents.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 GovEase Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://india.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 inline-flex items-center gap-1"
            >
              <span>National Portal of India</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://serviceonline.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 inline-flex items-center gap-1"
            >
              <span>ServicePlus Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
