import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  User, 
  UserRole, 
  Agent, 
  GovernmentService, 
  Application, 
  PaymentTransaction, 
  NotificationItem, 
  ChatMessage, 
  Review, 
  SupportTicket, 
  AuditLog,
  ApplicationStatus,
  EmailNotificationLog
} from '../types';
import { 
  DEMO_USERS, 
  MOCK_SERVICES, 
  MOCK_AGENTS, 
  MOCK_APPLICATIONS, 
  MOCK_PAYMENTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_MESSAGES, 
  MOCK_REVIEWS, 
  MOCK_SUPPORT_TICKETS, 
  MOCK_AUDIT_LOGS,
  MOCK_EMAIL_LOGS
} from '../data/mockData';
import { processApplicationStatusTransition } from '../services/applicationService';

export type NavigationTab = 
  | 'home'
  | 'services'
  | 'service-detail'
  | 'apply'
  | 'tracking'
  | 'agents'
  | 'agent-detail'
  | 'dashboard'
  | 'support'
  | 'legal';

interface AppContextType {
  currentUser: User;
  userRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  trackingQuery: string;
  setTrackingQuery: (q: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  legalPageType: 'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms';
  setLegalPageType: (type: 'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms') => void;

  services: GovernmentService[];
  agents: Agent[];
  applications: Application[];
  payments: PaymentTransaction[];
  notifications: NotificationItem[];
  messages: ChatMessage[];
  reviews: Review[];
  supportTickets: SupportTicket[];
  auditLogs: AuditLog[];

  navigateToService: (serviceId: string) => void;
  navigateToApply: (serviceId: string, preselectedAgentId?: string) => void;
  navigateToAgent: (agentId: string) => void;
  navigateToTrack: (appId?: string) => void;
  navigateToLegal: (type: 'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms') => void;

  submitNewApplication: (newApp: Partial<Application>) => string;
  updateApplicationStatus: (appId: string, status: ApplicationStatus, note?: string) => void;
  triggerApplicationUpdate: (appId: string, status: ApplicationStatus, note?: string) => void;
  addChatMessage: (appId: string, text: string, isDocReq?: boolean, docReqName?: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  verifyAgentStatus: (agentId: string, status: 'Verified' | 'Rejected' | 'Under Review' | 'Suspended') => void;
  createSupportTicket: (ticket: Partial<SupportTicket>) => void;
  addReview: (rev: Partial<Review>) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;

  // Automated Email Notification Service
  emailNotificationLogs: EmailNotificationLog[];
  selectedEmailPreview: EmailNotificationLog | null;
  setSelectedEmailPreview: (log: EmailNotificationLog | null) => void;
  simulateStatusChangeWithEmail: (appId: string, status?: ApplicationStatus, note?: string) => void;

  // Modals
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'otp';
  openAuthModal: (tab?: 'login' | 'register' | 'otp') => void;
  closeAuthModal: () => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
  isDocCheckerOpen: boolean;
  setIsDocCheckerOpen: (open: boolean) => void;
  activeChatApplicationId: string | null;
  setActiveChatApplicationId: (appId: string | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  printableReceiptTransaction: PaymentTransaction | null;
  openPrintableReceipt: (txn: PaymentTransaction) => void;
  closePrintableReceipt: () => void;
  closeAllModals: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('USER');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.USER);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [trackingQuery, setTrackingQuery] = useState<string>('GE-2026-001245');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [legalPageType, setLegalPageType] = useState<'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms'>('disclaimer');

  const [services] = useState<GovernmentService[]>(MOCK_SERVICES);
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [emailNotificationLogs, setEmailNotificationLogs] = useState<EmailNotificationLog[]>(MOCK_EMAIL_LOGS);
  const [selectedEmailPreview, setSelectedEmailPreview] = useState<EmailNotificationLog | null>(null);

  // Modals & Popups
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'otp'>('login');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isDocCheckerOpen, setIsDocCheckerOpen] = useState(false);
  const [activeChatApplicationId, setActiveChatApplicationId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [printableReceiptTransaction, setPrintableReceiptTransaction] = useState<PaymentTransaction | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const switchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    setCurrentUser(DEMO_USERS[newRole]);
    showToast(`Switched view to ${newRole === 'USER' ? 'Citizen (User)' : newRole === 'AGENT' ? 'Verified Agent' : 'Platform Administrator'}`, 'info');
  };

  const navigateToService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToApply = (serviceId: string, preselectedAgentId?: string) => {
    setSelectedServiceId(serviceId);
    if (preselectedAgentId) {
      setSelectedAgentId(preselectedAgentId);
    }
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setActiveTab('agent-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTrack = (appId?: string) => {
    if (appId) {
      setTrackingQuery(appId);
    }
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLegal = (type: 'about' | 'disclaimer' | 'terms' | 'privacy' | 'refund' | 'agent-terms') => {
    setLegalPageType(type);
    setActiveTab('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (tab: 'login' | 'register' | 'otp' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const submitNewApplication = (newApp: Partial<Application>): string => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `GE-2026-00${randomSuffix}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const completedApp: Application = {
      id: newId,
      userId: currentUser.id,
      userName: newApp.applicantDetails?.fullName || currentUser.name,
      userEmail: newApp.applicantDetails?.email || currentUser.email,
      userPhone: newApp.applicantDetails?.phone || currentUser.phone,
      serviceId: newApp.serviceId || 'srv_income',
      serviceName: newApp.serviceName || 'Certificate Service',
      serviceCategory: newApp.serviceCategory || 'Certificates',
      agentId: newApp.agentId,
      agentName: newApp.agentName,
      agentFee: newApp.agentFee || 0,
      governmentFee: newApp.governmentFee || 0,
      platformFee: newApp.platformFee || 99,
      totalPaid: newApp.totalPaid || 589,
      isSelfService: !!newApp.isSelfService,
      status: 'DOCUMENTS_SUBMITTED',
      statusLabel: newApp.isSelfService ? 'Self-Service Documents Ready' : 'Documents Submitted for Verification',
      submittedAt: dateStr,
      estimatedCompletionDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicantDetails: newApp.applicantDetails || {
        fullName: currentUser.name,
        dob: '1998-01-01',
        phone: currentUser.phone,
        email: currentUser.email,
        address: currentUser.address || '',
        state: currentUser.state,
        district: 'District Hub',
        city: currentUser.city,
        pincode: currentUser.pincode || '400001',
        answers: {}
      },
      timeline: [
        {
          stepIndex: 1,
          stageName: 'Request Created',
          category: 'GovEase Processing',
          date: dateStr,
          time: 'Just now',
          description: 'Citizen submitted assistance request on GovEase platform and payment escrow was initiated.',
          responsibleParty: `${currentUser.name} (Citizen)`,
          completed: true
        },
        {
          stepIndex: 2,
          stageName: 'Documents Submitted',
          category: 'GovEase Processing',
          date: dateStr,
          time: 'Just now',
          description: 'Documents uploaded and verified through initial GovEase AI pre-check.',
          responsibleParty: `${currentUser.name} (Citizen)`,
          completed: true,
          current: true
        },
        {
          stepIndex: 3,
          stageName: 'Agent Assigned',
          category: 'GovEase Processing',
          date: 'Pending',
          time: 'Pending',
          description: newApp.agentName ? `Assigned to ${newApp.agentName} for preliminary review.` : 'Awaiting agent claim from marketplace.',
          responsibleParty: 'GovEase Dispatch Desk',
          completed: false
        },
        {
          stepIndex: 4,
          stageName: 'Documents Verified',
          category: 'GovEase Processing',
          date: 'Pending',
          time: 'Pending',
          description: 'Agent review of notary formats and district jurisdiction checklist.',
          responsibleParty: 'Assigned Agent',
          completed: false
        },
        {
          stepIndex: 5,
          stageName: 'Official Application Submitted',
          category: 'Official Government Processing',
          date: 'Pending',
          time: 'Pending',
          description: 'Submission on official government portal with official token number.',
          responsibleParty: 'Government e-District Portal',
          completed: false
        },
        {
          stepIndex: 6,
          stageName: 'Government Processing',
          category: 'Official Government Processing',
          date: 'Pending',
          time: 'Pending',
          description: 'Revenue department inquiry and field officer inspection.',
          responsibleParty: 'State Authority',
          completed: false
        },
        {
          stepIndex: 7,
          stageName: 'Certificate Ready',
          category: 'Official Government Processing',
          date: 'Pending',
          time: 'Pending',
          description: 'Digital signature certificate issued by designated signing officer.',
          responsibleParty: 'Government Signatory',
          completed: false
        },
        {
          stepIndex: 8,
          stageName: 'Completed',
          category: 'GovEase Processing',
          date: 'Pending',
          time: 'Pending',
          description: 'Encrypted document delivery to applicant account.',
          responsibleParty: 'GovEase System',
          completed: false
        }
      ],
      documents: newApp.documents || []
    };

    setApplications(prev => [completedApp, ...prev]);

    // Create payment transaction
    const newTxn: PaymentTransaction = {
      id: `TXN_${now.getTime()}`,
      applicationId: newId,
      applicationName: completedApp.serviceName,
      userId: currentUser.id,
      amount: completedApp.totalPaid,
      breakdown: {
        governmentFee: completedApp.governmentFee,
        platformFee: completedApp.platformFee,
        agentFee: completedApp.agentFee,
        taxes: Math.round((completedApp.platformFee + completedApp.agentFee) * 0.18),
        total: completedApp.totalPaid
      },
      method: 'UPI',
      paymentStatus: 'Successful',
      transactionId: `UPI/${now.getFullYear()}/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      date: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };
    setPayments(prev => [newTxn, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${now.getTime()}`,
      userId: currentUser.id,
      title: 'Application Submitted Successfully',
      message: `Your request for ${completedApp.serviceName} (${newId}) is now active. You can track progress anytime.`,
      type: 'APPLICATION_STATUS',
      relatedApplicationId: newId,
      read: false,
      createdAt: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Audit log
    const audit: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'APPLICATION_SUBMITTED',
      entityType: 'Application',
      entityId: newId,
      timestamp: now.toISOString().replace('T', ' ').substring(0, 19),
      details: `New service assistance request created with fee ₹${completedApp.totalPaid}.`
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast(`Application ${newId} submitted successfully!`, 'success');
    return newId;
  };

  const triggerApplicationUpdate = (appId: string, status: ApplicationStatus, note?: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const result = processApplicationStatusTransition(app, status, note, currentUser);

    setApplications(prev => prev.map(a => a.id === appId ? result.updatedApp : a));
    setAuditLogs(prev => [result.auditLog, ...prev]);
    setNotifications(prev => [result.notification, ...prev]);
    setEmailNotificationLogs(prev => [result.emailLog, ...prev]);

    showToast(result.toastMessage, 'info');
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus, note?: string) => {
    triggerApplicationUpdate(appId, status, note);
  };

  const simulateStatusChangeWithEmail = (appId: string, customStatus?: ApplicationStatus, note?: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const sequence: ApplicationStatus[] = [
      'REQUEST_CREATED',
      'DOCUMENTS_SUBMITTED',
      'AGENT_ASSIGNED',
      'DOCUMENTS_VERIFIED',
      'OFFICIAL_SUBMITTED',
      'GOVERNMENT_PROCESSING',
      'CERTIFICATE_READY',
      'COMPLETED'
    ];

    let nextStatus: ApplicationStatus;
    if (customStatus) {
      nextStatus = customStatus;
    } else {
      const currentIndex = sequence.indexOf(app.status);
      nextStatus = currentIndex >= 0 && currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : 'COMPLETED';
    }

    triggerApplicationUpdate(appId, nextStatus, note || `Simulated milestone transition triggered.`);
  };

  const addChatMessage = (appId: string, text: string, isDocReq?: boolean, docReqName?: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      applicationId: appId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: userRole,
      message: text,
      timestamp: 'Just now',
      isDocumentRequest: isDocReq,
      documentNameRequested: docReqName,
      read: true
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulated reply from agent if citizen sends a message
    if (userRole === 'USER') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          applicationId: appId,
          senderId: 'usr_raj_agent',
          senderName: 'Raj Kumar (Verified Agent)',
          senderRole: 'AGENT',
          message: 'Received your message! I am currently tracking this with the revenue dispatch registry. Will update within 2 hours.',
          timestamp: 'Just now',
          read: false
        };
        setMessages(prev => [...prev, reply]);
        showToast('New message from Raj Kumar (Agent)', 'info');
      }, 2500);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const verifyAgentStatus = (agentId: string, status: 'Verified' | 'Rejected' | 'Under Review' | 'Suspended') => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, verificationStatus: status, platformVerified: status === 'Verified' } : a));
    
    const audit: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      action: `AGENT_${status.toUpperCase()}`,
      entityType: 'Agent',
      entityId: agentId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Admin updated verification status of agent ${agentId} to ${status}.`
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast(`Agent verification status updated to ${status}`, 'success');
  };

  const createSupportTicket = (ticket: Partial<SupportTicket>) => {
    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      category: ticket.category || 'Applications',
      applicationId: ticket.applicationId,
      description: ticket.description || '',
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      priority: ticket.priority || 'Medium'
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    showToast(`Support Ticket ${newTicket.id} created. Our assistance team will respond shortly.`, 'success');
  };

  const addReview = (rev: Partial<Review>) => {
    const newRev: Review = {
      id: `rev_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      agentId: rev.agentId || 'agt_raj_kumar',
      applicationId: rev.applicationId || 'GE-2026-001245',
      serviceName: rev.serviceName || 'Certificate Service',
      rating: rev.rating || 5,
      review: rev.review || 'Great assistance and prompt updates.',
      qualityRating: rev.qualityRating || 5,
      communicationRating: rev.communicationRating || 5,
      timelinessRating: rev.timelinessRating || 5,
      createdAt: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you for rating your service agent!', 'success');
  };

  const openSearchModal = useCallback(() => setIsSearchModalOpen(true), []);
  const closeSearchModal = useCallback(() => setIsSearchModalOpen(false), []);

  const openPrintableReceipt = useCallback((txn: PaymentTransaction) => {
    setPrintableReceiptTransaction(txn);
  }, []);

  const closePrintableReceipt = useCallback(() => {
    setPrintableReceiptTransaction(null);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsAuthModalOpen(false);
    setIsAiChatOpen(false);
    setIsDocCheckerOpen(false);
    setActiveChatApplicationId(null);
    setIsSearchModalOpen(false);
    setPrintableReceiptTransaction(null);
    setSelectedEmailPreview(null);
  }, []);

  // Global keyboard shortcuts: 'Ctrl+K' / 'Cmd+K' to open search, 'Esc' to close any active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K opens search modal
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        openSearchModal();
      }
      // Esc key closes any open modal
      else if (e.key === 'Escape' || e.key === 'Esc') {
        closeAllModals();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearchModal, closeAllModals]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        switchRole,
        activeTab,
        setActiveTab,
        selectedServiceId,
        setSelectedServiceId,
        selectedAgentId,
        setSelectedAgentId,
        trackingQuery,
        setTrackingQuery,
        searchQuery,
        setSearchQuery,
        legalPageType,
        setLegalPageType,

        services,
        agents,
        applications,
        payments,
        notifications,
        messages,
        reviews,
        supportTickets,
        auditLogs,
        emailNotificationLogs,
        selectedEmailPreview,
        setSelectedEmailPreview,
        simulateStatusChangeWithEmail,

        navigateToService,
        navigateToApply,
        navigateToAgent,
        navigateToTrack,
        navigateToLegal,

        submitNewApplication,
        updateApplicationStatus,
        triggerApplicationUpdate,
        addChatMessage,
        markNotificationAsRead,
        markAllNotificationsRead,
        verifyAgentStatus,
        createSupportTicket,
        addReview,

        toast,
        showToast,
        hideToast,

        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isAiChatOpen,
        setIsAiChatOpen,
        isDocCheckerOpen,
        setIsDocCheckerOpen,
        activeChatApplicationId,
        setActiveChatApplicationId,
        isSearchModalOpen,
        setIsSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        printableReceiptTransaction,
        openPrintableReceipt,
        closePrintableReceipt,
        closeAllModals
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
