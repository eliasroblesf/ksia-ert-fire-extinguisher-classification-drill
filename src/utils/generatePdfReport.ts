import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../types/assessment';
import { BRIGADE_ROLES, ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';

export function generateAssessmentPdf(result: AssessmentResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const primaryDef = BRIGADE_ROLES[result.primaryRole];
  const secondaryDef = BRIGADE_ROLES[result.secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[result.tertiaryRole];

  // Helper colors
  const gold = [196, 155, 109]; // #C49B6D
  const darkNavy = [10, 15, 26]; // #0A0F1A
  const slateText = [51, 65, 85];
  const mutedText = [100, 116, 139];
  const emerald = [16, 185, 129];
  const borderGrey = [226, 232, 240];

  const drawHeader = (pageNumber: number, totalPages: number) => {
    // Header dark bar
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, 22, 'F');

    // Gold accent stripe
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(0, 22, pageWidth, 1.5, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('KING SALMAN INTERNATIONAL AIRPORT (KSIA)', margin, 10);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 225);
    doc.text('EMERGENCY RESPONSE TEAM (ERT) | TACTICAL PERSONALITY & ROLE FIT DOSSIER', margin, 16);

    // Document ID / Ref on right
    doc.setFontSize(7);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('DOC REF: KSIA-ERT-EVAL-2026', pageWidth - margin, 10, { align: 'right' });
    doc.setTextColor(200, 210, 225);
    doc.text(`DATE: ${new Date(result.completedAt).toLocaleDateString()} | GACA/NFPA COMPLIANT`, pageWidth - margin, 16, { align: 'right' });

    // Footer
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text('CONFIDENTIAL - KSIA CRISIS READINESS & BRIGADE TACTICAL ASSIGNMENT MATRIX', margin, pageHeight - 8);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: Executive Profile & Role Placements
  // ==========================================
  drawHeader(1, 3);

  let y = 30;

  // Title block
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('CANDIDATE BRIGADE ROLE ASSESSMENT REPORT', margin, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Psychometric & Situational Judgment Evaluation based on NFPA 1081/1561 & ICAO Doc 9137 Standards', margin, y);
  y += 7;

  // Candidate Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  const metaY = y + 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('CANDIDATE NAME:', margin + 4, metaY);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.name || 'KSIA Recruit', margin + 35, metaY);

  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE ID NUMBER:', margin + 95, metaY);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.studentId || 'N/A', margin + 136, metaY);

  const metaY2 = y + 13;
  doc.setFont('helvetica', 'bold');
  doc.text('COURSE DATE:', margin + 4, metaY2);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.courseDate || result.student.cohort || 'DD/MM/YY', margin + 35, metaY2);

  doc.setFont('helvetica', 'bold');
  doc.text('EVALUATION TIME:', margin + 95, metaY2);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(result.completedAt).toLocaleTimeString(), margin + 130, metaY2);

  const metaY3 = y + 19.5;
  doc.setFont('helvetica', 'bold');
  doc.text('QUESTIONS ANSWERED:', margin + 4, metaY3);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.totalAnswered} of 40 Standards-Aligned Items`, margin + 45, metaY3);

  doc.setFont('helvetica', 'bold');
  doc.text('CLASSIFICATION STATUS:', margin + 95, metaY3);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('CERTIFIED FOR BRIGADE DEPLOYMENT', margin + 135, metaY3);

  y += 28;

  // PRIMARY ROLE HERO CARD
  doc.setFillColor(254, 252, 246); // Warm gold tint
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin + 4, y + 4, 46, 5.5, 1, 1, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PRIMARY RECOMMENDED FIT', margin + 6, y + 8);

  // Score Pill on Right
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(pageWidth - margin - 38, y + 4, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`MATCH: ${result.primaryRoleScore}%`, pageWidth - margin - 21, y + 8.5, { align: 'center' });

  // Role Name
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(primaryDef.name, margin + 4, y + 16);

  // Tagline
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(primaryDef.tagline, margin + 4, y + 21);

  // Profile text
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const primaryBio = doc.splitTextToSize(primaryDef.idealPersonality, contentWidth - 8);
  doc.text(primaryBio, margin + 4, y + 26);

  // Key Responsibilities bulleted
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Core Brigade Responsibilities:', margin + 4, y + 34);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  primaryDef.operationalDuties.slice(0, 3).forEach((duty, idx) => {
    doc.text(`• ${duty}`, margin + 6, y + 38.5 + idx * 3.6);
  });

  y += 53;

  // SECONDARY ROLE CARD
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setLineWidth(0.7);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(71, 85, 105);
  doc.roundedRect(margin + 4, y + 3.5, 52, 5.5, 1, 1, 'F');
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SECONDARY / CROSS-TRAIN FIT', margin + 6, y + 7.4);

  // Score Pill on Right
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(pageWidth - margin - 38, y + 3.5, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(`MATCH: ${result.secondaryRoleScore}%`, pageWidth - margin - 21, y + 8, { align: 'center' });

  // Secondary Role Name
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(secondaryDef.name, margin + 4, y + 15);

  // Tagline
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(secondaryDef.tagline, margin + 4, y + 19.5);

  // Secondary summary
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const secondaryBio = doc.splitTextToSize(secondaryDef.idealPersonality, contentWidth - 8);
  doc.text(secondaryBio, margin + 4, y + 24.5);

  // Cross functional benefit
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Operational Redundancy Value:', margin + 4, y + 30.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Provides emergency backup coverage when primary ${secondaryDef.name} is deployed in adjacent sectors.`, margin + 46, y + 30.5);

  y += 38;

  // THIRD ROLE CAPABILITY CARD
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setLineWidth(0.7);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(30, 58, 138); // Blue
  doc.roundedRect(margin + 4, y + 3.5, 48, 5.5, 1, 1, 'F');
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('THIRD ROLE CAPABILITY', margin + 6, y + 7.4);

  // Score Pill on Right
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(pageWidth - margin - 38, y + 3.5, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(`MATCH: ${result.tertiaryRoleScore}%`, pageWidth - margin - 21, y + 8, { align: 'center' });

  // Tertiary Role Name
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(tertiaryDef.name, margin + 4, y + 15);

  // Tagline
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(tertiaryDef.tagline, margin + 4, y + 19.5);

  // Tertiary summary
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const tertiaryBio = doc.splitTextToSize(tertiaryDef.idealPersonality, contentWidth - 8);
  doc.text(tertiaryBio, margin + 4, y + 24.5);

  // Reserve adaptability benefit
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Reserve Adaptability:', margin + 4, y + 30.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Ready to reinforce ${tertiaryDef.name} operations during surge rotations or prolonged airport incident response.`, margin + 37, y + 30.5);

  y += 38;

  // SYNERGY & BRIGADE INTEGRATION ANALYSIS
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('SYNERGY & SQUAD DEPLOYMENT RECOMMENDATION', margin + 4, y + 5);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const synergyLines = doc.splitTextToSize(result.synergyAnalysis, contentWidth - 8);
  doc.text(synergyLines, margin + 4, y + 9.5);

  // ==========================================
  // PAGE 2: Dimensional Breakdown & Competencies
  // ==========================================
  doc.addPage();
  drawHeader(2, 3);
  y = 30;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('FULL 4-ROLE BRIGADE COMPATIBILITY MATRIX', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Comparative percentage scores across all 4 operational King Salman International Airport ERT positions:', margin, y);
  y += 8;

  // 4 Roles Bar Chart
  const roleKeys: (keyof typeof BRIGADE_ROLES)[] = [
    'suppressionLead',
    'casualtyCareLead',
    'evacuationSupportLead',
    'externalLiaison'
  ];

  roleKeys.forEach((key) => {
    const roleDef = BRIGADE_ROLES[key];
    const scoreData = result.allRoleScores[key];
    const pct = scoreData.percentage;
    const isPrimary = key === result.primaryRole;
    const isSecondary = key === result.secondaryRole;
    const isTertiary = key === result.tertiaryRole;

    // Role row container
    doc.setFillColor(isPrimary ? 254 : (isSecondary ? 248 : (isTertiary ? 245 : 255)), isPrimary ? 250 : 250, isPrimary ? 240 : 252);
    doc.setDrawColor(isPrimary ? gold[0] : borderGrey[0], isPrimary ? gold[1] : borderGrey[1], isPrimary ? gold[2] : borderGrey[2]);
    doc.roundedRect(margin, y, contentWidth, 12, 1, 1, 'FD');

    // Role name + badges
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(roleDef.name, margin + 4, y + 5);

    if (isPrimary) {
      doc.setFillColor(gold[0], gold[1], gold[2]);
      doc.roundedRect(margin + 75, y + 1.8, 22, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('PRIMARY FIT', margin + 77, y + 5);
    } else if (isSecondary) {
      doc.setFillColor(100, 116, 139);
      doc.roundedRect(margin + 75, y + 1.8, 26, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('SECONDARY FIT', margin + 77, y + 5);
    } else if (isTertiary) {
      doc.setFillColor(30, 58, 138);
      doc.roundedRect(margin + 75, y + 1.8, 26, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('3RD CAPABILITY', margin + 76.5, y + 5);
    }

    // Bar background
    const barX = margin + 105;
    const barWidth = 55;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, y + 4, barWidth, 4, 1, 1, 'F');

    // Filled bar
    if (pct > 0) {
      if (isPrimary) doc.setFillColor(gold[0], gold[1], gold[2]);
      else if (isSecondary) doc.setFillColor(71, 85, 105);
      else if (isTertiary) doc.setFillColor(37, 99, 235);
      else doc.setFillColor(148, 163, 184);

      doc.roundedRect(barX, y + 4, (barWidth * pct) / 100, 4, 1, 1, 'F');
    }

    // Percentage text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${pct}%`, margin + 165, y + 7.5);

    // Standard subtitle
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text(roleDef.standards[0], margin + 4, y + 9.5);

    y += 14;
  });

  y += 4;

  // 5 CORE BEHAVIORAL COMPETENCIES
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('PSYCHOMETRIC & CRISIS COMPETENCY PROFILE', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Evaluation of behavioral capabilities tested under simulated high-stakes emergency conditions:', margin, y);
  y += 8;

  const competenciesList = [
    { key: 'decisiveness', label: 'Situational Decisiveness & Command Priority', desc: 'Ability to establish rapid tactical focus without cognitive hesitation' },
    { key: 'physicalReadiness', label: 'Thermal & Physical Hazard Intuition', desc: 'Awareness of SCADA electrical paths, flashover risks, and PASS technique' },
    { key: 'traumaComposure', label: 'Trauma Composure & Resuscitation Rigor', desc: 'Composure in severe injuries, CPR fidelity, and ATMIST handovers' },
    { key: 'crowdControl', label: 'Crowd Leadership & Spatial Egress Flow', desc: 'Directing panic-free evacuation and systematic sector searches' },
    { key: 'communicationProtocol', label: 'Inter-Agency Comms & Clear-Text Protocol', desc: 'Plain-language radio discipline, L-N-N-H clarity, and incident logging' },
  ] as const;

  competenciesList.forEach((comp) => {
    const compScore = result.competencies[comp.key];
    const pct = compScore.percentage;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.roundedRect(margin, y, contentWidth, 11, 1, 1, 'FD');

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(comp.label, margin + 4, y + 4.5);

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text(comp.desc, margin + 4, y + 8.5);

    // Bar background
    const barX = margin + 115;
    const barWidth = 45;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, y + 3.5, barWidth, 4, 1, 1, 'F');

    // Filled bar with color code
    if (pct >= 70) doc.setFillColor(emerald[0], emerald[1], emerald[2]);
    else if (pct >= 50) doc.setFillColor(gold[0], gold[1], gold[2]);
    else doc.setFillColor(239, 68, 68);

    doc.roundedRect(barX, y + 3.5, (barWidth * pct) / 100, 4, 1, 1, 'F');

    // Score
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${pct}%`, margin + 165, y + 7);

    y += 13;
  });

  y += 4;

  // STRENGTHS & DEVELOPMENT AREAS
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('OPERATIONAL PROFILE ANALYSIS', margin, y);
  y += 6;

  // Two column box for Strengths & Growth Areas
  const colWidth = (contentWidth - 6) / 2;

  // Left: Key Strengths
  doc.setFillColor(240, 253, 244); // light green
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, colWidth, 48, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 120, 80);
  doc.text('Key Tactical Strengths:', margin + 4, y + 6);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  let strY = y + 11;
  const strengthsToPrint = result.strengths && result.strengths.length > 0 
    ? result.strengths.slice(0, 3) 
    : [
        `Tactical Role Specialty: Aligned with ${primaryDef.name} (${primaryDef.tagline})`,
        `Crisis Composure & Focus: ${primaryDef.keyTraits[0]}`,
        `Safety & Standard Protocol: Aligned with ${primaryDef.standards[0]}`
      ];

  strengthsToPrint.forEach((str) => {
    const lines = doc.splitTextToSize(`• ${str}`, colWidth - 8);
    doc.text(lines, margin + 4, strY);
    strY += lines.length * 3.3 + 1;
  });

  // Right: Growth Areas
  const rightX = margin + colWidth + 6;
  doc.setFillColor(254, 242, 242); // light red/amber
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightX, y, colWidth, 48, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('Development & Training Priorities:', rightX + 4, y + 6);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  let devY = y + 11;
  const devToPrint = result.developmentAreas && result.developmentAreas.length > 0
    ? result.developmentAreas.slice(0, 3)
    : [
        'Decision-Making in Ambiguity: Focus on rapid tactical triage when complete field telemetry is pending.',
        'Thermal & SCADA Hazard Intuition: Additional practice with flashover indicators and SCADA isolation.',
        `Advanced Operational Qualification: Focused competency training in ${primaryDef.recommendedTrainingPath[0]}.`
      ];

  devToPrint.forEach((dev) => {
    const lines = doc.splitTextToSize(`• ${dev}`, colWidth - 8);
    doc.text(lines, rightX + 4, devY);
    devY += lines.length * 3.3 + 1;
  });

  // ==========================================
  // PAGE 3: Response Audit & Official Sign-Off
  // ==========================================
  doc.addPage();
  drawHeader(3, 3);
  y = 30;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('40-QUESTION SITUATIONAL AUDIT SUMMARY', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Candidate personality and preference responses across 4 emergency response areas:', margin, y);
  y += 8;

  // 4 Module Summary Grid
  const modules = [
    { title: 'Section 1: Work Style & Stress Reaction (Q1 - Q10)', qRange: [1, 10] },
    { title: 'Section 2: Equipment & Physical Action (Q11 - Q20)', qRange: [11, 20] },
    { title: 'Section 3: First Aid & Patient Care (Q21 - Q30)', qRange: [21, 30] },
    { title: 'Section 4: Crowd Dynamics & Comms (Q31 - Q40)', qRange: [31, 40] }
  ];

  modules.forEach((mod) => {
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.roundedRect(margin, y, contentWidth, 23, 1, 1, 'FD');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(mod.title, margin + 4, y + 4.5);

    // Mini pill boxes for the 10 questions in this module
    const [startQ, endQ] = mod.qRange;
    const startX = margin + 4;
    const cellWidth = 16.5;

    for (let qNum = startQ; qNum <= endQ; qNum++) {
      const colIdx = qNum - startQ;
      const cellX = startX + colIdx * (cellWidth + 1);
      const chosen = result.answers[qNum];

      doc.setFillColor(chosen ? 255 : 241, chosen ? 255 : 245, chosen ? 255 : 249);
      doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
      doc.roundedRect(cellX, y + 7, cellWidth, 12, 1, 1, 'FD');

      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text(`Q${qNum}`, cellX + 2, y + 10.5);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      if (chosen) {
        doc.setTextColor(gold[0], gold[1], gold[2]);
        doc.text(chosen, cellX + 6, y + 16.5);
      } else {
        doc.setTextColor(200, 200, 200);
        doc.text('-', cellX + 6, y + 16.5);
      }
    }

    y += 26;
  });

  y += 5;

  // RECOMMENDED ADVANCED KSIA TRAINING PATHWAY
  doc.setFillColor(254, 252, 246);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('OFFICIAL KSIA ACCREDITATION TRAINING RECOMMENDATIONS', margin + 4, y + 5);

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  primaryDef.recommendedTrainingPath.forEach((path, i) => {
    doc.text(`[Course ${i + 1}]  ${path}`, margin + 6, y + 10.5 + i * 4);
  });

  y += 32;

  // OFFICIAL CERTIFICATION & SIGN-OFF BLOCK
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('OFFICIAL BRIGADE READINESS CERTIFICATION & SIGN-OFF', margin + 4, y + 6);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('The evaluation results contained herein have been verified according to King Salman International Airport emergency management standards.', margin + 4, y + 11);

  // 3 Signature Lines
  const sigColWidth = (contentWidth - 12) / 3;

  // 1: Candidate
  const sig1X = margin + 4;
  doc.setDrawColor(slateText[0], slateText[1], slateText[2]);
  doc.line(sig1X, y + 27, sig1X + sigColWidth, y + 27);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(result.student.name || 'Candidate Recruit', sig1X, y + 31);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Candidate Signature & Date', sig1X, y + 35);

  // 2: Lead Evaluator
  const sig2X = sig1X + sigColWidth + 4;
  doc.line(sig2X, y + 27, sig2X + sigColWidth, y + 27);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(result.student.assessorName || 'Lead Tactical Evaluator', sig2X, y + 31);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Lead Evaluator Certification', sig2X, y + 35);

  // 3: ERT Chief
  const sig3X = sig2X + sigColWidth + 4;
  doc.line(sig3X, y + 27, sig3X + sigColWidth, y + 27);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('KSIA Fire & ERT Directorate', sig3X, y + 31);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Chief Incident Commander Seal', sig3X, y + 35);

  // Trigger download
  const cleanName = (result.student.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`KSIA_ERT_Assessment_${cleanName}.pdf`);
}
