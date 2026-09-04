import React, { useRef } from 'react';
import { 
  Printer, 
  X, 
  Download, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  FileText,
  Lock,
  QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentTransaction } from '../../types';

interface PrintableReceiptModalProps {
  transaction?: PaymentTransaction | null;
  onClose?: () => void;
}

export const PrintableReceiptModal: React.FC<PrintableReceiptModalProps> = ({ 
  transaction: propTransaction, 
  onClose: propOnClose 
}) => {
  const { 
    printableReceiptTransaction, 
    closePrintableReceipt, 
    applications,
    currentUser
  } = useApp();

  const receiptRef = useRef<HTMLDivElement>(null);

  const txn = propTransaction || printableReceiptTransaction;
  const onClose = propOnClose || closePrintableReceipt;

  if (!txn) return null;

  const app = applications.find(a => a.id === txn.applicationId);

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${txn.id.replace('TXN_', '')}`;
  const breakdown = txn.breakdown || {
    governmentFee: 0,
    platformFee: 99,
    agentFee: 400,
    taxes: 90,
    total: txn.amount
  };

  const taxableAmount = breakdown.platformFee + breakdown.agentFee;
  const cgst = Math.round(taxableAmount * 0.09);
  const sgst = Math.round(taxableAmount * 0.09);

  return (
    <div 
      id="printable-receipt-modal"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 print:m-0 print:shadow-none print:w-full print:max-w-none print:rounded-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Action Header - Hidden during print */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-sm sm:text-base">Official Payment Receipt & Tax Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-print-receipt-action"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              id="btn-close-receipt-action"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document Container */}
        <div 
          ref={receiptRef}
          id="printable-receipt-content"
          className="p-6 sm:p-10 space-y-6 text-slate-800 bg-white"
        >
          {/* Printable Top Brand & Tax Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white font-black text-xl">
                  G
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    Gov<span className="text-blue-600">Ease</span>
                  </h1>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Citizen Services & Brokerage Marketplace
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-2 space-y-0.5 font-mono">
                <div>GovEase Digital Facilitation Technologies Pvt. Ltd.</div>
                <div>Reg. Address: 402, Apex Tower, Cyber City, Bandra (E), Mumbai 400051</div>
                <div>GSTIN: 27AABCG9821K1ZZ • CIN: U74999MH2025PTC389102</div>
              </div>
            </div>

            <div className="text-left sm:text-right border-l sm:border-l-0 pl-3 sm:pl-0 border-slate-200">
              <div className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wide border border-slate-300">
                TAX INVOICE / RECEIPT
              </div>
              <div className="text-xs text-slate-600 mt-2 font-mono">
                <div><strong>Invoice No:</strong> {invoiceNumber}</div>
                <div><strong>Date & Time:</strong> {txn.date}</div>
                <div><strong>Payment Status:</strong> <span className="text-emerald-700 font-bold">PAID (SUCCESSFUL)</span></div>
                <div><strong>Escrow ID:</strong> ESC-{txn.id.substring(4, 12)}</div>
              </div>
            </div>
          </div>

          {/* Applicant & Service Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Applicant / Customer Information
              </div>
              <div className="space-y-1 text-slate-700 font-medium">
                <div className="text-sm font-bold text-slate-900">{app?.userName || currentUser.name}</div>
                <div>Email: {app?.userEmail || currentUser.email}</div>
                <div>Phone: {app?.userPhone || currentUser.phone}</div>
                <div>Jurisdiction: {app?.applicantState || 'Maharashtra'} / {app?.applicantDistrict || 'Pune'}</div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Service & Case Particulars
              </div>
              <div className="space-y-1 text-slate-700 font-medium">
                <div><strong>Application Case ID:</strong> <span className="font-mono text-blue-700 font-bold">{txn.applicationId}</span></div>
                <div><strong>Requested Service:</strong> {txn.applicationName}</div>
                <div><strong>State Portal Token:</strong> <span className="font-mono">{app?.governmentApplicationNumber || 'Pending Filing'}</span></div>
                <div><strong>Assigned Agent:</strong> {app?.assignedAgentName || 'GovEase Vetted Specialist'}</div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Description & Service Component</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3 font-mono">1</td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold">Government Statutory e-Challan Treasury Fee</div>
                    <div className="text-[11px] text-slate-500">
                      Official statutory application fee paid directly to State Revenue Treasury Department.
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">Pure Agent / Zero-Rated</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    {breakdown.governmentFee === 0 ? '₹0.00 (Free)' : `₹${breakdown.governmentFee.toFixed(2)}`}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-mono">2</td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold">Verified Agent Facilitation & Notary Drafting Fee</div>
                    <div className="text-[11px] text-slate-500">
                      Professional document vetting, affidavit drafting, and administrative representation.
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">SAC: 998213</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    ₹{breakdown.agentFee.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-mono">3</td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold">GovEase Platform & Escrow Protection Fee</div>
                    <div className="text-[11px] text-slate-500">
                      AI Document quality scanning, encrypted milestone tracking, and escrow holding.
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">SAC: 998314</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    ₹{breakdown.platformFee.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono">4</td>
                  <td className="py-2.5 px-3" colSpan={2}>
                    <div className="font-medium text-slate-700">Applicable GST on facilitation services (CGST 9% + SGST 9%)</div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    ₹{breakdown.taxes.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-slate-100 font-bold text-slate-950 text-sm">
                  <td className="py-3 px-3 text-right" colSpan={3}>
                    TOTAL PAID (INCLUDING ALL TAXES):
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-base text-blue-700">
                    ₹{breakdown.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Method & Verification Barcode */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 gap-4">
            <div className="text-xs space-y-1">
              <div><strong>Payment Method:</strong> {txn.method}</div>
              <div><strong>Bank Transaction ID:</strong> <span className="font-mono">{txn.transactionId}</span></div>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified & Deposited in GovEase Escrow Account
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-white p-1.5 rounded-lg border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-800" />
                </div>
                <div className="text-[9px] text-slate-500 font-mono mt-0.5">Scan to Verify</div>
              </div>
              <div className="text-left font-mono text-[10px] text-slate-500 space-y-0.5 border-l border-slate-200 pl-3">
                <div>AUTHENTICATION SEAL</div>
                <div className="text-slate-800 font-bold">GE-SEC-SHA256</div>
                <div>DIGITALLY RECORDED</div>
              </div>
            </div>
          </div>

          {/* Escrow Guarantee Badge & Disclaimer */}
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>GovEase Escrow Protection Guarantee:</strong> Your assistance fee is held safely in escrow. The agent is only compensated once your application is filed and officially acknowledged on the government revenue portal.
              </div>
            </div>

            <div className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-3 text-center">
              <strong>Statutory Disclosure:</strong> GovEase is an independent private technology platform and is not an official government website or department. This document is a computer-generated tax invoice and does not require a physical ink signature. For inquiries, reach out to help@govease.in.
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            #printable-receipt-modal {
              position: static !important;
              background: none !important;
              padding: 0 !important;
            }
            #printable-receipt-content {
              padding: 0 !important;
              margin: 0 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
