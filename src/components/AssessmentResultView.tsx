import React, { useState } from 'react';
import { 
  Download, 
  ShieldAlert, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  ArrowRight,
  UserCheck,
  Shield,
  BookOpen,
  FileCheck,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentResult } from '../types/assessment';
import { BRIGADE_ROLES, ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { generateAssessmentPdf } from '../utils/generatePdfReport';

interface AssessmentResultViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onReturnToSplash: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onRetake,
  onReturnToSplash,
}) => {
  const [showDetailedAudit, setShowDetailedAudit] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const primaryDef = BRIGADE_ROLES[result.primaryRole];
  const secondaryDef = BRIGADE_ROLES[result.secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[result.tertiaryRole];

  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'suppressionLead':
        return <Flame className="w-6 h-6 text-rose-400" />;
      case 'casualtyCareLead':
        return <Stethoscope className="w-6 h-6 text-emerald-400" />;
      case 'evacuationSupportLead':
        return <DoorOpen className="w-6 h-6 text-blue-400" />;
      case 'externalLiaison':
        return <Radio className="w-6 h-6 text-purple-400" />;
      default:
        return <Shield className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generateAssessmentPdf(result);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Top Banner / Completion Header */}
      <div className="bg-gradient-to-r from-[#0a0f1a] via-[#111a2e] to-[#0a0f1a] border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {result.timedOut ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/15 border border-rose-500/40 rounded-full text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4 text-rose-400" />
            30-Minute Time Limit Reached ({result.totalAnswered} of 40 Questions Answered)
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            {result.totalAnswered} of 40 Questions Completed
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ERT Candidate Role Classification
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          Official psychometric and tactical placement for candidate <strong className="text-white">{result.student.name}</strong> (Employee ID: <span className="font-mono text-amber-400">{result.student.studentId}</span> | Course Date: <span className="font-mono text-slate-300">{result.student.courseDate || result.student.cohort}</span>), certified for King Salman International Airport emergency response brigade deployment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Compiling Dossier...' : 'Download Official PDF Report'}
          </button>

          <button
            onClick={onReturnToSplash}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            Assess Next Student
          </button>

          <button
            onClick={onRetake}
            className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </button>
        </div>
      </div>

      {/* Primary Role (Hero Card) */}
      <div className="bg-[#0a0f1a] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 relative shadow-xl shadow-amber-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5" />
            Primary Recommended Fit
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">Compatibility Score:</span>
            <span className="text-3xl font-mono font-extrabold text-amber-400">{result.primaryRoleScore}%</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            {getRoleIcon(result.primaryRole)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {primaryDef.name}
            </h2>
            <div className="text-sm font-arabic text-amber-300 font-medium mt-0.5">
              {primaryDef.arabicName}
            </div>
            <div className="text-xs sm:text-sm text-amber-400/90 font-medium italic mt-1">
              {primaryDef.tagline}
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {primaryDef.idealPersonality}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2.5">
              Core Operational Duties:
            </span>
            <div className="space-y-2">
              {primaryDef.operationalDuties.slice(0, 4).map((duty, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>{duty}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2.5">
                Key Behavioral Attributes:
              </span>
              <div className="space-y-1.5">
                {primaryDef.keyTraits.slice(0, 3).map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono mt-3">
              Standards: <span className="text-slate-300">{primaryDef.standards.join(' | ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Role and Third Role Capability (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECONDARY ROLE CARD */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 font-bold text-xs rounded-full uppercase tracking-wider font-mono border border-slate-700">
                Secondary / Cross-Train Role
              </span>
              <div className="text-right">
                <span className="text-2xl font-mono font-extrabold text-slate-200">
                  {result.secondaryRoleScore}%
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">
                  Secondary Fit
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                {getRoleIcon(result.secondaryRole)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {secondaryDef.name}
                </h3>
                <div className="text-xs font-arabic text-slate-400">
                  {secondaryDef.arabicName}
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  {secondaryDef.tagline}
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {secondaryDef.idealPersonality}
            </p>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              <strong className="text-white block mb-1">Squad Redundancy Value:</strong>
              Provides high-fidelity cross-functional backup for {secondaryDef.name}, preventing single-point team bottlenecks during multi-sector alerts.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            Secondary Standard: {secondaryDef.standards[0]}
          </div>
        </div>

        {/* THIRD ROLE CAPABILITY CARD */}
        <div className="bg-[#0a0f1a] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-950/50 text-blue-300 font-bold text-xs rounded-full uppercase tracking-wider font-mono border border-blue-800/50">
                Third Role Capability
              </span>
              <div className="text-right">
                <span className="text-2xl font-mono font-extrabold text-blue-200">
                  {result.tertiaryRoleScore}%
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">
                  3rd Capability
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                {getRoleIcon(result.tertiaryRole)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {tertiaryDef.name}
                </h3>
                <div className="text-xs font-arabic text-slate-400">
                  {tertiaryDef.arabicName}
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  {tertiaryDef.tagline}
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {tertiaryDef.idealPersonality}
            </p>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              <strong className="text-white block mb-1">Reserve Adaptability:</strong>
              Candidate displays practical readiness to support {tertiaryDef.name} operations during surge rotations or prolonged airfield containment.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            Reserve Standard: {tertiaryDef.standards[0]}
          </div>
        </div>
      </div>

      {/* 4-Role Compatibility Bars & 5-Competency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 4 Roles Breakdown */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            Complete 4-Role Brigade Compatibility
          </h3>

          <div className="space-y-4">
            {(Object.keys(BRIGADE_ROLES) as (keyof typeof BRIGADE_ROLES)[]).map((key) => {
              const roleDef = BRIGADE_ROLES[key];
              const score = result.allRoleScores[key];
              const isPrimary = key === result.primaryRole;
              const isSecondary = key === result.secondaryRole;
              const isTertiary = key === result.tertiaryRole;

              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      {roleDef.name}
                      {isPrimary && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                          Primary
                        </span>
                      )}
                      {isSecondary && (
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                          Secondary
                        </span>
                      )}
                      {isTertiary && (
                        <span className="text-[9px] bg-blue-950/60 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800/60">
                          3rd Capability
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-slate-300">{score.percentage}%</span>
                  </div>

                  <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPrimary
                          ? 'bg-amber-500'
                          : isSecondary
                          ? 'bg-slate-400'
                          : isTertiary
                          ? 'bg-blue-400'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Behavioral Competencies */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Crisis Competency & Behavioral Profile
          </h3>

          <div className="space-y-4">
            {[
              { key: 'decisiveness', label: 'Situational Decisiveness & Priority' },
              { key: 'physicalReadiness', label: 'Thermal & Physical Hazard Intuition' },
              { key: 'traumaComposure', label: 'Trauma Composure & Resuscitation' },
              { key: 'crowdControl', label: 'Crowd Leadership & Egress Flow' },
              { key: 'communicationProtocol', label: 'Inter-Agency Clear-Text Protocol' },
            ].map((comp) => {
              const score = result.competencies[comp.key as keyof typeof result.competencies];
              const pct = score.percentage;

              let barColor = 'bg-emerald-500';
              if (pct < 50) barColor = 'bg-rose-500';
              else if (pct < 70) barColor = 'bg-amber-500';

              return (
                <div key={comp.key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{comp.label}</span>
                    <span className="font-mono font-bold text-slate-200">{pct}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strengths & Development Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Key Tactical Strengths
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {(result.strengths && result.strengths.length > 0 ? result.strengths : [
              `Tactical Role Specialty: Aligned with ${primaryDef.name} (${primaryDef.tagline})`,
              `Operational Composure: ${primaryDef.keyTraits[0]}`,
              `Safety & Standard Protocol: Aligned with ${primaryDef.standards[0]}`
            ]).map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            Development Priorities & Training Pathways
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {(result.developmentAreas && result.developmentAreas.length > 0 ? result.developmentAreas : [
              'Decision-Making in Ambiguity: Focus on rapid tactical triage when complete field telemetry is pending.',
              'Thermal & SCADA Hazard Intuition: Additional practice with flashover indicators and SCADA isolation.',
              `Advanced Operational Qualification: Focused competency training in ${primaryDef.recommendedTrainingPath[0]}.`
            ]).map((dev, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{dev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible 40-Question Review Accordion */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowDetailedAudit(!showDetailedAudit)}
          className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-sm font-bold text-white block">
                Review All 40 Tactical Responses & Learning Insights
              </span>
              <span className="text-xs text-slate-400">
                Detailed situational audit of all answered questions and standard operating doctrine
              </span>
            </div>
          </div>
          <div className="text-slate-400">
            {showDetailedAudit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showDetailedAudit && (
          <div className="p-6 border-t border-slate-800 space-y-4 divide-y divide-slate-800/80">
            {ASSESSMENT_QUESTIONS.map((q) => {
              const chosen = result.answers[q.id];
              const chosenOpt = q.options.find((o) => o.id === chosen);

              return (
                <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">Question {q.id} ({q.module})</span>
                    <span>Selected Option: <strong className="text-white bg-slate-800 px-2 py-0.5 rounded">{chosen || 'None'}</strong></span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-200 font-semibold">
                      {q.question}
                    </p>
                    {q.arabicQuestion && (
                      <p className="text-xs text-amber-300/80 font-arabic" dir="rtl">
                        {q.arabicQuestion}
                      </p>
                    )}
                  </div>
                  {chosenOpt && (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs space-y-1.5">
                      <div className="text-slate-200">
                        <strong className="text-amber-400 font-mono">[{chosenOpt.id}]</strong> {chosenOpt.text}
                      </div>
                      <div className="text-slate-400 text-[11px] italic border-t border-slate-800/60 pt-1">
                        <strong className="text-blue-400 not-italic">Tactical Doctrine:</strong> {chosenOpt.learningInsight}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 shadow-2xl backdrop-blur-md">
        <div className="text-xs text-slate-300 text-center sm:text-left">
          Official Dossier ready for <strong className="text-white">{result.student.name}</strong> ({result.student.studentId}). Assigned fit: <strong className="text-amber-400">{primaryDef.name}</strong>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToSplash}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            Assess Next Student
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            {downloading ? 'Compiling...' : 'Download Official PDF Report'}
          </button>
        </div>
      </div>
    </div>
  );
};
