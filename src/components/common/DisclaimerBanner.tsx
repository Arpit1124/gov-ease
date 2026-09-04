import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerBanner: React.FC = () => {
  const { navigateToLegal } = useApp();

  return (
    <aside aria-label="Official Disclaimer" id="govease-legal-disclaimer-banner" className="bg-amber-50 border-b border-amber-200 text-amber-950 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <p className="font-medium text-center sm:text-left">
            <strong className="font-semibold text-amber-900">Official Disclaimer:</strong> GovEase is an independent citizen-service assistance platform and is not a government department or official government website.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-disclaimer-view-policy"
            onClick={() => navigateToLegal('disclaimer')}
            className="text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer transition-colors"
          >
            Read Disclaimer & Legal Terms
          </button>
          <a
            id="link-national-portal-india"
            href="https://india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-900 hover:text-blue-800 font-medium cursor-pointer"
          >
            <span>National Portal of India</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
