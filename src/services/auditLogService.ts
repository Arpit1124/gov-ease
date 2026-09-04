import { AuditLog } from '../types';

export interface AuditLogQueryParams {
  searchTerm?: string;
  role?: string;
  action?: string;
  entityType?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'timestamp' | 'userName' | 'action';
  sortOrder?: 'asc' | 'desc';
  simulatedDelayMs?: number;
}

export interface AuditLogQueryResult {
  logs: AuditLog[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  queryMetadata: {
    tableName: string;
    executionTimeMs: number;
    rowCountTotal: number;
    databaseEngine: string;
    schema: string;
    fetchedAt: string;
  };
}

/**
 * Service to simulate asynchronous queries against the 'audit_logs' database table.
 * Supports filtering, searching, sorting, and pagination with realistic database metrics.
 */
export async function fetchAuditLogsFromDb(
  sourceLogs: AuditLog[],
  params: AuditLogQueryParams = {}
): Promise<AuditLogQueryResult> {
  const startTime = performance.now();
  const {
    searchTerm = '',
    role = 'ALL',
    action = 'ALL',
    entityType = 'ALL',
    page = 1,
    pageSize = 10,
    sortBy = 'timestamp',
    sortOrder = 'desc',
    simulatedDelayMs = 120
  } = params;

  // Simulate network/database I/O latency
  if (simulatedDelayMs > 0) {
    await new Promise(resolve => setTimeout(resolve, simulatedDelayMs));
  }

  let filtered = [...sourceLogs];

  // Role filter
  if (role && role !== 'ALL') {
    filtered = filtered.filter(log => {
      if (log.role) return log.role === role;
      const lowerUser = log.userName.toLowerCase();
      if (role === 'ADMIN') return lowerUser.includes('admin');
      if (role === 'AGENT') return lowerUser.includes('agent');
      if (role === 'SYSTEM') return lowerUser.includes('system') || lowerUser.includes('bot') || lowerUser.includes('automator');
      return !lowerUser.includes('admin') && !lowerUser.includes('agent') && !lowerUser.includes('system');
    });
  }

  // Action filter
  if (action && action !== 'ALL') {
    filtered = filtered.filter(log => log.action === action);
  }

  // Entity Type filter
  if (entityType && entityType !== 'ALL') {
    filtered = filtered.filter(log => log.entityType === entityType);
  }

  // Search filter
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(log => 
      log.id.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      log.entityId.toLowerCase().includes(q) ||
      log.entityType.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      (log.ipAddress && log.ipAddress.includes(q))
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'timestamp') {
      comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === 'userName') {
      comparison = a.userName.localeCompare(b.userName);
    } else if (sortBy === 'action') {
      comparison = a.action.localeCompare(b.action);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (safePage - 1) * pageSize;
  const paginatedLogs = filtered.slice(startIndex, startIndex + pageSize);

  const endTime = performance.now();
  const executionTimeMs = Math.round((endTime - startTime) * 10) / 10;

  return {
    logs: paginatedLogs,
    totalCount,
    totalPages,
    currentPage: safePage,
    queryMetadata: {
      tableName: 'public.audit_logs',
      executionTimeMs: Math.max(executionTimeMs, 14.5),
      rowCountTotal: sourceLogs.length,
      databaseEngine: 'PostgreSQL Relational DB / audit_logs cluster',
      schema: 'public',
      fetchedAt: new Date().toISOString()
    }
  };
}

/**
 * Exports audit logs to downloadable CSV format.
 */
export function exportAuditLogsAsCsv(logs: AuditLog[], filename = 'audit_logs_export.csv') {
  const headers = ['Log ID', 'Timestamp', 'Actor Name', 'Actor Role', 'Action', 'Entity Type', 'Entity ID', 'IP Address', 'Status', 'Details'];
  const rows = logs.map(l => [
    `"${l.id}"`,
    `"${l.timestamp}"`,
    `"${l.userName.replace(/"/g, '""')}"`,
    `"${l.role || 'USER'}"`,
    `"${l.action}"`,
    `"${l.entityType}"`,
    `"${l.entityId}"`,
    `"${l.ipAddress || 'N/A'}"`,
    `"${l.status || 'SUCCESS'}"`,
    `"${l.details.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports audit logs to formatted JSON format.
 */
export function exportAuditLogsAsJson(logs: AuditLog[], filename = 'audit_logs_dump.json') {
  const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', jsonContent);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
