import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  User as UserIcon, 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle, 
  FileText, 
  Users, 
  Compass, 
  Bot, 
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userRole, 
    switchRole, 
    currentUser, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsRead,
    openAuthModal,
    setIsAiChatOpen,
    navigateToTrack,
    navigateToLegal,
    setSelectedServiceId,
    openSearchModal,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNav = (tab: any, serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="govease-main-header" className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              id="brand-logo-button"
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Gov<span className="text-blue-400">Ease</span>
                </span>
                <span className="text-[10px] block text-slate-400 font-medium tracking-wide uppercase">
                  Citizen Services & Brokerage
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1">
              <button
                id="nav-link-home"
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'home' ? 'text-blue-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Home
              </button>
              <button
                id="nav-link-services"
                onClick={() => handleNav('services')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'services' || activeTab === 'service-detail' ? 'text-blue-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Government Services
              </button>
              <button
                id="nav-link-certificates"
                onClick={() => {
                  setSearchQuery('Certificate');
                  handleNav('services');
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Certificates
              </button>
              <button
                id="nav-link-agents"
                onClick={() => handleNav('agents')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'agents' || activeTab === 'agent-detail' ? 'text-blue-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Find an Agent
              </button>
              <button
                id="nav-link-tracking"
                onClick={() => handleNav('tracking')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'tracking' ? 'text-blue-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Track Application
              </button>
              <button
                id="nav-link-support"
                onClick={() => handleNav('support')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'support' ? 'text-blue-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Help Center
              </button>
              <button
                id="nav-link-about"
                onClick={() => navigateToLegal('about')}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Quick Search Shortcut Button (Ctrl+K) */}
            <button
              id="btn-header-quick-search"
              onClick={openSearchModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer text-xs"
              title="Search services, certificates, and agents (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline text-slate-300">Quick Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                <span>Ctrl</span>+<span>K</span>
              </kbd>
            </button>

            {/* Quick AI Assistant Button */}
            <button
              id="btn-trigger-ai-chat"
              onClick={() => setIsAiChatOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40 text-blue-300 hover:text-white hover:border-blue-400 transition-all cursor-pointer"
              title="Ask GovEase AI Assistant"
            >
              <Bot className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>AI Assistant</span>
            </button>

            {/* Role Switcher Tester (Citizen / Agent / Admin) */}
            <div className="relative">
              <button
                id="btn-role-switcher-dropdown"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Switch simulated user role"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                <span className="text-slate-400">View:</span>
                <strong className="text-white font-semibold">
                  {userRole === 'USER' ? 'Citizen' : userRole === 'AGENT' ? 'Agent' : 'Admin'}
                </strong>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  id="dropdown-role-menu"
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Switch Test Persona
                  </div>
                  <button
                    id="role-switch-citizen"
                    onClick={() => { switchRole('USER'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${userRole === 'USER' ? 'text-blue-400 bg-slate-800/50' : 'text-slate-300'}`}
                  >
                    <div>
                      <div className="font-semibold text-white">Rahul Verma (Citizen)</div>
                      <div className="text-[10px] text-slate-400">Submit requests, upload docs, track status</div>
                    </div>
                    {userRole === 'USER' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button
                    id="role-switch-agent"
                    onClick={() => { switchRole('AGENT'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${userRole === 'AGENT' ? 'text-blue-400 bg-slate-800/50' : 'text-slate-300'}`}
                  >
                    <div>
                      <div className="font-semibold text-white">Raj Kumar (Verified Agent)</div>
                      <div className="text-[10px] text-slate-400">Verify client docs, accept cases, manage requests</div>
                    </div>
                    {userRole === 'AGENT' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button
                    id="role-switch-admin"
                    onClick={() => { switchRole('ADMIN'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${userRole === 'ADMIN' ? 'text-blue-400 bg-slate-800/50' : 'text-slate-300'}`}
                  >
                    <div>
                      <div className="font-semibold text-white">Priya Sharma (Platform Admin)</div>
                      <div className="text-[10px] text-slate-400">Review agents, monitor analytics, oversee cases</div>
                    </div>
                    {userRole === 'ADMIN' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notifications-toggle"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 relative transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-950 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div 
                  id="dropdown-notifications-panel"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications ({unreadCount} new)</span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        id="btn-mark-all-read"
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          id={`notification-item-${n.id}`}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.relatedApplicationId) {
                              navigateToTrack(n.relatedApplicationId);
                              setNotifDropdownOpen(false);
                            }
                          }}
                          className={`p-3 text-xs hover:bg-slate-800/80 cursor-pointer transition-colors ${
                            !n.read ? 'bg-blue-950/30' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className={`font-semibold ${!n.read ? 'text-blue-300' : 'text-slate-200'}`}>
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.createdAt}</span>
                          </div>
                          <p className="text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 bg-slate-950/60 border-t border-slate-800 text-center">
                    <button
                      id="btn-view-all-dashboard-notifs"
                      onClick={() => { handleNav('dashboard'); setNotifDropdownOpen(false); }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open User Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard / User Account CTA */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                id="btn-header-dashboard"
                onClick={() => handleNav('dashboard')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-600">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span>{currentUser.name.split(' ')[0]}'s {userRole === 'ADMIN' ? 'Admin' : userRole === 'AGENT' ? 'Portal' : 'Dashboard'}</span>
              </button>

              <button
                id="btn-header-get-started"
                onClick={() => handleNav('services')}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              id="mobile-nav-home"
              onClick={() => handleNav('home')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              Home
            </button>
            <button
              id="mobile-nav-services"
              onClick={() => handleNav('services')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              Services Directory
            </button>
            <button
              id="mobile-nav-agents"
              onClick={() => handleNav('agents')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'agents' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              Find Agents
            </button>
            <button
              id="mobile-nav-track"
              onClick={() => handleNav('tracking')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'tracking' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              Track Application
            </button>
            <button
              id="mobile-nav-dashboard"
              onClick={() => handleNav('dashboard')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              My Dashboard
            </button>
            <button
              id="mobile-nav-support"
              onClick={() => handleNav('support')}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${activeTab === 'support' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800/60'}`}
            >
              Help Center
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              id="mobile-btn-ai-assistant"
              onClick={() => { setIsAiChatOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40"
            >
              <Bot className="w-4 h-4" />
              <span>Ask GovEase AI Assistant</span>
            </button>
            <button
              id="mobile-btn-login-modal"
              onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-slate-800 text-white text-center"
            >
              Switch Account / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
