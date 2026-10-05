import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  Info, 
  Check, 
  Lock, 
  Languages,
  Circle,
  KeyRound
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS, AssessmentQuestion } from '../data/assessmentQuestions';
import { StudentProfile } from '../types/assessment';
import { PasscodeModal } from './PasscodeModal';

interface AssessmentViewProps {
  student: StudentProfile;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onAnswerChange: (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => void;
  onSubmit: () => void;
  onEditProfile: () => void;
  timeRemaining: number;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  student,
  answers,
  onAnswerChange,
  onSubmit,
  onEditProfile,
  timeRemaining,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [showLearningInsight, setShowLearningInsight] = useState(false);
  const [showArabic, setShowArabic] = useState(true);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining <= 300; // Under 5 minutes remaining

  const currentQ: AssessmentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'command':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'suppression':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'medical':
        return <Stethoscope className="w-4 h-4 text-emerald-400" />;
      case 'evacuation':
        return <DoorOpen className="w-4 h-4 text-blue-400" />;
      case 'liaison':
        return <Radio className="w-4 h-4 text-purple-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const toggleFlag = (id: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const jumpToNextUnanswered = () => {
    const nextUnanswered = ASSESSMENT_QUESTIONS.findIndex((q) => !answers[q.id]);
    if (nextUnanswered !== -1) {
      setCurrentIndex(nextUnanswered);
    }
  };

  // Select Option: DOES NOT auto-advance. Changes color, allows changing mind freely.
  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    onAnswerChange(currentQ.id, optionId);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (['1', 'a', 'A'].includes(e.key)) handleSelectOption('A');
      if (['2', 'b', 'B'].includes(e.key)) handleSelectOption('B');
      if (['3', 'c', 'C'].includes(e.key)) handleSelectOption('C');
      if (['4', 'd', 'D'].includes(e.key)) handleSelectOption('D');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ.id]);

  // Demo auto-fill helper (requires code 2809)
  const handleQuickDemoFill = () => {
    const samplePattern: ('A' | 'B' | 'C' | 'D')[] = ['A', 'C', 'D', 'A', 'C', 'B'];
    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      onAnswerChange(q.id, samplePattern[idx % samplePattern.length]);
    });
  };

  const currentAnswer = answers[currentQ.id];
  const chosenOption = currentQ.options.find((o) => o.id === currentAnswer);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <PasscodeModal
        isOpen={isPasscodeOpen}
        onClose={() => setIsPasscodeOpen(false)}
        onSuccess={() => {
          setIsPasscodeOpen(false);
          handleQuickDemoFill();
        }}
      />

      {/* Top Header Card */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
              40Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base sm:text-lg">{student.name}</span>
                <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-amber-400 font-mono">
                  Employee ID: {student.studentId}
                </span>
                <button
                  onClick={onEditProfile}
                  className="text-[11px] text-slate-400 hover:text-white underline ml-1"
                >
                  Change
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Course Date: <span className="text-slate-300 font-medium font-mono">{student.courseDate || student.cohort}</span> | Plain English with Arabic Helpers
              </p>
            </div>
          </div>

          {/* Upper Right Corner: Prominent 30-Minute Timer + Actions */}
          <div className="flex items-center gap-3 justify-between md:justify-end flex-wrap">
            {/* 30-Minute Countdown Clock */}
            <div
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all ${
                isLowTime
                  ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
                  : 'bg-slate-900 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
              }`}
            >
              <Clock className={`w-5 h-5 ${isLowTime ? 'text-rose-400' : 'text-amber-400'}`} />
              <div>
                <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400">
                  Time Remaining
                </div>
                <div className={`text-base font-mono font-black tracking-widest ${isLowTime ? 'text-rose-400' : 'text-amber-400'}`}>
                  {formatTimer(timeRemaining)}
                </div>
              </div>
            </div>

            {/* Private instructor access: key icon only */}
            <button
              type="button"
              onClick={() => setIsPasscodeOpen(true)}
              className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-500 hover:text-amber-400 border border-slate-800 rounded-xl transition-colors"
              aria-label="Authorization"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            {answeredCount === totalQuestions && (
              <button
                onClick={onSubmit}
                className="text-xs px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 animate-pulse transition-all"
              >
                <Check className="w-4 h-4" />
                Finish &amp; View Report
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar & Pace Helper */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Answered: <strong className="text-white">{answeredCount}</strong> of {totalQuestions}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Select your choice, then push <strong>Next</strong> to continue
            </span>
            <span className="font-bold text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar (1 - 40 Grid) */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
            Question Navigator (1 to 40)
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> Unanswered
            </span>
            {answeredCount < totalQuestions && (
              <button
                onClick={jumpToNextUnanswered}
                className="text-amber-400 hover:text-amber-300 underline font-semibold ml-1"
              >
                Next Unanswered
              </button>
            )}
          </div>
        </div>

        {/* 40 Grid Pills */}
        <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
          {ASSESSMENT_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            const isFlagged = !!flaggedQuestions[q.id];

            let cellBg = 'bg-slate-900 text-slate-400 border-slate-800';
            if (isAnswered) cellBg = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
            if (isFlagged) cellBg = 'bg-amber-950/70 text-amber-300 border-amber-500/50';
            if (isCurrent) cellBg = 'bg-amber-500 text-slate-950 border-white font-extrabold ring-2 ring-amber-400/50';

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-7 rounded text-[11px] font-mono font-medium border flex items-center justify-center transition-all ${cellBg} hover:opacity-90`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
        {/* Module Header & Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              {getCategoryIcon(currentQ.category)}
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                {currentQ.module}
              </span>
              <span className="text-xs text-slate-400">
                Question <strong className="text-white">{currentQ.id}</strong> of {totalQuestions}
              </span>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowArabic(!showArabic)}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showArabic
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              Arabic Helpers: {showArabic ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                flaggedQuestions[currentQ.id]
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}
            </button>

            <button
              onClick={() => setShowLearningInsight(!showLearningInsight)}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showLearningInsight
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Insight: {showLearningInsight ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Question Title & Arabic Subtitle */}
        <div className="mb-6 space-y-2">
          <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
            {currentQ.question}
          </h2>

          {showArabic && currentQ.arabicQuestion && (
            <div className="text-base sm:text-lg text-amber-300/90 font-arabic leading-relaxed pt-1" dir="rtl">
              {currentQ.arabicQuestion}
            </div>
          )}

          <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400/80" />
            <span>Select the choice that best matches your personality. You can change your selection at any time before clicking Next.</span>
          </div>
        </div>

        {/* 4 Options (Color changes on select, no auto-advance) */}
        <div className="space-y-3.5 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = currentAnswer === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer relative ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800/90 text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                {/* Option Badge */}
                <div
                  className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center font-mono font-black text-sm mt-0.5 border transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {opt.id}
                </div>

                {/* Option Text & Arabic Subtitle */}
                <div className="space-y-1.5 flex-1 pr-6">
                  <div className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                    {opt.text}
                  </div>

                  {showArabic && opt.arabicText && (
                    <div className="text-xs sm:text-sm text-slate-400 font-arabic leading-relaxed" dir="rtl">
                      {opt.arabicText}
                    </div>
                  )}

                  {isSelected && (
                    <div className="text-[10px] text-amber-400 font-mono font-semibold pt-0.5 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected — Click "Next" to continue
                    </div>
                  )}
                </div>

                {/* Right Selection Indicator */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-amber-400 fill-amber-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Optional Tactical Rationale Debrief Panel */}
        {showLearningInsight && chosenOption && (
          <div className="bg-gradient-to-r from-blue-950/40 to-slate-900/80 border border-blue-500/30 rounded-xl p-4 sm:p-5 mt-4 transition-all">
            <div className="flex items-center gap-2 mb-1.5 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              Tactical Learning Insight:
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {chosenOption.learningInsight}
            </p>
          </div>
        )}

        {/* Navigation Toolbar — ONLY pushing "Next" moves forward */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-xs text-slate-400 font-mono">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30 animate-pulse hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit &amp; View Report <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
