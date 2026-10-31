import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UploadCloud, FileCheck, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { DocumentType, DocumentCategory } from '../types';

export const DocumentUploadModal: React.FC = () => {
  const { 
    uploadModalOpen, 
    setUploadModalOpen, 
    activeStudent, 
    documents, 
    addNewDocument, 
    uploadDocumentVersion, 
    language, 
    t 
  } = useApp();

  const [mode, setMode] = useState<'update_existing' | 'new_document'>('update_existing');
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  
  // New document fields
  const [docType, setDocType] = useState<DocumentType>('income_cert');
  const [titleEn, setTitleEn] = useState<string>('');
  const [titleHi, setTitleHi] = useState<string>('');
  const [certificateNo, setCertificateNo] = useState<string>('');
  const [issuingAuthority, setIssuingAuthority] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [category, setCategory] = useState<DocumentCategory>('conditional_renewal');
  
  // File state
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [academicYear, setAcademicYear] = useState<string>('2026-27');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!uploadModalOpen) return null;

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeKb = Math.round(file.size / 1024);
      setFileSize(sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);
      setErrorMsg('');
    }
  };

  const handleSimulateDrop = (fakeName: string, fakeSize: string) => {
    setFileName(fakeName);
    setFileSize(fakeSize);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      setErrorMsg(language === 'hi' ? 'कृपया एक दस्तावेज़ फ़ाइल चुनें' : 'Please select a document file');
      return;
    }

    if (mode === 'update_existing') {
      if (!selectedDocId) {
        setErrorMsg('Please select a document to update');
        return;
      }
      uploadDocumentVersion(selectedDocId, {
        name: fileName,
        size: fileSize || '450 KB',
        academicYear
      });
    } else {
      if (!titleEn || !certificateNo) {
        setErrorMsg(language === 'hi' ? 'कृपया आवश्यक विवरण भरें' : 'Please fill all required fields');
        return;
      }
      addNewDocument({
        studentId: activeStudent.id,
        type: docType,
        titleEn,
        titleHi: titleHi || titleEn,
        descriptionEn: `Digital ${titleEn} uploaded for scholarship vault`,
        descriptionHi: `डिजिटल ${titleHi || titleEn} छात्रवृत्ति वॉल्ट में सुरक्षित`,
        category,
        certificateNo,
        issuingAuthority: issuingAuthority || 'Authorized Competent Authority',
        issueDate: issueDate || 'Recent',
        expiryDate: expiryDate || undefined,
        status: 'pending',
        isPermanent: category === 'permanent',
        canReuseNextYear: category === 'permanent' || category === 'conditional_renewal'
      }, {
        name: fileName,
        size: fileSize || '500 KB'
      });
    }

    setUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {t.modalTitleUpload}
            </h2>
            <div className="text-xs text-slate-500">
              {language === 'hi' ? 'दस्तावेज़ एक बार अपलोड करें, बार-बार फोटोकॉपी देने की जरूरत नहीं' : 'Upload once to vault, permanently avoid physical photocopy queues'}
            </div>
          </div>
          <button
            onClick={() => setUploadModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Mode Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => { setMode('update_existing'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'update_existing' 
                  ? 'bg-white text-slate-900 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'मौजूदा दस्तावेज़ का नया संस्करण (Renew / Update)' : 'Update Existing Document (New Version)'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('new_document'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'new_document' 
                  ? 'bg-white text-slate-900 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? '+ नया दस्तावेज़ जोड़ें' : '+ Add New Document'}
            </button>
          </div>

          {mode === 'update_existing' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'अपडेट करने के लिए दस्तावेज़ चुनें' : 'Select Document to Update'}
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {documents.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {language === 'hi' ? doc.titleHi : doc.titleEn} (v{doc.currentVersion}.0 · {doc.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'शैक्षणिक सत्र' : 'Academic Session'}
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="2026-27">2026–27 (Current Renewal Session)</option>
                  <option value="2027-28">2027–28</option>
                  <option value="2025-26">2025–26</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'दस्तावेज़ का प्रकार' : 'Document Type'}
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => {
                      const val = e.target.value as DocumentType;
                      setDocType(val);
                      if (val === 'income_cert') {
                        setTitleEn('Income Certificate (Aay Praman Patra)');
                        setTitleHi('आय प्रमाण पत्र');
                        setCategory('conditional_renewal');
                      } else if (val === 'caste_cert') {
                        setTitleEn('Caste Certificate');
                        setTitleHi('जाति प्रमाण पत्र');
                        setCategory('permanent');
                      } else if (val === 'fee_receipt') {
                        setTitleEn('College Fee Receipt');
                        setTitleHi('कॉलेज शुल्क रसीद');
                        setCategory('annual_update');
                      }
                    }}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="income_cert">{t.docTypeIncome}</option>
                    <option value="marksheet_semester">{t.docTypeMarksheet}</option>
                    <option value="fee_receipt">{t.docTypeFee}</option>
                    <option value="caste_cert">{t.docTypeCaste}</option>
                    <option value="domicile_cert">{t.docTypeDomicile}</option>
                    <option value="bank_passbook">{t.docTypeBank}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'श्रेणी' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="conditional_renewal">Renewable (Valid 3 Years / Expiry)</option>
                    <option value="annual_update">Annual Update (Every Semester/Year)</option>
                    <option value="permanent">Permanent (Never changes)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'दस्तावेज़ का शीर्षक (English)' : 'Title (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Income Certificate 2026"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'प्रमाण पत्र क्रमांक' : 'Certificate Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={certificateNo}
                    onChange={(e) => setCertificateNo(e.target.value)}
                    placeholder="e.g. MP-INC-2026-9014"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {language === 'hi' ? 'दस्तावेज़ फ़ाइल अपलोड करें (PDF / JPEG / PNG)' : 'Upload Document File (PDF, JPEG, or PNG)'}
            </label>
            <div 
              className={`border-2 border-dashed rounded-lg p-5 text-center transition-colors ${
                isDragging ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/60'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setFileName(file.name);
                  const sizeKb = Math.round(file.size / 1024);
                  setFileSize(sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);
                  setErrorMsg('');
                }
              }}
            >
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              {fileName ? (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded text-xs font-mono font-medium">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>{fileName} ({fileSize})</span>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-600 mb-2">
                    {language === 'hi' ? 'फ़ाइल खींचकर यहाँ छोड़ें या ब्राउज़ करें' : 'Drag & drop file here, or click to browse'}
                  </p>
                  <label className="inline-block px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded cursor-pointer transition-colors">
                    {language === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileSelection}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>

            {/* Quick Demo Pre-fill Sample Buttons */}
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="shrink-0">{language === 'hi' ? 'त्वरित नमूना:' : 'Quick sample:'}</span>
              <button
                type="button"
                onClick={() => handleSimulateDrop('Income_Certificate_2026_Renewal.pdf', '480 KB')}
                className="text-emerald-700 hover:underline cursor-pointer"
              >
                + Income_Cert_2026.pdf
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleSimulateDrop('RGPV_2nd_Year_Sem3_Marksheet.pdf', '620 KB')}
                className="text-emerald-700 hover:underline cursor-pointer"
              >
                + Marksheet_Sem3.pdf
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Institutional note */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <span>
              {language === 'hi'
                ? 'डिजिटल वॉल्ट में अपलोड होने के बाद आपके दस्तावेज़ कॉलेज सत्यापन अधिकारी द्वारा सीधे सत्यापित किए जाएंगे — आपको कार्यालय में हार्डकॉपी जमा करने की आवश्यकता नहीं होगी।'
                : 'Documents uploaded to this digital vault are directly checked by authorized college staff. No printed physical photocopies need to be submitted at the college counter.'}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              {language === 'hi' ? 'वॉल्ट में सुरक्षित सहेजें' : 'Save to Digital Vault'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
