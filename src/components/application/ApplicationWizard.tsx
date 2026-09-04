import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  User, 
  Lock,
  ExternalLink,
  Eye,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationDocument } from '../../types';

export const ApplicationWizard: React.FC = () => {
  const { 
    selectedServiceId, 
    selectedAgentId, 
    services, 
    agents, 
    currentUser, 
    submitNewApplication, 
    navigateToTrack,
    setActiveTab,
    showToast
  } = useApp();

  const service = services.find(s => s.id === selectedServiceId) || services[0];
  const preselectedAgent = agents.find(a => a.id === selectedAgentId);

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser.name || 'Rahul Verma',
    dob: '1998-05-14',
    phone: currentUser.phone || '9876543210',
    email: currentUser.email || 'rahul.verma@example.com',
    gender: 'Male',
    address: currentUser.address || 'Flat 402, Shivam Enclave, FC Road',
    state: currentUser.state || 'Maharashtra',
    district: 'Pune',
    pincode: currentUser.pincode || '411005',
    // Custom dynamic answers based on service
    familyIncome: '180000',
    incomeSource: 'Agriculture & Retail',
    rationCardNo: 'MH-PUN-9823412',
    casteSubCategory: 'OBC - Kunbi',
    yearsInState: '15',
    purposeOfApplication: 'College Fee Concession & Scholarship'
  });

  // Service mode & agent selection
  const [serviceMode, setServiceMode] = useState<'ASSISTED' | 'SELF_SERVICE'>('ASSISTED');
  const [chosenAgentId, setChosenAgentId] = useState<string>(selectedAgentId || (agents[0] ? agents[0].id : 'agt_raj_kumar'));

  // Document Uploads State
  const [uploadedDocs, setUploadedDocs] = useState<ApplicationDocument[]>([
    {
      id: 'doc_1',
      name: 'Aadhaar Card (Front & Back)',
      fileName: 'aadhaar_card_rahul.pdf',
      fileSize: '1.4 MB',
      fileType: 'application/pdf',
      uploadDate: 'Today',
      isMandatory: true,
      status: 'VERIFIED',
      aiCheckResult: {
        score: 98,
        isClear: true,
        isComplete: true,
        detectedType: 'Aadhaar Card / UIDAI',
        comments: 'Readability high. Full address and QR code detected.'
      }
    },
    {
      id: 'doc_2',
      name: 'Ration Card / Electricity Bill',
      fileName: 'electricity_bill_mseb.pdf',
      fileSize: '890 KB',
      fileType: 'application/pdf',
      uploadDate: 'Today',
      isMandatory: true,
      status: 'VERIFIED',
      aiCheckResult: {
        score: 92,
        isClear: true,
        isComplete: true,
        detectedType: 'Electricity Bill',
        comments: 'Bill is within last 3 months. Name matches applicant.'
      }
    }
  ]);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedAppId, setCompletedAppId] = useState<string | null>(null);

  // Fees calculation
  const chosenAgent = agents.find(a => a.id === chosenAgentId);
  const govtFee = service.isGovernmentFeeFree ? 0 : service.governmentFee;
  const agentFee = serviceMode === 'ASSISTED' ? (chosenAgent ? chosenAgent.serviceFeeRange.min : service.agentAssistanceFee) : 0;
  const platformFee = serviceMode === 'ASSISTED' ? 99 : 0;
  const taxes = Math.round((agentFee + platformFee) * 0.18);
  const totalPayable = govtFee + agentFee + platformFee + taxes;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (docRequirementName: string, mandatory: boolean) => {
    // Simulated upload
    const mockFile: ApplicationDocument = {
      id: `doc_${Date.now()}`,
      name: docRequirementName,
      documentType: docRequirementName,
      fileName: `${docRequirementName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_scan.pdf`,
      fileSize: '1.2 MB',
      fileType: 'application/pdf',
      uploadDate: 'Just now',
      uploadedAt: 'Just now',
      isMandatory: mandatory,
      status: 'PENDING',
      verificationStatus: 'Verified',
      aiCheckResult: {
        score: 95,
        isClear: true,
        isComplete: true,
        detectedType: docRequirementName,
        comments: 'Document verified for completeness and stamp clarity.'
      }
    };

    setUploadedDocs(prev => [...prev.filter(d => d.name !== docRequirementName), mockFile]);
    showToast(`Uploaded ${docRequirementName}`, 'success');
  };

  const handleDeleteDoc = (docId: string) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== docId));
    showToast('Document removed', 'info');
  };

  const handleSubmitFinal = () => {
    if (!agreedToDisclaimer) {
      showToast('Please accept the disclaimer acknowledgment to proceed', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newId = submitNewApplication({
        serviceId: service.id,
        serviceName: service.name,
        serviceCategory: service.category,
        agentId: serviceMode === 'ASSISTED' ? chosenAgent?.id : undefined,
        agentName: serviceMode === 'ASSISTED' ? chosenAgent?.fullName : undefined,
        agentFee: agentFee,
        governmentFee: govtFee,
        platformFee: platformFee,
        totalPaid: totalPayable,
        isSelfService: serviceMode === 'SELF_SERVICE',
        applicantDetails: {
          fullName: formData.fullName,
          dob: formData.dob,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          state: formData.state,
          district: formData.district,
          city: formData.district,
          pincode: formData.pincode,
          answers: {
            income: formData.familyIncome,
            incomeSource: formData.incomeSource,
            purpose: formData.purposeOfApplication,
            caste: formData.casteSubCategory,
            yearsInState: formData.yearsInState
          }
        },
        documents: uploadedDocs
      });

      setIsSubmitting(false);
      setCompletedAppId(newId);
      setCurrentStep(totalSteps + 1); // Success step
    }, 1200);
  };

  // Step 1: Confirmation & Overview
  // Step 2: Personal Details
  // Step 3: Specific Questions
  // Step 4: Documents Upload & AI Pre-check
  // Step 5: Service Mode & Agent Selection
  // Step 6: Review & Payment Summary
  // Step 7: Completed Success Screen

  if (completedAppId) {
    return (
      <div id="application-success-view" className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Successfully Logged
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Assistance Request Submitted!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your request for <strong>{service.name}</strong> has been secured in escrow. Your assigned specialist will review all documents within 24 hours.
              </p>
            </div>

            {/* Tracking ID Badge */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Your GovEase Tracking Reference:</span>
              <div className="text-2xl font-mono font-black text-blue-600 tracking-wider">
                {completedAppId}
              </div>
              <p className="text-[11px] text-slate-400">
                An SMS and email confirmation have been dispatched to {formData.phone}
              </p>
            </div>

            {/* Summary Details */}
            <div className="text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Agent:</span>
                <span className="font-semibold text-blue-600">
                  {serviceMode === 'ASSISTED' ? (chosenAgent ? chosenAgent.fullName : 'Marketplace Dispatch') : 'Self-Service'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Escrow Paid:</span>
                <span className="font-semibold text-slate-800">₹{totalPayable}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-amber-600">Documents Submitted for Verification</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                id="btn-success-track-application"
                onClick={() => navigateToTrack(completedAppId)}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Track Application Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="btn-success-go-dashboard"
                onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                Go to Citizen Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="application-wizard-page" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Wizard Breadcrumb & Cancel button */}
        <div className="flex items-center justify-between">
          <button
            id="btn-cancel-application-wizard"
            onClick={() => setActiveTab('service-detail')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel & Return to Service</span>
          </button>
          <div className="text-xs font-semibold text-slate-500">
            Step <span className="text-blue-600 font-bold">{currentStep}</span> of {totalSteps}
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />

            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Applicant' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Documents' },
              { num: 5, label: 'Assistance' },
              { num: 6, label: 'Payment' }
            ].map(s => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep > s.num
                      ? 'bg-blue-600 text-white'
                      : currentStep === s.num
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span className={`text-[10px] font-semibold mt-1 hidden sm:block ${currentStep === s.num ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Container Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* STEP 1: Confirm Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Confirm Government Service</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Verify the issuing department and review required guidelines before filling out your details.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{service.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block">Department</span>
                    <strong className="text-slate-800">{service.issuingAuthority}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Expected Processing</span>
                    <strong className="text-slate-800">{service.estimatedProcessingTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Statutory Govt Fee</span>
                    <strong className="text-slate-800">{service.isGovernmentFeeFree ? 'Free (₹0)' : `₹${service.governmentFee}`}</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong className="font-semibold block mb-0.5">Eligibility Notice:</strong>
                {service.eligibility.join(' • ')}
              </div>
            </div>
          )}

          {/* STEP 2: Personal & Contact Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 2</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Applicant Personal Information</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Must match the name, date of birth, and address in your Aadhaar or government identity card.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="As on Aadhaar"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (Aadhaar Linked) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="For status updates & PDFs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="House/Flat No., Street, Locality"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District / Tehsil *</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Pune / Haveli"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Postal Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Service-Specific Questions */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Service Particulars & Declarations</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Provide declarations required for drafting your tehsildar/magistrate affidavit and application form.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Total Family Income (in INR) *
                  </label>
                  <input
                    type="number"
                    value={formData.familyIncome}
                    onChange={(e) => handleInputChange('familyIncome', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 180000"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Combined from salary, business, agriculture, pensions
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Income Sources *</label>
                  <input
                    type="text"
                    value={formData.incomeSource}
                    onChange={(e) => handleInputChange('incomeSource', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Farming / Small Business / Private Job"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ration Card / Food Security ID</label>
                  <input
                    type="text"
                    value={formData.rationCardNo}
                    onChange={(e) => handleInputChange('rationCardNo', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="Optional but accelerates Tehsil inquiry"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Years Living in Current State *</label>
                  <input
                    type="number"
                    value={formData.yearsInState}
                    onChange={(e) => handleInputChange('yearsInState', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 15"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Purpose for Requesting this Certificate *
                  </label>
                  <input
                    type="text"
                    value={formData.purposeOfApplication}
                    onChange={(e) => handleInputChange('purposeOfApplication', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    placeholder="e.g. College admission fee waiver, EWS reservation, Scholarship submission"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Document Upload & AI Pre-check */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 4</span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">Upload Required Documents</h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    GovEase automated AI will pre-check your document scans for stamp clarity, valid names, and readability.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Pre-Check Active</span>
                </div>
              </div>

              {/* Document slots */}
              <div className="space-y-4">
                {service.requiredDocuments.map((reqDoc, idx) => {
                  const uploaded = uploadedDocs.find(d => d.name === reqDoc.name);

                  return (
                    <div 
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        uploaded ? 'bg-slate-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-lg">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{reqDoc.name}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              reqDoc.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {reqDoc.isMandatory ? 'Mandatory' : 'Optional'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{reqDoc.description}</p>
                        </div>

                        {uploaded ? (
                          <div className="flex items-center gap-3">
                            {uploaded.aiCheckResult && (
                              <div className="text-right hidden sm:block">
                                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 justify-end">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Score: {uploaded.aiCheckResult.score}/100</span>
                                </div>
                                <span className="text-[10px] text-slate-400">Readability verified</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <span className="truncate max-w-[120px]">{uploaded.fileName}</span>
                              </span>

                              <button
                                onClick={() => handleDeleteDoc(uploaded.id)}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Remove document"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            id={`btn-upload-${idx}`}
                            onClick={() => handleFileUpload(reqDoc.name, reqDoc.isMandatory)}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shrink-0"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload Document</span>
                          </button>
                        )}
                      </div>

                      {/* AI Pre-check commentary banner if uploaded */}
                      {uploaded?.aiCheckResult && (
                        <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-600">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span><strong>AI Pre-Check:</strong> {uploaded.aiCheckResult.comments}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Documents are stored in encrypted client-escrow storage. Only authorized assigned agents have decryption tokens.</span>
              </div>
            </div>
          )}

          {/* STEP 5: Choose Service Mode & Agent */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 5</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Select Assistance Tier</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Choose whether you want complete end-to-end guidance by a verified local document specialist or direct self-service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Assisted */}
                <div
                  id="tier-assisted"
                  onClick={() => setServiceMode('ASSISTED')}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    serviceMode === 'ASSISTED'
                      ? 'border-blue-600 bg-blue-50/40 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white">
                        Recommended
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        serviceMode === 'ASSISTED' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {serviceMode === 'ASSISTED' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Verified Agent Assistance</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A background-checked professional checks your documents, drafts legal declarations, coordinates with state desks, and answers queries directly.
                    </p>
                    <div className="pt-2 text-xs font-bold text-blue-700">
                      Escrow Assistance: ₹{service.agentAssistanceFee}
                    </div>
                  </div>

                  <ul className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
                    <li className="flex items-center gap-1.5">✓ Notary & affidavit drafting guidance</li>
                    <li className="flex items-center gap-1.5">✓ Dedicated agent chat & phone support</li>
                    <li className="flex items-center gap-1.5">✓ 100% money-back escrow guarantee</li>
                  </ul>
                </div>

                {/* Option 2: Self-Service */}
                <div
                  id="tier-self-service"
                  onClick={() => setServiceMode('SELF_SERVICE')}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    serviceMode === 'SELF_SERVICE'
                      ? 'border-blue-600 bg-blue-50/40 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                        Self-Service
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        serviceMode === 'SELF_SERVICE' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {serviceMode === 'SELF_SERVICE' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Self-Filing Direct</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Download our complete state checklist and file directly through the official government portal without broker fees.
                    </p>
                    <div className="pt-2 text-xs font-bold text-slate-800">
                      Service Fee: ₹0 (Free)
                    </div>
                  </div>

                  <ul className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
                    <li className="flex items-center gap-1.5">• Direct official state portal redirection</li>
                    <li className="flex items-center gap-1.5">• You must manage inquiries yourself</li>
                    <li className="flex items-center gap-1.5">• Only statutory govt fee applies</li>
                  </ul>
                </div>
              </div>

              {/* Agent Picker if ASSISTED */}
              {serviceMode === 'ASSISTED' && (
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Your Verified Documentation Professional:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agents.slice(0, 4).map(agent => (
                      <div
                        key={agent.id}
                        onClick={() => setChosenAgentId(agent.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          chosenAgentId === agent.id ? 'border-blue-600 bg-blue-50/70 shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={agent.avatar}
                            alt={agent.fullName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{agent.fullName}</div>
                            <div className="text-[10px] text-slate-500">{agent.location.district}, {agent.location.state}</div>
                            <div className="text-[10px] text-amber-600 font-semibold">★ {agent.rating} ({agent.totalApplicationsCompleted} cases)</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-blue-700">₹{agent.serviceFeeRange.min}</div>
                          <span className="text-[10px] text-slate-400">Assistance</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Review & Payment Escrow */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 6</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Review & Escrow Payment</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Review itemized fees. Funds remain in secure escrow and are released only upon milestone progress.
                </p>
              </div>

              {/* Itemized summary breakdown */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-200">
                  Fee Breakdown for {service.name}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Official Government Statutory Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {service.isGovernmentFeeFree ? 'Free (₹0)' : `₹${govtFee}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>
                    Agent Assistance Fee ({serviceMode === 'ASSISTED' ? chosenAgent?.fullName || 'Assigned Agent' : 'Self-Service'}):
                  </span>
                  <span className="font-semibold text-blue-600">₹{agentFee}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>GovEase Platform Technology & Escrow Fee:</span>
                  <span className="font-semibold text-slate-900">₹{platformFee}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>GST & Municipal Charges (18% on facilitation):</span>
                  <span className="font-semibold text-slate-900">₹{taxes}</span>
                </div>

                <div className="pt-3 border-t border-slate-300 flex items-center justify-between font-bold text-base text-slate-900">
                  <span>Total Payable:</span>
                  <span className="text-xl text-blue-600 font-mono">₹{totalPayable}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)' },
                    { id: 'CARD', label: 'Credit / Debit Card' },
                    { id: 'NETBANKING', label: 'Net Banking' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mandatory Regulatory Disclaimer Checkbox */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="checkbox-disclaimer-acknowledgment"
                    checked={agreedToDisclaimer}
                    onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded border-amber-400 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs text-amber-950 leading-relaxed font-medium">
                    <strong>Mandatory Acknowledgment:</strong> I explicitly understand that <strong>GovEase is an independent assistance platform</strong> and not a government entity. The government statutory fee is fixed by the state revenue department, and official decisions or delays rest solely with competent authorities.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                id="btn-wizard-prev"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <button
                id="btn-wizard-next"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-wizard-pay-submit"
                disabled={isSubmitting || !agreedToDisclaimer}
                onClick={handleSubmitFinal}
                className={`px-8 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                  !agreedToDisclaimer || isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                }`}
              >
                {isSubmitting ? (
                  <span>Securing Escrow & Filing...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Escrow & Submit Request (₹{totalPayable})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
