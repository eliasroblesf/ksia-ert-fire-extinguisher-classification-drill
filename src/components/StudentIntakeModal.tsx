import React, { useState } from 'react';
import { Shield, User, Award, Users, ChevronRight, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types/assessment';

interface StudentIntakeModalProps {
  isOpen: boolean;
  onStart: (profile: StudentProfile) => void;
  initialProfile?: StudentProfile;
}

export const StudentIntakeModal: React.FC<StudentIntakeModalProps> = ({
  isOpen,
  onStart,
  initialProfile,
}) => {
  const now = new Date();
  const defaultDay = String(now.getDate()).padStart(2, '0');
  const defaultMonth = String(now.getMonth() + 1).padStart(2, '0');
  const defaultYear = String(now.getFullYear()).slice(-2);

  const [name, setName] = useState(initialProfile?.name || '');
  const [studentId, setStudentId] = useState(initialProfile?.studentId || '');
  const [day, setDay] = useState(defaultDay);
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [assessorName, setAssessorName] = useState(initialProfile?.assessorName || 'Capt. Tariq Al-Ghamdi (Lead Instructor)');

  if (!isOpen) return null;

  const courseDate = `${day}/${month}/${year}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onStart({
      name: name.trim(),
      studentId: studentId.trim() || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      courseDate,
      cohort: courseDate,
      assessorName: assessorName.trim(),
    });
  };

  const handleQuickFill = () => {
    setName('Faisal Al-Otaibi');
    setStudentId('KSIA-7419');
    setDay(defaultDay);
    setMonth(defaultMonth);
    setYear(defaultYear);
    setAssessorName('Capt. Tariq Al-Ghamdi (Lead Instructor)');
  };

  const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const MONTH_OPTIONS = [
    { value: '01', label: '01 - Jan' },
    { value: '02', label: '02 - Feb' },
    { value: '03', label: '03 - Mar' },
    { value: '04', label: '04 - Apr' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - Jun' },
    { value: '07', label: '07 - Jul' },
    { value: '08', label: '08 - Aug' },
    { value: '09', label: '09 - Sep' },
    { value: '10', label: '10 - Oct' },
    { value: '11', label: '11 - Nov' },
    { value: '12', label: '12 - Dec' },
  ];
  const YEAR_OPTIONS = [
    { value: '25', label: "'25 (2025)" },
    { value: '26', label: "'26 (2026)" },
    { value: '27', label: "'27 (2027)" },
    { value: '28', label: "'28 (2028)" },
    { value: '29', label: "'29 (2029)" },
    { value: '30', label: "'30 (2030)" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
              KSIA ERT CADET INTAKE
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Brigade Personality & Role Assessment
            </h2>
          </div>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
          Welcome to the 40-question situational judgment evaluation. This standard NFPA & ICAO-aligned 
          assessment determines your optimal operational role within the King Salman International Airport 
          Emergency Response Brigade and issues your official PDF classification dossier.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-amber-400" /> Full Candidate Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faisal Al-Otaibi"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Employee ID number
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. KSIA-7419"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Course date <span className="text-amber-400/80 font-mono text-[10px]">({courseDate})</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                  title="Day"
                >
                  {DAY_OPTIONS.map((d) => (
                    <option key={d} value={d} className="bg-slate-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                  title="Month"
                >
                  {MONTH_OPTIONS.map((m) => (
                    <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                      {m.label}
                    </option>
                  ))}
                </select>

                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                  title="Year"
                >
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y.value} value={y.value} className="bg-slate-900 text-white">
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Assessor / Lead Instructor
            </label>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              placeholder="e.g. Capt. Tariq Al-Ghamdi"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-amber-500/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Quick-Fill Demo Candidate
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              Begin 40-Question Assessment
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
