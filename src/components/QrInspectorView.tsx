import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, Search, ShieldCheck, CheckCircle, FileCheck, Building2, User, Camera, ArrowRight } from 'lucide-react';

export const QrInspectorView: React.FC = () => {
  const { applications, documents, allStudents, activeStudent, language, setReceiptModalApp, t } = useApp();
  const [receiptInput, setReceiptInput] = useState<string>('MP-SCH-2026-89421');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedDone, setScannedDone] = useState<boolean>(true);

  const matchedApp = applications.find(a => 
    a.receiptNumber?.toLowerCase().includes(receiptInput.toLowerCase().trim())
  ) || applications[0];

  const student = allStudents.find(s => s.id === matchedApp?.studentId) || activeStudent;
  const studentDocs = documents.filter(d => d.studentId === student.id);

  const simulateCameraScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedDone(true);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{t.qrTitle}</h1>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {language === 'hi' ? 'नो-फोटोकॉपी सत्यापन टर्मिनल' : 'Zero-Photocopy Audit Portal'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t.qrDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={simulateCameraScan}
            disabled={isScanning}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>{isScanning ? (language === 'hi' ? 'स्कैन हो रहा है...' : 'Scanning Camera...') : (language === 'hi' ? 'कैमरा स्कैनर सिमुलेट करें' : 'Simulate Camera Scan')}</span>
          </button>
        </div>
      </div>

      {/* Lookup Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {language === 'hi' ? 'डिजिटल रसीद क्रमांक या क्रिप्टोग्राफ़िक टोकन दर्ज करें' : 'Enter Digital Receipt Number or Hash'}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={receiptInput}
              onChange={(e) => setReceiptInput(e.target.value)}
              placeholder="e.g. MP-SCH-2026-89421"
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <button
            onClick={() => setScannedDone(true)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'पुष्टि करें' : 'Verify Record'}
          </button>
        </div>

        {/* Quick sample chips */}
        <div className="flex items-center gap-2 mt-2.5 text-xs text-slate-500">
          <span>{language === 'hi' ? 'नमूना रसीदें:' : 'Quick demo samples:'}</span>
          <button
            onClick={() => setReceiptInput('MP-SCH-2026-89421')}
            className="font-mono text-emerald-800 hover:underline cursor-pointer"
          >
            MP-SCH-2026-89421 (2026–27 Renewal)
          </button>
          <span>·</span>
          <button
            onClick={() => setReceiptInput('MP-SCH-2025-78219')}
            className="font-mono text-emerald-800 hover:underline cursor-pointer"
          >
            MP-SCH-2025-78219 (2025–26 Completed)
          </button>
        </div>
      </div>

      {/* Verified Certificate Result */}
      {matchedApp && (
        <div className="bg-white rounded-xl border-2 border-emerald-600/30 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    {language === 'hi' ? 'डिजिटल वॉल्ट से सत्यापित एवं वैध' : 'Cryptographically Verified Official Record'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Govt Approved</span>
                  </span>
                </div>
                <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                  {matchedApp.receiptNumber}
                </div>
              </div>
            </div>

            <button
              onClick={() => setReceiptModalApp(matchedApp)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>{language === 'hi' ? 'मूल रसीद खोलें' : 'View Full Receipt'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Student Identity Verification Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'छात्र का नाम' : 'Candidate'}</span>
              <span className="font-bold text-slate-900">{student.name} ({student.category})</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'कॉलेज नामांकन' : 'Enrollment No.'}</span>
              <span className="font-mono font-semibold text-slate-900">{student.enrollmentNo}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'संबद्ध कॉलेज' : 'Institution'}</span>
              <span className="font-medium text-slate-800 truncate block">Govt Engineering College Jabalpur</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'सत्र' : 'Session'}</span>
              <span className="font-bold text-emerald-900 font-mono">{matchedApp.academicYear} (Renewal)</span>
            </div>
          </div>

          {/* Documents Verified Checklist */}
          <div>
            <div className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
              <span>{language === 'hi' ? 'सत्यापित संलग्न दस्तावेज़ (भौतिक प्रतियां वर्जित)' : 'Verified Document Vault Records (Zero Hardcopies Needed)'}</span>
              <span className="text-xs text-emerald-800 font-mono font-semibold">
                {studentDocs.length} Verified Items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentDocs.map((doc) => (
                <div key={doc.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-2 text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {language === 'hi' ? doc.titleHi : doc.titleEn}
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                      {doc.certificateNo}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {doc.issuingAuthority}
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                    ✓ Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspector summary callout */}
          <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">
                {language === 'hi' ? 'सत्यापन निष्कर्ष: भौतिक फोटोकॉपी की कोई आवश्यकता नहीं है' : 'Audit Conclusion: Student Complies with Zero-Photocopy Mandate'}
              </div>
              <div className="text-emerald-800">
                {language === 'hi'
                  ? 'छात्र के सभी स्थायी दस्तावेज़ मध्य प्रदेश ई-डिस्ट्रिक्ट एवं विश्वविद्यालय डेटाबेस से प्रमाणित हैं। छात्र को किसी भी कॉलेज काउंटर पर कतार लगाने या कागजी फोटोकॉपी सेट जमा करने की आवश्यकता नहीं है।'
                  : 'All permanent certificates are digitally authentic and certified. The scholarship desk has full legal authorization to process this renewal directly through this digital vault record.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
