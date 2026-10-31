import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, QrCode, Search, CheckCircle, ShieldCheck, FileCheck, Building2, UserCheck, AlertCircle } from 'lucide-react';

export const QrVerifyModal: React.FC = () => {
  const { qrModalOpen, setQrModalOpen, applications, documents, activeStudent, language, t } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('MP-SCH-2026-89421');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedResult, setScannedResult] = useState<boolean>(true);

  if (!qrModalOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(true);
    }, 600);
  };

  const currentApp = applications.find(a => 
    a.receiptNumber?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ) || applications[0];

  const appDocs = documents.filter(d => d.studentId === currentApp?.studentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">{t.qrTitle}</h2>
              <div className="text-xs text-slate-500">
                {language === 'hi' ? 'कागज़ी फोटोकॉपी के बिना डिजिटल प्रामाणिकता की जांच करें' : 'Instant Verification of Student Digital Vault Record'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setQrModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Scanner Box */}
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Receipt No. (e.g. MP-SCH-2026-89421)..."
                className="w-full text-xs bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <QrCode className="w-4 h-4" />
              <span>{isScanning ? (language === 'hi' ? 'स्कैन हो रहा है...' : 'Scanning...') : (language === 'hi' ? 'कैमरा स्कैन सिमुलेट' : 'Scan QR')}</span>
            </button>
          </div>

          {/* Verification Result Card */}
          {currentApp && (
            <div className="border border-emerald-300 bg-emerald-50/40 rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                        {language === 'hi' ? 'सत्यापित डिजिटल पावती' : 'Authentic Government Verified Record'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" />
                        <span>Valid · Active</span>
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
                      {currentApp.receiptNumber}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-500 block">{language === 'hi' ? 'सत्र' : 'Session'}</span>
                  <span className="font-semibold text-slate-900 font-mono">{currentApp.academicYear}</span>
                </div>
              </div>

              {/* Student info strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-white p-3 rounded-lg border border-emerald-200/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'hi' ? 'छात्र' : 'Student'}</span>
                  <span className="font-semibold text-slate-900">{activeStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'hi' ? 'नामांकन क्रमांक' : 'Enrollment'}</span>
                  <span className="font-mono font-medium text-slate-900">{activeStudent.enrollmentNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'hi' ? 'संस्थान' : 'College'}</span>
                  <span className="font-medium text-slate-900 truncate block">GEC Jabalpur</span>
                </div>
              </div>

              {/* Verified Vault Checklist */}
              <div>
                <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>{language === 'hi' ? 'वॉल्ट में सत्यापित दस्तावेज़ सूची' : 'Attached Vault Documents Verified'}</span>
                  <span className="text-emerald-800 font-mono text-[11px] font-semibold">
                    {appDocs.length} {language === 'hi' ? 'दस्तावेज़ पूर्ण' : 'Documents Certified'}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {appDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <div>
                          <span className="font-medium text-slate-900">
                            {language === 'hi' ? doc.titleHi : doc.titleEn}
                          </span>
                          <span className="text-[10px] text-slate-500 ml-1.5 font-mono">
                            ({doc.certificateNo})
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {language === 'hi' ? 'सत्यापित' : 'Verified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero-Photocopy notice */}
              <div className="p-2.5 bg-emerald-100/70 rounded-lg text-xs text-emerald-900 font-medium">
                ✓ {language === 'hi'
                  ? 'यह छात्रवृत्ति आवेदन पूर्णतः डिजिटल रूप से सत्यापित है। विभाग या कॉलेज को किसी भी भौतिक कागजी फोटोकॉपी की आवश्यकता नहीं है।'
                  : 'Zero-Photocopy Authorized: All certificates are cryptographically verified from the digital vault. Physical paper copies strictly waived.'}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => setQrModalOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
