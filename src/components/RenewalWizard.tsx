import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  UploadCloud, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Building2, 
  Calendar,
  Layers,
  Leaf
} from 'lucide-react';

export const RenewalWizard: React.FC = () => {
  const { 
    documents, 
    activeStudent, 
    submitRenewalApplication, 
    setReceiptModalApp, 
    setUploadModalOpen,
    language, 
    t 
  } = useApp();

  const [selectedTargetYear, setSelectedTargetYear] = useState<string>('2026-27');
  const [scholarshipScheme, setScholarshipScheme] = useState<string>(
    'MP Post-Matric Scholarship Scheme for OBC/SC/ST Students (Higher Education Dept.)'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  const studentDocs = documents.filter(d => d.studentId === activeStudent.id);
  
  // Reusable docs (permanent or valid conditional)
  const reusedDocs = studentDocs.filter(d => d.canReuseNextYear);
  // Docs requiring update for renewal session
  const updateDocs = studentDocs.filter(d => !d.canReuseNextYear);

  const handleCompleteRenewal = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newApp = submitRenewalApplication(selectedTargetYear, scholarshipScheme);
      setIsSubmitting(false);
      setSubmittedApp(newApp);
      setReceiptModalApp(newApp);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <h1 className="text-xl font-bold text-slate-900">{t.renewalTitle}</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.renewalSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'नवीनीकरण सत्र:' : 'Target Session:'}</span>
            <select
              value={selectedTargetYear}
              onChange={(e) => setSelectedTargetYear(e.target.value)}
              className="bg-transparent font-bold text-emerald-900 focus:outline-none cursor-pointer"
            >
              <option value="2026-27">2026–27 (Current Renewal)</option>
              <option value="2027-28">2027–28 (Next Year)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Environmental & Practical Savings Banner */}
      <div className="bg-emerald-950 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'hi' ? 'शून्य-फोटोकॉपी पहल प्रभाव' : 'Zero-Photocopy Initiative Impact'}
            </div>
            <div className="text-sm font-semibold mt-0.5">
              {language === 'hi'
                ? '5 स्थायी प्रमाणपत्र स्वतः उपयोग हो रहे हैं — आपको कॉलेज काउंटर पर 8 फोटोकॉपी पेज जमा करने की आवश्यकता नहीं होगी!'
                : '5 permanent documents auto-carried forward — Saving 8 printed photocopies & 2 college visits!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-center bg-emerald-900/80 px-3 py-1.5 rounded border border-emerald-700/50">
            <div className="text-amber-300 font-bold text-base">5 / 7</div>
            <div className="text-[10px] text-emerald-200 uppercase">{language === 'hi' ? 'स्वतः प्रयुक्त' : 'Auto Reused'}</div>
          </div>
          <div className="text-center bg-emerald-900/80 px-3 py-1.5 rounded border border-emerald-700/50">
            <div className="text-white font-bold text-base">₹0</div>
            <div className="text-[10px] text-emerald-200 uppercase">{language === 'hi' ? 'फोटोकॉपी खर्च' : 'Photocopy Cost'}</div>
          </div>
        </div>
      </div>

      {/* Two-Column Comparison View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Pre-Verified Auto-Reused Documents */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'hi' ? 'वॉल्ट से स्वतः पुनः प्रयुक्त दस्तावेज़' : 'Auto-Reused from Digital Vault'}
                </h3>
                <div className="text-[11px] text-emerald-700 font-medium">
                  ✓ {language === 'hi' ? 'फोटोकॉपी या री-अपलोड की आवश्यकता नहीं' : 'No paper copies or re-upload needed'}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              {reusedDocs.length} {language === 'hi' ? 'स्वीकृत' : 'Pre-Verified'}
            </span>
          </div>

          <div className="space-y-2.5">
            {reusedDocs.map((doc) => (
              <div key={doc.id} className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{language === 'hi' ? doc.titleHi : doc.titleEn}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-mono">{doc.certificateNo}</span>
                    <span>·</span>
                    <span>{doc.issuingAuthority}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {language === 'hi' ? 'सत्यापित' : 'Active v' + doc.currentVersion}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {doc.expiryDate ? `Valid till ${doc.expiryDate}` : 'Permanent'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Required Updates for Session */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'hi' ? 'सत्र 2026–27 हेतु आवश्यक अपडेट' : 'Required Session Documents'}
                </h3>
                <div className="text-[11px] text-amber-800 font-medium">
                  {language === 'hi' ? 'केवल नए सत्र का रिजल्ट एवं फीस रसीद' : 'Only updated semester results & fee receipt'}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              {updateDocs.length} {language === 'hi' ? 'सत्र दस्तावेज़' : 'Items'}
            </span>
          </div>

          <div className="space-y-3">
            {updateDocs.map((doc) => {
              const isPending = doc.status === 'pending';
              const isVerified = doc.status === 'verified';

              return (
                <div key={doc.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {language === 'hi' ? doc.titleHi : doc.titleEn}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {doc.certificateNo} · {language === 'hi' ? 'नवीन सत्र संस्करण' : 'Session copy'} v{doc.currentVersion}.0
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isVerified ? t.statusVerified : t.statusPending}
                    </span>

                    <button
                      onClick={() => setUploadModalOpen(true)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded cursor-pointer transition-colors"
                    >
                      {language === 'hi' ? 'नया अपलोड' : 'Replace File'}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Scheme Selector */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'hi' ? 'छात्रवृत्ति योजना की पुष्टि करें' : 'Confirm Scholarship Scheme'}
              </label>
              <input
                type="text"
                readOnly
                value={scholarshipScheme}
                className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Submission Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-900">
            {language === 'hi' ? 'तैयार! एक क्लिक में डिजिटल आवेदन जमा करें' : 'Ready to submit! 1-Click Digital Scholarship Renewal'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'जमा करने के तुरंत बाद डिजिटल पावती रसीद व QR कोड जेनरेट होगा — कॉलेज में कोई हार्डकॉपी नहीं देनी होगी।'
              : 'Immediately generates an official digital submission receipt with QR code verification.'}
          </div>
        </div>

        <button
          onClick={handleCompleteRenewal}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
        >
          {isSubmitting ? (
            <span>{language === 'hi' ? 'वॉल्ट रिकॉर्ड्स सत्यापित हो रहे हैं...' : 'Generating Digital Receipt...'}</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.submitRenewalBtn}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
