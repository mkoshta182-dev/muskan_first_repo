import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, GraduationCap, Building2, QrCode, UserPlus, RotateCcw } from 'lucide-react';
import { StudentRegisterModal } from './StudentRegisterModal';

export const PersonaSwitcher: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    activeStudentId, 
    setActiveStudentId, 
    allStudents, 
    resetAllDemoData,
    language 
  } = useApp();

  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Active Persona indicator & switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">
              {language === 'hi' ? 'डेमो भूमिका (Role):' : 'Demo Switcher:'}
            </span>

            {/* Students */}
            {allStudents.map(student => (
              <button
                key={student.id}
                onClick={() => {
                  setUserRole('student');
                  setActiveStudentId(student.id);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  userRole === 'student' && activeStudentId === student.id
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{student.name} ({student.category})</span>
              </button>
            ))}

            {/* College Officer */}
            <button
              onClick={() => setUserRole('officer')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                userRole === 'officer'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कॉलेज नोडल अधिकारी' : 'College Nodal Officer'}</span>
            </button>

            {/* QR Inspector */}
            <button
              onClick={() => setUserRole('verifier')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                userRole === 'verifier'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'QR रसीद सत्यापनकर्ता' : 'QR Scanner'}</span>
            </button>
          </div>

          {/* Quick Registration & Reset Demo button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              <UserPlus className="w-3 h-3 text-emerald-400" />
              <span>{language === 'hi' ? '+ नया छात्र रजिस्टर' : '+ Register Student'}</span>
            </button>

            <button
              onClick={resetAllDemoData}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer px-1.5 py-1"
              title="Reset state to initial sample data"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'hi' ? 'रीसेट डेटा' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>

      <StudentRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </>
  );
};
