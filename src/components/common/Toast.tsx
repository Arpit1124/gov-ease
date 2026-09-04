import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/95 text-white border-emerald-700 shadow-emerald-950/20',
    info: 'bg-slate-900/95 text-white border-blue-600 shadow-slate-950/20',
    error: 'bg-rose-900/95 text-white border-rose-700 shadow-rose-950/20'
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    info: Info,
    error: AlertCircle
  }[toast.type];

  return (
    <div 
      id="govease-toast-notification"
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${bgStyles}`}>
        <Icon className="w-5 h-5 shrink-0 mt-0.5 text-blue-300" />
        <p className="text-sm font-medium flex-1 pr-2 leading-relaxed">{toast.message}</p>
        <button
          id="btn-toast-close"
          onClick={hideToast}
          className="text-slate-300 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
