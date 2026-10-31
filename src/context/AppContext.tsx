import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  StudentProfile, 
  DocumentItem, 
  ScholarshipApplication, 
  VerificationStatus,
  DocumentType,
  VerificationLog
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_DOCUMENTS, 
  INITIAL_APPLICATIONS, 
  TRANSLATIONS 
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeStudent: StudentProfile;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  allStudents: StudentProfile[];
  documents: DocumentItem[];
  applications: ScholarshipApplication[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Modals state
  previewDoc: DocumentItem | null;
  setPreviewDoc: (doc: DocumentItem | null) => void;
  historyDoc: DocumentItem | null;
  setHistoryDoc: (doc: DocumentItem | null) => void;
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  receiptModalApp: ScholarshipApplication | null;
  setReceiptModalApp: (app: ScholarshipApplication | null) => void;
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;
  
  // Actions
  uploadDocumentVersion: (docId: string, file: { name: string; size: string; academicYear: string }) => void;
  addNewDocument: (doc: Omit<DocumentItem, 'id' | 'currentVersion' | 'versions' | 'lastUpdated'>, file: { name: string; size: string }) => void;
  updateDocumentStatus: (docId: string, status: VerificationStatus, remarks: string, officerName: string) => void;
  submitRenewalApplication: (academicYear: string, scholarshipScheme: string) => ScholarshipApplication;
  approveApplication: (applicationId: string, officerName: string, remarks: string) => void;
  requestApplicationUpdate: (applicationId: string, docId: string, remarks: string) => void;
  resetAllDemoData: () => void;
  
  // Stats
  photocopiesSavedTotal: number;
  verifiedCount: number;
  pendingCount: number;
  actionRequiredCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DOCS: 'scholar_vault_docs_v2',
  APPS: 'scholar_vault_apps_v2',
  LANG: 'scholar_vault_lang_v2',
  ROLE: 'scholar_vault_role_v2',
  STUDENT: 'scholar_vault_student_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved === 'officer' || saved === 'verifier' || saved === 'student') ? saved : 'student';
  });

  const [activeStudentId, setActiveStudentId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.STUDENT) || 'stud-1';
  });

  const [activeTab, setActiveTab] = useState<string>('vault');

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DOCUMENTS;
      }
    }
    return INITIAL_DOCUMENTS;
  });

  const [applications, setApplications] = useState<ScholarshipApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APPLICATIONS;
      }
    }
    return INITIAL_APPLICATIONS;
  });

  // Modals
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [historyDoc, setHistoryDoc] = useState<DocumentItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [receiptModalApp, setReceiptModalApp] = useState<ScholarshipApplication | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(applications));
  }, [applications]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    if (role === 'officer') {
      setActiveTab('verification');
    } else if (role === 'verifier') {
      setActiveTab('qr_verify');
    } else {
      setActiveTab('vault');
    }
  };

  const activeStudent = INITIAL_STUDENTS.find(s => s.id === activeStudentId) || INITIAL_STUDENTS[0];

  const t = TRANSLATIONS[language];

  const uploadDocumentVersion = (docId: string, file: { name: string; size: string; academicYear: string }) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const nextVersion = doc.currentVersion + 1;
        const newVersionItem = {
          versionId: `v${nextVersion}-${Date.now()}`,
          versionNumber: nextVersion,
          fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          academicYear: file.academicYear,
          status: 'pending' as VerificationStatus,
          remarks: `Updated for academic year ${file.academicYear}`
        };

        return {
          ...doc,
          currentVersion: nextVersion,
          status: 'pending' as VerificationStatus,
          lastUpdated: newVersionItem.uploadDate,
          versions: [newVersionItem, ...doc.versions]
        };
      }
      return doc;
    }));
  };

  const addNewDocument = (
    docData: Omit<DocumentItem, 'id' | 'currentVersion' | 'versions' | 'lastUpdated'>,
    file: { name: string; size: string }
  ) => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newDocId = `doc-${Date.now()}`;
    const newDoc: DocumentItem = {
      ...docData,
      id: newDocId,
      currentVersion: 1,
      lastUpdated: today,
      status: 'pending',
      versions: [
        {
          versionId: `v1-${Date.now()}`,
          versionNumber: 1,
          fileName: file.name,
          fileSize: file.size,
          uploadDate: today,
          academicYear: '2026-27',
          status: 'pending',
          remarks: 'Initial digital submission'
        }
      ]
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const updateDocumentStatus = (
    docId: string, 
    status: VerificationStatus, 
    remarks: string, 
    officerName: string
  ) => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const updatedVersions = doc.versions.map((ver, idx) => {
          if (idx === 0) {
            return {
              ...ver,
              status,
              verifiedBy: officerName,
              verifiedAt: today,
              remarks: remarks || ver.remarks
            };
          }
          return ver;
        });

        return {
          ...doc,
          status,
          remarks: remarks || doc.remarks,
          versions: updatedVersions
        };
      }
      return doc;
    }));
  };

  const submitRenewalApplication = (academicYear: string, scholarshipScheme: string): ScholarshipApplication => {
    const randomReceiptNum = Math.floor(10000 + Math.random() * 90000);
    const receiptNumber = `MP-SCH-${academicYear.replace(/[^0-9]/g, '')}-${randomReceiptNum}`;
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Calculate how many permanent docs were automatically reused
    const reusableDocs = documents.filter(d => d.studentId === activeStudentId && d.canReuseNextYear);
    const updatedDocs = documents.filter(d => d.studentId === activeStudentId && !d.canReuseNextYear);

    const newApp: ScholarshipApplication = {
      id: `app-${Date.now()}`,
      studentId: activeStudentId,
      academicYear,
      scholarshipScheme,
      status: 'submitted',
      submissionDate: timestamp,
      receiptNumber,
      qrVerificationHash: `SHA256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}6789abcdef0123456789`,
      reusedDocumentsCount: reusableDocs.length,
      newUploadedCount: updatedDocs.length || 1,
      photocopiesSaved: (reusableDocs.length + 1) * 2, // ~2 copies per document saved
      appliedScholarshipAmount: 32400,
      officerNotes: `Digital renewal processed. Reused ${reusableDocs.length} pre-verified certificates from vault. No paper photocopies required.`,
      verificationLogs: [
        {
          id: `log-${Date.now()}`,
          applicationId: `app-${Date.now()}`,
          officerName: 'Automated Digital Vault System',
          officerRole: 'Locker Verification Service',
          action: 'verified',
          remarks: `Carried forward ${reusableDocs.length} valid permanent documents with valid digital signatures.`,
          timestamp: `${timestamp}, 10:00 AM`
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const approveApplication = (applicationId: string, officerName: string, remarks: string) => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const logItem: VerificationLog = {
      id: `log-${Date.now()}`,
      applicationId,
      officerName,
      officerRole: 'College Scholarship Nodal Officer',
      action: 'approved_application',
      remarks: remarks || 'All documents verified and accepted. Application approved digitally.',
      timestamp: `${today}, 03:30 PM`
    };

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'approved',
          officerNotes: remarks || app.officerNotes,
          verificationLogs: [...app.verificationLogs, logItem]
        };
      }
      return app;
    }));
  };

  const requestApplicationUpdate = (applicationId: string, docId: string, remarks: string) => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const logItem: VerificationLog = {
      id: `log-${Date.now()}`,
      applicationId,
      documentId: docId,
      officerName: 'Prof. Arvind K. Verma',
      officerRole: 'College Scholarship Nodal Officer',
      action: 'requested_update',
      remarks: remarks || 'Please upload an updated or clearer scan of the document.',
      timestamp: `${today}, 02:15 PM`
    };

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'action_required',
          officerNotes: remarks,
          verificationLogs: [...app.verificationLogs, logItem]
        };
      }
      return app;
    }));

    if (docId) {
      updateDocumentStatus(docId, 'needs_update', remarks, 'Prof. Arvind K. Verma');
    }
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.DOCS);
    localStorage.removeItem(STORAGE_KEYS.APPS);
    setDocuments(INITIAL_DOCUMENTS);
    setApplications(INITIAL_APPLICATIONS);
  };

  const studentDocs = documents.filter(d => d.studentId === activeStudentId);
  const photocopiesSavedTotal = applications.reduce((sum, a) => sum + (a.photocopiesSaved || 0), 0);
  const verifiedCount = studentDocs.filter(d => d.status === 'verified').length;
  const pendingCount = studentDocs.filter(d => d.status === 'pending').length;
  const actionRequiredCount = studentDocs.filter(d => d.status === 'needs_update' || d.status === 'rejected').length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        userRole,
        setUserRole,
        activeStudent,
        activeStudentId,
        setActiveStudentId,
        allStudents: INITIAL_STUDENTS,
        documents,
        applications,
        activeTab,
        setActiveTab,
        previewDoc,
        setPreviewDoc,
        historyDoc,
        setHistoryDoc,
        uploadModalOpen,
        setUploadModalOpen,
        receiptModalApp,
        setReceiptModalApp,
        qrModalOpen,
        setQrModalOpen,
        uploadDocumentVersion,
        addNewDocument,
        updateDocumentStatus,
        submitRenewalApplication,
        approveApplication,
        requestApplicationUpdate,
        resetAllDemoData,
        photocopiesSavedTotal,
        verifiedCount,
        pendingCount,
        actionRequiredCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
