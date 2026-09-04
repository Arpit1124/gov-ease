import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Settings, 
  Plus, 
  Search, 
  ExternalLink,
  Lock,
  Download,
  DollarSign,
  BarChart2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Agent } from '../../types';
import { AuditLogsTable } from './AuditLogsTable';
import { AdminAnalytics } from './AdminAnalytics';

export const AdminDashboard: React.FC = () => {
  const { 
    agents, 
    applications, 
    verifyAgentStatus, 
    auditLogs, 
    supportTickets, 
    services, 
    payments,
    showToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'ANALYTICS' | 'AGENTS' | 'SERVICES' | 'AUDIT' | 'TICKETS'>('OVERVIEW');
  const [agentSearch, setAgentSearch] = useState('');

  // Metrics
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
  const platformRevenue = payments.reduce((acc, p) => acc + p.breakdown.platformFee, 0);
  const pendingAgentVerifications = agents.filter(a => a.verificationStatus === 'Under Review');

  const filteredAgents = agents.filter(a => 
    (a.name || (a as any).fullName || '').toLowerCase().includes(agentSearch.toLowerCase()) ||
    (a.location?.city || (a.location as any)?.district || '').toLowerCase().includes(agentSearch.toLowerCase())
  );

  return (
    <div id="platform-admin-dashboard" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider bg-rose-950/90 px-2.5 py-0.5 rounded border border-rose-800">
                System Administrator Privileges
              </span>
              <span className="text-xs text-slate-400">GovEase Core Engine v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">Platform Administration & Governance</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Supervise broker credentials, monitor escrow health, audit case lifecycles, and maintain service definitions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Facilitated</span>
              <div className="text-xl font-mono font-black text-emerald-400">₹{totalRevenue}</div>
            </div>
          </div>
        </div>

        {/* 4 Admin KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Applications</span>
            <div className="text-2xl font-black text-slate-900">{applications.length + 1420}</div>
            <p className="text-[11px] text-blue-600 font-medium">98.2% on-time resolution</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Verified Broker Network</span>
            <div className="text-2xl font-black text-slate-900">{agents.length}</div>
            <p className="text-[11px] text-emerald-600 font-medium">{pendingAgentVerifications.length} pending vetting</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Platform Net Escrow</span>
            <div className="text-2xl font-black text-slate-900">₹{platformRevenue}</div>
            <p className="text-[11px] text-slate-500 font-medium">From ₹99 facilitation fee</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Support Tickets</span>
            <div className="text-2xl font-black text-amber-600">{supportTickets.length}</div>
            <p className="text-[11px] text-amber-700 font-medium">All under SLA</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-sm overflow-x-auto">
          {[
            { id: 'OVERVIEW', label: 'Case Oversight' },
            { id: 'ANALYTICS', label: 'Interactive Analytics' },
            { id: 'AUDIT', label: `Audit Logs (${auditLogs.length})` },
            { id: 'AGENTS', label: `Agent Vetting Queue (${pendingAgentVerifications.length})` },
            { id: 'SERVICES', label: `Service Definitions (${services.length})` },
            { id: 'TICKETS', label: `Citizen Support Tickets (${supportTickets.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeAdminTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Case Oversight */}
        {activeAdminTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Live Platform Applications</h3>
                  <p className="text-xs text-slate-500">Real-time status across all districts and state revenue desks</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Case ID</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Assigned Specialist</th>
                      <th className="py-3 px-4">Lifecycle Status</th>
                      <th className="py-3 px-4">Escrow Total</th>
                      <th className="py-3 px-4">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{app.id}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-900">{app.serviceName}</td>
                        <td className="py-3.5 px-4 text-slate-700">{app.userName}</td>
                        <td className="py-3.5 px-4 text-slate-600">{app.agentName || 'Unassigned'}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                            {app.statusLabel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">₹{app.totalPaid}</td>
                        <td className="py-3.5 px-4 text-slate-500">{app.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Access to Analytics & Audit Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Interactive Analytics Visualizer</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Explore high-resolution Recharts visualizations for daily inflow velocity, peak capacity, and demand by service category.
                  </p>
                  <button
                    id="overview-btn-analytics"
                    onClick={() => setActiveAdminTab('ANALYTICS')}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>Open Interactive Analytics Section</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                      <FileText className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Platform Audit Logs (Database)</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Inspect immutable entries from the <code className="font-mono text-slate-700">audit_logs</code> table with live filters, actor role credentials, and CSV/JSON export.
                  </p>
                  <button
                    id="overview-btn-audit"
                    onClick={() => setActiveAdminTab('AUDIT')}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    <span>Open Audit Logs Component</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Interactive Analytics (Recharts) */}
        {activeAdminTab === 'ANALYTICS' && (
          <AdminAnalytics 
            applications={applications} 
            services={services} 
          />
        )}

        {/* TAB 2: Agent Vetting Queue */}
        {activeAdminTab === 'AGENTS' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={agentSearch}
                  onChange={(e) => setAgentSearch(e.target.value)}
                  placeholder="Filter agents by name, district, state..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
              <span className="text-xs text-slate-500">
                {filteredAgents.length} documentation agents registered
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAgents.map(agent => (
                <div
                  key={agent.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.avatar}
                          alt={agent.fullName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{agent.fullName}</h4>
                          <span className="text-xs text-slate-500">{agent.location.district}, {agent.location.state}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        agent.verificationStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : agent.verificationStatus === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {agent.verificationStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{agent.bio}</p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience:</span>
                        <span className="font-semibold text-slate-800">{agent.experienceYears} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Completed Cases:</span>
                        <span className="font-semibold text-emerald-700">{agent.totalApplicationsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Pricing Escrow:</span>
                        <span className="font-semibold text-slate-800">₹{agent.serviceFeeRange.min} – ₹{agent.serviceFeeRange.max}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    {agent.verificationStatus !== 'Verified' && (
                      <button
                        onClick={() => verifyAgentStatus(agent.id, 'Verified')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Agent</span>
                      </button>
                    )}
                    {agent.verificationStatus !== 'Rejected' && (
                      <button
                        onClick={() => verifyAgentStatus(agent.id, 'Rejected')}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject / Suspend</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Service Definitions */}
        {activeAdminTab === 'SERVICES' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Configured Citizen Services</h3>
                <p className="text-xs text-slate-500">Manage statutory fees, documents checklist, and official portal links</p>
              </div>
              <button
                onClick={() => showToast('New service definition draft initialized', 'info')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Government Service</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Service Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Issuing Authority</th>
                    <th className="py-3 px-4">Govt Fee</th>
                    <th className="py-3 px-4">Assistance Fee</th>
                    <th className="py-3 px-4">Timeline</th>
                    <th className="py-3 px-4">Portal Outbound</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{s.category}</td>
                      <td className="py-3.5 px-4 text-slate-600">{s.issuingAuthority}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {s.isGovernmentFeeFree ? 'Free (₹0)' : `₹${s.governmentFee}`}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-blue-600">₹{s.agentAssistanceFee}</td>
                      <td className="py-3.5 px-4 text-slate-500">{s.estimatedProcessingTime}</td>
                      <td className="py-3.5 px-4">
                        <a
                          href={s.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: Audit Logs Component */}
        {activeAdminTab === 'AUDIT' && (
          <AuditLogsTable 
            auditLogs={auditLogs} 
            showToast={showToast} 
          />
        )}

        {/* TAB 5: Support Tickets */}
        {activeAdminTab === 'TICKETS' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Citizen Support Tickets</h3>
              <p className="text-xs text-slate-500">Inquiries, escalation requests, and refund tickets</p>
            </div>

            <div className="divide-y divide-slate-100">
              {supportTickets.map(t => (
                <div key={t.id} className="p-5 hover:bg-slate-50/80 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {t.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{t.category}</span>
                      <span className="text-[10px] text-slate-400">Created: {t.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-600">{t.description}</p>
                    <div className="text-[11px] text-slate-400">
                      User: <strong>{t.userName}</strong> ({t.userEmail}) {t.applicationId && `• Related Case: ${t.applicationId}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {t.status}
                    </span>
                    <button
                      onClick={() => showToast(`Resolved ticket ${t.id}`, 'success')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      Resolve
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
