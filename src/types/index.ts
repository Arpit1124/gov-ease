export type UserRole = 'USER' | 'AGENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  state: string;
  city: string;
  avatar?: string;
  address?: string;
  pincode?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  userId: string;
  name: string;
  agencyName?: string;
  photoUrl: string;
  phone: string;
  email: string;
  verificationStatus: 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | 'Suspended';
  identityVerified: boolean;
  platformVerified: boolean;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  completedRequests: number;
  languages: string[];
  services: string[];
  startingFee: number;
  location: {
    state: string;
    city: string;
  };
  availability: 'Available Today' | 'Next Day' | 'In 2-3 Days' | 'Busy';
  bio: string;
  licenseNumber: string;
}

export type ServiceCategory = 
  | 'Certificates' 
  | 'Identity & Documentation' 
  | 'Business' 
  | 'Property' 
  | 'Licenses';

export interface GovernmentService {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  purpose: string;
  eligibility: string[];
  requiredDocuments: {
    name: string;
    description: string;
    mandatory: boolean;
    acceptedTypes: string[];
  }[];
  governmentFee: number; // In INR (₹)
  isGovernmentFeeFree: boolean;
  platformFee: number; // GovEase platform fee (e.g. ₹99)
  agentAssistanceFee: number; // Base agent fee (e.g. ₹299 - ₹499)
  estimatedProcessingTime: string;
  officialUrl: string;
  officialPortalName: string;
  stateAvailability: string; // 'All States' or specific state
  isPopular: boolean;
  iconName: string;
  eligibilityQuestions: {
    id: string;
    question: string;
    type: 'select' | 'boolean' | 'text';
    options?: string[];
  }[];
}

export type ApplicationStatus = 
  | 'REQUEST_CREATED'
  | 'DOCUMENTS_SUBMITTED'
  | 'AGENT_ASSIGNED'
  | 'DOCUMENTS_VERIFIED'
  | 'OFFICIAL_SUBMITTED'
  | 'GOVERNMENT_PROCESSING'
  | 'CERTIFICATE_READY'
  | 'COMPLETED'
  | 'REJECTED';

export interface TimelineEvent {
  stepIndex: number;
  stageName: string;
  category: 'GovEase Processing' | 'Official Government Processing';
  date: string;
  time: string;
  description: string;
  responsibleParty: string;
  completed: boolean;
  current?: boolean;
}

export interface ApplicationDocument {
  id: string;
  applicationId?: string;
  userId?: string;
  name?: string;
  documentType: string;
  fileName: string;
  fileSize: string;
  fileType?: string;
  fileUrl?: string;
  uploadDate?: string;
  uploadedAt?: string;
  isMandatory?: boolean;
  status?: string;
  verificationStatus: 'Pending' | 'Verified' | 'Needs Resubmission' | 'Rejected';
  aiCheckResult?: {
    score: number;
    isClear: boolean;
    isComplete: boolean;
    detectedType: string;
    comments: string;
  };
  aiPreCheck?: {
    passed: boolean;
    readabilityScore: number; // 0 - 100
    completeness: string;
    detectedIssues: string[];
    aiNote: string;
  };
}

export interface Application {
  id: string; // e.g. GE-2026-001245
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  agentId?: string;
  agentName?: string;
  agentFee: number;
  governmentFee: number;
  platformFee: number;
  totalPaid: number;
  isSelfService: boolean;
  status: ApplicationStatus;
  statusLabel: string;
  submittedAt: string;
  estimatedCompletionDate: string;
  completedAt?: string;
  applicantDetails: {
    fullName: string;
    dob: string;
    phone: string;
    email: string;
    address: string;
    state: string;
    district: string;
    city: string;
    pincode: string;
    answers: Record<string, string>;
  };
  timeline: TimelineEvent[];
  documents: ApplicationDocument[];
  certificateDownloadUrl?: string;
  officialAcknowledgementNumber?: string;
  governmentApplicationNumber?: string;
}

export interface PaymentTransaction {
  id: string;
  applicationId: string;
  applicationName: string;
  userId: string;
  amount: number;
  breakdown: {
    governmentFee: number;
    platformFee: number;
    agentFee: number;
    taxes: number; // 18% GST on service fees
    total: number;
  };
  method: 'UPI' | 'Card' | 'Net Banking';
  paymentStatus: 'Successful' | 'Pending' | 'Failed' | 'Refunded';
  transactionId: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  applicationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'USER' | 'AGENT' | 'SYSTEM';
  message: string;
  timestamp: string;
  isDocumentRequest?: boolean;
  documentNameRequested?: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'APPLICATION_STATUS' | 'AGENT_ASSIGNED' | 'DOCUMENT_REQUIRED' | 'PAYMENT' | 'CERTIFICATE_READY' | 'MESSAGE';
  relatedApplicationId?: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  agentId: string;
  applicationId: string;
  serviceName: string;
  rating: number;
  review: string;
  qualityRating: number;
  communicationRating: number;
  timelinessRating: number;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'Applications' | 'Documents' | 'Payments' | 'Agents' | 'Certificates' | 'Account' | 'Refunds';
  applicationId?: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Waiting for User' | 'Resolved' | 'Closed';
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'Application' | 'Document' | 'Agent' | 'Payment' | 'Verification' | 'Security' | 'Service' | 'Support' | 'System';
  entityId: string;
  timestamp: string;
  details: string;
  role?: 'USER' | 'AGENT' | 'ADMIN' | 'SYSTEM';
  ipAddress?: string;
  status?: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface EmailNotificationLog {
  id: string;
  applicationId: string;
  serviceName: string;
  applicantName: string;
  recipientEmail: string;
  recipientPhone: string;
  status: ApplicationStatus;
  statusLabel: string;
  subject: string;
  timestamp: string;
  officialTokenNumber?: string;
  note?: string;
  actionRequired?: string;
  trackingUrl: string;
  deliveryStatus: 'Delivered (250 OK)' | 'Sent';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General & Legality' | 'Documents & Verification' | 'Agents & Escrow' | 'Timelines & Delivery' | 'Payments & Refunds';
  tags: string[];
}
