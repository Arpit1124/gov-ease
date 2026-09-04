import { Application, ApplicationStatus, AuditLog, EmailNotificationLog, NotificationItem, User } from '../types';

export interface TriggerUpdateOptions {
  appId: string;
  status: ApplicationStatus;
  note?: string;
  currentUser?: User;
  onToast?: (message: string, type: 'success' | 'info' | 'error') => void;
}

export interface ApplicationUpdateResult {
  updatedApp: Application;
  emailLog: EmailNotificationLog;
  auditLog: AuditLog;
  notification: NotificationItem;
  toastMessage: string;
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  REQUEST_CREATED: 'Request Created',
  DOCUMENTS_SUBMITTED: 'Documents Submitted',
  AGENT_ASSIGNED: 'Agent Assigned',
  DOCUMENTS_VERIFIED: 'Documents Verified by Agent',
  OFFICIAL_SUBMITTED: 'Official Application Submitted',
  GOVERNMENT_PROCESSING: 'Government Processing / Field Verification',
  CERTIFICATE_READY: 'Certificate Ready for Download',
  COMPLETED: 'Completed',
  REJECTED: 'Application Rejected'
};

/**
 * Service Layer Function: triggerApplicationUpdate
 * Updates an application's lifecycle state, generates audit logs,
 * records automated email & SMS dispatch events, and triggers user-facing alerts.
 */
export function processApplicationStatusTransition(
  currentApp: Application,
  newStatus: ApplicationStatus,
  note?: string,
  actor?: User
): ApplicationUpdateResult {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const statusLabel = STATUS_LABELS[newStatus] || newStatus;

  // Update timeline stages
  const updatedTimeline = currentApp.timeline.map(step => {
    let shouldComplete = step.completed;
    let isCurrent = false;

    if (newStatus === 'DOCUMENTS_SUBMITTED' && step.stepIndex <= 2) shouldComplete = true;
    if (newStatus === 'AGENT_ASSIGNED' && step.stepIndex <= 3) shouldComplete = true;
    if (newStatus === 'DOCUMENTS_VERIFIED' && step.stepIndex <= 4) shouldComplete = true;
    if (newStatus === 'OFFICIAL_SUBMITTED' && step.stepIndex <= 5) shouldComplete = true;
    if (newStatus === 'GOVERNMENT_PROCESSING' && step.stepIndex <= 6) shouldComplete = true;
    if (newStatus === 'CERTIFICATE_READY' && step.stepIndex <= 7) shouldComplete = true;
    if (newStatus === 'COMPLETED') shouldComplete = true;

    if (
      (newStatus === 'DOCUMENTS_SUBMITTED' && step.stepIndex === 2) ||
      (newStatus === 'AGENT_ASSIGNED' && step.stepIndex === 3) ||
      (newStatus === 'DOCUMENTS_VERIFIED' && step.stepIndex === 4) ||
      (newStatus === 'OFFICIAL_SUBMITTED' && step.stepIndex === 5) ||
      (newStatus === 'GOVERNMENT_PROCESSING' && step.stepIndex === 6) ||
      (newStatus === 'CERTIFICATE_READY' && step.stepIndex === 7) ||
      (newStatus === 'COMPLETED' && step.stepIndex === 8)
    ) {
      isCurrent = true;
      return {
        ...step,
        completed: true,
        current: true,
        date: dateStr,
        time: timeStr,
        description: note || step.description
      };
    }

    return {
      ...step,
      completed: shouldComplete,
      current: isCurrent
    };
  });

  const updatedApp: Application = {
    ...currentApp,
    status: newStatus,
    statusLabel,
    timeline: updatedTimeline,
    completedAt: newStatus === 'COMPLETED' ? dateStr : currentApp.completedAt
  };

  // Generate automated Email & SMS log entry
  const emailLog: EmailNotificationLog = {
    id: `EML-${now.getTime()}`,
    applicationId: currentApp.id,
    serviceName: currentApp.serviceName,
    applicantName: currentApp.userName,
    recipientEmail: currentApp.userEmail,
    recipientPhone: currentApp.userPhone,
    status: newStatus,
    statusLabel,
    subject: `[GovEase Alert] Status Update: ${currentApp.serviceName} (${currentApp.id}) - ${statusLabel}`,
    timestamp: `${dateStr} ${timeStr}`,
    officialTokenNumber: currentApp.governmentApplicationNumber || currentApp.officialAcknowledgementNumber,
    note: note || `Application milestone updated to ${statusLabel}.`,
    actionRequired: newStatus === 'CERTIFICATE_READY'
      ? 'Your certificate is ready for download in your GovEase vault.'
      : newStatus === 'DOCUMENTS_SUBMITTED'
      ? 'Assigned agent is reviewing your document legibility.'
      : 'No manual action required. State revenue processing underway.',
    trackingUrl: `https://govease.in/track/${currentApp.id}`,
    deliveryStatus: 'Delivered (250 OK)'
  };

  // Audit trail entry
  const auditLog: AuditLog = {
    id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: actor?.id || currentApp.userId,
    userName: actor?.name || currentApp.userName,
    action: `STATUS_UPDATED_${newStatus}`,
    entityType: 'Application',
    entityId: currentApp.id,
    timestamp: now.toISOString().replace('T', ' ').substring(0, 19),
    details: note || `Application status transitioned to ${statusLabel} (${newStatus}).`
  };

  // User notification item
  const notification: NotificationItem = {
    id: `notif_${now.getTime()}`,
    userId: currentApp.userId,
    title: `Status Update: ${currentApp.serviceName}`,
    message: `Your application ${currentApp.id} is now: ${statusLabel}. ${note || ''}`,
    type: 'APPLICATION_STATUS',
    relatedApplicationId: currentApp.id,
    read: false,
    createdAt: 'Just now'
  };

  const toastMessage = `📧 Automated Alert: ${currentApp.serviceName} (${currentApp.id}) updated to "${statusLabel}". Email & SMS dispatched to ${currentApp.userEmail}.`;

  return {
    updatedApp,
    emailLog,
    auditLog,
    notification,
    toastMessage
  };
}
