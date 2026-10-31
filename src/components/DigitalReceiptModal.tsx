import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, CheckCircle, Shield, QrCode, FileText, ArrowRight, Download, Share2 } from 'lucide-react';

export const DigitalReceiptModal: React.FC = () => {
  const { 
    receiptModalApp, 
    setReceiptModalApp, 
    activeStudent, 
    documents, 
    language, 
    setQrModalOpen, 
    t 
  } = useApp();

  if (!receiptModalApp) return null;

  const appStudentDocs = documents.filter(d => d.studentId === activeStudent.id);
  const reusedDocs = appStudentDocs.filter(d => d.canReuseNextYear);
  const updatedDocs = appStudentDocs.filter(d => !d.canReuseNextYear);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
              {language === 'hi' ? 'डिजिटल छात्रवृत्ति पावती रसीद' : 'Official Digital Submission Acknowledgment'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-xs font-bold text-emerald-800">{receiptModalApp.receiptNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट / PDF सहेजें' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={() => setReceiptModalApp(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div id="printable-receipt" className="p-6 md:p-8 bg-white text-slate-900">
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                  <Shield className="w-8 h-8 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-emerald-950 uppercase">
                    {language === 'hi' ? 'मध्य प्रदेश शासन · उच्च शिक्षा विभाग' : 'Government of Madhya Pradesh · Department of Higher Education'}
                  </div>
                  <h1 className="text-lg md:text-xl font-extrabold text-slate-950 tracking-tight mt-0.5">
                    {language === 'hi' ? 'राज्य छात्रवृत्ति पोर्टल 2.0 · शून्य फोटोकॉपी डिजिटल पावती' : 'State Scholarship Portal 2.0 · Zero-Photocopy Digital Receipt'}
                  </h1>
                  <div className="text-xs text-slate-500 font-medium">
                    {language === 'hi' ? 'दस्तावेज़ सत्यापन एवं डिजिटल लॉकर पावती पत्र' : 'Digital Document Locker & Verification Acknowledgment Letter'}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{receiptModalApp.status === 'approved' ? (language === 'hi' ? 'सत्यापित एवं स्वीकृत' : 'Verified & Approved') : (language === 'hi' ? 'डिजिटल रूप से जमा' : 'Digitally Submitted')}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">
                  Session: {receiptModalApp.academicYear}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Identifiers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs mb-6">
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'रसीद क्रमांक' : 'Receipt No.'}</span>
              <span className="font-mono font-bold text-slate-900">{receiptModalApp.receiptNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'जमा करने की तिथि' : 'Submission Date'}</span>
              <span className="font-semibold text-slate-900">{receiptModalApp.submissionDate || '23 Jul 2026'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'शैक्षणिक सत्र' : 'Academic Session'}</span>
              <span className="font-semibold text-emerald-900">{receiptModalApp.academicYear} (Renewal)</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'hi' ? 'कागज़ के पन्ने बचाए' : 'Photocopies Eliminated'}</span>
              <span className="font-bold text-emerald-700">
                {receiptModalApp.photocopiesSaved || 8} {language === 'hi' ? 'प्रतियां शून्य' : 'Sheets Saved'}
              </span>
            </div>
          </div>

          {/* Student Profile Information */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-6 text-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 border-b border-slate-200 uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'आवेदक छात्र विवरण' : 'Student Applicant Credentials'}
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'विद्यार्थी का नाम' : 'Full Name'}</span>
                <span className="font-semibold text-slate-900">{activeStudent.name} ({activeStudent.nameHi})</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'कॉलेज नामांकन क्रमांक' : 'Enrollment Number'}</span>
                <span className="font-mono font-bold text-slate-900">{activeStudent.enrollmentNo}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'समग्र सामाजिक सुरक्षा ID' : 'Samagra Security ID'}</span>
                <span className="font-mono text-slate-900">{activeStudent.samagraId}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">{language === 'hi' ? 'महाविद्यालय / संस्थान' : 'College / Institute'}</span>
                <span className="font-medium text-slate-900">{activeStudent.collegeName} (Code: {activeStudent.collegeCode})</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'पाठ्यक्रम एवं वर्ग' : 'Course & Category'}</span>
                <span className="font-medium text-slate-900">{activeStudent.course} · {activeStudent.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'डीबीटी बैंक खाता' : 'DBT Bank Account'}</span>
                <span className="font-mono text-slate-900">{activeStudent.bankName} ({activeStudent.accountNumberMasked})</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'सत्यापित वार्षिक आय' : 'Certified Annual Income'}</span>
                <span className="font-semibold text-slate-900">₹{activeStudent.annualFamilyIncome.toLocaleString('en-IN')} / year</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'hi' ? 'छात्रवृत्ति योजना' : 'Scholarship Scheme'}</span>
                <span className="font-medium text-slate-900">MP Post-Matric OBC Scheme</span>
              </div>
            </div>
          </div>

          {/* Zero-Photocopy Documents Breakdown */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-6 text-xs">
            <div className="bg-emerald-900 text-white px-4 py-2 font-bold flex items-center justify-between text-[11px] tracking-wide">
              <span>{language === 'hi' ? 'डिजिटल वॉल्ट से पुनः प्रयुक्त सत्यापित दस्तावेज़ (फोटोकॉपी नहीं देनी पड़ी)' : 'Verified Documents Auto-Reused from Digital Vault (Zero Paper)'}</span>
              <span className="bg-emerald-800 text-amber-300 px-2 py-0.5 rounded text-[10px]">
                {reusedDocs.length} {language === 'hi' ? 'दस्तावेज़ स्वतः पुन: उपयोग' : 'Documents Carried Over'}
              </span>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px]">
                  <th className="py-2 px-3 font-semibold">#</th>
                  <th className="py-2 px-3 font-semibold">{language === 'hi' ? 'दस्तावेज़' : 'Document Type'}</th>
                  <th className="py-2 px-3 font-semibold">{language === 'hi' ? 'प्रमाण पत्र क्रमांक' : 'Certificate ID'}</th>
                  <th className="py-2 px-3 font-semibold">{language === 'hi' ? 'स्थिति' : 'Locker Status'}</th>
                  <th className="py-2 px-3 font-semibold">{language === 'hi' ? 'कागज़ की बचत' : 'Paper Saved'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {reusedDocs.map((doc, idx) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">
                      {language === 'hi' ? doc.titleHi : doc.titleEn}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-600">{doc.certificateNo}</td>
                    <td className="py-2 px-3">
                      <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                        ✓ {language === 'hi' ? 'पूर्व-सत्यापित' : 'Pre-Verified'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500">
                      2 {language === 'hi' ? 'प्रतियां बचीं' : 'Photocopies'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Verification Seal & QR Verification Code */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <div className="flex items-center gap-4">
              {/* Scalable SVG QR Code */}
              <div className="w-20 h-20 bg-white p-1.5 rounded-md border border-slate-300 shadow-xs flex items-center justify-center shrink-0">
                <svg viewBox="0 0 50 50" className="w-16 h-16 text-slate-900">
                  <rect x="2" y="2" width="14" height="14" fill="currentColor" />
                  <rect x="5" y="5" width="8" height="8" fill="white" />
                  <rect x="7" y="7" width="4" height="4" fill="currentColor" />
                  
                  <rect x="34" y="2" width="14" height="14" fill="currentColor" />
                  <rect x="37" y="5" width="8" height="8" fill="white" />
                  <rect x="39" y="7" width="4" height="4" fill="currentColor" />
                  
                  <rect x="2" y="34" width="14" height="14" fill="currentColor" />
                  <rect x="5" y="37" width="8" height="8" fill="white" />
                  <rect x="7" y="39" width="4" height="4" fill="currentColor" />

                  <rect x="19" y="4" width="4" height="4" fill="currentColor" />
                  <rect x="26" y="6" width="4" height="4" fill="currentColor" />
                  <rect x="20" y="14" width="10" height="4" fill="currentColor" />
                  <rect x="18" y="22" width="14" height="4" fill="currentColor" />
                  <rect x="36" y="20" width="8" height="4" fill="currentColor" />
                  <rect x="19" y="34" width="6" height="4" fill="currentColor" />
                  <rect x="28" y="38" width="14" height="4" fill="currentColor" />
                  <rect x="36" y="30" width="8" height="4" fill="currentColor" />
                  <rect x="4" y="22" width="6" height="4" fill="currentColor" />
                </svg>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-900 uppercase">
                  {language === 'hi' ? 'आधिकारिक डिजिटल मुहर एवं हैश' : 'Official Cryptographic Seal'}
                </div>
                <div className="font-mono text-[10px] text-slate-500 break-all max-w-sm mt-0.5">
                  {receiptModalApp.qrVerificationHash || 'SHA256:4a5b6c7d8e9f0123456789abcdef0123456789abcdef'}
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? 'कॉलेज या विभाग को किसी भी हार्डकॉपी फोटोकॉपी की आवश्यकता नहीं है।'
                      : 'Zero-Photocopy Certified: No physical hardcopies required by college desk.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 shrink-0">
              <div className="text-[11px] text-slate-500">{language === 'hi' ? 'अधिकृत सत्यापन हस्ताक्षर' : 'Authorized College Seal'}</div>
              <div className="font-bold text-slate-900 mt-1">Prof. Arvind K. Verma</div>
              <div className="text-[10px] text-slate-600">Scholarship Nodal Officer</div>
              <div className="text-[10px] text-slate-400 font-mono">GEC Jabalpur (RGPV)</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              setReceiptModalApp(null);
              setQrModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{language === 'hi' ? 'QR कोड स्कैन टेस्ट करें' : 'Test Scan Receipt with QR Inspector'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'डाउनलोड / प्रिंट' : 'Print / Download'}</span>
            </button>
            <button
              onClick={() => setReceiptModalApp(null)}
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
