import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Clock, AlertTriangle, XCircle, Download, Printer, Shield, Calendar, Building, Hash } from 'lucide-react';

export const DocumentViewerModal: React.FC = () => {
  const { previewDoc, setPreviewDoc, activeStudent, language, t } = useApp();

  if (!previewDoc) return null;

  const currentVer = previewDoc.versions[0];
  const isVerified = previewDoc.status === 'verified';
  const isPending = previewDoc.status === 'pending';
  const isNeedsUpdate = previewDoc.status === 'needs_update';
  const isRejected = previewDoc.status === 'rejected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {language === 'hi' ? previewDoc.titleHi : previewDoc.titleEn}
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              <span>{previewDoc.certificateNo}</span>
              <span className="mx-1.5 text-slate-300">·</span>
              <span>{language === 'hi' ? 'संस्करण' : 'Version'} {previewDoc.currentVersion}.0</span>
              <span className="mx-1.5 text-slate-300">·</span>
              <span>{previewDoc.lastUpdated}</span>
            </div>
          </div>
          <button
            onClick={() => setPreviewDoc(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Rendering Box (Realistic Institutional Government Document) */}
        <div className="p-6 md:p-8 bg-slate-100">
          <div className="relative max-w-2xl mx-auto bg-amber-50/40 border-2 border-amber-900/20 p-6 md:p-8 rounded-lg shadow-sm text-slate-800">
            {/* Government Header Stamp */}
            <div className="text-center border-b border-amber-900/20 pb-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-900 text-amber-300 font-bold mb-2 shadow-xs">
                <Shield className="w-6 h-6 text-amber-300" />
              </div>
              <div className="text-xs font-semibold tracking-wider text-emerald-950 uppercase">
                {language === 'hi' ? 'मध्य प्रदेश शासन · ई-प्रशासन सेवा' : 'Government of Madhya Pradesh · e-Governance Portal'}
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-1">
                {language === 'hi' ? previewDoc.titleHi : previewDoc.titleEn}
              </h3>
              <div className="text-xs text-slate-600 mt-1">
                {language === 'hi' ? 'डिजिटल दस्तावेज़ वॉल्ट अधिकृत ई-रिकॉर्ड' : 'Digitally Certified e-District Vault Record'}
              </div>
            </div>

            {/* Document Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6 bg-white/70 p-4 rounded-md border border-amber-900/10">
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'प्रमाण पत्र क्रमांक' : 'Certificate No.'}</span>
                <span className="font-mono font-semibold text-slate-900">{previewDoc.certificateNo}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'जारीकर्ता प्राधिकारी' : 'Issuing Authority'}</span>
                <span className="font-medium text-slate-900">{previewDoc.issuingAuthority}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'जारी करने की तिथि' : 'Issue Date'}</span>
                <span className="font-medium text-slate-900">{previewDoc.issueDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'वैधता अवधि' : 'Validity Duration'}</span>
                <span className="font-medium text-slate-900">
                  {previewDoc.expiryDate ? (
                    <span className="text-amber-800">{previewDoc.expiryDate} (3 {language === 'hi' ? 'वर्ष' : 'Years'})</span>
                  ) : (
                    <span className="text-emerald-800 font-semibold">{language === 'hi' ? 'आजीवन मान्य (स्थायी)' : 'Permanent (Lifetime)'}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Beneficiary Details */}
            <div className="border border-slate-200 rounded-md bg-white p-4 mb-6 text-xs space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {language === 'hi' ? 'प्रमाणित हितग्राही छात्र विवरण' : 'Certified Beneficiary Student Details'}
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{language === 'hi' ? 'विद्यार्थी का नाम' : 'Candidate Name'}</span>
                <span className="font-semibold text-slate-900">{activeStudent.name} ({activeStudent.nameHi})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{language === 'hi' ? 'कॉलेज नामांकन क्रमांक' : 'Enrollment Number'}</span>
                <span className="font-mono font-semibold text-slate-900">{activeStudent.enrollmentNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{language === 'hi' ? 'समग्र सामाजिक सुरक्षा ID' : 'Samagra Security ID'}</span>
                <span className="font-mono text-slate-800">{activeStudent.samagraId}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">{language === 'hi' ? 'संबद्ध संस्था' : 'Institution'}</span>
                <span className="text-slate-800">{activeStudent.collegeName}</span>
              </div>
            </div>

            {/* Official Verification Stamp & Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-900/20 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white p-1 rounded border border-slate-200 flex items-center justify-center shrink-0">
                  {/* Visual QR Code Representation */}
                  <svg viewBox="0 0 40 40" className="w-12 h-12 text-slate-800">
                    <rect x="2" y="2" width="10" height="10" fill="currentColor" />
                    <rect x="4" y="4" width="6" height="6" fill="white" />
                    <rect x="5" y="5" width="4" height="4" fill="currentColor" />
                    
                    <rect x="28" y="2" width="10" height="10" fill="currentColor" />
                    <rect x="30" y="4" width="6" height="6" fill="white" />
                    <rect x="31" y="5" width="4" height="4" fill="currentColor" />
                    
                    <rect x="2" y="28" width="10" height="10" fill="currentColor" />
                    <rect x="4" y="30" width="6" height="6" fill="white" />
                    <rect x="5" y="31" width="4" height="4" fill="currentColor" />

                    <rect x="15" y="6" width="3" height="3" fill="currentColor" />
                    <rect x="21" y="6" width="3" height="3" fill="currentColor" />
                    <rect x="18" y="12" width="4" height="4" fill="currentColor" />
                    <rect x="14" y="20" width="12" height="3" fill="currentColor" />
                    <rect x="16" y="26" width="4" height="4" fill="currentColor" />
                    <rect x="24" y="28" width="8" height="3" fill="currentColor" />
                    <rect x="28" y="16" width="4" height="4" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">{language === 'hi' ? 'डिजिटल हस्ताक्षर सत्यापन' : 'Digital Vault Verification'}</div>
                  <div className="font-semibold text-emerald-800 flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'ई-हस्ताक्षरित एवं स्वीकृत' : 'e-Signed & Verified'}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">SHA256: 8a4d...901e</div>
                </div>
              </div>

              {/* Status Badge Box */}
              <div className="text-right">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  isPending ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  isNeedsUpdate ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                  'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {isVerified && <CheckCircle className="w-3.5 h-3.5" />}
                  {isPending && <Clock className="w-3.5 h-3.5" />}
                  {isNeedsUpdate && <AlertTriangle className="w-3.5 h-3.5" />}
                  {isRejected && <XCircle className="w-3.5 h-3.5" />}
                  <span>
                    {isVerified ? t.statusVerified :
                     isPending ? t.statusPending :
                     isNeedsUpdate ? t.statusNeedsUpdate :
                     t.statusRejected}
                  </span>
                </div>
                {currentVer?.verifiedBy && (
                  <div className="text-[10px] text-slate-500 mt-1">
                    {language === 'hi' ? 'सत्यापनकर्ता' : 'By'}: {currentVer.verifiedBy}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
          <div className="text-xs text-slate-500">
            {previewDoc.canReuseNextYear ? (
              <span className="text-emerald-700 font-medium">
                ✓ {language === 'hi' ? 'यह दस्तावेज़ अगले सत्र में स्वतः पुनः उपयोग होगा (फोटोकॉपी नहीं चाहिए)' : 'Permanently verified: Auto-reused for upcoming renewal without physical photocopy.'}
              </span>
            ) : (
              <span className="text-slate-600">
                ℹ {language === 'hi' ? 'वार्षिक नवीनीकरण आवश्यक (सत्र परिणाम / शुल्क रसीद)' : 'Requires annual update per academic session.'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट' : 'Print'}</span>
            </button>
            <button
              onClick={() => setPreviewDoc(null)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
