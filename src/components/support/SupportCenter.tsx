import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  FileText, 
  Users, 
  Clock, 
  CreditCard, 
  Send, 
  MessageSquare, 
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_FAQS } from '../../data/mockData';
import { FAQItem } from '../../types';

export const SupportCenter: React.FC = () => {
  const { 
    createSupportTicket, 
    currentUser, 
    setIsAiChatOpen,
    navigateToTrack,
    navigateToService
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['faq_01', 'faq_05']));

  // Ticket form state
  const [ticketCategory, setTicketCategory] = useState<any>('Applications');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketAppId, setTicketAppId] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = [
    'All',
    'General & Legality',
    'Documents & Verification',
    'Agents & Escrow',
    'Timelines & Delivery',
    'Payments & Refunds'
  ];

  const toggleFAQ = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(MOCK_FAQS.map(f => f.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const filteredFAQs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MOCK_FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesQuery = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q) ||
        faq.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDescription.trim()) return;

    createSupportTicket({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      category: ticketCategory,
      applicationId: ticketAppId.trim() || undefined,
      description: ticketDescription.trim(),
      priority: 'Medium'
    });

    setTicketSubmitted(true);
    setTicketDescription('');
    setTicketAppId('');
  };

  return (
    <div id="support-center-view" className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Support Center Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GovEase Help Desk & Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions & Support
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Learn how GovEase facilitates citizen services, protects payments in escrow, and ensures transparency with independent agents.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search answers (e.g. refund, escrow, documents, processing time, official portal)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filters & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                id={`faq-cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Showing {filteredFAQs.length} questions</span>
            <span className="text-slate-700">•</span>
            <button
              id="btn-expand-all-faqs"
              onClick={expandAll}
              className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-700">/</span>
            <button
              id="btn-collapse-all-faqs"
              onClick={collapseAll}
              className="text-slate-400 hover:text-slate-300 font-medium cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Interactive FAQ Accordion Component */}
        <div className="space-y-3" id="faq-accordion-list">
          {filteredFAQs.map(faq => {
            const isExpanded = expandedIds.has(faq.id);
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded 
                    ? 'bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-950/20' 
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer gap-4 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2 sm:mt-0" />
                    <div>
                      <span className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-300">
                        {faq.question}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Category: {faq.category}
                      </div>
                    </div>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Collapsible Answer */}
                {isExpanded && (
                  <div 
                    id={`faq-content-${faq.id}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in duration-150 space-y-3"
                  >
                    <p>{faq.answer}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400">Related topics:</span>
                      {faq.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl p-6 text-slate-400 space-y-3">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-600" />
              <div className="text-base font-medium text-white">No FAQ matched your query</div>
              <p className="text-xs max-w-sm mx-auto">
                Couldn't find what you were looking for? Ask our instant AI Assistant or raise a support ticket below.
              </p>
              <button
                onClick={() => setIsAiChatOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                <Bot className="w-4 h-4" />
                Ask GovEase AI Assistant
              </button>
            </div>
          )}
        </div>

        {/* Quick Contact & Ticket Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* AI Helper Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 to-indigo-950/40 border border-blue-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white">Instant AI Guidance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have specific questions about document formats, affidavit requirements, or state revenue eligibility?
              </p>
            </div>
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Open AI Assistant</span>
            </button>
          </div>

          {/* Ticket Submission Form */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Still need assistance? Raise a Ticket
                </h3>
                <p className="text-xs text-slate-400">
                  Our citizen support team typically responds within 2-4 business hours.
                </p>
              </div>
            </div>

            {ticketSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  Support Ticket Logged Successfully!
                </div>
                <p>
                  We have assigned your inquiry to our senior grievance officer. A copy and reference token has been saved to your dashboard.
                </p>
                <button
                  onClick={() => setTicketSubmitted(false)}
                  className="text-xs text-emerald-400 underline font-medium mt-1"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Inquiry Category</label>
                    <select
                      value={ticketCategory}
                      onChange={e => setTicketCategory(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs"
                    >
                      <option value="Applications">Applications & Status</option>
                      <option value="Documents">Document Verification & Uploads</option>
                      <option value="Agents">Agent Booking & Behavior</option>
                      <option value="Payments">Payments & Escrow</option>
                      <option value="Refunds">Refund Requests</option>
                      <option value="Account">Account Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Related Application ID (Optional)</label>
                    <input
                      type="text"
                      value={ticketAppId}
                      onChange={e => setTicketAppId(e.target.value)}
                      placeholder="e.g. GE-2026-001245"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Explain your issue or question</label>
                  <textarea
                    rows={3}
                    value={ticketDescription}
                    onChange={e => setTicketDescription(e.target.value)}
                    placeholder="Provide details of what you need help with..."
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-xs resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Directory of Official Government Portals */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Official Government Portals Directory</h3>
            </div>
            <span className="text-[11px] text-slate-400">Direct Citizen Access (Free)</span>
          </div>
          <p className="text-xs text-slate-400">
            GovEase champions citizen empowerment. If you prefer to apply directly without agent facilitation or platform services, you can visit the official central and state e-governance websites:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <a
              href="https://aaplesarkar.mahaonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-blue-300">Aaple Sarkar</div>
                <div className="text-[10px] text-slate-400">Maharashtra e-District</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </a>

            <a
              href="https://serviceonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-blue-300">ServicePlus</div>
                <div className="text-[10px] text-slate-400">National Citizen Portal</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </a>

            <a
              href="https://edistrict.delhigovt.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-blue-300">e-District Delhi</div>
                <div className="text-[10px] text-slate-400">Revenue & Certificates</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </a>

            <a
              href="https://parivahan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-blue-300">Sarathi Parivahan</div>
                <div className="text-[10px] text-slate-400">Driving & Vehicle Services</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
