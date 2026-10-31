import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Printer, QrCode, CheckCircle, ShieldCheck, Download, ArrowRight } from 'lucide-react';

export const ReceiptsList: React.FC = () => {
  const { 
    applications, 
    activeStudent, 
    setReceiptModalApp, 
    setQrModalOpen, 
    language, 
    t 
  } = useApp();

  const studentApps = applications.filter(a => a.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{t.navReceipts}</h1>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {language === 'hi' ? 'आधिकारिक डिजिटल पावती' : 'Verifiable e-Receipts'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'ये डिजिटल पावती रसीदें कॉलेज या विभाग में प्रस्तुत करने के लिए पूरी तरह वैध हैं। इनमें आधिकारिक डिजिटल मुहर और सत्यापन QR कोड शामिल है।'
              : 'Official digital submission receipts certified by the higher education department. Scannable QR code replaces recurring paper photocopies.'}
          </p>
        </div>

        <button
          onClick={() => setQrModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <QrCode className="w-4 h-4 text-emerald-700" />
          <span>{language === 'hi' ? 'QR कोड स्कैनर खोलें' : 'Open QR Verifier'}</span>
        </button>
      </div>

      {/* Receipts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studentApps.map((app) => {
          const isApproved = app.status === 'approved';

          return (
            <div 
              key={app.id} 
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-slate-900">
                        {app.receiptNumber}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {app.submissionDate}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${
                    isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isApproved ? (language === 'hi' ? 'सत्यापित एवं स्वीकृत' : 'Approved') : (language === 'hi' ? 'सत्यापनाधीन' : 'Submitted')}
                  </span>
                </div>

                <div className="my-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'hi' ? 'शैक्षणिक सत्र' : 'Academic Session'}</span>
                    <span className="font-semibold text-slate-900 font-mono">{app.academicYear} (Renewal)</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'hi' ? 'वॉल्ट से स्वतः प्रयुक्त' : 'Reused from Vault'}</span>
                    <span className="font-semibold text-emerald-800 font-mono">{app.reusedDocumentsCount || 5} Documents</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'hi' ? 'कागज़ के पन्ने बचाए' : 'Photocopies Saved'}</span>
                    <span className="font-bold text-emerald-700 font-mono">{app.photocopiesSaved || 8} Pages</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded text-[11px] text-slate-600 border border-slate-150 mt-3 font-mono truncate">
                    {app.qrVerificationHash}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setReceiptModalApp(app)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पूरी रसीद देखें / प्रिंट' : 'View Full Receipt'}</span>
                </button>

                <button
                  onClick={() => setQrModalOpen(true)}
                  className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Verify with QR Scanner"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
