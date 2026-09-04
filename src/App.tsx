import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HomeLanding } from './components/home/HomeLanding';
import { ServicesDirectory } from './components/services/ServicesDirectory';
import { ServiceDetailPage } from './components/services/ServiceDetailPage';
import { ApplicationWizard } from './components/application/ApplicationWizard';
import { ApplicationTracker } from './components/tracking/ApplicationTracker';
import { AgentMarketplace } from './components/agents/AgentMarketplace';
import { DashboardDispatcher } from './components/dashboard/DashboardDispatcher';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { ChatModal } from './components/messaging/ChatModal';
import { AuthModal } from './components/auth/AuthModal';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { PrintableReceiptModal } from './components/payment/PrintableReceiptModal';
import { EmailNotificationModal } from './components/notifications/EmailNotificationModal';
import { SupportCenter } from './components/support/SupportCenter';
import { LegalPage } from './components/legal/LegalPage';

const AppContent: React.FC = () => {
  const { activeTab, openSearchModal, closeAllModals } = useApp();

  // Global keyboard shortcut listener:
  // Opens search modal on 'Ctrl+K' (or Cmd+K) and closes any open modal on 'Esc'
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open search modal on Ctrl+K or Cmd+K
      if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        openSearchModal();
      }
      // Close any open modal on Escape
      else if (event.key === 'Escape' || event.key === 'Esc') {
        closeAllModals();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSearchModal, closeAllModals]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Mandatory Platform Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Top Universal Nav & Role Switcher */}
      <Header />

      {/* Main Dynamic View Outlet */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeLanding />}
        {activeTab === 'services' && <ServicesDirectory />}
        {activeTab === 'service-detail' && <ServiceDetailPage />}
        {activeTab === 'apply' && <ApplicationWizard />}
        {(activeTab === 'track' || activeTab === 'tracking') && <ApplicationTracker />}
        {(activeTab === 'agents' || activeTab === 'agent-detail') && <AgentMarketplace />}
        {activeTab === 'dashboard' && <DashboardDispatcher />}
        {activeTab === 'support' && <SupportCenter />}
        {activeTab === 'legal' && <LegalPage />}
      </main>

      {/* Footer with Mandatory Disclaimers and Links */}
      <Footer />

      {/* Global Interactive Overlays */}
      <QuickSearchModal />
      <PrintableReceiptModal />
      <EmailNotificationModal />
      <AIAssistantModal />
      <ChatModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
