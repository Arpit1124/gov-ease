import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AssistantMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedAction?: {
    label: string;
    actionType: 'service' | 'apply' | 'track';
    targetId: string;
  };
}

export const AIAssistantModal: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, navigateToService, navigateToApply } = useApp();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! I am your GovEase Smart Assistant. I can help you find which certificate you need, check document eligibility, calculate government statutory fees, and guide your application.'
    }
  ]);

  const quickQuestions = [
    'Which certificate do I need for college admission?',
    'What documents are required for an Income Certificate in Maharashtra?',
    'How long does a Domicile Certificate take to process?',
    'Can an agent submit on my behalf?'
  ];

  if (!isAiChatOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Dynamic responses based on user query
    setTimeout(() => {
      let replyText = '';
      let action: AssistantMessage['suggestedAction'] = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('college') || lower.includes('admission') || lower.includes('scholarship')) {
        replyText = 'For college admissions and state fee concessions, you typically need an **Income Certificate** (to prove family income under threshold, e.g. < ₹8 Lakhs) and a **Domicile Certificate** (to claim home-state quota). If applying under a reserved quota, a **Caste Certificate & Validity** is also required.';
        action = {
          label: 'View Income Certificate Requirements',
          actionType: 'service',
          targetId: 'srv_income'
        };
      } else if (lower.includes('income') || lower.includes('income certificate')) {
        replyText = 'For an **Income Certificate in Maharashtra**, you will need:\n1. **Aadhaar Card** (Identity proof)\n2. **Ration Card or Electricity Bill** (Residence proof)\n3. **Salary Slips or Form 16 / Talathi Income Report**\n4. **Self-Declaration Affidavit**.\n\nStatutory Govt Fee is ₹33, and estimated processing time is 7–10 working days.';
        action = {
          label: 'Apply for Income Certificate Assistance',
          actionType: 'apply',
          targetId: 'srv_income'
        };
      } else if (lower.includes('domicile') || lower.includes('how long')) {
        replyText = 'A **Domicile / Residence Certificate** in Maharashtra usually takes **7 to 12 working days** under the Right to Services (RTS) Act. You must have resided in the state for at least 15 continuous years with documentary proof (school leaving certificate, electricity bills, or ration card).';
        action = {
          label: 'Check Domicile Guidelines',
          actionType: 'service',
          targetId: 'srv_domicile'
        };
      } else if (lower.includes('agent') || lower.includes('behalf') || lower.includes('submit')) {
        replyText = 'Yes! On GovEase, verified independent agents can assist you with document vetting, drafting required legal affidavits, notarization coordination, and filing the application on your behalf with the revenue department. All payments remain locked in secure escrow until verification milestones are complete.';
      } else if (lower.includes('caste') || lower.includes('ews')) {
        replyText = 'For **Caste / EWS Certificates**, the most critical document is proof of ancestry residing in the state before the presidential cut-off year (e.g. 1967 for OBC/SC in Maharashtra), along with school leaving certificates of the applicant and father.';
        action = {
          label: 'View Caste Certificate Details',
          actionType: 'service',
          targetId: 'srv_caste'
        };
      } else {
        replyText = `Thank you for asking. Based on state revenue regulations, most certificate requests require: 1) Proof of Identity, 2) Proof of Residence, and 3) Income/Birth/Caste substantiation. You can review our full service catalog or request a verified agent to audit your documents.`;
        action = {
          label: 'Explore All Government Services',
          actionType: 'service',
          targetId: 'srv_income'
        };
      }

      const aiMsg: AssistantMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        suggestedAction: action
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const handleActionClick = (action: AssistantMessage['suggestedAction']) => {
    if (!action) return;
    setIsAiChatOpen(false);
    if (action.actionType === 'apply') {
      navigateToApply(action.targetId);
    } else {
      navigateToService(action.targetId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">GovEase AI Assistant</h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-semibold px-2 py-0.2 rounded border border-emerald-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-blue-200">Instant citizen document guidance & eligibility advisor</p>
            </div>
          </div>

          <button
            id="btn-close-ai-modal"
            onClick={() => setIsAiChatOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Disclaimer Banner */}
        <div className="p-2.5 bg-amber-50 border-b border-amber-200 text-amber-950 text-[11px] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <p>
            The AI assistant provides informational guidance only and is not official government legal advice.
          </p>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80 leading-relaxed'
              }`}>
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.suggestedAction && (
                  <div className="pt-2 border-t border-slate-200">
                    <button
                      onClick={() => handleActionClick(msg.suggestedAction)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[11px]">
          <span className="text-slate-400 font-semibold text-[10px]">Suggested:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            id="input-ai-chat"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Ask about required documents, fees, eligibility..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800"
          />
          <button
            id="btn-send-ai-message"
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
