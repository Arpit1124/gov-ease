import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Clock, 
  User, 
  Shield, 
  Bot, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Server,
  Activity,
  Layers
} from 'lucide-react';
import { AuditLog } from '../../types';
import { 
  fetchAuditLogsFromDb, 
  exportAuditLogsAsCsv, 
  exportAuditLogsAsJson,
  AuditLogQueryResult 
} from '../../services/auditLogService';

interface AuditLogsTableProps {
  auditLogs: AuditLog[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  standalone?: boolean;
}

export const AuditLogsTable: React.FC<AuditLogsTableProps> = ({ 
  auditLogs, 
  showToast,
  standalone = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'timestamp' | 'userName' | 'action'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<AuditLogQueryResult | null>(null);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  // Fetch from the audit_logs database table whenever query params or source logs change
  const executeDbQuery = async (showLoadingAnimation = true) => {
    if (showLoadingAnimation) setIsLoading(true);
    try {
      const result = await fetchAuditLogsFromDb(auditLogs, {
        searchTerm,
        role: roleFilter,
        action: actionFilter,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
        simulatedDelayMs: showLoadingAnimation ? 160 : 0
      });
      setQueryResult(result);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      showToast('Error querying audit_logs database table', 'error');
    } finally {
      if (showLoadingAnimation) setIsLoading(false);
    }
  };

  useEffect(() => {
    executeDbQuery(true);
  }, [searchTerm, roleFilter, actionFilter, sortBy, sortOrder, currentPage, pageSize, auditLogs]);

  // Close audit record modal on Escape key
  useEffect(() => {
    if (!selectedLog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedLog(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLog]);

  // Unique actions list for filter dropdown
  const uniqueActions = useMemo(() => {
    const set = new Set<string>();
    auditLogs.forEach(l => set.add(l.action));
    return Array.from(set).sort();
  }, [auditLogs]);

  const handleManualRefresh = () => {
    executeDbQuery(true);
    showToast('Re-queried audit_logs database table successfully', 'success');
  };

  const handleExportCsv = () => {
    const logsToExport = queryResult?.logs || auditLogs;
    exportAuditLogsAsCsv(logsToExport, `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    showToast(`Exported ${logsToExport.length} audit logs as CSV`, 'success');
  };

  const handleExportJson = () => {
    const logsToExport = queryResult?.logs || auditLogs;
    exportAuditLogsAsJson(logsToExport, `audit_logs_dump_${Date.now()}.json`);
    showToast('Exported audit_logs records as JSON', 'success');
  };

  // Helper for role badge icon & styling
  const renderActorBadge = (log: AuditLog) => {
    const role = log.role || (
      log.userName.includes('Admin') ? 'ADMIN' :
      log.userName.includes('Agent') ? 'AGENT' :
      log.userName.includes('System') || log.userName.includes('Bot') ? 'SYSTEM' : 'USER'
    );

    if (role === 'ADMIN') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <Shield className="w-2.5 h-2.5" />
          Admin
        </span>
      );
    }
    if (role === 'AGENT') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <Briefcase className="w-2.5 h-2.5" />
          Agent
        </span>
      );
    }
    if (role === 'SYSTEM') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
          <Bot className="w-2.5 h-2.5" />
          System
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <User className="w-2.5 h-2.5" />
        Citizen
      </span>
    );
  };

  // Helper for action badge color styling
  const getActionBadgeStyle = (action: string) => {
    if (action.includes('VERIFIED') || action.includes('APPROVED') || action.includes('RESOLVED')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (action.includes('PAYMENT') || action.includes('ESCROW')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    if (action.includes('SUBMITTED') || action.includes('CREATED')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (action.includes('NOTICE') || action.includes('WARNING') || action.includes('DEFICIT')) {
      return 'bg-orange-50 text-orange-800 border-orange-200';
    }
    if (action.includes('SECURITY') || action.includes('CHECK') || action.includes('AUDIT')) {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  // Helper for relative time formatting
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 5) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  return (
    <div id="audit-logs-component" className="space-y-4">
      {/* Database Status & Table Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white tracking-tight">Platform Audit Logs</h3>
              <span className="font-mono text-[11px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded border border-slate-700">
                table: audit_logs
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Querying platform actions, actor role credentials, and status transitions from the immutable audit trail.
            </p>
          </div>
        </div>

        {/* Database Query Stats & Export Actions */}
        <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
          {queryResult && (
            <div className="text-right hidden sm:block mr-1">
              <span className="text-[10px] text-slate-400 block font-mono">
                {queryResult.queryMetadata.executionTimeMs}ms • {queryResult.totalCount} rows matched
              </span>
              <span className="text-[10px] text-slate-500">
                Last queried: {lastRefreshed}
              </span>
            </div>
          )}

          <button
            id="btn-refresh-audit-logs"
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            title="Execute query on audit_logs database table"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : 'text-slate-300'}`} />
            <span>{isLoading ? 'Querying...' : 'Query DB'}</span>
          </button>

          <button
            id="btn-export-audit-csv"
            onClick={handleExportCsv}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download CSV of filtered audit logs"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>CSV</span>
          </button>

          <button
            id="btn-export-audit-json"
            onClick={handleExportJson}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download JSON dump of audit logs"
          >
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Query Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-audit-logs"
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search user, action, log ID, entity..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Actor Role Filter */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <label htmlFor="select-audit-role" className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Actor:
            </label>
            <select
              id="select-audit-role"
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Actors ({auditLogs.length})</option>
              <option value="USER">Citizen / Applicants</option>
              <option value="AGENT">Documentation Agents</option>
              <option value="ADMIN">Platform Administrators</option>
              <option value="SYSTEM">Automated System Workers</option>
            </select>
          </div>

          {/* Action Filter */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <label htmlFor="select-audit-action" className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Action:
            </label>
            <select
              id="select-audit-action"
              value={actionFilter}
              onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Actions</option>
              {uniqueActions.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>

          {/* Sort Order Toggle */}
          <div className="lg:col-span-2 flex items-center justify-end gap-1.5">
            <select
              id="select-audit-sort"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-');
                setSortBy(sb as any);
                setSortOrder(so as any);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="timestamp-desc">Newest First</option>
              <option value="timestamp-asc">Oldest First</option>
              <option value="userName-asc">Actor (A-Z)</option>
              <option value="action-asc">Action Name</option>
            </select>
          </div>
        </div>

        {/* Active Filters Bar */}
        {(searchTerm || roleFilter !== 'ALL' || actionFilter !== 'ALL') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-500 flex-wrap">
              <span>Active filters:</span>
              {searchTerm && (
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[11px]">
                  search: "{searchTerm}"
                </span>
              )}
              {roleFilter !== 'ALL' && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                  role: {roleFilter}
                </span>
              )}
              {actionFilter !== 'ALL' && (
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                  action: {actionFilter}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('ALL');
                setActionFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer whitespace-nowrap"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Log ID</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">User / Actor</th>
                <th className="py-3 px-4 font-semibold">Platform Action</th>
                <th className="py-3 px-4 font-semibold">Entity Target</th>
                <th className="py-3 px-4 font-semibold">Details & Context</th>
                <th className="py-3 px-4 font-semibold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                      <span className="text-xs font-medium">Querying audit_logs database records...</span>
                    </div>
                  </td>
                </tr>
              ) : !queryResult || queryResult.logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="space-y-1">
                      <FileText className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-sm font-bold text-slate-600">No audit logs match current filters</p>
                      <p className="text-xs text-slate-400">Try adjusting your search terms or clearing role filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                queryResult.logs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-slate-50/90 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    {/* Log ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                        <span>{log.id}</span>
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-mono text-slate-700 font-semibold">{log.timestamp}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{formatRelativeTime(log.timestamp)}</span>
                      </div>
                    </td>

                    {/* User / Actor */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                          {log.userName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{log.userName}</span>
                          <div className="mt-0.5">
                            {renderActorBadge(log)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-block font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getActionBadgeStyle(log.action)}`}>
                        {log.action}
                      </span>
                    </td>

                    {/* Entity Target */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800">{log.entityType}</span>
                        <span className="font-mono text-[10px] text-blue-600 hover:underline">{log.entityId}</span>
                      </div>
                    </td>

                    {/* Details & Context */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs md:max-w-md">
                      <p className="truncate text-xs font-normal" title={log.details}>
                        {log.details}
                      </p>
                      {log.ipAddress && (
                        <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                          IP: {log.ipAddress}
                        </span>
                      )}
                    </td>

                    {/* Inspect Button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(log);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="View audit record metadata"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {queryResult && queryResult.totalCount > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-slate-400 ml-1">
                Showing {Math.min((currentPage - 1) * pageSize + 1, queryResult.totalCount)} - {Math.min(currentPage * pageSize, queryResult.totalCount)} of {queryResult.totalCount} audit logs
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Page {currentPage} of {queryResult.totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(queryResult.totalPages, p + 1))}
                  disabled={currentPage >= queryResult.totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Audit Log Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-bold">Audit Record Details</h4>
                  <span className="font-mono text-xs text-slate-400">{selectedLog.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Timestamp</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedLog.timestamp}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Database Status</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified & Sealed
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Actor</span>
                  <span className="font-semibold text-slate-900">{selectedLog.userName}</span>
                  <div className="mt-1">{renderActorBadge(selectedLog)}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Actor ID</span>
                  <span className="font-mono text-slate-600">{selectedLog.userId}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Action Executed</span>
                <span className={`inline-block font-mono font-bold text-xs px-3 py-1.5 rounded-lg border ${getActionBadgeStyle(selectedLog.action)}`}>
                  {selectedLog.action}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Entity</span>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                  <span className="text-slate-500">{selectedLog.entityType}:</span>
                  <span className="font-bold text-blue-600">{selectedLog.entityId}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Event Context / Details</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedLog.details}
                </div>
              </div>

              {selectedLog.ipAddress && (
                <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-100 font-mono text-[11px]">
                  <span>Origin IP: {selectedLog.ipAddress}</span>
                  <span>Engine: public.audit_logs</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
