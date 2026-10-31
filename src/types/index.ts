export type Language = 'en' | 'hi';

export type UserRole = 'student' | 'officer' | 'verifier';

export type DocumentType = 
  | 'marksheet_semester'
  | 'income_cert'
  | 'caste_cert'
  | 'domicile_cert'
  | 'fee_receipt'
  | 'marksheet_10th'
  | 'marksheet_12th'
  | 'bank_passbook'
  | 'aadhaar_card';

export type DocumentCategory = 'permanent' | 'annual_update' | 'conditional_renewal';

export type VerificationStatus = 'verified' | 'pending' | 'needs_update' | 'rejected';

export interface DocumentVersion {
  versionId: string;
  versionNumber: number;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  academicYear: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: VerificationStatus;
  remarks?: string;
  fileUrl?: string;
}

export interface DocumentItem {
  id: string;
  studentId: string;
  type: DocumentType;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: DocumentCategory;
  certificateNo: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  isExpiringSoon?: boolean;
  status: VerificationStatus;
  currentVersion: number;
  versions: DocumentVersion[];
  lastUpdated: string;
  remarks?: string;
  isPermanent: boolean;
  canReuseNextYear: boolean;
}

export interface VerificationLog {
  id: string;
  documentId?: string;
  documentTitle?: string;
  applicationId: string;
  officerName: string;
  officerRole: string;
  action: 'verified' | 'rejected' | 'requested_update' | 'approved_application';
  remarks: string;
  timestamp: string;
}

export interface ScholarshipApplication {
  id: string;
  studentId: string;
  academicYear: string;
  scholarshipScheme: string;
  status: 'draft' | 'submitted' | 'under_verification' | 'approved' | 'action_required';
  submissionDate?: string;
  receiptNumber?: string;
  qrVerificationHash?: string;
  reusedDocumentsCount: number;
  newUploadedCount: number;
  photocopiesSaved: number;
  officerNotes?: string;
  verificationLogs: VerificationLog[];
  appliedScholarshipAmount: number;
}

export interface StudentProfile {
  id: string;
  enrollmentNo: string;
  name: string;
  nameHi: string;
  samagraId: string;
  aadhaarMasked: string;
  email: string;
  phone: string;
  collegeName: string;
  collegeCode: string;
  course: string;
  branch: string;
  currentYear: string;
  category: 'OBC' | 'SC' | 'ST' | 'General-EWS';
  annualFamilyIncome: number;
  bankName: string;
  accountNumberMasked: string;
  ifsc: string;
  avatarUrl?: string;
}

export interface RenewalDiffItem {
  documentId: string;
  titleEn: string;
  titleHi: string;
  type: DocumentType;
  actionRequired: 'reuse_existing' | 'upload_new' | 'update_expired';
  reasonEn: string;
  reasonHi: string;
  currentStatus: VerificationStatus;
  currentVersion: number;
}
