import React, { useEffect } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  Lock, 
  IndianRupee, 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LegalPage: React.FC = () => {
  const { 
    legalPageType, 
    setLegalPageType, 
    setActiveTab, 
    navigateToApply,
    showToast 
  } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [legalPageType]);

  const tabs: { id: 'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms'; label: string; icon: any }[] = [
    { id: 'disclaimer', label: 'Platform Disclaimer', icon: ShieldAlert },
    { id: 'about', label: 'About GovEase', icon: Building2 },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'refund', label: 'Escrow & Refund Policy', icon: IndianRupee },
    { id: 'agent-terms', label: 'Agent Code of Conduct', icon: Users },
  ];

  return (
    <div id="legal-and-policy-page" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="btn-legal-back-home"
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <a
              id="link-official-india-gov"
              href="https://india.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span>National Portal of India</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Trust, Compliance & Governance Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Legal Disclaimers & Policies
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              GovEase operates on total operational transparency. Review our non-government declaration, user terms, privacy standards, escrow security, and agent ethics code.
            </p>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = legalPageType === tab.id;
            return (
              <button
                key={tab.id}
                id={`legal-tab-btn-${tab.id}`}
                onClick={() => setLegalPageType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm leading-relaxed text-slate-700 space-y-8">

          {/* TAB 1: DISCLAIMER */}
          {legalPageType === 'disclaimer' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-amber-950">
                    Mandatory Independent Platform Declaration
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                    <strong>GovEase is NOT a government entity, department, or official agency of the Government of India or any State Government.</strong> We are an independent private technology platform that assists citizens in preparing paperwork and engaging verified third-party documentation facilitators.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">1. Nature of Services Provided</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  GovEase facilitates information dissemination, document pre-validation, affidavit drafting assistance, and access to independent professional service agents. Any government fee charged is deposited directly into the respective state revenue Treasury or portal, while the platform and agent fees are compensation strictly for documentation assistance and administrative convenience.
                </p>

                <h3 className="text-xl font-bold text-slate-900">2. No Guarantee of Government Approval</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The final decision to grant, reject, or request further clarification on any certificate, license, or legal document rests solely with the competent government authority (such as the Tahsildar, Sub-Divisional Magistrate, Municipal Commissioner, or Regional Transport Officer). Neither GovEase nor any verified agent can guarantee approval or circumvent statutory eligibility criteria.
                </p>

                <h3 className="text-xl font-bold text-slate-900">3. Official Free Alternatives</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Citizens always retain the right to apply directly on official government portals (such as Aaple Sarkar in Maharashtra, e-District in Delhi and UP, or Seva Sindhu in Karnataka) without using GovEase or paying any assistance fee. Direct government portal links are provided transparently throughout our service pages.
                </p>

                <h3 className="text-xl font-bold text-slate-900">4. Zero Tolerance for Bribery</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  GovEase strictly prohibits bribery, speed money, or corrupt facilitation. All fees paid through GovEase are itemized, receipted, and held in escrow. Any agent requesting cash or unofficial facilitation will be immediately banned and reported to regulatory authorities.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {legalPageType === 'about' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">About Our Platform</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Bridging the Digital Bureaucracy Divide
                </h2>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  While state governments across India have launched progressive e-District portals, millions of citizens still struggle with rejected applications, obscure eligibility clauses, missing affidavits, and corrupt touts outside collectorate gates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                    01
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Document Clarity</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Plain-language checklists, translation of legal jargon, and pre-filing AI checks prevent avoidable rejections.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
                    02
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Vetted Specialists</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Every documentation professional undergoes criminal and identity KYC, credential audits, and adherence to our zero-bribery pledge.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-3">
                    03
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Escrow Security</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Funds are locked until your application is legitimately prepared and filed with the state department with proof of acknowledgment.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Headquarters & Citizen Support</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Email Grievance Desk</div>
                      <div className="text-slate-500">support@govease-assistance.in</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">National Helpline (Toll-Free)</div>
                      <div className="text-slate-500">1800-889-EASE (9 AM – 7 PM IST)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS */}
          {legalPageType === 'terms' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">User Agreement</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Terms of Service
                </h2>
                <p className="text-xs text-slate-500 mt-1">Last updated: January 2026 • Governed by the Information Technology Act, 2000</p>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <h4 className="text-base font-bold text-slate-900">1. Eligibility and User Representation</h4>
                <p>
                  By accessing GovEase, you represent that you are at least 18 years of age, a resident or citizen of India, and legally authorized to request official documents for yourself or your registered dependents. You warrant that all information, declarations, and uploaded identification documents are genuine and unaltered.
                </p>

                <h4 className="text-base font-bold text-slate-900">2. Prohibition of Forgery & Fraud</h4>
                <p>
                  Submitting forged, tampered, or fraudulent documents (such as fake salary slips, forged ration cards, or altered school leaving certificates) is a criminal offence under the Indian Penal Code (IPC) and Bhartiya Nyaya Sanhita (BNS). GovEase reserves the right to immediately terminate access, forfeit escrow deposits, and report fraudulent submissions to law enforcement.
                </p>

                <h4 className="text-base font-bold text-slate-900">3. Role of Independent Agents</h4>
                <p>
                  Specialists listed on GovEase are independent contractors and not employees of GovEase. While GovEase conducts vetting and monitors compliance, agents are solely responsible for executing documentation work within agreed SLAs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY */}
          {legalPageType === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Data Protection</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Privacy & Document Security Standards
                </h2>
                <p className="text-xs text-slate-500 mt-1">Compliant with Digital Personal Data Protection (DPDP) Act, 2023</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-blue-950 text-sm">256-Bit Storage Encryption</h5>
                    <p className="text-xs text-blue-900 mt-1">All uploaded PDFs, identity cards, and receipts are encrypted at rest and in transit using AES-256 standards.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-emerald-950 text-sm">Zero Data Commercialization</h5>
                    <p className="text-xs text-emerald-900 mt-1">We NEVER sell, lease, or monetize citizen contact numbers, Aadhaar details, or financial documents to advertisers.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed pt-2">
                <h4 className="text-base font-bold text-slate-900">Access Control & Document Purge</h4>
                <p>
                  Only the specific verified agent assigned to your case is granted temporal view access to your application documents. Once an application reaches final status (Issued or Rejected) and the 30-day dispute window concludes, citizens can request complete document purge from their profile dashboard.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: REFUND */}
          {legalPageType === 'refund' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Escrow Protection</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Escrow & 100% Money-Back Guarantee
                </h2>
                <p className="text-xs text-slate-500 mt-1">Protected transactions backed by automated milestone releases</p>
              </div>

              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>When Are You Entitled to a Full 100% Refund?</span>
                </div>
                <ul className="text-xs text-emerald-800 space-y-1.5 list-disc pl-5">
                  <li>If the assigned agent fails to review documents or respond within 48 hours.</li>
                  <li>If the assigned agent declines or cancels the service assistance request.</li>
                  <li>If the agent fails to upload the official government portal acknowledgment receipt within the agreed SLA.</li>
                  <li>If you cancel before the agent commences drafting of affidavits or notarization.</li>
                </ul>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <h4 className="text-base font-bold text-slate-900">Non-Refundable Elements</h4>
                <p>
                  Once an application has been officially lodged on the state portal and the non-refundable government treasury challan has been generated, the official government fee portion (₹33–₹500 depending on service) cannot be refunded by GovEase, as that amount is held by the state treasury.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: AGENT TERMS */}
          {legalPageType === 'agent-terms' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Service Partner Standards</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Independent Agent Code of Conduct & Terms
                </h2>
                <p className="text-xs text-slate-500 mt-1">Strict governance for certified CSC operators, document writers, and legal facilitators</p>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">1. Anti-Corruption & Zero Bribery Covenant</h4>
                  <p className="text-xs text-slate-600">
                    Agents strictly covenant never to demand, solicit, or accept any cash payment, facilitation fees, or bribes from citizens. All financial transactions must occur via GovEase Escrow.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">2. Verification & Background Scrutiny</h4>
                  <p className="text-xs text-slate-600">
                    Every onboarding specialist must submit Aadhaar, PAN, police clearance or business registration certificate, and undergo phone and address verification before accepting citizen requests.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">3. Immediate Suspension & Blacklisting</h4>
                  <p className="text-xs text-slate-600">
                    Any agent found violating citizen data privacy, maintaining unauthorized physical document copies, or charging unlisted fees will face immediate credential revocation, forfeiture of pending escrow, and legal action.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between p-5 bg-blue-50 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="text-sm font-bold text-blue-950">Want to join as a verified agent?</h4>
                  <p className="text-xs text-blue-800">Review onboarding requirements and apply for certification.</p>
                </div>
                <button
                  id="btn-apply-as-agent"
                  onClick={() => {
                    setActiveTab('support');
                    showToast('Contact support or submit an Agent Verification Ticket to onboard!', 'info');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shrink-0"
                >
                  Apply to Join Network
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Quick Action Bottom Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h4 className="text-lg font-bold">Have questions or need assistance?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Our support team is available 7 days a week to assist you.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="btn-legal-open-support"
              onClick={() => setActiveTab('support')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Contact Support
            </button>
            <button
              id="btn-legal-explore-catalog"
              onClick={() => setActiveTab('services')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            >
              Browse Services
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
