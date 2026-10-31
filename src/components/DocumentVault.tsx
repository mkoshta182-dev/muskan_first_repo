import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Eye, 
  History, 
  UploadCloud, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Filter, 
  Search, 
  FileText, 
  Calendar, 
  Building, 
  Check, 
  Sparkles
} from 'lucide-react';
import { DocumentItem, VerificationStatus } from '../types';

export const DocumentVault: React.FC = () => {
  const { 
    documents, 
    activeStudent, 
    setPreviewDoc, 
    setHistoryDoc, 
    setUploadModalOpen, 
    language, 
    t 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'permanent' | 'annual' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const studentDocs = documents.filter(d => d.studentId === activeStudent.id);

  const filteredDocs = studentDocs.filter(doc => {
    // Filter matching
    if (activeFilter === 'permanent' && !doc.isPermanent) return false;
    if (activeFilter === 'annual' && doc.isPermanent) return false;
    if (activeFilter === 'pending' && doc.status === 'verified') return false;

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.titleEn.toLowerCase().includes(q) || doc.titleHi.toLowerCase().includes(q);
      const matchCert = doc.certificateNo.toLowerCase().includes(q);
      const matchAuth = doc.issuingAuthority.toLowerCase().includes(q);
      if (!matchTitle && !matchCert && !matchAuth) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{t.navVault}</h1>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              {language === 'hi' ? 'शून्य-फोटोकॉपी डिजिटल लॉकर' : 'Zero-Photocopy Storage'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'यहाँ आपके सभी दस्तावेज़ सुरक्षित और ई-सत्यापित रहते हैं। एक बार अपलोड करने के बाद स्थायी दस्तावेज़ (जाति, मूल निवासी, 10वीं) हर साल स्वतः उपयोग होते हैं।'
              : 'All your documents are securely encrypted and pre-verified. Once uploaded, permanent documents (Caste, Domicile, 10th) are automatically reused across all academic years.'}
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{t.btnUploadNew}</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Interactive Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'all' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterAll} ({studentDocs.length})
          </button>
          <button
            onClick={() => setActiveFilter('permanent')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'permanent' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterPermanent}
          </button>
          <button
            onClick={() => setActiveFilter('annual')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'annual' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterRenewable}
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'pending' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterPending}
          </button>
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'दस्तावेज़ या प्रमाण पत्र सं. खोजें...' : 'Search document or cert no...'}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3 px-4">{t.tableDocName}</th>
                <th className="py-3 px-4">{t.tableCertNo}</th>
                <th className="py-3 px-4">{t.tableType}</th>
                <th className="py-3 px-4">{t.tableVersion}</th>
                <th className="py-3 px-4">{t.tableStatus}</th>
                <th className="py-3 px-4 text-right">{t.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    {language === 'hi' ? 'कोई दस्तावेज़ नहीं मिला' : 'No matching documents found in vault'}
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isVerified = doc.status === 'verified';
                  const isPending = doc.status === 'pending';
                  const isNeedsUpdate = doc.status === 'needs_update';
                  const isRejected = doc.status === 'rejected';

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Document Name & Authority */}
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {language === 'hi' ? doc.titleHi : doc.titleEn}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                              <Building className="w-3 h-3 text-slate-400" />
                              <span>{doc.issuingAuthority}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Certificate Number */}
                      <td className="py-3 px-4 font-mono font-medium text-slate-800">
                        {doc.certificateNo}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        {doc.canReuseNextYear ? (
                          <div className="text-emerald-800">
                            <span className="font-medium block">
                              {language === 'hi' ? 'स्थायी / पुन: उपयोग' : 'Permanent Reusable'}
                            </span>
                            <span className="text-[10px] text-emerald-600 block">
                              {language === 'hi' ? 'फोटोकॉपी मुक्त' : 'Zero Photocopy'}
                            </span>
                          </div>
                        ) : (
                          <div className="text-slate-600">
                            <span className="font-medium block">
                              {language === 'hi' ? 'वार्षिक नवीनीकरण' : 'Annual Update'}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {language === 'hi' ? 'सत्र अनुसार' : 'Per Session'}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Version & History */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setHistoryDoc(doc)}
                          className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                          title="Click to view full version history"
                        >
                          <History className="w-3 h-3 text-slate-500" />
                          <span>v{doc.currentVersion}.0</span>
                        </button>
                        <div className="text-[10px] text-slate-400 mt-0.5">{doc.lastUpdated}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                            isVerified ? 'bg-emerald-100 text-emerald-800' :
                            isPending ? 'bg-amber-100 text-amber-800' :
                            isNeedsUpdate ? 'bg-blue-100 text-blue-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {isVerified && <CheckCircle className="w-3 h-3" />}
                            {isPending && <Clock className="w-3 h-3" />}
                            {isNeedsUpdate && <AlertTriangle className="w-3 h-3" />}
                            {isRejected && <XCircle className="w-3 h-3" />}
                            <span>
                              {isVerified ? t.statusVerified :
                               isPending ? t.statusPending :
                               isNeedsUpdate ? t.statusNeedsUpdate :
                               t.statusRejected}
                            </span>
                          </span>
                          {doc.remarks && (
                            <div className="text-[10px] text-slate-500 truncate max-w-xs" title={doc.remarks}>
                              {doc.remarks}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                            title="View digital certificate"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>{t.btnPreview}</span>
                          </button>

                          <button
                            onClick={() => setHistoryDoc(doc)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Version History & Audit Log"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
