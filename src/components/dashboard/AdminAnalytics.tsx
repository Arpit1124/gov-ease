import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';
import { Application, GovernmentService, ServiceCategory } from '../../types';

interface AdminAnalyticsProps {
  applications: Application[];
  services: GovernmentService[];
}

// Harmonious, high-contrast accessible color palette for Recharts
const CATEGORY_COLORS: Record<string, string> = {
  'Certificates': '#2563eb', // Blue
  'Identity & Documentation': '#7c3aed', // Violet
  'Business': '#059669', // Emerald
  'Property': '#d97706', // Amber
  'Licenses': '#dc2626', // Red
};

const SERVICE_PALETTE = [
  '#2563eb', '#3b82f6', '#0284c7', '#0891b2', 
  '#059669', '#10b981', '#7c3aed', '#8b5cf6', 
  '#d97706', '#f59e0b', '#e11d48', '#f43f5e'
];

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ 
  applications, 
  services 
}) => {
  const [timeRange, setTimeRange] = useState<'7D' | '14D' | '30D'>('14D');
  const [dailyChartType, setDailyChartType] = useState<'AREA' | 'BAR'>('AREA');
  const [serviceViewMode, setServiceViewMode] = useState<'BAR' | 'DONUT'>('BAR');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Baseline reference date: Sep 04, 2026
  const referenceDate = new Date('2026-09-04T12:00:00');

  // Generate continuous date series for the selected timeframe
  const dailyAnalyticsData = useMemo(() => {
    const daysCount = timeRange === '7D' ? 7 : timeRange === '14D' ? 14 : 30;
    const dateMap = new Map<string, { 
      date: string; 
      label: string; 
      fullDate: string;
      total: number; 
      agentAssisted: number; 
      selfService: number;
      completed: number;
      escrowVolume: number;
    }>();

    // Initialize all dates in window
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(referenceDate);
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().split('T')[0];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const label = `${monthNames[d.getMonth()]} ${d.getDate()}`;
      const fullDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

      // Seed baseline realistic traffic proportional to day of week
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const baseSeed = isWeekend ? 38 + (i % 7) * 4 : 72 + ((i * 13) % 45);

      dateMap.set(isoDate, {
        date: isoDate,
        label,
        fullDate,
        total: baseSeed,
        agentAssisted: Math.round(baseSeed * 0.78),
        selfService: Math.round(baseSeed * 0.22),
        completed: Math.round(baseSeed * 0.65),
        escrowVolume: baseSeed * 540
      });
    }

    // Incorporate live applications from the application store
    applications.forEach(app => {
      const appDate = app.submittedAt ? app.submittedAt.split('T')[0] : '2026-09-04';
      if (dateMap.has(appDate)) {
        const item = dateMap.get(appDate)!;
        item.total += 1;
        if (app.isSelfService) {
          item.selfService += 1;
        } else {
          item.agentAssisted += 1;
        }
        if (app.status === 'COMPLETED' || app.status === 'CERTIFICATE_READY') {
          item.completed += 1;
        }
        item.escrowVolume += app.totalPaid || 589;
      }
    });

    return Array.from(dateMap.values());
  }, [applications, timeRange]);

  // Aggregate applications by Service
  const serviceAnalyticsData = useMemo(() => {
    // Map existing services with baseline counts plus dynamic additions
    const countsMap = new Map<string, {
      serviceId: string;
      serviceName: string;
      category: ServiceCategory;
      count: number;
      revenue: number;
      avgDays: string;
    }>();

    // Populate catalog defaults
    services.forEach((s, idx) => {
      // Baseline synthetic distribution for rich visualization
      const baseCount = [184, 156, 132, 118, 95, 84, 72, 65, 54, 48, 42, 38][idx % 12] || 35;
      countsMap.set(s.id, {
        serviceId: s.id,
        serviceName: s.name,
        category: s.category,
        count: baseCount,
        revenue: baseCount * (s.platformFee + s.agentAssistanceFee),
        avgDays: s.estimatedProcessingTime || '3-5 days'
      });
    });

    // Add live applications
    applications.forEach(app => {
      if (countsMap.has(app.serviceId)) {
        const item = countsMap.get(app.serviceId)!;
        item.count += 1;
        item.revenue += app.totalPaid || 450;
      } else {
        countsMap.set(app.serviceId, {
          serviceId: app.serviceId,
          serviceName: app.serviceName,
          category: app.serviceCategory,
          count: 1,
          revenue: app.totalPaid || 450,
          avgDays: '3-7 days'
        });
      }
    });

    let list = Array.from(countsMap.values());

    // Filter by category if selected
    if (selectedCategory !== 'ALL') {
      list = list.filter(item => item.category === selectedCategory);
    }

    // Sort descending by application count
    return list.sort((a, b) => b.count - a.count);
  }, [applications, services, selectedCategory]);

  // Aggregate distribution by Service Category for Donut Chart
  const categoryDonutData = useMemo(() => {
    const categoryTotals = new Map<string, number>();

    serviceAnalyticsData.forEach(s => {
      const current = categoryTotals.get(s.category) || 0;
      categoryTotals.set(s.category, current + s.count);
    });

    const totalAll = Array.from(categoryTotals.values()).reduce((a, b) => a + b, 0) || 1;

    return Array.from(categoryTotals.entries()).map(([category, count]) => ({
      name: category,
      value: count,
      percentage: Math.round((count / totalAll) * 100)
    }));
  }, [serviceAnalyticsData]);

  // Overall KPIs for the selected timeframe
  const summaryMetrics = useMemo(() => {
    const totalDaily = dailyAnalyticsData.reduce((acc, d) => acc + d.total, 0);
    const peakDay = dailyAnalyticsData.reduce((max, d) => d.total > max.total ? d : max, dailyAnalyticsData[0] || { total: 0, label: 'N/A' });
    const dailyAvg = Math.round(totalDaily / dailyAnalyticsData.length);
    const topService = serviceAnalyticsData[0] || { serviceName: 'Income Certificate', count: 0 };
    const totalRevenue = dailyAnalyticsData.reduce((acc, d) => acc + d.escrowVolume, 0);

    return {
      totalDaily,
      peakDay,
      dailyAvg,
      topService,
      totalRevenue
    };
  }, [dailyAnalyticsData, serviceAnalyticsData]);

  // Custom Tooltip for Daily Applications Chart
  const CustomDailyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between">
            <span>{data.fullDate}</span>
            <span className="text-[10px] font-mono text-blue-400">Total: {data.total}</span>
          </div>
          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Agent Assisted:
              </span>
              <span className="font-mono font-bold text-white">{data.agentAssisted}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Self-Service:
              </span>
              <span className="font-mono font-bold text-white">{data.selfService}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Completed / Ready:
              </span>
              <span className="font-mono font-bold text-white">{data.completed}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Escrow Value:</span>
              <span className="font-mono font-bold text-emerald-400">₹{data.escrowVolume.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Services Chart
  const CustomServiceTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[220px]">
          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
            {data.serviceName || data.name}
          </div>
          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-center text-slate-300">
              <span>Total Filings:</span>
              <span className="font-mono font-bold text-blue-400">{data.count || data.value}</span>
            </div>
            {data.category && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Category:</span>
                <span className="text-slate-200 font-semibold">{data.category}</span>
              </div>
            )}
            {data.revenue && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Gross Facilitated:</span>
                <span className="font-mono font-bold text-emerald-400">₹{data.revenue.toLocaleString()}</span>
              </div>
            )}
            {data.percentage && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Share of Volume:</span>
                <span className="font-mono font-bold text-purple-400">{data.percentage}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="admin-analytics-section" className="space-y-6">
      {/* Top Header & Timeframe Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Interactive Platform Analytics</h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Recharts Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time visual breakdown of citizen application velocity, peak days, and service demand distribution.
          </p>
        </div>

        {/* Global Timeframe Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-stretch sm:self-auto justify-center">
          <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Window:
          </span>
          {(['7D', '14D', '30D'] as const).map(range => (
            <button
              key={range}
              id={`analytics-timeframe-${range.toLowerCase()}`}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === '7D' ? 'Last 7 Days' : range === '14D' ? 'Last 14 Days' : 'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Applications in Window</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              +16.4%
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{summaryMetrics.totalDaily.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 font-medium">Across all revenue circles</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Peak Daily Inflow</span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {summaryMetrics.peakDay.label}
            </span>
          </div>
          <div className="text-2xl font-black text-blue-600">{summaryMetrics.peakDay.total} cases</div>
          <p className="text-[11px] text-slate-500 font-medium">Daily avg: {summaryMetrics.dailyAvg} / day</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Top Service Category</span>
            <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              Rank #1
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 truncate" title={summaryMetrics.topService.serviceName}>
            {summaryMetrics.topService.serviceName}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">{summaryMetrics.topService.count} filed requests</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Escrow Value Flow</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              100% Protected
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            ₹{summaryMetrics.totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Citizen & Agent escrow</p>
        </div>
      </div>

      {/* CHART 1: APPLICATIONS PER DAY */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Applications per Day</h3>
              <span className="text-xs text-slate-400 font-mono">({timeRange} window)</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily trajectory of assistance requests, verified broker filings, and self-service direct portals.
            </p>
          </div>

          {/* Chart Type Toggle: Area vs Bar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="btn-daily-chart-area"
                onClick={() => setDailyChartType('AREA')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  dailyChartType === 'AREA'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Area Wave</span>
              </button>
              <button
                id="btn-daily-chart-bar"
                onClick={() => setDailyChartType('BAR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  dailyChartType === 'BAR'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Bar Columns</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recharts Canvas for Daily Applications */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {dailyChartType === 'AREA' ? (
              <AreaChart data={dailyAnalyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomDailyTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  name="Total Inflow" 
                  stroke="#2563eb" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  name="Completed / Delivered" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorCompleted)" 
                />
              </AreaChart>
            ) : (
              <BarChart data={dailyAnalyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomDailyTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }} 
                />
                <Bar 
                  dataKey="agentAssisted" 
                  name="Agent Assisted" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                  stackId="a"
                />
                <Bar 
                  dataKey="selfService" 
                  name="Self-Service Portal" 
                  fill="#38bdf8" 
                  radius={[4, 4, 0, 0]} 
                  stackId="a"
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: APPLICATIONS BY SERVICE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Applications by Service</h3>
              <span className="text-xs text-slate-400 font-mono">({serviceAnalyticsData.length} active services)</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Volume distribution across state revenue certificates, documentation registries, and business licenses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="select-analytics-category" className="text-xs font-bold text-slate-600 flex items-center gap-1 whitespace-nowrap">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Category:
              </label>
              <select
                id="select-analytics-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="Certificates">Certificates</option>
                <option value="Identity & Documentation">Identity & Documentation</option>
                <option value="Business">Business</option>
                <option value="Property">Property</option>
                <option value="Licenses">Licenses</option>
              </select>
            </div>

            {/* View Switch: Ranked Bar vs Category Donut */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="btn-service-view-bar"
                onClick={() => setServiceViewMode('BAR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  serviceViewMode === 'BAR'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Service Rank</span>
              </button>
              <button
                id="btn-service-view-donut"
                onClick={() => setServiceViewMode('DONUT')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  serviceViewMode === 'DONUT'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PieChartIcon className="w-3.5 h-3.5" />
                <span>Category Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recharts Canvas for Applications by Service */}
        {serviceViewMode === 'BAR' ? (
          <div className="h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serviceAnalyticsData.slice(0, 10)}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 60, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis 
                  type="category" 
                  dataKey="serviceName" 
                  tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }} 
                  axisLine={false}
                  tickLine={false}
                  width={140}
                />
                <Tooltip content={<CustomServiceTooltip />} />
                <Bar 
                  dataKey="count" 
                  name="Applications Filed" 
                  radius={[0, 6, 6, 0]}
                >
                  {serviceAnalyticsData.slice(0, 10).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.category] || SERVICE_PALETTE[index % SERVICE_PALETTE.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            <div className="md:col-span-7 h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDonutData.map((entry, index) => (
                      <Cell 
                        key={`donut-cell-${index}`} 
                        fill={CATEGORY_COLORS[entry.name] || SERVICE_PALETTE[index % SERVICE_PALETTE.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomServiceTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Legend Breakdown */}
            <div className="md:col-span-5 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category Proportions</h4>
              <div className="space-y-2">
                {categoryDonutData.map((cat, idx) => (
                  <div 
                    key={cat.name} 
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full shrink-0" 
                        style={{ backgroundColor: CATEGORY_COLORS[cat.name] || SERVICE_PALETTE[idx % SERVICE_PALETTE.length] }} 
                      />
                      <span className="font-semibold text-slate-800">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500">{cat.value} files</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Service Table Snippet */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2">
            <span>Top Performing Services Breakdown</span>
            <span>Showing top {Math.min(serviceAnalyticsData.length, 6)} services</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {serviceAnalyticsData.slice(0, 6).map((service, idx) => (
              <div 
                key={service.serviceId} 
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">#{idx + 1}</span>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${CATEGORY_COLORS[service.category]}15`,
                      color: CATEGORY_COLORS[service.category] || '#2563eb'
                    }}
                  >
                    {service.category}
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 truncate" title={service.serviceName}>
                  {service.serviceName}
                </h5>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span className="text-slate-500">Volume: <strong className="text-slate-800">{service.count}</strong></span>
                  <span className="text-emerald-700 font-mono font-bold">₹{service.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
