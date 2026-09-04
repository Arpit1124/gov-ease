import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  User, 
  FileText, 
  CheckCircle2, 
  Lock,
  Upload,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatModal: React.FC = () => {
  const { 
    activeChatApplicationId, 
    setActiveChatApplicationId, 
    applications, 
    messages, 
    addChatMessage, 
    currentUser,
    showToast 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [isRequestingDoc, setIsRequestingDoc] = useState(false);
  const [docRequestName, setDocRequestName] = useState('Updated Electricity Bill (Last 3 Months)');

  if (!activeChatApplicationId) return null;

  const currentApp = applications.find(a => a.id === activeChatApplicationId);
  const chatMessages = messages.filter(m => m.applicationId === activeChatApplicationId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    addChatMessage(activeChatApplicationId, inputMsg);
    setInputMsg('');
  };

  const handleSendDocRequest = () => {
    if (!docRequestName.trim()) return;
    addChatMessage(
      activeChatApplicationId,
      `Official Request: Please upload ${docRequestName} to complete the revenue jurisdiction checklist.`,
      true,
      docRequestName
    );
    setIsRequestingDoc(false);
    showToast(`Document request dispatched to client`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
              {currentApp?.agentName ? currentApp.agentName.charAt(0) : 'G'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {currentUser.role === 'AGENT' ? currentApp?.userName : currentApp?.agentName || 'GovEase Support Desk'}
                </h3>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-700">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Case: {currentApp?.id} ({currentApp?.serviceName})
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveChatApplicationId(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Encrypted Notice Banner */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>256-bit encrypted communication between citizen & verified agent</span>
          </div>
          {currentUser.role === 'AGENT' && (
            <button
              onClick={() => setIsRequestingDoc(!isRequestingDoc)}
              className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              {isRequestingDoc ? 'Cancel' : '+ Request Document'}
            </button>
          )}
        </div>

        {/* Agent Document Request Drawer */}
        {isRequestingDoc && (
          <div className="p-3 bg-blue-50 border-b border-blue-200 text-xs space-y-2">
            <span className="font-bold text-blue-900 block">Send Formal Document Request to Client</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={docRequestName}
                onChange={(e) => setDocRequestName(e.target.value)}
                placeholder="Name of missing document..."
                className="flex-1 p-2 bg-white rounded-lg border border-blue-300 text-xs focus:outline-none text-slate-800"
              />
              <button
                onClick={handleSendDocRequest}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700 cursor-pointer"
              >
                Send Request
              </button>
            </div>
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs bg-slate-50">
          {chatMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p>No messages yet. Send a message to start communicating.</p>
            </div>
          ) : (
            chatMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5 px-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={`max-w-[80%] p-3.5 rounded-2xl space-y-2 ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}>
                    <p className="leading-relaxed">{msg.message}</p>

                    {/* Document Request highlight block */}
                    {msg.isDocumentRequest && (
                      <div className={`p-2.5 rounded-xl border mt-2 flex items-center justify-between gap-2 ${
                        isMe ? 'bg-blue-700/60 border-blue-500 text-white' : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="font-bold text-xs">{msg.documentNameRequested}</span>
                        </div>
                        {!isMe && (
                          <button
                            onClick={() => showToast('Simulating document upload...', 'success')}
                            className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg text-[10px] cursor-pointer hover:bg-amber-700"
                          >
                            Upload Now
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast('File attachment opened (PDF, JPG up to 10MB)', 'info')}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            id="input-chat-message"
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type your message to agent or ask for updates..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800"
          />

          <button
            id="btn-chat-send"
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
