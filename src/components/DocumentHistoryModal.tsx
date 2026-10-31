import React from 'react';
import { useApp } from '../context/AppContext';
import { X, History, CheckCircle, Clock, AlertTriangle, XCircle, FileText, Calendar, UserCheck } from 'lucide-react';

export const DocumentHistoryModal: React.FC = () => {
  const { historyDoc, setHistoryDoc, language, t } = useApp();

  if (!historyDoc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {t.modalTitleHistory}
              </h2>
              <div className="text-xs text-slate-500">
                {language === 'hi' ? historyDoc.titleHi : historyDoc.titleEn}
              </div>
            </div>
          </div>
          <button
            onClick={() => setHistoryDoc(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Version Timeline */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900">
                {language === 'hi' ? 'कुल अपलोड किए गए संस्करण' : 'Total Uploaded Versions'}:
              </span>{' '}
              <span className="font-mono text-emerald-800 font-bold">{historyDoc.versions.length}</span>
            </div>
            <div>
              <span className="text-slate-500">{language === 'hi' ? 'प्रमाण पत्र क्रमांक' : 'Certificate No.'}:</span>{' '}
              <span className="font-mono font-medium text-slate-900">{historyDoc.certificateNo}</span>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 my-2">
            {historyDoc.versions.map((ver, idx) => {
              const isLatest = idx === 0;
              const isVerif = ver.status === 'verified';
              const isPend = ver.status === 'pending';
              const isNeedsUp = ver.status === 'needs_update';
              const isRej = ver.status === 'rejected';

              return (
                <div key={ver.versionId} className="relative pl-6">
                  {/* Timeline bullet */}
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                    isLatest ? 'border-emerald-600 bg-emerald-600' : 'border-slate-400'
                  }`}>
                    {isLatest && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <div className={`p-4 rounded-lg border transition-all ${
                    isLatest 
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-xs' 
                      : 'bg-white border-slate-200 opacity-85'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          v{ver.versionNumber}.0
                        </span>
                        {isLatest && (
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {language === 'hi' ? 'सक्रिय (वर्तमान)' : 'Active (Latest)'}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 font-mono">{ver.academicYear}</span>
                      </div>

                      {/* Status badge */}
                      <div className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        isVerif ? 'bg-emerald-100 text-emerald-800' :
                        isPend ? 'bg-amber-100 text-amber-800' :
                        isNeedsUp ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {isVerif && <CheckCircle className="w-3 h-3" />}
                        {isPend && <Clock className="w-3 h-3" />}
                        {isNeedsUp && <AlertTriangle className="w-3 h-3" />}
                        {isRej && <XCircle className="w-3 h-3" />}
                        <span>
                          {isVerif ? t.statusVerified :
                           isPend ? t.statusPending :
                           isNeedsUp ? t.statusNeedsUpdate :
                           t.statusRejected}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-700 mb-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono">{ver.fileName}</span>
                      <span className="text-slate-400">({ver.fileSize})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{language === 'hi' ? 'अपलोड दिनांक' : 'Uploaded on'}: <span className="text-slate-700">{ver.uploadDate}</span></span>
                      </div>

                      {ver.verifiedBy && (
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{language === 'hi' ? 'सत्यापित द्वारा' : 'Verified by'}: <span className="text-slate-700">{ver.verifiedBy}</span></span>
                        </div>
                      )}
                    </div>

                    {ver.remarks && (
                      <div className="mt-2.5 p-2 bg-slate-50 rounded text-xs text-slate-600 border border-slate-150">
                        <span className="font-semibold text-slate-700">{language === 'hi' ? 'अधिकारी टिप्पणी' : 'Staff Remarks'}:</span>{' '}
                        {ver.remarks}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => setHistoryDoc(null)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
