import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { StudentDashboard } from './components/StudentDashboard';
import { DocumentVault } from './components/DocumentVault';
import { RenewalWizard } from './components/RenewalWizard';
import { DepartmentPortal } from './components/DepartmentPortal';
import { ReceiptsList } from './components/ReceiptsList';
import { QrInspectorView } from './components/QrInspectorView';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { DocumentHistoryModal } from './components/DocumentHistoryModal';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DigitalReceiptModal } from './components/DigitalReceiptModal';
import { QrVerifyModal } from './components/QrVerifyModal';
import { ShieldCheck, Leaf, GraduationCap, Building2, HelpCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { userRole, activeTab, setActiveTab, language, t } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Discreet Demo Persona Switcher Bar */}
      <PersonaSwitcher />

      {/* Main Top Bar Contract Header */}
      <Header />

      {/* Tab bar for student view */}
      {userRole === 'student' && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              <button
                onClick={() => setActiveTab('vault')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'vault'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.navVault}
              </button>

              <button
                onClick={() => setActiveTab('renewal')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'renewal'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.navRenewal}
              </button>

              <button
                onClick={() => setActiveTab('receipts')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'receipts'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.navReceipts}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {userRole === 'officer' && <DepartmentPortal />}
        {userRole === 'verifier' && <QrInspectorView />}

        {userRole === 'student' && (
          <>
            {activeTab === 'vault' && (
              <div className="space-y-8">
                <StudentDashboard />
                <DocumentVault />
              </div>
            )}
            {activeTab === 'renewal' && <RenewalWizard />}
            {activeTab === 'receipts' && <ReceiptsList />}
          </>
        )}
      </main>

      {/* Official Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>
              {language === 'hi' 
                ? 'मध्य प्रदेश राज्य छात्रवृत्ति डिजिटल लॉकर एवं शून्य-फोटोकॉपी पहल' 
                : 'State Scholarship Digital Locker & Zero-Photocopy Initiative · MP'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>{language === 'hi' ? 'उच्च शिक्षा एवं पिछड़ा वर्ग कल्याण विभाग' : 'Dept. of Higher Education & Welfare'}</span>
            <span>·</span>
            <span>{language === 'hi' ? 'कागज़-मुक्त नवीनीकरण प्रणाली' : 'Paperless Renewal Framework'}</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <DocumentViewerModal />
      <DocumentHistoryModal />
      <DocumentUploadModal />
      <DigitalReceiptModal />
      <QrVerifyModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
