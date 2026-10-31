import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, GraduationCap, Building2, User, Hash, CheckCircle, Info } from 'lucide-react';
import { StudentProfile } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRegisterModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setActiveStudentId, language } = useApp();

  const [enrollmentNo, setEnrollmentNo] = useState<string>('0103ME241088');
  const [name, setName] = useState<string>('Aman Kushwaha');
  const [nameHi, setNameHi] = useState<string>('अमन कुशवाहा');
  const [course, setCourse] = useState<string>('Bachelor of Technology (B.Tech)');
  const [branch, setBranch] = useState<string>('Mechanical Engineering');
  const [category, setCategory] = useState<'OBC' | 'SC' | 'ST' | 'General-EWS'>('OBC');
  const [samagraId, setSamagraId] = useState<string>('184910294');
  const [collegeName, setCollegeName] = useState<string>('Government Engineering College, Jabalpur (RGPV)');
  const [familyIncome, setFamilyIncome] = useState<number>(120000);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {language === 'hi' ? 'विद्यार्थी नया पंजीकरण' : 'Student Digital Registration'}
              </h2>
              <div className="text-xs text-slate-500">
                {language === 'hi' ? 'कॉलेज नामांकन क्रमांक से प्रोफाइल बनाएं' : 'Create profile from college enrollment number'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'डिजिटल प्रोफाइल सफलतापूर्वक बनाई गई!' : 'Student Account Created!'}
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {language === 'hi'
                ? 'आपका डिजिटल लॉकर सक्रिय हो गया है। अब आप अपने दस्तावेज़ बिना कागजी फोटोकॉपी के जमा कर सकते हैं।'
                : 'Digital document vault is now activated for enrollment ' + enrollmentNo}
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'कॉलेज नामांकन क्रमांक (Enrollment No.)' : 'Enrollment Number'}
                </label>
                <input
                  type="text"
                  required
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  placeholder="e.g. 0103ME241088"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'समग्र सामाजिक सुरक्षा ID' : 'Samagra Security ID'}
                </label>
                <input
                  type="text"
                  required
                  value={samagraId}
                  onChange={(e) => setSamagraId(e.target.value)}
                  placeholder="e.g. 184910294"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'विद्यार्थी का नाम' : 'Full Name (English)'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'नाम (हिंदी)' : 'Full Name (Hindi)'}
                </label>
                <input
                  type="text"
                  value={nameHi}
                  onChange={(e) => setNameHi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'आरक्षण वर्ग' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="General-EWS">General - EWS</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'वार्षिक पारिवारिक आय' : 'Annual Family Income (₹)'}
                </label>
                <input
                  type="number"
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'hi' ? 'संबद्ध कॉलेज / संस्थान' : 'Enrolled College'}
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'पंजीकरण के बाद आपके मूल दस्तावेज़ (जाति, मूल निवासी, 10वीं) डिजिटल वॉल्ट में सुरक्षित रहेंगे और भविष्य में हर शैक्षणिक वर्ष में स्वतः उपयोग होंगे।'
                  : 'Your account is linked to the state digital locker. Permanent documents are registered once and automatically reused across all years.'}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {language === 'hi' ? 'डिजिटल प्रोफाइल बनाएं' : 'Create Student Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
