import { 
  User, 
  Agent, 
  GovernmentService, 
  Application, 
  PaymentTransaction, 
  ChatMessage, 
  NotificationItem, 
  Review, 
  SupportTicket, 
  AuditLog 
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  USER: {
    id: 'usr_rahul_01',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 43210',
    role: 'USER',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'B-402, Shivajinagar Residency, FC Road',
    pincode: '411005',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15'
  },
  AGENT: {
    id: 'usr_raj_agent',
    name: 'Raj Kumar',
    email: 'raj.services@govease-agent.in',
    phone: '+91 98230 11223',
    role: 'AGENT',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'Shop 12, Revenue Complex, Sadashiv Peth',
    pincode: '411030',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-06-20'
  },
  ADMIN: {
    id: 'usr_priya_admin',
    name: 'Priya Sharma',
    email: 'priya.admin@govease.in',
    phone: '+91 98111 99887',
    role: 'ADMIN',
    state: 'Delhi',
    city: 'New Delhi',
    address: 'GovEase HQ, Tech Hub, Connaught Place',
    pincode: '110001',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-10'
  }
};

export const MOCK_SERVICES: GovernmentService[] = [
  {
    id: 'srv_income',
    slug: 'income-certificate',
    name: 'Income Certificate',
    category: 'Certificates',
    description: 'Assistance for obtaining an official Income Certificate issued by the Revenue/Tehsil department verifying annual household earnings.',
    purpose: 'Required for university fee concessions, government scholarships, EWS quota admissions, social welfare schemes, and subsidy grants.',
    eligibility: [
      'Must be a permanent resident of the applying state or district',
      'Income must be accurately declared with supported salary slips or ITR / patwari report',
      'No pending non-compliance charges with the local revenue circle'
    ],
    requiredDocuments: [
      { name: 'Identity Proof', description: 'Aadhaar Card, Voter ID, or Passport', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Address Proof', description: 'Electricity Bill, Ration Card, or Rent Agreement', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Income Proof / Salary Slip / ITR', description: 'Form 16, Salary Slip, or Self Declaration attested by Patwari/Talathi', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Passport Size Photograph', description: 'Recent color photograph with light background', mandatory: true, acceptedTypes: ['JPG', 'PNG'] }
    ],
    governmentFee: 50,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 350,
    estimatedProcessingTime: '7–14 Business Days',
    officialUrl: 'https://serviceonline.gov.in',
    officialPortalName: 'ServicePlus / State e-District Portal',
    stateAvailability: 'All States (District Revenue Authorities)',
    isPopular: true,
    iconName: 'FileSpreadsheet',
    eligibilityQuestions: [
      { id: 'q1', question: 'What is your approximate gross household annual income?', type: 'select', options: ['Below ₹1,00,000', '₹1,00,000 – ₹2,50,000', '₹2,50,000 – ₹5,00,000', 'Above ₹5,00,000'] },
      { id: 'q2', question: 'Primary source of household income', type: 'select', options: ['Agriculture / Farming', 'Salaried Employment', 'Daily Wage Labor', 'Small Business / Trade'] },
      { id: 'q3', question: 'Do you hold an existing Ration Card / BPL card?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_caste',
    slug: 'caste-certificate',
    name: 'Caste Certificate (SC/ST/OBC)',
    category: 'Certificates',
    description: 'Guidance and document review for applying for caste verification and reservation entitlement certificate from the Sub-Divisional Magistrate (SDM).',
    purpose: 'Crucial for government exams, competitive reservations (UPSC/SSC/State PSC), reserved quota college admissions, and welfare subsidies.',
    eligibility: [
      'Applicant must belong to recognized SC, ST, or OBC community in state central gazette list',
      'Paternal lineage documentation linking ancestry to the state prior to the cutoff year (e.g. 1950/1967 depending on state)'
    ],
    requiredDocuments: [
      { name: 'Applicant Identity Card', description: 'Aadhaar Card or School Leaving Certificate', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Father/Paternal Blood Relative Caste Proof', description: 'Father/Uncle caste certificate or land records mentioning community', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Residence Proof Before Cut-off Year', description: 'Old 7/12 extract, school register entry, or ancestral property record', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Affidavit in Prescribed Form', description: 'Sworn notary affidavit stating sub-caste and lineage', mandatory: true, acceptedTypes: ['PDF'] }
    ],
    governmentFee: 30,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 499,
    estimatedProcessingTime: '15–30 Business Days',
    officialUrl: 'https://edistrict.delhigovt.nic.in',
    officialPortalName: 'State e-District SDM Portal',
    stateAvailability: 'All States & Union Territories',
    isPopular: true,
    iconName: 'Award',
    eligibilityQuestions: [
      { id: 'q1', question: 'Select your community category', type: 'select', options: ['Other Backward Class (OBC - Non Creamy Layer)', 'Scheduled Caste (SC)', 'Scheduled Tribe (ST)', 'Nomadic Tribe (NT/VJNT)'] },
      { id: 'q2', question: 'Do you have your father or grandfather’s existing caste certificate or school record?', type: 'boolean' },
      { id: 'q3', question: 'Is the certificate required for State quota or Central Government format?', type: 'select', options: ['Central Government Format (UPSC/SSC/Govt of India)', 'State Government Format'] }
    ]
  },
  {
    id: 'srv_domicile',
    slug: 'domicile-certificate',
    name: 'Domicile / Residence Certificate',
    category: 'Certificates',
    description: 'Document preparation and filing assistance to verify legal, habitual residence in a specific state or Union territory.',
    purpose: 'Mandatory for state government recruitment quotas, admission to 85% state-quota medical/engineering seats, and regional domicile benefits.',
    eligibility: [
      'Continuous residence in the state for the mandatory threshold (usually 10 to 15 years)',
      'Education completed within the state or ancestral residence proof'
    ],
    requiredDocuments: [
      { name: 'Aadhaar / Voter ID', description: 'With current residential address', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Proof of Continuous Residence (10-15 Years)', description: 'School leaving certificates, domicile of parents, or property tax receipts', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Self Declaration Affidavit', description: 'Signed and notarized stating non-domicile claim in any other state', mandatory: true, acceptedTypes: ['PDF'] }
    ],
    governmentFee: 50,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 399,
    estimatedProcessingTime: '10–20 Business Days',
    officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
    officialPortalName: 'State Citizen Services (Aaple Sarkar / e-District)',
    stateAvailability: 'All States',
    isPopular: true,
    iconName: 'Home',
    eligibilityQuestions: [
      { id: 'q1', question: 'How many continuous years have you lived in this state?', type: 'select', options: ['Less than 10 years', '10 to 15 years', 'More than 15 years', 'Born and raised in this state'] },
      { id: 'q2', question: 'Did you pass 10th and 12th standards from this state?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_ews',
    slug: 'ews-certificate',
    name: 'EWS Certificate (Economically Weaker Section)',
    category: 'Certificates',
    description: 'Guidance to obtain Income and Asset Certificate for claiming 10% reservation under General Category EWS quota.',
    purpose: 'Provides 10% reservation in civil posts, central educational institutions (IITs, IIMs, AIIMS, NITs, Central Universities).',
    eligibility: [
      'General category citizen not covered under SC, ST, or OBC reservation',
      'Gross annual family income strictly below ₹8 Lakhs from all sources',
      'Agricultural land ownership below 5 acres; residential flat area below 1000 sq ft'
    ],
    requiredDocuments: [
      { name: 'Family Income Proof / ITR Copies', description: 'ITR acknowledgement for last financial year for all earning members', mandatory: true, acceptedTypes: ['PDF'] },
      { name: 'Land / Property Holding Declaration', description: '7/12 extract or registry papers showing residential and agricultural holdings', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Aadhaar of all family members', description: 'Father, Mother, Spouse, Unmarried siblings below 18', mandatory: true, acceptedTypes: ['PDF', 'JPG'] }
    ],
    governmentFee: 50,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 450,
    estimatedProcessingTime: '14–21 Business Days',
    officialUrl: 'https://serviceonline.gov.in',
    officialPortalName: 'National ServicePlus Portal',
    stateAvailability: 'All States',
    isPopular: true,
    iconName: 'FileCheck',
    eligibilityQuestions: [
      { id: 'q1', question: 'Is your total gross family income below ₹8,00,000 per annum?', type: 'boolean' },
      { id: 'q2', question: 'Do you belong to General category (not SC/ST/OBC)?', type: 'boolean' },
      { id: 'q3', question: 'Does your family own agricultural land of 5 acres or more?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_birth',
    slug: 'birth-certificate',
    name: 'Birth Certificate Assistance & Delayed Registration',
    category: 'Certificates',
    description: 'Assistance for applying for new, delayed, or corrected Municipal / Panchayat Birth Certificates.',
    purpose: 'Fundamental legal proof of age and parentage for school enrollment, passport issuance, visa processing, and civil registries.',
    eligibility: [
      'Birth occurred within municipal or gram panchayat jurisdiction',
      'For delayed registration (after 1 year), SDM order or hospital discharge slip is mandatory'
    ],
    requiredDocuments: [
      { name: 'Hospital Discharge Summary / Birth Slip', description: 'Institutional birth slip or ANM certificate', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Parents Identity and Marriage Proof', description: 'Aadhaar of parents and Marriage certificate', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Affidavit for Delayed Registration (if > 1 year)', description: 'Affidavit explaining reason for delayed entry', mandatory: false, acceptedTypes: ['PDF'] }
    ],
    governmentFee: 20,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 399,
    estimatedProcessingTime: '7–15 Business Days',
    officialUrl: 'https://crsorgi.gov.in',
    officialPortalName: 'Civil Registration System (ORGI)',
    stateAvailability: 'All Municipalities & Gram Panchayats',
    isPopular: true,
    iconName: 'Baby',
    eligibilityQuestions: [
      { id: 'q1', question: 'When did the birth occur?', type: 'select', options: ['Within last 21 days', 'Within 30 days to 1 year', 'More than 1 year ago (Delayed Registration)'] },
      { id: 'q2', question: 'Place of Birth', type: 'select', options: ['Hospital / Nursing Home', 'Home / Residence'] }
    ]
  },
  {
    id: 'srv_death',
    slug: 'death-certificate',
    name: 'Death Certificate Registration & Copies',
    category: 'Certificates',
    description: 'Assistance for registering deaths, obtaining legal extract certificates from local authorities for insurance and succession.',
    purpose: 'Required for life insurance claims, bank account settlement, property mutation, family pension, and title transfer.',
    eligibility: [
      'Immediate family member, legal heir, or close relative of the deceased',
      'Death occurred in registered jurisdiction'
    ],
    requiredDocuments: [
      { name: 'Medical Certification of Cause of Death', description: 'Signed by treating doctor or hospital authority', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Cremation / Burial Ground Receipt', description: 'Official slip from municipal burning ghat / cemetery', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Deceased Person Aadhaar / Voter Card', description: 'Original or copy for record cancellation', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Applicant Identity Proof', description: 'Proving relationship to the deceased', mandatory: true, acceptedTypes: ['PDF', 'JPG'] }
    ],
    governmentFee: 20,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 350,
    estimatedProcessingTime: '7–10 Business Days',
    officialUrl: 'https://crsorgi.gov.in',
    officialPortalName: 'Civil Registration System (CRS)',
    stateAvailability: 'All Municipalities',
    isPopular: false,
    iconName: 'FileText',
    eligibilityQuestions: [
      { id: 'q1', question: 'Did the death occur in hospital or residence?', type: 'select', options: ['Government / Private Hospital', 'At Home'] },
      { id: 'q2', question: 'Do you hold the Cremation/Burial Ground receipt?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_marriage',
    slug: 'marriage-certificate',
    name: 'Marriage Certificate Registration',
    category: 'Certificates',
    description: 'Documentation preparation, appointment booking, and guidance for registration under Special Marriage Act or Hindu Marriage Act.',
    purpose: 'Legal proof of marriage for spouse visa applications, joint property registration, adding spouse name in passport, and health insurance.',
    eligibility: [
      'Bridegroom must have attained 21 years of age; Bride must have attained 18 years of age',
      'Mutual consent, valid witnesses, and wedding solemnization proof'
    ],
    requiredDocuments: [
      { name: 'Wedding Card & Marriage Photographs', description: 'Invitation card and photographs of ceremony rituals', mandatory: true, acceptedTypes: ['PDF', 'JPG', 'PNG'] },
      { name: 'Age & Address Proof of Both Parties', description: 'Aadhaar, Passport, or Birth Certificates of Bride and Groom', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Witness Identity Documents (3 Witnesses)', description: 'Aadhaar Cards of 3 adults who attended the marriage', mandatory: true, acceptedTypes: ['PDF', 'JPG'] }
    ],
    governmentFee: 100,
    isGovernmentFeeFree: false,
    platformFee: 149,
    agentAssistanceFee: 799,
    estimatedProcessingTime: '15–30 Business Days',
    officialUrl: 'https://igrmaharashtra.gov.in',
    officialPortalName: 'Inspector General of Registration (IGR)',
    stateAvailability: 'All States',
    isPopular: true,
    iconName: 'HeartHandshake',
    eligibilityQuestions: [
      { id: 'q1', question: 'Which Marriage Act applies?', type: 'select', options: ['Hindu Marriage Act (already solemnized)', 'Special Marriage Act (Court Marriage with 30-day notice)', 'Other Personal Laws'] },
      { id: 'q2', question: 'Do you have 3 adult witnesses with valid Aadhaar cards?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_character',
    slug: 'character-certificate',
    name: 'Police Clearance / Character Certificate',
    category: 'Certificates',
    description: 'Online application assistance and local police station liaison for issuing Police Verification Certificate (PVC).',
    purpose: 'Required for defense recruitment, central government jobs, cab driver badge, overseas immigration, and security personnel verification.',
    eligibility: [
      'Resident of the local police jurisdiction for at least 6 months to 1 year',
      'No active criminal FIR or pending warrant on applicant record'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Card / Passport', description: 'Identity and permanent address verification', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Current Residence Proof', description: 'Registered Rent agreement or utility bill', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Passport Size Photograph', description: 'Clear frontal photo with neutral expression', mandatory: true, acceptedTypes: ['JPG', 'PNG'] }
    ],
    governmentFee: 150,
    isGovernmentFeeFree: false,
    platformFee: 99,
    agentAssistanceFee: 399,
    estimatedProcessingTime: '10–21 Business Days',
    officialUrl: 'https://citizen.mahapolice.gov.in',
    officialPortalName: 'State Police Citizen Portal / CCTNS',
    stateAvailability: 'All States (Police Departments)',
    isPopular: false,
    iconName: 'ShieldCheck',
    eligibilityQuestions: [
      { id: 'q1', question: 'Purpose of Character Certificate', type: 'select', options: ['Government Job Appointment', 'Private / Corporate Employment', 'Visa / Foreign Travel', 'Contractor / Arms License'] },
      { id: 'q2', question: 'Have you ever had any criminal FIR or court case registered against you?', type: 'boolean' }
    ]
  },
  {
    id: 'srv_msme',
    slug: 'msme-udyam-registration',
    name: 'MSME / Udyam Business Registration',
    category: 'Business',
    description: 'Zero-hassle filing for Ministry of MSME Udyam Registration Certificate for micro, small, and medium enterprises.',
    purpose: 'Enables priority sector bank loans at low interest rates, collateral-free credit, 50% patent/trademark discount, and government tender exemptions.',
    eligibility: [
      'Proprietorship, Partnership, LLP, or Private Limited business in manufacturing or service sector',
      'Business owner must have valid PAN and Aadhaar linked to mobile number'
    ],
    requiredDocuments: [
      { name: 'Aadhaar Card of Proprietor/Director', description: 'Must be linked with active mobile number for OTP', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'PAN Card of Business / Proprietor', description: 'Valid Permanent Account Number', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Bank Account Proof', description: 'Cancelled Cheque or Bank Statement showing IFSC & Account No.', mandatory: true, acceptedTypes: ['PDF', 'JPG'] }
    ],
    governmentFee: 0,
    isGovernmentFeeFree: true,
    platformFee: 99,
    agentAssistanceFee: 299,
    estimatedProcessingTime: '1–3 Business Days',
    officialUrl: 'https://udyamregistration.gov.in',
    officialPortalName: 'Ministry of MSME Official Portal (Udyam)',
    stateAvailability: 'All India (Central Portal)',
    isPopular: true,
    iconName: 'Briefcase',
    eligibilityQuestions: [
      { id: 'q1', question: 'Type of Enterprise', type: 'select', options: ['Proprietorship (Individual)', 'Partnership Firm', 'Private Limited Company', 'One Person Company (OPC)'] },
      { id: 'q2', question: 'Major Activity of Enterprise', type: 'select', options: ['Manufacturing', 'Services', 'Trading'] }
    ]
  },
  {
    id: 'srv_driving_lic',
    slug: 'driving-license-assistance',
    name: 'Learner & Permanent Driving License Assistance',
    category: 'Licenses',
    description: 'Sarathi Parivahan portal guidance, slot booking for RTO driving tests, and document pre-checking.',
    purpose: 'Legal authorization to operate motor vehicles (Two-Wheeler / Four-Wheeler) on public Indian roads.',
    eligibility: [
      'Minimum age of 18 years for Light Motor Vehicles (LMV) and 16 years for gearless two-wheeler',
      'Passing physical fitness declaration (Form 1 / 1A)'
    ],
    requiredDocuments: [
      { name: 'Age Proof', description: 'Birth Certificate, School Leaving Certificate, or 10th Marksheet', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Current Address Proof', description: 'Aadhaar Card, Voter ID, or Bank Passbook with photo', mandatory: true, acceptedTypes: ['PDF', 'JPG'] },
      { name: 'Medical Certificate (Form 1A)', description: 'Signed by Registered Medical Practitioner for applicants > 40 years or commercial', mandatory: false, acceptedTypes: ['PDF'] }
    ],
    governmentFee: 350,
    isGovernmentFeeFree: false,
    platformFee: 149,
    agentAssistanceFee: 499,
    estimatedProcessingTime: '7–20 Business Days',
    officialUrl: 'https://sarathi.parivahan.gov.in',
    officialPortalName: 'Ministry of Road Transport & Highways (Sarathi)',
    stateAvailability: 'All States (RTO Jurisdictions)',
    isPopular: true,
    iconName: 'Car',
    eligibilityQuestions: [
      { id: 'q1', question: 'What service do you require?', type: 'select', options: ['New Learner License (LL)', 'Learner to Permanent Driving License (DL)', 'Renewal of Expired License', 'International Driving Permit (IDP)'] },
      { id: 'q2', question: 'Select Vehicle Category', type: 'select', options: ['Motorcycle with Gear (MCWG)', 'Light Motor Vehicle - Car (LMV)', 'Both Two Wheeler & Car (MCWG + LMV)'] }
    ]
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agt_raj_kumar',
    userId: 'usr_raj_agent',
    name: 'Raj Kumar',
    agencyName: 'Raj Citizen & Revenue Services',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98230 11223',
    email: 'raj.services@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 6,
    rating: 4.85,
    reviewCount: 142,
    completedRequests: 1245,
    languages: ['Hindi', 'English', 'Marathi'],
    services: ['Income Certificate', 'Domicile Certificate', 'Caste Certificate', 'EWS Certificate', 'MSME / Udyam Business Registration'],
    startingFee: 350,
    location: { state: 'Maharashtra', city: 'Pune' },
    availability: 'Available Today',
    bio: 'Licensed document consultant with 6+ years assisting citizens with Tehsil and Sub-Divisional Magistrate filings. Specializes in accurate document scrutiny to avoid clerical rejections.',
    licenseNumber: 'MAH-PUN-DOC-2021-0894'
  },
  {
    id: 'agt_anita_deshmukh',
    userId: 'usr_anita_02',
    name: 'Anita Deshmukh',
    agencyName: 'Deshmukh Legal & Notary Documentation',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98211 44556',
    email: 'anita.legal@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 8,
    rating: 4.92,
    reviewCount: 210,
    completedRequests: 1890,
    languages: ['English', 'Marathi', 'Hindi'],
    services: ['Marriage Certificate Registration', 'Birth Certificate Assistance', 'Death Certificate Registration', 'Income Certificate'],
    startingFee: 399,
    location: { state: 'Maharashtra', city: 'Mumbai' },
    availability: 'Available Today',
    bio: 'Senior documentation specialist based near Mumbai Registrar office. Guides couples, families, and senior citizens through civil registration, affidavit drafting, and expedited slot booking.',
    licenseNumber: 'MAH-MUM-REG-2018-0412'
  },
  {
    id: 'agt_vikram_singh',
    userId: 'usr_vikram_03',
    name: 'Vikram Singh',
    agencyName: 'Singh & Associates e-Mitra Hub',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    phone: '+91 94140 77889',
    email: 'vikram.emitra@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 5,
    rating: 4.78,
    reviewCount: 98,
    completedRequests: 860,
    languages: ['Hindi', 'English', 'Rajasthani'],
    services: ['Caste Certificate (SC/ST/OBC)', 'EWS Certificate', 'Income Certificate', 'Learner & Permanent Driving License Assistance'],
    startingFee: 350,
    location: { state: 'Rajasthan', city: 'Jaipur' },
    availability: 'Next Day',
    bio: 'Authorized service professional providing transparent guidance on e-Mitra and Jan Aadhaar platform submissions. Deep knowledge of community reservations and cut-off verification.',
    licenseNumber: 'RAJ-JPR-EMT-2022-1102'
  },
  {
    id: 'agt_sunil_verma',
    userId: 'usr_sunil_04',
    name: 'Sunil Verma',
    agencyName: 'Capital Citizen Facilitation Center',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98102 33445',
    email: 'sunil.delhi@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 7,
    rating: 4.88,
    reviewCount: 175,
    completedRequests: 1430,
    languages: ['Hindi', 'English', 'Punjabi'],
    services: ['Police Clearance / Character Certificate', 'Domicile / Residence Certificate', 'Learner & Permanent Driving License Assistance', 'MSME / Udyam Business Registration'],
    startingFee: 450,
    location: { state: 'Delhi', city: 'New Delhi' },
    availability: 'Available Today',
    bio: 'Serving Delhi NCR citizens across 11 district magistrate offices. Dedicated to prompt communication, status follow-ups, and clear document checklists.',
    licenseNumber: 'DL-SDM-FAC-2019-3382'
  },
  {
    id: 'agt_kavita_reddy',
    userId: 'usr_kavita_05',
    name: 'Kavita Reddy',
    agencyName: 'Telangana MeeSeva Assistance Point',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98490 22334',
    email: 'kavita.meeseva@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 4,
    rating: 4.82,
    reviewCount: 84,
    completedRequests: 710,
    languages: ['Telugu', 'English', 'Hindi'],
    services: ['Income Certificate', 'Caste Certificate (SC/ST/OBC)', 'Birth Certificate Assistance', 'MSME / Udyam Business Registration'],
    startingFee: 300,
    location: { state: 'Telangana', city: 'Hyderabad' },
    availability: 'Available Today',
    bio: 'MeeSeva facilitator helping IT professionals and students with fast-track documentation, student scholarship certificates, and revenue approvals.',
    licenseNumber: 'TG-HYD-MSV-2023-7721'
  },
  {
    id: 'agt_ramesh_iyer',
    userId: 'usr_ramesh_06',
    name: 'Ramesh Iyer',
    agencyName: 'Karnataka Seva Sindhu Helpdesk',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98800 66778',
    email: 'ramesh.bangalore@govease-agent.in',
    verificationStatus: 'Verified',
    identityVerified: true,
    platformVerified: true,
    experienceYears: 9,
    rating: 4.95,
    reviewCount: 320,
    completedRequests: 2450,
    languages: ['Kannada', 'English', 'Tamil', 'Hindi'],
    services: ['Domicile / Residence Certificate', 'Income Certificate', 'MSME / Udyam Business Registration', 'Marriage Certificate Registration'],
    startingFee: 499,
    location: { state: 'Karnataka', city: 'Bengaluru' },
    availability: 'In 2-3 Days',
    bio: 'Highly experienced liaison professional for Nadakacheri and Seva Sindhu portals. Over 2,400 satisfied Bangalore residents helped with 100% genuine compliance verification.',
    licenseNumber: 'KA-BLR-SS-2017-0091'
  },
  {
    id: 'agt_mohit_sharma',
    userId: 'usr_mohit_07',
    name: 'Mohit Sharma',
    agencyName: 'UP Jan Seva Kendra Kendra',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    phone: '+91 94500 11990',
    email: 'mohit.up@govease-agent.in',
    verificationStatus: 'Pending',
    identityVerified: true,
    platformVerified: false,
    experienceYears: 3,
    rating: 4.50,
    reviewCount: 28,
    completedRequests: 190,
    languages: ['Hindi', 'English'],
    services: ['Income Certificate', 'Caste Certificate (SC/ST/OBC)', 'Domicile / Residence Certificate'],
    startingFee: 299,
    location: { state: 'Uttar Pradesh', city: 'Lucknow' },
    availability: 'Available Today',
    bio: 'Jan Seva Kendra operator in Lucknow providing door-to-door document guidance and online tracking support.',
    licenseNumber: 'UP-LKO-JSK-2024-5512'
  },
  {
    id: 'agt_pooja_sen',
    userId: 'usr_pooja_08',
    name: 'Pooja Sen',
    agencyName: 'Bengal e-District Documentation Care',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
    phone: '+91 98300 88991',
    email: 'pooja.kolkata@govease-agent.in',
    verificationStatus: 'Under Review',
    identityVerified: true,
    platformVerified: false,
    experienceYears: 4,
    rating: 4.65,
    reviewCount: 45,
    completedRequests: 320,
    languages: ['Bengali', 'English', 'Hindi'],
    services: ['Birth Certificate Assistance', 'Character Certificate', 'EWS Certificate'],
    startingFee: 350,
    location: { state: 'West Bengal', city: 'Kolkata' },
    availability: 'Available Today',
    bio: 'KMC and e-District specialist assisting Kolkata and suburban citizens with Municipal registrations and affidavit verifications.',
    licenseNumber: 'WB-KOL-ED-2023-8829'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'GE-2026-001245',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    userEmail: 'rahul.verma@example.com',
    userPhone: '+91 98765 43210',
    serviceId: 'srv_income',
    serviceName: 'Income Certificate',
    serviceCategory: 'Certificates',
    agentId: 'agt_raj_kumar',
    agentName: 'Raj Kumar (Raj Services)',
    agentFee: 350,
    governmentFee: 50,
    platformFee: 99,
    totalPaid: 589, // (350+99)*1.18 + 50 ≈ 589
    isSelfService: false,
    status: 'DOCUMENTS_VERIFIED',
    statusLabel: 'Documents Verified by Agent',
    submittedAt: '2026-09-02',
    estimatedCompletionDate: '2026-09-12',
    applicantDetails: {
      fullName: 'Rahul Suresh Verma',
      dob: '1998-05-14',
      phone: '+91 98765 43210',
      email: 'rahul.verma@example.com',
      address: 'B-402, Shivajinagar Residency, FC Road',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411005',
      answers: {
        'q1': 'Below ₹1,00,000',
        'q2': 'Salaried Employment',
        'q3': 'true'
      }
    },
    timeline: [
      {
        stepIndex: 1,
        stageName: 'Request Created',
        category: 'GovEase Processing',
        date: '2026-09-02',
        time: '10:30 AM',
        description: 'Citizen submitted assistance request on GovEase platform and paid service escrow.',
        responsibleParty: 'Rahul Verma (Citizen)',
        completed: true
      },
      {
        stepIndex: 2,
        stageName: 'Documents Submitted',
        category: 'GovEase Processing',
        date: '2026-09-02',
        time: '10:45 AM',
        description: 'Aadhaar, Electricity bill, and Salary slip uploaded with AI pre-check passed.',
        responsibleParty: 'Rahul Verma (Citizen)',
        completed: true
      },
      {
        stepIndex: 3,
        stageName: 'Agent Assigned',
        category: 'GovEase Processing',
        date: '2026-09-02',
        time: '11:15 AM',
        description: 'Verified independent agent Raj Kumar accepted the case and reviewed application requirements.',
        responsibleParty: 'GovEase Platform Dispatcher',
        completed: true
      },
      {
        stepIndex: 4,
        stageName: 'Documents Verified',
        category: 'GovEase Processing',
        date: '2026-09-03',
        time: '02:00 PM',
        description: 'Agent verified that salary slips match Tehsil format and no mandatory fields are missing.',
        responsibleParty: 'Raj Kumar (Verified Agent)',
        completed: true,
        current: true
      },
      {
        stepIndex: 5,
        stageName: 'Official Application Submitted',
        category: 'Official Government Processing',
        date: 'Pending',
        time: 'Pending',
        description: 'Application to be lodged on State e-District portal with official acknowledgment slip.',
        responsibleParty: 'State Revenue e-District Desk',
        completed: false
      },
      {
        stepIndex: 6,
        stageName: 'Government Processing',
        category: 'Official Government Processing',
        date: 'Pending',
        time: 'Pending',
        description: 'Field inspection / Talathi verification and Sub-Divisional Revenue review.',
        responsibleParty: 'Talathi / Circle Officer',
        completed: false
      },
      {
        stepIndex: 7,
        stageName: 'Certificate Ready',
        category: 'Official Government Processing',
        date: 'Pending',
        time: 'Pending',
        description: 'Digitally signed official certificate issued by Revenue Department.',
        responsibleParty: 'Tahsildar Digital Signatory',
        completed: false
      },
      {
        stepIndex: 8,
        stageName: 'Completed',
        category: 'GovEase Processing',
        date: 'Pending',
        time: 'Pending',
        description: 'Certificate delivered to user vault and notification dispatched.',
        responsibleParty: 'GovEase System',
        completed: false
      }
    ],
    documents: [
      {
        id: 'doc_aadhaar_01',
        applicationId: 'GE-2026-001245',
        userId: 'usr_rahul_01',
        documentType: 'Identity Proof (Aadhaar)',
        fileName: 'Aadhaar_Card_Rahul.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-09-02',
        verificationStatus: 'Verified',
        aiPreCheck: {
          passed: true,
          readabilityScore: 96,
          completeness: '100% clear with visible QR and address',
          detectedIssues: [],
          aiNote: 'High resolution scan. Name matches applicant identity.'
        }
      },
      {
        id: 'doc_address_01',
        applicationId: 'GE-2026-001245',
        userId: 'usr_rahul_01',
        documentType: 'Address Proof',
        fileName: 'Electricity_Bill_July2026.pdf',
        fileSize: '840 KB',
        uploadedAt: '2026-09-02',
        verificationStatus: 'Verified',
        aiPreCheck: {
          passed: true,
          readabilityScore: 92,
          completeness: 'Bill date is within 3 months threshold',
          detectedIssues: [],
          aiNote: 'Valid residential utility bill.'
        }
      },
      {
        id: 'doc_income_01',
        applicationId: 'GE-2026-001245',
        userId: 'usr_rahul_01',
        documentType: 'Income Proof',
        fileName: 'Salary_Certificate_Form16.pdf',
        fileSize: '2.1 MB',
        uploadedAt: '2026-09-02',
        verificationStatus: 'Verified',
        aiPreCheck: {
          passed: true,
          readabilityScore: 88,
          completeness: 'Employer stamp visible, salary details match declared band',
          detectedIssues: [],
          aiNote: 'Document conforms to revenue department format.'
        }
      }
    ]
  },
  {
    id: 'GE-2026-001210',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    userEmail: 'rahul.verma@example.com',
    userPhone: '+91 98765 43210',
    serviceId: 'srv_domicile',
    serviceName: 'Domicile / Residence Certificate',
    serviceCategory: 'Certificates',
    agentId: 'agt_anita_deshmukh',
    agentName: 'Anita Deshmukh (Deshmukh Legal)',
    agentFee: 399,
    governmentFee: 50,
    platformFee: 99,
    totalPaid: 637,
    isSelfService: false,
    status: 'COMPLETED',
    statusLabel: 'Completed — Certificate Ready',
    submittedAt: '2026-08-10',
    estimatedCompletionDate: '2026-08-25',
    completedAt: '2026-08-22',
    certificateDownloadUrl: '#download-domicile-sample',
    officialAcknowledgementNumber: 'MAH-PUN-DOM-2026-99238',
    applicantDetails: {
      fullName: 'Rahul Suresh Verma',
      dob: '1998-05-14',
      phone: '+91 98765 43210',
      email: 'rahul.verma@example.com',
      address: 'B-402, Shivajinagar Residency, FC Road',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411005',
      answers: {
        'q1': 'Born and raised in this state',
        'q2': 'true'
      }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-08-10', time: '09:10 AM', description: 'Assistance booked.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 2, stageName: 'Documents Submitted', category: 'GovEase Processing', date: '2026-08-10', time: '09:30 AM', description: '15-year school records uploaded.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 3, stageName: 'Agent Assigned', category: 'GovEase Processing', date: '2026-08-10', time: '11:00 AM', description: 'Anita Deshmukh assigned.', responsibleParty: 'GovEase', completed: true },
      { stepIndex: 4, stageName: 'Documents Verified', category: 'GovEase Processing', date: '2026-08-11', time: '03:15 PM', description: 'All records attested.', responsibleParty: 'Agent', completed: true },
      { stepIndex: 5, stageName: 'Official Application Submitted', category: 'Official Government Processing', date: '2026-08-12', time: '11:30 AM', description: 'Lodge on Aaple Sarkar portal. Token MAH-PUN-DOM-2026-99238.', responsibleParty: 'Revenue Dept', completed: true },
      { stepIndex: 6, stageName: 'Government Processing', category: 'Official Government Processing', date: '2026-08-18', time: '04:00 PM', description: 'Field verification cleared by Circle Inspector.', responsibleParty: 'SDM Pune', completed: true },
      { stepIndex: 7, stageName: 'Certificate Ready', category: 'Official Government Processing', date: '2026-08-22', time: '10:00 AM', description: 'Digitally signed certificate issued.', responsibleParty: 'Tahsildar', completed: true },
      { stepIndex: 8, stageName: 'Completed', category: 'GovEase Processing', date: '2026-08-22', time: '11:00 AM', description: 'Delivered to vault. Process completed.', responsibleParty: 'GovEase', completed: true }
    ],
    documents: [
      {
        id: 'doc_dom_01',
        applicationId: 'GE-2026-001210',
        userId: 'usr_rahul_01',
        documentType: '15-year residence proof',
        fileName: 'School_Leaving_Certificate.pdf',
        fileSize: '1.5 MB',
        uploadedAt: '2026-08-10',
        verificationStatus: 'Verified',
        aiPreCheck: { passed: true, readabilityScore: 94, completeness: 'Confirmed 15+ years residency', detectedIssues: [], aiNote: 'All stamps legible.' }
      }
    ]
  },
  {
    id: 'GE-2026-001289',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    userEmail: 'rahul.verma@example.com',
    userPhone: '+91 98765 43210',
    serviceId: 'srv_msme',
    serviceName: 'MSME / Udyam Business Registration',
    serviceCategory: 'Business',
    agentId: 'agt_raj_kumar',
    agentName: 'Raj Kumar',
    agentFee: 299,
    governmentFee: 0,
    platformFee: 99,
    totalPaid: 469,
    isSelfService: false,
    status: 'OFFICIAL_SUBMITTED',
    statusLabel: 'Submitted to Udyam Portal',
    submittedAt: '2026-09-01',
    estimatedCompletionDate: '2026-09-05',
    applicantDetails: {
      fullName: 'Rahul Suresh Verma',
      dob: '1998-05-14',
      phone: '+91 98765 43210',
      email: 'rahul.verma@example.com',
      address: 'B-402, Shivajinagar Residency, FC Road',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411005',
      answers: {
        'q1': 'Proprietorship (Individual)',
        'q2': 'Services'
      }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-09-01', time: '02:00 PM', description: 'Assistance request booked.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 2, stageName: 'Documents Submitted', category: 'GovEase Processing', date: '2026-09-01', time: '02:30 PM', description: 'PAN and Bank proof submitted.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 3, stageName: 'Agent Assigned', category: 'GovEase Processing', date: '2026-09-01', time: '03:15 PM', description: 'Raj Kumar assigned to verify NIC codes.', responsibleParty: 'GovEase', completed: true },
      { stepIndex: 4, stageName: 'Documents Verified', category: 'GovEase Processing', date: '2026-09-02', time: '11:00 AM', description: 'Aadhaar name matches PAN card exactly.', responsibleParty: 'Agent', completed: true },
      { stepIndex: 5, stageName: 'Official Application Submitted', category: 'Official Government Processing', date: '2026-09-03', time: '04:00 PM', description: 'Filing completed on udyamregistration.gov.in. Awaiting central e-sign validation.', responsibleParty: 'Ministry of MSME', completed: true, current: true },
      { stepIndex: 6, stageName: 'Government Processing', category: 'Official Government Processing', date: 'Pending', time: 'Pending', description: 'Central MSME database validation.', responsibleParty: 'Govt Portal', completed: false },
      { stepIndex: 7, stageName: 'Certificate Ready', category: 'Official Government Processing', date: 'Pending', time: 'Pending', description: 'Official Udyam Certificate generated.', responsibleParty: 'Govt Portal', completed: false },
      { stepIndex: 8, stageName: 'Completed', category: 'GovEase Processing', date: 'Pending', time: 'Pending', description: 'Final certificate delivered to applicant.', responsibleParty: 'GovEase', completed: false }
    ],
    documents: [
      {
        id: 'doc_msme_pan',
        applicationId: 'GE-2026-001289',
        userId: 'usr_rahul_01',
        documentType: 'PAN Card',
        fileName: 'Rahul_PAN_Card.jpg',
        fileSize: '650 KB',
        uploadedAt: '2026-09-01',
        verificationStatus: 'Verified',
        aiPreCheck: { passed: true, readabilityScore: 98, completeness: 'Clear alphanumeric PAN visible', detectedIssues: [], aiNote: 'Valid PAN scan.' }
      }
    ]
  },
  // 12 more mock applications across different citizens for the Agent and Admin dashboard
  {
    id: 'GE-2026-001301',
    userId: 'usr_vikas_99',
    userName: 'Vikas Patil',
    userEmail: 'vikas.patil@example.com',
    userPhone: '+91 97654 33211',
    serviceId: 'srv_caste',
    serviceName: 'Caste Certificate (SC/ST/OBC)',
    serviceCategory: 'Certificates',
    agentId: 'agt_raj_kumar',
    agentName: 'Raj Kumar',
    agentFee: 499,
    governmentFee: 30,
    platformFee: 99,
    totalPaid: 735,
    isSelfService: false,
    status: 'DOCUMENTS_SUBMITTED',
    statusLabel: 'Pending Agent Review',
    submittedAt: '2026-09-04',
    estimatedCompletionDate: '2026-09-25',
    applicantDetails: {
      fullName: 'Vikas Shamrao Patil',
      dob: '1995-11-20',
      phone: '+91 97654 33211',
      email: 'vikas.patil@example.com',
      address: 'Flat 101, Datta Nagar, Kothrud',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411038',
      answers: { 'q1': 'Other Backward Class (OBC - Non Creamy Layer)', 'q2': 'true', 'q3': 'Central Government Format' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-09-04', time: '09:00 AM', description: 'Request initiated.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 2, stageName: 'Documents Submitted', category: 'GovEase Processing', date: '2026-09-04', time: '09:30 AM', description: 'Father caste certificate uploaded.', responsibleParty: 'Citizen', completed: true, current: true },
      { stepIndex: 3, stageName: 'Agent Assigned', category: 'GovEase Processing', date: 'Pending', time: 'Pending', description: 'Assigned to Raj Kumar for preliminary inspection.', responsibleParty: 'GovEase', completed: false }
    ],
    documents: [
      {
        id: 'doc_patil_01',
        applicationId: 'GE-2026-001301',
        userId: 'usr_vikas_99',
        documentType: 'Father Caste Certificate',
        fileName: 'Father_Caste_Certificate_1985.pdf',
        fileSize: '3.4 MB',
        uploadedAt: '2026-09-04',
        verificationStatus: 'Pending',
        aiPreCheck: { passed: true, readabilityScore: 82, completeness: 'Older document with mild blur but legible seal', detectedIssues: ['Older seal requires human notary check'], aiNote: 'AI pre-check flagged old seal for agent review.' }
      }
    ]
  },
  {
    id: 'GE-2026-001198',
    userId: 'usr_meera_77',
    userName: 'Meera Nair',
    userEmail: 'meera.nair@example.com',
    userPhone: '+91 98980 12345',
    serviceId: 'srv_birth',
    serviceName: 'Birth Certificate Assistance',
    serviceCategory: 'Certificates',
    agentId: 'agt_anita_deshmukh',
    agentName: 'Anita Deshmukh',
    agentFee: 399,
    governmentFee: 20,
    platformFee: 99,
    totalPaid: 607,
    isSelfService: false,
    status: 'GOVERNMENT_PROCESSING',
    statusLabel: 'Official Municipal Verification in Progress',
    submittedAt: '2026-08-28',
    estimatedCompletionDate: '2026-09-08',
    officialAcknowledgementNumber: 'CRS-MUM-2026-8812',
    applicantDetails: {
      fullName: 'Meera Rajesh Nair',
      dob: '1992-03-12',
      phone: '+91 98980 12345',
      email: 'meera.nair@example.com',
      address: 'Andheri West, Mumbai',
      state: 'Maharashtra',
      district: 'Mumbai Suburban',
      city: 'Mumbai',
      pincode: '400058',
      answers: { 'q1': 'Within 30 days to 1 year', 'q2': 'Hospital / Nursing Home' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-08-28', time: '10:00 AM', description: 'Assistance requested.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 2, stageName: 'Documents Submitted', category: 'GovEase Processing', date: '2026-08-28', time: '11:00 AM', description: 'Hospital discharge slip uploaded.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 3, stageName: 'Agent Assigned', category: 'GovEase Processing', date: '2026-08-28', time: '01:00 PM', description: 'Anita Deshmukh assigned.', responsibleParty: 'GovEase', completed: true },
      { stepIndex: 4, stageName: 'Documents Verified', category: 'GovEase Processing', date: '2026-08-29', time: '03:00 PM', description: 'Hospital seal verified with BMC Ward K-West.', responsibleParty: 'Agent', completed: true },
      { stepIndex: 5, stageName: 'Official Application Submitted', category: 'Official Government Processing', date: '2026-08-30', time: '10:30 AM', description: 'Lodged on CRS ORGI portal.', responsibleParty: 'BMC Registrar', completed: true },
      { stepIndex: 6, stageName: 'Government Processing', category: 'Official Government Processing', date: '2026-09-01', time: '02:00 PM', description: 'Health Department Registrar reviewing ward register.', responsibleParty: 'BMC Ward Officer', completed: true, current: true }
    ],
    documents: []
  },
  {
    id: 'GE-2026-001305',
    userId: 'usr_arjun_88',
    userName: 'Arjun Das',
    userEmail: 'arjun.das@example.com',
    userPhone: '+91 99001 22334',
    serviceId: 'srv_ews',
    serviceName: 'EWS Certificate',
    serviceCategory: 'Certificates',
    agentId: 'agt_raj_kumar',
    agentName: 'Raj Kumar',
    agentFee: 450,
    governmentFee: 50,
    platformFee: 99,
    totalPaid: 697,
    isSelfService: false,
    status: 'REQUEST_CREATED',
    statusLabel: 'New Assistance Request — Awaiting Agent Acceptance',
    submittedAt: '2026-09-04',
    estimatedCompletionDate: '2026-09-22',
    applicantDetails: {
      fullName: 'Arjun Somnath Das',
      dob: '2001-08-19',
      phone: '+91 99001 22334',
      email: 'arjun.das@example.com',
      address: 'Camp Area, Near Race Course, Pune',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411001',
      answers: { 'q1': 'true', 'q2': 'true', 'q3': 'false' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-09-04', time: '08:15 AM', description: 'Request created. Escrow secured.', responsibleParty: 'Citizen', completed: true, current: true }
    ],
    documents: []
  },
  {
    id: 'GE-2026-001222',
    userId: 'usr_deepak_55',
    userName: 'Deepak Joshi',
    userEmail: 'deepak.joshi@example.com',
    userPhone: '+91 98222 77665',
    serviceId: 'srv_marriage',
    serviceName: 'Marriage Certificate Registration',
    serviceCategory: 'Certificates',
    agentId: 'agt_anita_deshmukh',
    agentName: 'Anita Deshmukh',
    agentFee: 799,
    governmentFee: 100,
    platformFee: 149,
    totalPaid: 1218,
    isSelfService: false,
    status: 'COMPLETED',
    statusLabel: 'Completed — Certificate Registered',
    submittedAt: '2026-08-01',
    estimatedCompletionDate: '2026-08-25',
    completedAt: '2026-08-24',
    officialAcknowledgementNumber: 'IGR-MAH-PUN-MC-2026-0041',
    certificateDownloadUrl: '#download-marriage-cert',
    applicantDetails: {
      fullName: 'Deepak & Sneha Joshi',
      dob: '1994-02-11',
      phone: '+91 98222 77665',
      email: 'deepak.joshi@example.com',
      address: 'Kalyani Nagar, Pune',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pincode: '411006',
      answers: { 'q1': 'Hindu Marriage Act', 'q2': 'true' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-08-01', time: '10:00 AM', description: 'Assistance requested.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 8, stageName: 'Completed', category: 'GovEase Processing', date: '2026-08-24', time: '04:00 PM', description: 'Registrar signed digital copy.', responsibleParty: 'GovEase', completed: true }
    ],
    documents: []
  },
  {
    id: 'GE-2026-001235',
    userId: 'usr_suresh_12',
    userName: 'Suresh Menon',
    userEmail: 'suresh.menon@example.com',
    userPhone: '+91 98400 99887',
    serviceId: 'srv_driving_lic',
    serviceName: 'Learner & Permanent Driving License Assistance',
    serviceCategory: 'Licenses',
    agentId: 'agt_ramesh_iyer',
    agentName: 'Ramesh Iyer',
    agentFee: 499,
    governmentFee: 350,
    platformFee: 149,
    totalPaid: 1114,
    isSelfService: false,
    status: 'CERTIFICATE_READY',
    statusLabel: 'Learner License Issued by RTO',
    submittedAt: '2026-08-20',
    estimatedCompletionDate: '2026-09-02',
    officialAcknowledgementNumber: 'KA-04-LL-2026-008129',
    certificateDownloadUrl: '#download-learner-license',
    applicantDetails: {
      fullName: 'Suresh Menon',
      dob: '2000-04-18',
      phone: '+91 98400 99887',
      email: 'suresh.menon@example.com',
      address: 'Indiranagar, Bengaluru',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      pincode: '560038',
      answers: { 'q1': 'New Learner License (LL)', 'q2': 'Both Two Wheeler & Car (MCWG + LMV)' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-08-20', time: '11:00 AM', description: 'Slot booked.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 7, stageName: 'Certificate Ready', category: 'Official Government Processing', date: '2026-09-02', time: '03:30 PM', description: 'Learner license approved by RTO Inspector.', responsibleParty: 'RTO Indiranagar', completed: true, current: true }
    ],
    documents: []
  },
  {
    id: 'GE-2026-001248',
    userId: 'usr_tanya_34',
    userName: 'Tanya Gupta',
    userEmail: 'tanya.gupta@example.com',
    userPhone: '+91 98110 55667',
    serviceId: 'srv_character',
    serviceName: 'Police Clearance / Character Certificate',
    serviceCategory: 'Certificates',
    agentId: 'agt_sunil_verma',
    agentName: 'Sunil Verma',
    agentFee: 399,
    governmentFee: 150,
    platformFee: 99,
    totalPaid: 737,
    isSelfService: false,
    status: 'GOVERNMENT_PROCESSING',
    statusLabel: 'Local Station Beat Officer Verification',
    submittedAt: '2026-08-25',
    estimatedCompletionDate: '2026-09-10',
    applicantDetails: {
      fullName: 'Tanya Gupta',
      dob: '1997-09-09',
      phone: '+91 98110 55667',
      email: 'tanya.gupta@example.com',
      address: 'Lajpat Nagar IV, New Delhi',
      state: 'Delhi',
      district: 'South Delhi',
      city: 'New Delhi',
      pincode: '110024',
      answers: { 'q1': 'Visa / Foreign Travel', 'q2': 'false' }
    },
    timeline: [
      { stepIndex: 1, stageName: 'Request Created', category: 'GovEase Processing', date: '2026-08-25', time: '09:00 AM', description: 'PVC requested.', responsibleParty: 'Citizen', completed: true },
      { stepIndex: 6, stageName: 'Government Processing', category: 'Official Government Processing', date: '2026-09-01', time: '05:00 PM', description: 'Beat constable visited address for character record check.', responsibleParty: 'Delhi Police', completed: true, current: true }
    ],
    documents: []
  }
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN_20260902_99182',
    applicationId: 'GE-2026-001245',
    applicationName: 'Income Certificate Assistance',
    userId: 'usr_rahul_01',
    amount: 589,
    breakdown: {
      governmentFee: 50,
      platformFee: 99,
      agentFee: 350,
      taxes: 90, // GST on platform & agent fee
      total: 589
    },
    method: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'UPI/20260902/984812038192',
    date: '2026-09-02 10:30 AM'
  },
  {
    id: 'TXN_20260810_11029',
    applicationId: 'GE-2026-001210',
    applicationName: 'Domicile / Residence Certificate',
    userId: 'usr_rahul_01',
    amount: 637,
    breakdown: {
      governmentFee: 50,
      platformFee: 99,
      agentFee: 399,
      taxes: 89,
      total: 637
    },
    method: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'CARD/HDFC/20260810/8812903',
    date: '2026-08-10 09:10 AM'
  },
  {
    id: 'TXN_20260901_33019',
    applicationId: 'GE-2026-001289',
    applicationName: 'MSME / Udyam Business Registration',
    userId: 'usr_rahul_01',
    amount: 469,
    breakdown: {
      governmentFee: 0,
      platformFee: 99,
      agentFee: 299,
      taxes: 71,
      total: 469
    },
    method: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'UPI/20260901/7719283011',
    date: '2026-09-01 02:00 PM'
  },
  {
    id: 'TXN_20260904_88190',
    applicationId: 'GE-2026-001301',
    applicationName: 'Caste Certificate (SC/ST/OBC)',
    userId: 'usr_vikas_99',
    amount: 735,
    breakdown: {
      governmentFee: 30,
      platformFee: 99,
      agentFee: 499,
      taxes: 107,
      total: 735
    },
    method: 'Net Banking',
    paymentStatus: 'Successful',
    transactionId: 'NETB/ICICI/20260904/0019283',
    date: '2026-09-04 09:05 AM'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'usr_rahul_01',
    title: 'Documents Verified by Agent',
    message: 'Raj Kumar verified your salary slip and proof documents for Income Certificate application GE-2026-001245.',
    type: 'APPLICATION_STATUS',
    relatedApplicationId: 'GE-2026-001245',
    read: false,
    createdAt: '2 hours ago'
  },
  {
    id: 'notif_02',
    userId: 'usr_rahul_01',
    title: 'New Message from Raj Kumar',
    message: '"Hello Rahul, I have checked your Form 16. I am now proceeding with filing on the Pune e-District portal."',
    type: 'MESSAGE',
    relatedApplicationId: 'GE-2026-001245',
    read: false,
    createdAt: '3 hours ago'
  },
  {
    id: 'notif_03',
    userId: 'usr_rahul_01',
    title: 'Official Application Submitted',
    message: 'Your MSME Udyam application GE-2026-001289 has been submitted to the Ministry portal. Verification code received.',
    type: 'APPLICATION_STATUS',
    relatedApplicationId: 'GE-2026-001289',
    read: true,
    createdAt: '1 day ago'
  },
  {
    id: 'notif_04',
    userId: 'usr_rahul_01',
    title: 'Certificate Ready for Download!',
    message: 'Your official Domicile Certificate for application GE-2026-001210 is issued and ready in your vault.',
    type: 'CERTIFICATE_READY',
    relatedApplicationId: 'GE-2026-001210',
    read: true,
    createdAt: 'Aug 22, 2026'
  },
  {
    id: 'notif_05',
    userId: 'usr_rahul_01',
    title: 'Payment Receipt Available',
    message: 'Payment of ₹589 for application GE-2026-001245 was confirmed. Download tax invoice.',
    type: 'PAYMENT',
    relatedApplicationId: 'GE-2026-001245',
    read: true,
    createdAt: 'Sep 02, 2026'
  },
  {
    id: 'notif_06',
    userId: 'usr_rahul_01',
    title: 'AI Pre-check Passed',
    message: 'All 3 uploaded documents passed the GovEase AI readability and completeness scan with 92% average score.',
    type: 'DOCUMENT_REQUIRED',
    relatedApplicationId: 'GE-2026-001245',
    read: true,
    createdAt: 'Sep 02, 2026'
  }
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_01',
    applicationId: 'GE-2026-001245',
    senderId: 'usr_raj_agent',
    senderName: 'Raj Kumar (Agent)',
    senderRole: 'AGENT',
    message: 'Namaste Rahul ji! I have been assigned to your Income Certificate assistance request GE-2026-001245. I am reviewing your uploaded Form 16.',
    timestamp: 'Sep 02, 11:30 AM',
    read: true
  },
  {
    id: 'msg_02',
    applicationId: 'GE-2026-001245',
    senderId: 'usr_rahul_01',
    senderName: 'Rahul Verma',
    senderRole: 'USER',
    message: 'Hi Raj ji, thank you! Please let me know if any other document is required for the Haveli Tahsildar office.',
    timestamp: 'Sep 02, 11:45 AM',
    read: true
  },
  {
    id: 'msg_03',
    applicationId: 'GE-2026-001245',
    senderId: 'usr_raj_agent',
    senderName: 'Raj Kumar (Agent)',
    senderRole: 'AGENT',
    message: 'Everything is in order! Your Aadhaar and electricity bill are crystal clear. I verified the salary slip and will lodge it on Aaple Sarkar today.',
    timestamp: 'Sep 03, 02:00 PM',
    read: true
  },
  {
    id: 'msg_04',
    applicationId: 'GE-2026-001245',
    senderId: 'usr_raj_agent',
    senderName: 'Raj Kumar (Agent)',
    senderRole: 'AGENT',
    message: 'I will share the official government acknowledgement number as soon as the revenue desk generates it.',
    timestamp: 'Sep 03, 02:05 PM',
    read: false
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    agentId: 'agt_raj_kumar',
    applicationId: 'GE-2026-001210',
    serviceName: 'Domicile / Residence Certificate',
    rating: 5,
    review: 'Raj ji made the entire process so transparent and easy. No running around the Tehsil office. Got my certificate in 12 days!',
    qualityRating: 5,
    communicationRating: 5,
    timelinessRating: 5,
    createdAt: '2 weeks ago'
  },
  {
    id: 'rev_02',
    userId: 'usr_alok_92',
    userName: 'Alok Kulkarni',
    agentId: 'agt_raj_kumar',
    applicationId: 'GE-2026-001102',
    serviceName: 'Income Certificate',
    rating: 5,
    review: 'Helped me correct errors in my father’s affidavit before submitting. Prevented guaranteed rejection. Worth every rupee.',
    qualityRating: 5,
    communicationRating: 5,
    timelinessRating: 4,
    createdAt: '1 month ago'
  },
  {
    id: 'rev_03',
    userId: 'usr_sneha_44',
    userName: 'Sneha & Tarun',
    agentId: 'agt_anita_deshmukh',
    applicationId: 'GE-2026-001222',
    serviceName: 'Marriage Certificate Registration',
    rating: 5,
    review: 'Anita ma’am took care of witness documentation and guided us through the Bandra registrar office seamlessly. Highly recommend!',
    qualityRating: 5,
    communicationRating: 5,
    timelinessRating: 5,
    createdAt: '1 week ago'
  },
  {
    id: 'rev_04',
    userId: 'usr_siddharth_33',
    userName: 'Siddharth Roy',
    agentId: 'agt_vikram_singh',
    applicationId: 'GE-2026-001090',
    serviceName: 'Caste Certificate (SC/ST/OBC)',
    rating: 4,
    review: 'Good guidance on old ancestral revenue documents in Jaipur. Took a few extra days due to holiday season, but got the certificate without any issues.',
    qualityRating: 4,
    communicationRating: 5,
    timelinessRating: 4,
    createdAt: '3 weeks ago'
  },
  {
    id: 'rev_05',
    userId: 'usr_pooja_11',
    userName: 'Pooja Iyer',
    agentId: 'agt_ramesh_iyer',
    applicationId: 'GE-2026-001045',
    serviceName: 'MSME / Udyam Business Registration',
    rating: 5,
    review: 'Superfast turnaround! Udyam registration certificate received within 24 hours. Ramesh is very knowledgeable with MSME classifications.',
    qualityRating: 5,
    communicationRating: 5,
    timelinessRating: 5,
    createdAt: '1 month ago'
  }
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-9081',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    userEmail: 'rahul.verma@example.com',
    category: 'Applications',
    applicationId: 'GE-2026-001245',
    description: 'How long does the Tahsildar usually take to approve the digital signature after Talathi field verification?',
    status: 'Resolved',
    createdAt: '2026-09-03',
    priority: 'Low'
  },
  {
    id: 'TICK-9082',
    userId: 'usr_manish_77',
    userName: 'Manish Tyagi',
    userEmail: 'manish.tyagi@example.com',
    category: 'Payments',
    description: 'Amount debited via UPI but receipt generation took 2 minutes. Confirmation received.',
    status: 'Closed',
    createdAt: '2026-09-01',
    priority: 'Low'
  },
  {
    id: 'TICK-9085',
    userId: 'usr_rohit_22',
    userName: 'Rohit Bansal',
    userEmail: 'rohit.b@example.com',
    category: 'Documents',
    description: 'AI Pre-check says my electricity bill corner is cropped. Can I upload an e-bill PDF directly?',
    status: 'In Progress',
    createdAt: '2026-09-04',
    priority: 'Medium'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-8835',
    userId: 'usr_priya_admin',
    userName: 'Priya Sharma (Admin)',
    action: 'AGENT_CREDENTIALS_APPROVED',
    entityType: 'Agent',
    entityId: 'agt_vikram_singh',
    timestamp: '2026-09-04 11:24:10',
    details: 'Approved notarized e-Mitra documentation license and upgraded credentials badge to Platform Verified.',
    role: 'ADMIN',
    ipAddress: '103.21.58.12',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8834',
    userId: 'usr_system',
    userName: 'GovEase Automator',
    action: 'AUTOMATED_STATUS_ALERT_DISPATCHED',
    entityType: 'Application',
    entityId: 'GE-2026-001245',
    timestamp: '2026-09-04 10:45:22',
    details: 'Automated SMS and Email dispatch sent to applicant rahul.verma@example.com for milestone CERTIFICATE_READY.',
    role: 'SYSTEM',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8833',
    userId: 'usr_raj_agent',
    userName: 'Raj Kumar (Agent)',
    action: 'OFFICIAL_PORTAL_SUBMISSION',
    entityType: 'Application',
    entityId: 'GE-2026-001245',
    timestamp: '2026-09-04 09:15:00',
    details: 'Formally logged application on Aaple Sarkar state portal. Govt Application Ref: MH-PUN-INC-2026-98124.',
    role: 'AGENT',
    ipAddress: '49.36.120.89',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8832',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    action: 'APPLICATION_SUBMITTED',
    entityType: 'Application',
    entityId: 'GE-2026-001258',
    timestamp: '2026-09-04 08:30:15',
    details: 'Created citizen assistance application for Domicile Certificate with Raj Kumar selected as broker.',
    role: 'USER',
    ipAddress: '157.34.88.204',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8831',
    userId: 'usr_priya_admin',
    userName: 'Priya Sharma (Admin)',
    action: 'ESCROW_FEE_RELEASE_AUDIT',
    entityType: 'Payment',
    entityId: 'TXN_20260902_99182',
    timestamp: '2026-09-03 18:40:00',
    details: 'Reconciled agent service fee release ₹350 into broker payout vault following verified certificate delivery.',
    role: 'ADMIN',
    ipAddress: '103.21.58.12',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8830',
    userId: 'usr_anita_02',
    userName: 'Anita Deshmukh (Agent)',
    action: 'DOCUMENTS_VERIFIED',
    entityType: 'Document',
    entityId: 'doc_marriage_affidavit_01',
    timestamp: '2026-09-03 16:20:18',
    details: 'Verified sworn marriage declaration affidavit and joint witness notarization against Mumbai Registrar guidelines.',
    role: 'AGENT',
    ipAddress: '115.111.45.67',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8829',
    userId: 'usr_vikram_03',
    userName: 'Vikram Singh (Agent)',
    action: 'DOCUMENT_DEFICIT_NOTICE',
    entityType: 'Application',
    entityId: 'GE-2026-001249',
    timestamp: '2026-09-03 15:10:05',
    details: 'Flagged missing electricity bill matching father name on Caste Certificate application; notified applicant.',
    role: 'AGENT',
    ipAddress: '182.73.201.14',
    status: 'WARNING'
  },
  {
    id: 'AUD-8828',
    userId: 'usr_raj_agent',
    userName: 'Raj Kumar (Agent)',
    action: 'DOCUMENTS_VERIFIED',
    entityType: 'Application',
    entityId: 'GE-2026-001245',
    timestamp: '2026-09-03 14:00:15',
    details: 'Verified applicant Form 16 and electricity bill against Pune Tehsil submission guidelines.',
    role: 'AGENT',
    ipAddress: '49.36.120.89',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8827',
    userId: 'usr_system',
    userName: 'GovEase Security Bot',
    action: 'AI_PRE_CHECK_COMPLETED',
    entityType: 'Document',
    entityId: 'doc_income_02',
    timestamp: '2026-09-03 12:45:33',
    details: 'Computer vision model scored Aadhaar card readability 94/100; valid QR signature and legible dob confirmed.',
    role: 'SYSTEM',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8826',
    userId: 'usr_priya_admin',
    userName: 'Priya Sharma (Admin)',
    action: 'AGENT_VERIFICATION_REVIEW',
    entityType: 'Agent',
    entityId: 'agt_anita_deshmukh',
    timestamp: '2026-09-03 11:20:44',
    details: 'Renewed and audited annual platform verification credentials for Anita Deshmukh.',
    role: 'ADMIN',
    ipAddress: '103.21.58.12',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8825',
    userId: 'usr_sneha_02',
    userName: 'Sneha Patel',
    action: 'ESCROW_PAYMENT_AUTHORIZED',
    entityType: 'Payment',
    entityId: 'TXN_20260903_10294',
    timestamp: '2026-09-03 09:35:12',
    details: 'Authorized ₹749 for Birth Certificate fast-track filing via Card. Escrow locked.',
    role: 'USER',
    ipAddress: '117.204.18.52',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8824',
    userId: 'usr_priya_admin',
    userName: 'Priya Sharma (Admin)',
    action: 'SUPPORT_TICKET_RESOLVED',
    entityType: 'Support',
    entityId: 'TKT-9921',
    timestamp: '2026-09-02 17:15:40',
    details: 'Provided clarification regarding Aaple Sarkar portal maintenance window to user.',
    role: 'ADMIN',
    ipAddress: '103.21.58.12',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8823',
    userId: 'usr_amit_03',
    userName: 'Amit Kulkarni',
    action: 'APPLICATION_SUBMITTED',
    entityType: 'Application',
    entityId: 'GE-2026-001250',
    timestamp: '2026-09-02 14:50:11',
    details: 'Self-service application initialized for Non-Creamy Layer OBC certificate with guidance checklist.',
    role: 'USER',
    ipAddress: '14.139.112.5',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8822',
    userId: 'usr_rahul_01',
    userName: 'Rahul Verma',
    action: 'ESCROW_PAYMENT_AUTHORIZED',
    entityType: 'Payment',
    entityId: 'TXN_20260902_99182',
    timestamp: '2026-09-02 10:30:12',
    details: 'Authorized ₹589 for GE-2026-001245 via UPI.',
    role: 'USER',
    ipAddress: '157.34.88.204',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8821',
    userId: 'usr_system',
    userName: 'GovEase AI Model',
    action: 'AI_PRE_CHECK_COMPLETED',
    entityType: 'Document',
    entityId: 'doc_income_01',
    timestamp: '2026-09-02 09:12:00',
    details: 'AI Pre-check engine evaluated readability score 88%. No missing pages detected.',
    role: 'SYSTEM',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8820',
    userId: 'usr_priya_admin',
    userName: 'Priya Sharma (Admin)',
    action: 'SERVICE_CATALOG_UPDATED',
    entityType: 'Service',
    entityId: 'srv_msme',
    timestamp: '2026-09-01 16:45:00',
    details: 'Updated statutory MSME registration guidelines with Udyam verification steps.',
    role: 'ADMIN',
    ipAddress: '103.21.58.12',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-8819',
    userId: 'usr_system',
    userName: 'GovEase Security Bot',
    action: 'SYSTEM_INTEGRITY_CHECK',
    entityType: 'Security',
    entityId: 'SEC-CHECK-0901',
    timestamp: '2026-09-01 11:10:20',
    details: 'Routine database cryptographic hash audit on table audit_logs passed with 0 inconsistencies.',
    role: 'SYSTEM',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  }
];

export const MOCK_FAQS = [
  {
    id: 'faq_01',
    category: 'General & Legality' as const,
    question: 'Is GovEase an official government website or department?',
    answer: 'No. GovEase is an independent digital facilitation and citizen brokerage marketplace. We are neither affiliated with nor endorsed by any central or state government authority. We connect citizens with verified independent document professionals, legal notaries, and provide transparent step-by-step guidance to official portals. All statutory certificates are issued strictly and exclusively by designated government revenue officers.',
    tags: ['disclaimer', 'legality', 'official']
  },
  {
    id: 'faq_02',
    category: 'General & Legality' as const,
    question: 'Can I apply for certificates directly on government portals for free or lower cost?',
    answer: 'Yes, absolutely. Citizens have the legal right to apply directly on official state portals (such as Aaple Sarkar in Maharashtra, ServicePlus in Central/State, or e-District) without paying any agent or platform fee. GovEase provides direct outbound links to official portals on every service page. You only use GovEase if you want professional document vetting, affidavit drafting, and agent facilitation.',
    tags: ['direct application', 'free', 'government portal']
  },
  {
    id: 'faq_03',
    category: 'Documents & Verification' as const,
    question: 'What is the AI Document Pre-Checker and how does it prevent rejection?',
    answer: 'Our AI Document Pre-Checker scans your uploaded Aadhaar, ration card, income slips, or land documents in real-time. It checks for visual blurriness, resolution (<200 DPI triggers warning), crop completeness, and detects if official stamps or signatures are visible. This prevents the #1 cause of government rejections: illegible scans and mismatched names.',
    tags: ['ai check', 'blur detection', 'rejection']
  },
  {
    id: 'faq_04',
    category: 'Documents & Verification' as const,
    question: 'What happens if the government department requests additional documents?',
    answer: 'If the revenue officer or Talathi raises an inquiry or deficit notice, your assigned GovEase agent receives the alert immediately. The agent will notify you via SMS/Email and the in-app chat, specifying the exact missing document (e.g., updated electricity bill or genealogical affidavit) and coordinate swift re-submission before deadlines.',
    tags: ['inquiry', 'missing documents', 're-submission']
  },
  {
    id: 'faq_05',
    category: 'Agents & Escrow' as const,
    question: 'How does the Escrow Payment Protection guarantee work?',
    answer: 'When you book an agent on GovEase, your funds do NOT go directly to the agent. They are held in a secure, audited GovEase Escrow Account. The agent is only compensated after your documents are verified and the official submission milestone is successfully achieved. If an agent fails to provide assistance or misses deadlines, your escrow balance is 100% refunded.',
    tags: ['escrow', 'safety', 'money-back']
  },
  {
    id: 'faq_06',
    category: 'Agents & Escrow' as const,
    question: 'How are GovEase agents vetted and verified?',
    answer: 'Every documentation professional on GovEase undergoes a 3-tier vetting process: 1) Identity verification through Aadhaar/PAN, 2) Proof of legal practice or CSC/notary center credentials, and 3) Background check and jurisdictional address audit. Only agents with verified credentials receive the green "GovEase Verified" badge.',
    tags: ['agent vetting', 'background check', 'trust']
  },
  {
    id: 'faq_07',
    category: 'Timelines & Delivery' as const,
    question: 'How long does it take to receive an Income or Domicile Certificate?',
    answer: 'Standard state service timelines under the Right to Services (RTS) Act typically range from 7 to 15 business days depending on district workload. Phase 1 (GovEase agent verification and drafting) takes 24–48 hours. Phase 2 (official Tehsildar review, field inquiry, and digital signature) depends on government processing.',
    tags: ['processing time', 'delays', 'delivery']
  },
  {
    id: 'faq_08',
    category: 'Timelines & Delivery' as const,
    question: 'How do I download the completed official certificate?',
    answer: 'Once the designated revenue officer approves the application and applies their digital cryptographic signature, your certificate is indexed in your GovEase Digital Vault and available under "Track Application" and your User Dashboard. You can download the pristine PDF with official QR verification code anytime.',
    tags: ['download', 'digital signature', 'vault']
  },
  {
    id: 'faq_09',
    category: 'Payments & Refunds' as const,
    question: 'What is the refund policy if my application is rejected by the government?',
    answer: 'If your application is rejected due to agent negligence or incorrect drafting, our Escrow Guarantee ensures a 100% refund of the agent fee and platform fee. If rejection occurs due to applicant fraud, false declarations, or exceeding statutory income thresholds, government fees already paid to the treasury are non-refundable as per state rules.',
    tags: ['refund', 'cancellation', 'policy']
  },
  {
    id: 'faq_10',
    category: 'Payments & Refunds' as const,
    question: 'Can I get a tax invoice and printable receipt for my payment?',
    answer: 'Yes! GovEase generates an itemized tax receipt for every transaction, showing exact statutory government e-challan fees, agent assistance fees, platform fees, and 18% GST. You can generate and print a clean PDF summary directly from your dashboard or tracking page.',
    tags: ['tax invoice', 'receipt', 'gst']
  }
];

export const MOCK_EMAIL_LOGS = [
  {
    id: 'EML-2026-901',
    applicationId: 'GE-2026-001245',
    serviceName: 'Income Certificate',
    applicantName: 'Rahul Verma',
    recipientEmail: 'rahul.verma@example.com',
    recipientPhone: '+91 98765 43210',
    status: 'DOCUMENTS_VERIFIED' as const,
    statusLabel: 'Documents Verified by Agent',
    subject: '[GovEase Alert] Status Update: Income Certificate (GE-2026-001245) - Documents Verified',
    timestamp: '2026-09-03 14:02:15',
    officialTokenNumber: 'MH/REV/2026/089412',
    note: 'Adv. Deshmukh has completed statutory document review and notary affidavit formatting.',
    actionRequired: 'No action needed. Case moving to official e-District submission.',
    trackingUrl: 'https://govease.in/track/GE-2026-001245',
    deliveryStatus: 'Delivered (250 OK)' as const
  },
  {
    id: 'EML-2026-902',
    applicationId: 'GE-2026-001246',
    serviceName: 'Domicile Certificate',
    applicantName: 'Anita Sharma',
    recipientEmail: 'anita.sharma@example.com',
    recipientPhone: '+91 98220 12345',
    status: 'OFFICIAL_SUBMITTED' as const,
    statusLabel: 'Official Application Submitted',
    subject: '[GovEase Alert] Official Govt Token Generated for Domicile Certificate (GE-2026-001246)',
    timestamp: '2026-09-02 16:45:00',
    officialTokenNumber: 'DL/REV/2026/012948',
    note: 'Application successfully indexed on e-District Delhi portal. Token DL/REV/2026/012948 generated.',
    actionRequired: 'Keep phone available for possible field officer address verification call.',
    trackingUrl: 'https://govease.in/track/GE-2026-001246',
    deliveryStatus: 'Delivered (250 OK)' as const
  }
];

