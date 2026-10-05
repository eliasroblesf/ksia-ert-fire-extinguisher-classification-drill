import React, { useState } from 'react';
import { 
  Award, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  FileCheck, 
  KeyRound,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { StudentProfile } from '../types/assessment';
import { PasscodeModal } from './PasscodeModal';

interface SplashScreenProps {
  onStart: (profile: StudentProfile) => void;
  onQuickFillDemo: (profile: StudentProfile) => void;
}

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

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onQuickFillDemo }) => {
  const now = new Date();
  const defaultDay = String(now.getDate()).padStart(2, '0');
  const defaultMonth = String(now.getMonth() + 1).padStart(2, '0');
  const defaultYear = String(now.getFullYear()).slice(-2);

  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [courseDay, setCourseDay] = useState(defaultDay);
  const [courseMonth, setCourseMonth] = useState(defaultMonth);
  const [courseYear, setCourseYear] = useState(defaultYear);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);

  const courseDate = `${courseDay}/${courseMonth}/${courseYear}`;
  const isFormValid = fullName.trim().length > 0 && employeeId.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onStart({
      name: fullName.trim(),
      studentId: employeeId.trim(),
      courseDate,
      cohort: courseDate,
      assessorName: 'KSIA ERT Lead Evaluator',
    });
  };

  const handlePasscodeSuccess = () => {
    setIsPasscodeOpen(false);
    const demoProfile: StudentProfile = {
      name: fullName.trim() || 'Faisal Al-Otaibi',
      studentId: employeeId.trim() || 'KSIA-7419',
      courseDate,
      cohort: courseDate,
      assessorName: 'Capt. Tariq Al-Ghamdi (Lead Instructor)',
    };
    onQuickFillDemo(demoProfile);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-6 px-4">
      <PasscodeModal
        isOpen={isPasscodeOpen}
        onClose={() => setIsPasscodeOpen(false)}
        onSuccess={handlePasscodeSuccess}
      />

      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Title & Emblem Card */}
        <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

          {/* Badge & Official Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            King Salman International Airport
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            Brigade Personality &amp; Role Assessment
          </h1>
          <div className="text-sm sm:text-base text-amber-400 font-arabic mb-4" dir="rtl">
            تقييم الميول والشخصية والخبرة لتحديد دورك الأمثل في فريق الطوارئ (أقل من 30 دقيقة)
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            A 40-question personality, experience, and preference test designed for fast, intuitive completion (estimated time: 15–20 minutes). Discover whether your natural strengths match <strong className="text-white">Fire Fighting</strong>, <strong className="text-white">Casualty Care</strong>, <strong className="text-white">Crowd Evacuation</strong>, or <strong className="text-white">Radio Communications</strong>. You will receive your Primary Role, Secondary Role, and Third Role Capability.
          </p>

          {/* 4 Roles Showcase Pills (Team Leader removed) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-8 text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Flame className="w-4 h-4 text-rose-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">Fire Suppression</div>
              <div className="text-[9px] text-rose-300 font-arabic">مكافحة الحريق</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Stethoscope className="w-4 h-4 text-emerald-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">Casualty Care</div>
              <div className="text-[9px] text-emerald-300 font-arabic">الإسعاف والرعاية</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <DoorOpen className="w-4 h-4 text-blue-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">Evacuation Support</div>
              <div className="text-[9px] text-blue-300 font-arabic">إدارة الحشود</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Radio className="w-4 h-4 text-purple-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">External Liaison</div>
              <div className="text-[9px] text-purple-300 font-arabic">الاتصال والتنسيق</div>
            </div>
          </div>

          {/* Cadet Intake Form */}
          <div className="max-w-xl mx-auto bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-left shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider font-mono font-bold text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Cadet Identification Credentials
              </span>
              <span className="text-[10px] text-slate-400 font-mono">STEP 1 OF 2</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Student Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Faisal Al-Otaibi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Employee ID number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. KSIA-7419"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Course date <span className="text-amber-400/80 font-mono text-[10px]">({courseDate})</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <select
                        value={courseDay}
                        onChange={(e) => setCourseDay(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title="Day"
                      >
                        {DAY_OPTIONS.map((d) => (
                          <option key={d} value={d} className="bg-slate-900 text-white">
                            {d}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">Day</span>
                    </div>

                    <div>
                      <select
                        value={courseMonth}
                        onChange={(e) => setCourseMonth(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title="Month"
                      >
                        {MONTH_OPTIONS.map((m) => (
                          <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">Month</span>
                    </div>

                    <div>
                      <select
                        value={courseYear}
                        onChange={(e) => setCourseYear(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title="Year"
                      >
                        {YEAR_OPTIONS.map((y) => (
                          <option key={y.value} value={y.value} className="bg-slate-900 text-white">
                            {y.label}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">Year</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Start 40-Question Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Generates official signed 3-page PDF dossier upon completion
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPasscodeOpen(true)}
                    className="p-1.5 text-slate-600 hover:text-amber-400 rounded-lg hover:bg-slate-900 transition-colors"
                    aria-label="Authorization"
                  >
                    <KeyRound className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 font-mono font-bold text-sm">
              40Q
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Learn by Doing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every scenario delivers real-time tactical doctrine explaining international airport emergency SOPs.
            </p>
          </div>

          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Dual-Role Placement</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates primary tactical appointment and secondary cross-functional backup role with compatibility percentages.
            </p>
          </div>

          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Official PDF Dossier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly downloads an accredited 3-page evaluation report with competency analysis and official sign-off lines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
