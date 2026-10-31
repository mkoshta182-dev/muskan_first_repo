import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, FileCheck, RefreshCw, Languages, GraduationCap, Building2, QrCode } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, userRole, setUserRole, activeTab, setActiveTab, t } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('vault')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors whitespace-nowrap">
                    ScholarVault MP
                  </span>
                  <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                    {language === 'hi' ? 'डिजिटल छात्रवृत्ति दस्तावेज़ वॉल्ट' : 'Zero-Photocopy Digital Locker'}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                if (userRole !== 'student') setUserRole('student');
                setActiveTab('vault');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
                activeTab === 'vault' && userRole === 'student' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {t.navVault}
            </button>

            <button
              onClick={() => {
                if (userRole !== 'student') setUserRole('student');
                setActiveTab('renewal');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
                activeTab === 'renewal' && userRole === 'student' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {t.navRenewal}
            </button>

            <button
              onClick={() => {
                if (userRole !== 'student') setUserRole('student');
                setActiveTab('receipts');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
                activeTab === 'receipts' && userRole === 'student' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {t.navReceipts}
            </button>

            <button
              onClick={() => {
                setUserRole('officer');
                setActiveTab('verification');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
                userRole === 'officer' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {t.navVerification}
            </button>

            <button
              onClick={() => {
                setUserRole('verifier');
                setActiveTab('qr_verify');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
                userRole === 'verifier' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700' : ''
              }`}
            >
              {language === 'hi' ? 'QR सत्यापन' : 'Scan & Verify'}
            </button>
          </nav>

          {/* Zone 3: Interactive Controls (Role Selector & Language Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Switch Language / भाषा बदलें"
            >
              <Languages className="w-3.5 h-3.5 text-slate-600" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="relative inline-flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  userRole === 'student'
                    ? 'bg-white text-emerald-950 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Student Dashboard"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'hi' ? 'विद्यार्थी' : 'Student'}</span>
              </button>

              <button
                onClick={() => setUserRole('officer')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  userRole === 'officer'
                    ? 'bg-emerald-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="College Officer Verification Portal"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'hi' ? 'अधिकारी' : 'Officer'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
