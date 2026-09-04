import React from 'react';
import { 
  Mail, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Smartphone,
  Send,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmailNotificationModal: React.FC = () => {
  const { 
    selectedEmailPreview, 
    setSelectedEmailPreview, 
    navigateToTrack 
  } = useApp();

  if (!selectedEmailPreview) return null;

  const log = selectedEmailPreview;

  const handleTrack = () => {
    navigateToTrack(log.applicationId);
    setSelectedEmailPreview(null);
  };

  return (
    <div 
      id="email-notification-preview-modal"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setSelectedEmailPreview(null)}
    >
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                Automated Email & SMS Dispatch Preview
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  {log.deliveryStatus}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Dispatched at: {log.timestamp} • System Service
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedEmailPreview(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Header Metadata */}
        <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800 text-xs space-y-1.5 text-slate-300 font-mono">
          <div><strong className="text-slate-400">From:</strong> GovEase Notifications &lt;no-reply@updates.govease.in&gt;</div>
          <div><strong className="text-slate-400">To:</strong> {log.applicantName} &lt;{log.recipientEmail}&gt;, SMS: {log.recipientPhone}</div>
          <div><strong className="text-slate-400">Subject:</strong> <span className="text-white font-semibold">{log.subject}</span></div>
          <div><strong className="text-slate-400">Message ID:</strong> &lt;{log.id}@mail.govease.in&gt;</div>
        </div>

        {/* Email HTML Body Render */}
        <div className="p-6 overflow-y-auto max-h-[60vh] bg-slate-900 text-slate-200 text-sm space-y-5">
          {/* Email Template Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-5 shadow-inner">
            {/* Template Brand */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  G
                </div>
                <span className="font-bold text-base text-white tracking-tight">
                  Gov<span className="text-blue-400">Ease</span>
                </span>
              </div>
              <span className="text-xs text-slate-400">Application Alert</span>
            </div>

            {/* Salutation */}
            <div>
              <p className="text-slate-300">Dear <strong>{log.applicantName}</strong>,</p>
              <p className="text-xs text-slate-400 mt-1">
                Your application for <strong>{log.serviceName}</strong> (Case ID: <code className="text-blue-300">{log.applicationId}</code>) has progressed to a new milestone.
              </p>
            </div>

            {/* Status Highlight Banner */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                  Current Application Status
                </span>
                <span className="text-xs font-bold text-white bg-blue-600 px-2.5 py-0.5 rounded-full">
                  {log.statusLabel}
                </span>
              </div>
              {log.officialTokenNumber && (
                <div className="text-xs text-slate-300 font-mono pt-1">
                  Official Government Token: <strong className="text-white">{log.officialTokenNumber}</strong>
                </div>
              )}
              {log.note && (
                <div className="text-xs text-slate-300 italic pt-1 border-t border-blue-900/50">
                  "{log.note}"
                </div>
              )}
            </div>

            {/* Action required */}
            <div className="text-xs text-slate-300 space-y-1">
              <strong className="text-white">Next Step / Action:</strong>
              <p className="text-slate-400">{log.actionRequired || 'No immediate action is needed from your end. Our team and the state revenue office are actively handling the verification.'}</p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleTrack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
              >
                <span>Track Application Live in GovEase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Compliance Footer */}
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-4 leading-relaxed space-y-1">
              <p>This is an automated system dispatch sent by the GovEase notification service. Please do not reply directly to this email.</p>
              <p>
                <strong>Independent Platform Notice:</strong> GovEase is an independent facilitation platform and not an official government authority. All certificates are issued directly by designated state revenue officers.
              </p>
            </div>
          </div>

          {/* SMS Notification simulation text */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-3">
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Concurrent SMS Dispatched to {log.recipientPhone}</div>
              <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                "GovEase Alert: Application {log.applicationId} for {log.serviceName} status updated to {log.statusLabel}. View updates at govease.in/track/{log.applicationId}"
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>SMTP Delivery: TLS 1.3 encrypted</span>
          <button
            onClick={() => setSelectedEmailPreview(null)}
            className="px-3 py-1 rounded-md text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
