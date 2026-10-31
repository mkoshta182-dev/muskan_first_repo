import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  FileCheck, 
  ShieldCheck, 
  UserCheck, 
  Send, 
  FileText,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import { VerificationStatus, ScholarshipApplication } from '../types';

export const DepartmentPortal: React.FC = () => {
  const { 
    applications, 
    documents, 
    allStudents, 
    activeStudent,
    updateDocumentStatus, 
    approveApplication, 
    requestApplicationUpdate, 
    setPreviewDoc,
    setReceiptModalApp,
    language, 
    t 
  } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [officerRemarks, setOfficerRemarks] = useState<string>('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];
  const appStudent = allStudents.find(s => s.id === selectedApp?.studentId) || activeStudent;
  const studentDocs = documents.filter(d => d.studentId === appStudent.id);

  const handleDocAction = (docId: string, status: VerificationStatus, defaultRemark: string) => {
    const remark = officerRemarks.trim() || defaultRemark;
    updateDocumentStatus(docId, status, remark, 'Prof. Arvind K. Verma');
    setOfficerRemarks('');
    setActionSuccessMsg(`Document marked as ${status.toUpperCase()} by Prof. Arvind K. Verma`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleApproveApp = () => {
    approveApplication(
      selectedApp.id, 
      'Prof. Arvind K. Verma', 
      officerRemarks || 'All submitted documents verified from digital locker. Scholarship renewal authorized.'
    );
    setOfficerRemarks('');
    setActionSuccessMsg('Scholarship renewal application approved and digitally signed!');
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleRequestUpdate = (docId: string) => {
    const remark = officerRemarks.trim() || 'Please re-upload a clear scan of this certificate.';
    requestApplicationUpdate(selectedApp.id, docId, remark);
    setOfficerRemarks('');
    setActionSuccessMsg('Requested student to re-upload updated document.');
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const filteredApps = applications.filter(app => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const student = allStudents.find(s => s.id === app.studentId);
    return (
      app.receiptNumber?.toLowerCase().includes(q) ||
      student?.name.toLowerCase().includes(q) ||
      student?.enrollmentNo.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Officer Desk Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
            <Building2 className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              {language === 'hi' ? 'शासकीय इंजीनियरिंग कॉलेज, जबलपुर (RGPV)' : 'Government Engineering College, Jabalpur · Nodal Desk'}
            </div>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">
              {t.officerDashboardTitle}
            </h1>
            <div className="text-xs text-slate-500">
              {language === 'hi' ? 'सत्यापन अधिकारी' : 'Officer'}: Prof. Arvind K. Verma · Scholarship In-Charge (College Code: 0103)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            {applications.length} {language === 'hi' ? 'सत्र आवेदन' : 'Active Applications'}
          </span>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Main Verification Workspace: Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Applications Queue */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">{t.pendingQueue}</h2>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {filteredApps.length}
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchStudentPlaceholder}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto pr-1">
            {filteredApps.map((app) => {
              const student = allStudents.find(s => s.id === app.studentId) || activeStudent;
              const isSelected = app.id === selectedApp?.id;
              const isApproved = app.status === 'approved';
              const isUnderReview = app.status === 'under_verification';

              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`w-full text-left py-3 px-2 rounded-lg transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/70 border border-emerald-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{student.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">{student.enrollmentNo}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isApproved ? 'bg-emerald-100 text-emerald-800' :
                      isUnderReview ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {isApproved ? 'Approved' : 'In Review'}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>Session: {app.academicYear}</span>
                    <span className="font-mono">{app.receiptNumber}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Inspection & Verification Console */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          {selectedApp && (
            <>
              {/* Applicant Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">{appStudent.name}</h2>
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {appStudent.enrollmentNo}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {appStudent.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {appStudent.course} · {appStudent.branch} · Samagra ID: <span className="font-mono">{appStudent.samagraId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReceiptModalApp(selectedApp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.btnViewReceipt}</span>
                  </button>
                </div>
              </div>

              {/* Officer Remarks Input Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'सत्यापन अधिकारी टिप्पणी (Audit Log Remarks)' : 'Officer Verification Remark (Recorded into Audit Trail)'}
                </label>
                <input
                  type="text"
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  placeholder={t.officerRemarksPlaceholder}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Document Review List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{language === 'hi' ? 'जमा किए गए वॉल्ट दस्तावेज़ (समीक्षा करें)' : 'Submitted Vault Documents Checklist'}</span>
                  <span className="text-slate-500 font-normal">
                    {language === 'hi' ? 'क्लिक करके मूल डिजिटल रिकॉर्ड देखें' : 'Click "View" to inspect original e-Record'}
                  </span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {studentDocs.map((doc) => {
                    const isVerified = doc.status === 'verified';
                    const isPending = doc.status === 'pending';
                    const isNeedsUpdate = doc.status === 'needs_update';
                    const isRejected = doc.status === 'rejected';

                    return (
                      <div key={doc.id} className="p-3.5 bg-white hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              {language === 'hi' ? doc.titleHi : doc.titleEn}
                            </span>
                            <span className="font-mono text-[11px] text-slate-500">
                              ({doc.certificateNo})
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="font-mono text-[11px] text-slate-500">
                              v{doc.currentVersion}.0
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-500 flex items-center gap-2">
                            <span>{doc.issuingAuthority}</span>
                            <span>·</span>
                            <span className={doc.canReuseNextYear ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
                              {doc.canReuseNextYear ? 'Permanent Vault Document' : 'Session Specific'}
                            </span>
                          </div>

                          {doc.remarks && (
                            <div className="text-[11px] text-slate-600 italic">
                              Note: {doc.remarks}
                            </div>
                          )}
                        </div>

                        {/* Actions for this document */}
                        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                            title="Inspect document certificate"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>{language === 'hi' ? 'देखें' : 'View'}</span>
                          </button>

                          <button
                            onClick={() => handleDocAction(doc.id, 'verified', 'Digitally verified against university/revenue database.')}
                            className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                              isVerified 
                                ? 'bg-emerald-700 text-white shadow-xs' 
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>{t.btnVerifyApprove}</span>
                            </span>
                          </button>

                          <button
                            onClick={() => handleRequestUpdate(doc.id)}
                            className={`px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                              isNeedsUpdate 
                                ? 'bg-blue-700 text-white shadow-xs' 
                                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
                            }`}
                            title="Ask student to re-upload"
                          >
                            {language === 'hi' ? 'सुधार माँगें' : 'Needs Update'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Overall Final Approval Action Strip */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  {selectedApp.status === 'approved' ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{language === 'hi' ? 'यह आवेदन पहले ही स्वीकृत एवं फॉरवर्ड किया जा चुका है।' : 'Application fully verified & approved.'}</span>
                    </span>
                  ) : (
                    <span>{language === 'hi' ? 'सभी दस्तावेज़ जांचने के बाद अंतिम डिजिटल स्वीकृति दें।' : 'Ready to sign off on scholarship renewal without paper photocopies.'}</span>
                  )}
                </div>

                <button
                  onClick={handleApproveApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>{language === 'hi' ? 'छात्रवृत्ति आवेदन स्वीकृत करें (e-Sign)' : 'Approve Application Digitally'}</span>
                </button>
              </div>

              {/* Audit Trail Logs */}
              {selectedApp.verificationLogs?.length > 0 && (
                <div className="pt-4 border-t border-slate-100 text-xs">
                  <div className="font-bold text-slate-800 mb-2 uppercase text-[11px] tracking-wide">
                    {language === 'hi' ? 'सत्यापन ऑडिट लॉग (Verification Audit Trail)' : 'Verification History & Audit Trail'}
                  </div>
                  <div className="space-y-1.5">
                    {selectedApp.verificationLogs.map((log) => (
                      <div key={log.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-slate-900">{log.officerName}</span>
                          <span className="text-slate-400 mx-1.5">·</span>
                          <span className="text-slate-600">{log.remarks}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
