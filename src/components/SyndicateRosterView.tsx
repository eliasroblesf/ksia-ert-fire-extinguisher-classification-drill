import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  Sparkles, 
  Play, 
  Download, 
  UserPlus, 
  CheckCircle2,
  Trash2,
  Award
} from 'lucide-react';
import { SyndicateMember } from '../types/assessment';
import { BRIGADE_ROLES } from '../data/assessmentQuestions';

interface SyndicateRosterViewProps {
  roster: SyndicateMember[];
  onStartNewAssessment: () => void;
  onDeploySquadToDrill: (squad: {
    teamLeader: string;
    suppressionLead: string;
    casualtyCareLead: string;
    evacuationSupportLead: string;
    externalLiaison: string;
  }) => void;
  onDeleteMember: (studentId: string) => void;
  onAddSampleCadets: () => void;
}

export const SyndicateRosterView: React.FC<SyndicateRosterViewProps> = ({
  roster,
  onStartNewAssessment,
  onDeploySquadToDrill,
  onDeleteMember,
  onAddSampleCadets,
}) => {
  const [selectedSquad, setSelectedSquad] = useState<{
    teamLeader: string;
    suppressionLead: string;
    casualtyCareLead: string;
    evacuationSupportLead: string;
    externalLiaison: string;
  }>({
    teamLeader: '',
    suppressionLead: '',
    casualtyCareLead: '',
    evacuationSupportLead: '',
    externalLiaison: '',
  });

  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'teamLeader':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'suppressionLead':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'casualtyCareLead':
        return <Stethoscope className="w-4 h-4 text-emerald-400" />;
      case 'evacuationSupportLead':
        return <DoorOpen className="w-4 h-4 text-blue-400" />;
      case 'externalLiaison':
        return <Radio className="w-4 h-4 text-purple-400" />;
      default:
        return <Award className="w-4 h-4 text-slate-400" />;
    }
  };

  // Auto-assemble balanced 5-man squad algorithm based on highest fit
  const handleAutoAssemble = () => {
    if (roster.length < 5) {
      alert('You need at least 5 evaluated cadets in the roster to auto-assemble a full syndicate.');
      return;
    }

    const available = [...roster];
    const newSquad = {
      teamLeader: '',
      suppressionLead: '',
      casualtyCareLead: '',
      evacuationSupportLead: '',
      externalLiaison: '',
    };

    const rolesNeeded: (keyof typeof newSquad)[] = [
      'teamLeader',
      'suppressionLead',
      'casualtyCareLead',
      'evacuationSupportLead',
      'externalLiaison',
    ];

    rolesNeeded.forEach((roleKey) => {
      // Find candidate with highest primary match for this role
      let bestCandidateIdx = available.findIndex((m) => m.primaryFit === roleKey);
      if (bestCandidateIdx === -1) {
        // Fallback to secondary match
        bestCandidateIdx = available.findIndex((m) => m.secondaryFit === roleKey);
      }
      if (bestCandidateIdx === -1) {
        // Fallback to any available
        bestCandidateIdx = 0;
      }

      if (bestCandidateIdx !== -1 && available[bestCandidateIdx]) {
        newSquad[roleKey] = available[bestCandidateIdx].name;
        available.splice(bestCandidateIdx, 1);
      }
    });

    setSelectedSquad(newSquad);
  };

  const isSquadComplete = Object.values(selectedSquad).every((name) => name.trim().length > 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold mb-1">
            KSIA ERT CADET MANAGEMENT
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Brigade Syndicate Roster & Team Builder
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Assemble balanced 5-person emergency response strike cells from evaluated students based on psychometric fit.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {roster.length === 0 && (
            <button
              onClick={onAddSampleCadets}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/20 flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Populate Sample Cadets
            </button>
          )}

          <button
            onClick={onStartNewAssessment}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
          >
            <UserPlus className="w-4 h-4" />
            Assess New Candidate
          </button>
        </div>
      </div>

      {/* 5-Person Squad Assembly Station */}
      <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              Active Syndicate Strike Cell (5 Roles)
            </h3>
            <span className="text-xs text-slate-400">
              Each certified ERT cell requires 1 Incident Commander and 4 dedicated operational functional leads.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoAssemble}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto-Assemble by Optimal Fit
            </button>
          </div>
        </div>

        {/* 5 Role Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { key: 'teamLeader', label: 'Team Leader', role: 'teamLeader' },
            { key: 'suppressionLead', label: 'Fire Suppression', role: 'suppressionLead' },
            { key: 'casualtyCareLead', label: 'Casualty Care', role: 'casualtyCareLead' },
            { key: 'evacuationSupportLead', label: 'Evacuation Support', role: 'evacuationSupportLead' },
            { key: 'externalLiaison', label: 'External Liaison', role: 'externalLiaison' },
          ].map((item) => {
            const roleDef = BRIGADE_ROLES[item.role as keyof typeof BRIGADE_ROLES];
            const currentVal = selectedSquad[item.key as keyof typeof selectedSquad];

            return (
              <div key={item.key} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  {getRoleIcon(item.role)}
                  <span className="text-xs font-bold text-white truncate">{item.label}</span>
                </div>

                <select
                  value={currentVal}
                  onChange={(e) =>
                    setSelectedSquad((prev) => ({ ...prev, [item.key]: e.target.value }))
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Assign Cadet --</option>
                  {roster.map((m) => (
                    <option key={m.studentId} value={m.name}>
                      {m.name} ({m.primaryFit === item.role ? `★ Top Fit ${m.primaryPercentage}%` : `${m.primaryPercentage}%`})
                    </option>
                  ))}
                </select>

                <div className="text-[10px] text-slate-500 font-mono truncate">
                  {currentVal ? `Assigned: ${currentVal}` : 'Slot Empty'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deploy Squad to Tactical Terminal */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            {isSquadComplete ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready for Capstone Tactical Simulator Drill
              </span>
            ) : (
              'Assign all 5 functional roles to initialize the tactical crisis simulator.'
            )}
          </span>

          <button
            onClick={() => onDeploySquadToDrill(selectedSquad)}
            disabled={!isSquadComplete}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Play className="w-4 h-4" />
            Launch Syndicate Crisis Drill
          </button>
        </div>
      </div>

      {/* Evaluated Cadets Table */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span>Evaluated Cadets Registry ({roster.length})</span>
          <span className="text-xs text-slate-400 font-normal">All results stored locally & standalone</span>
        </h3>

        {roster.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No candidates evaluated yet. Click "Assess New Candidate" or "Populate Sample Cadets" to begin.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                  <th className="pb-3 font-semibold">Candidate</th>
                  <th className="pb-3 font-semibold">Badge ID</th>
                  <th className="pb-3 font-semibold">Primary Fit</th>
                  <th className="pb-3 font-semibold">Secondary Fit</th>
                  <th className="pb-3 font-semibold">Assigned Cohort</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {roster.map((m) => {
                  const primDef = BRIGADE_ROLES[m.primaryFit];
                  const secDef = BRIGADE_ROLES[m.secondaryFit];

                  return (
                    <tr key={m.studentId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 font-bold text-white">{m.name}</td>
                      <td className="py-3 font-mono text-slate-400">{m.studentId}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                          {getRoleIcon(m.primaryFit)}
                          {primDef.name.split(' (')[0]} ({m.primaryPercentage}%)
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {getRoleIcon(m.secondaryFit)}
                          {secDef.name.split(' (')[0]} ({m.secondaryPercentage}%)
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{m.cohort}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => onDeleteMember(m.studentId)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                          title="Remove from roster"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
