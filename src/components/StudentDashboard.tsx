import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  FileCheck2, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  FileSpreadsheet, 
  Building2, 
  GraduationCap, 
  QrCode,
  FolderLock,
  UploadCloud,
  FileText
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    activeStudent, 
    documents, 
    applications, 
    photocopiesSavedTotal, 
    verifiedCount, 
    pendingCount, 
    actionRequiredCount,
    setActiveTab, 
    setUploadModalOpen, 
    setReceiptModalApp, 
    setQrModalOpen,
    language, 
    t 
  } = useApp();

  const studentDocs = documents.filter(d => d.studentId === activeStudent.id);
  const latestApp = applications[0];

  return (
    <div className="space-y-6">
      {/* Top Banner: Student Identity & Zero-Photocopy Mission */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              <GraduationCap className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {activeStudent.name} <span className="font-normal text-slate-500">({activeStudent.nameHi})</span>
                </h1>
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                  {activeStudent.enrollmentNo}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeStudent.category} Category
                </span>
              </div>

              <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{activeStudent.course}</span>
                <span className="text-slate-300">·</span>
                <span>{activeStudent.branch}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-700 font-medium">{activeStudent.currentYear}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{activeStudent.collegeName}</span>
              </div>
            </div>
          </div>

          {/* Quick Action CTA Strip */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('renewal')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.btnStartRenewal}</span>
            </button>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <UploadCloud className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.btnUploadNew}</span>
            </button>

            {latestApp && (
              <button
                onClick={() => setReceiptModalApp(latestApp)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'hi' ? 'ताज़ा रसीद देखें' : 'Digital Receipt'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature 5: Missing / Renewal Document Alerts Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
              {language === 'hi' ? 'सत्र 2026–27 नवीनीकरण सूचना' : 'Academic Year 2026–27 Renewal Open'}
            </div>
            <p className="text-xs text-amber-900 mt-0.5">
              {language === 'hi'
                ? 'आपके 5 स्थायी दस्तावेज़ (जाति, मूल निवासी, 10वीं अंकसूची, आधार, बैंक पासबुक) वॉल्ट से स्वतः उपयोग हो चुके हैं। केवल 2nd Year Sem 3 अंकसूची एवं कॉलेज शुल्क रसीद अपलोड करें — कागजी फोटोकॉपी की कोई आवश्यकता नहीं है।'
                : '5 permanent documents (Caste, Domicile, 10th Marksheet, Aadhaar, Bank Mandate) are verified and auto-reused. Only upload 2nd Year Sem 3 marksheet and fee receipt to complete your renewal without physical paperwork.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('renewal')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span>{language === 'hi' ? 'समीक्षा व नवीनीकरण' : 'Review & Renew'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Zero-Photocopy Quantitative Metrics (Clean anti-slop tabular figures) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">{t.sheetsSaved}</div>
          <div className="text-2xl font-extrabold text-emerald-800 font-mono tabular-nums mt-1">
            {photocopiesSavedTotal || 15}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            {language === 'hi' ? '✓ शून्य कागज़ी फोटोकॉपी' : '✓ 100% Paperless Vault'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">{t.verifiedDocs}</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            {verifiedCount} / {studentDocs.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {language === 'hi' ? 'ई-हस्ताक्षरित डिजिटल रिकॉर्ड' : 'e-Signed & certified'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">{t.permanentDocs}</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            5 <span className="text-xs text-slate-500 font-normal">{language === 'hi' ? 'दस्तावेज़' : 'Docs'}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {language === 'hi' ? 'आजीवन पुन: उपयोग योग्य' : 'Lifetime reusable'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">{t.tripsAvoided}</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            4 <span className="text-xs text-slate-500 font-normal">{language === 'hi' ? 'चक्कर' : 'Visits'}</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            {language === 'hi' ? 'काउंटर लाइन से मुक्ति' : 'Direct college portal link'}
          </div>
        </div>
      </div>

      {/* Main Grid: Vault Quick Access & Renewal Comparison Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Document Vault Status Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.navVault}</h2>
              <div className="text-xs text-slate-500">
                {language === 'hi' ? 'आपके सभी सुरक्षित छात्रवृत्ति दस्तावेज़' : 'Your permanent and renewable scholarship certificates'}
              </div>
            </div>
            <button
              onClick={() => setActiveTab('vault')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'hi' ? 'पूरा वॉल्ट खोलें' : 'View Full Vault'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {studentDocs.slice(0, 5).map((doc) => {
              const isVerif = doc.status === 'verified';
              const isPend = doc.status === 'pending';

              return (
                <div key={doc.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        {language === 'hi' ? doc.titleHi : doc.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{doc.certificateNo}</span>
                        <span>·</span>
                        <span>v{doc.currentVersion}.0</span>
                        <span>·</span>
                        <span className={doc.canReuseNextYear ? 'text-emerald-700 font-medium' : 'text-slate-500'}>
                          {doc.canReuseNextYear ? (language === 'hi' ? 'स्वतः पुन: उपयोग' : 'Auto-reused') : (language === 'hi' ? 'वार्षिक' : 'Annual')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                    isVerif ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    isPend ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {isVerif && <CheckCircle className="w-3 h-3" />}
                    {isPend && <Clock className="w-3 h-3" />}
                    <span>{isVerif ? t.statusVerified : isPend ? t.statusPending : doc.status}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: 1-Click Renewal Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <FolderLock className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'वार्षिक नवीनीकरण सिस्टम' : 'One-Click Annual Renewal'}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'सत्र 2026–27 डिजिटल रिन्यूअल' : 'Academic Year 2026–27 Renewal'}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'पिछले सत्र के सभी सत्यापित रिकॉर्ड्स (जाति, मूल निवासी, 10वीं, आय, बैंक खाता) स्वतः कॉपी हो जाते हैं। आपको केवल नया रिजल्ट और फीस रसीद ही जोड़नी है।'
                : 'Carries forward all pre-verified certificates. Only new academic results and current tuition receipts are needed.'}
            </p>

            <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-700">
                <span>{language === 'hi' ? 'पुनः प्रयुक्त स्थायी दस्तावेज़' : 'Auto-Carried Vault Docs'}</span>
                <span className="font-bold text-emerald-800 font-mono">5</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>{language === 'hi' ? 'नवीन आवश्यक दस्तावेज़' : 'New Documents Needed'}</span>
                <span className="font-bold text-amber-800 font-mono">1</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 border-t border-slate-100 pt-1.5">
                <span>{language === 'hi' ? 'फोटोकॉपी की बचत' : 'Hardcopy Photocopies Saved'}</span>
                <span className="font-bold text-emerald-700 font-mono">8 Pages</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('renewal')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>{t.btnStartRenewal}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
