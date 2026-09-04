import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Building2, 
  CheckCircle2, 
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, switchRole, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'SIGNUP_CITIZEN' | 'SIGNUP_AGENT'>(
    authModalTab === 'register' ? 'SIGNUP_CITIZEN' : 'LOGIN'
  );

  const [authMethod, setAuthMethod] = useState<'OTP' | 'PASSWORD'>('OTP');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Form states
  const [citizenName, setCitizenName] = useState('');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentDistrict, setAgentDistrict] = useState('Pune');
  const [agentSpecialty, setAgentSpecialty] = useState('Revenue & Certificates');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = () => {
    if (!phoneNumber) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setOtpSent(true);
    showToast(`Verification OTP sent to +91 ${phoneNumber} (Use demo OTP: 123456)`, 'info');
  };

  const handleVerifyLogin = () => {
    if (activeTab === 'SIGNUP_AGENT') {
      switchRole('AGENT');
      showToast('Agent onboarding profile submitted for review!', 'success');
    } else {
      switchRole('USER');
      showToast('Signed in successfully as Citizen!', 'success');
    }
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              GovEase Access
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {activeTab === 'LOGIN' ? 'Sign In to Your Account' : activeTab === 'SIGNUP_AGENT' ? 'Register as Service Agent' : 'Create Citizen Account'}
            </h3>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Role Selector Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-center">
          <button
            onClick={() => { setActiveTab('LOGIN'); setOtpSent(false); }}
            className={`py-3 transition-colors cursor-pointer ${activeTab === 'LOGIN' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('SIGNUP_CITIZEN'); setOtpSent(false); }}
            className={`py-3 transition-colors cursor-pointer ${activeTab === 'SIGNUP_CITIZEN' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Citizen Sign Up
          </button>
          <button
            onClick={() => { setActiveTab('SIGNUP_AGENT'); setOtpSent(false); }}
            className={`py-3 transition-colors cursor-pointer ${activeTab === 'SIGNUP_AGENT' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Join as Agent
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4 text-xs">
          {activeTab === 'LOGIN' && (
            <div className="space-y-4">
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setAuthMethod('OTP')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${authMethod === 'OTP' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('PASSWORD')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${authMethod === 'PASSWORD' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
                >
                  Password
                </button>
              </div>

              {authMethod === 'OTP' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mobile Number</label>
                    <div className="flex items-center gap-2">
                      <span className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 font-bold text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {otpSent ? (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">6-Digit OTP</label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 123456 (Demo Code)"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center tracking-widest text-sm focus:outline-none focus:border-blue-600"
                      />
                      <button
                        onClick={handleVerifyLogin}
                        className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                      >
                        Verify & Sign In
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSendOtp}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                    >
                      Send OTP
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email or Phone</label>
                    <input
                      type="text"
                      placeholder="citizen@example.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <button
                    onClick={handleVerifyLogin}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Sign In with Password
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'SIGNUP_CITIZEN' && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="As per Aadhaar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <button
                onClick={handleVerifyLogin}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Create Citizen Account
              </button>
            </div>
          )}

          {activeTab === 'SIGNUP_AGENT' && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Agent / Professional Agency Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Deshmukh Documentation Services"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">District / Jurisdiction</label>
                <input
                  type="text"
                  value={agentDistrict}
                  onChange={(e) => setAgentDistrict(e.target.value)}
                  placeholder="e.g. Pune / Haveli Division"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Upload Certificate / Bar ID Scan</label>
                <input
                  type="file"
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 cursor-pointer"
                />
              </div>
              <button
                onClick={handleVerifyLogin}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Submit Application for Vetting
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          GovEase independent citizen assistance platform. Your credentials are protected with end-to-end encryption.
        </div>
      </div>
    </div>
  );
};
