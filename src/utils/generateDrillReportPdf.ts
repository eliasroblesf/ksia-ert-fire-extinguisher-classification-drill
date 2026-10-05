import { jsPDF } from 'jspdf';
import { CadetProfile, ExtinguisherType, FireClass } from '../types/fireTraining';
import { EXTINGUISHERS } from '../data/extinguishersData';

export interface FireResultItem {
  fireIndex: number; // 1 to 10
  scenarioId: string;
  scenarioTitle: string;
  airportZone: string;
  fireClass: FireClass;
  chosenExtinguisher: ExtinguisherType;
  isCorrect: boolean;
  extinguished: boolean;
  timeTakenSec: number;
}

export interface ActivitySprintReportData {
  cadet: CadetProfile;
  completedAt: string;
  totalFires: number; // 10
  firesExtinguished: number; // e.g. 8
  correctExtinguishersCount: number; // e.g. 9
  totalTimeUsedSec: number; // e.g. 214s (3m 34s)
  timeLimitSec: number; // 300s (5m 00s)
  firesExtinguishedScore: number; // up to 40 pts
  selectionAccuracyScore: number; // up to 30 pts
  speedScore: number; // up to 30 pts
  totalScore: number; // out of 100
  results: FireResultItem[];
}

export function generateDrillReportPdf(data: ActivitySprintReportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const darkNavy = [10, 15, 26]; // #0A0F1A
  const gold = [217, 119, 6]; // #D97706
  const emerald = [16, 185, 129]; // #10B981
  const slateText = [51, 65, 85];
  const mutedText = [100, 116, 139];
  const borderGrey = [226, 232, 240];

  // Outer Border Frame
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.2);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - margin * 2 + 8);

  doc.setDrawColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - margin * 2 + 4);

  // Top Directorate Header Banner
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(margin, margin, contentWidth, 23, 'F');

  // Gold accent stripe
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, margin + 23, contentWidth, 1.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('KING SALMAN INTERNATIONAL AIRPORT (KSIA)', margin + 6, margin + 9);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('EMERGENCY RESPONSE DIRECTORATE | RESCUE & FIRE FIGHTING (ARFF)', margin + 6, margin + 16);

  // Right Ref & Standard
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('REPORT REF: KSIA-OFFICE-10SPRINT', pageWidth - margin - 6, margin + 9, { align: 'right' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('NFPA 10 / 5-MINUTE SPRINT AUDIT', pageWidth - margin - 6, margin + 16, { align: 'right' });

  let y = margin + 30;

  // Document Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('10-FIRE OFFICE EMERGENCY SIMULATION REPORT', pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Airport Office Fire Suppression Gauntlet (Water, CO2 & ABC Extinguishers)', pageWidth / 2, y, { align: 'center' });
  y += 8;

  // 1. Cadet Identity & Employee Credentials Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  const idY1 = y + 5.5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('STUDENT / CADET NAME:', margin + 6, idY1);
  doc.setFont('helvetica', 'bold');
  doc.text(data.cadet.name.toUpperCase(), margin + 46, idY1);

  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE ID NUMBER:', margin + 104, idY1);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(data.cadet.badgeId, margin + 144, idY1);

  const idY2 = y + 13;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('AIRPORT DIVISION:', margin + 6, idY2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(data.cadet.division || 'Administration Directorate', margin + 46, idY2);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('DATE & TIME:', margin + 104, idY2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(data.completedAt || new Date().toLocaleString(), margin + 144, idY2);

  y += 24;

  // 2. Score & Operational Rating Hero Block (3 Pillars)
  doc.setFillColor(254, 252, 246);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'FD');

  // Title of block
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('SIMULATION SCORING AUDIT (FIRES SUPPRESSED + AGENT ACCURACY + SPEED)', margin + 6, y + 5.5);

  // 4 Metric Columns
  const colW = (contentWidth - 12) / 4;
  const pY = y + 12;

  // Col 1: Fires Extinguished
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('FIRES EXTINGUISHED', margin + 6, pY);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text(`${data.firesExtinguished} / ${data.totalFires}`, margin + 6, pY + 7);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(`Score: ${data.firesExtinguishedScore} / 40 pts`, margin + 6, pY + 13);

  // Col 2: Extinguisher Choice Accuracy
  const c2X = margin + 6 + colW;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('RIGHT AGENT CHOSEN', c2X, pY);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`${data.correctExtinguishersCount} / ${data.totalFires}`, c2X, pY + 7);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(`Accuracy: ${data.selectionAccuracyScore} / 30 pts`, c2X, pY + 13);

  // Col 3: Speed / Total Time
  const c3X = c2X + colW;
  const timeMin = Math.floor(data.totalTimeUsedSec / 60);
  const timeSec = Math.round(data.totalTimeUsedSec % 60);
  const timeStr = `${timeMin}m ${String(timeSec).padStart(2, '0')}s`;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('TOTAL TIME (5M LIMIT)', c3X, pY);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(timeStr, c3X, pY + 7);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(`Speed: ${data.speedScore} / 30 pts`, c3X, pY + 13);

  // Col 4: Total Score
  const c4X = c3X + colW;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('COMPOSITE SCORE', c4X, pY);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text(`${data.totalScore} / 100`, c4X, pY + 7);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(data.totalScore >= 80 ? 'STATUS: QUALIFIED' : 'STATUS: PARTICIPATED', c4X, pY + 13);

  y += 41;

  // 3. Complete Table of all 10 Scenarios
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('ITEMIZED AUDIT OF ALL 10 AIRPORT OFFICE FIRE INCIDENTS:', margin, y);
  y += 4;

  // Table Header
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(margin, y, contentWidth, 6.5, 'F');

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('#', margin + 3, y + 4.5);
  doc.text('OFFICE INCIDENT & LOCATION', margin + 10, y + 4.5);
  doc.text('CLASS', margin + 82, y + 4.5);
  doc.text('EXTINGUISHER USED', margin + 98, y + 4.5);
  doc.text('MATCH', margin + 136, y + 4.5);
  doc.text('TIME', margin + 154, y + 4.5);
  doc.text('RESULT', margin + 168, y + 4.5);

  y += 6.5;

  // 10 Rows
  data.results.forEach((item, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255);
    doc.rect(margin, y, contentWidth, 7, 'F');

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${item.fireIndex || idx + 1}`, margin + 3, y + 4.8);

    doc.setFont('helvetica', 'normal');
    const titleSnippet = item.scenarioTitle.length > 44 ? item.scenarioTitle.slice(0, 42) + '...' : item.scenarioTitle;
    doc.text(titleSnippet, margin + 10, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.text(`Class ${item.fireClass}`, margin + 82, y + 4.8);

    doc.setFont('helvetica', 'normal');
    const extName = EXTINGUISHERS[item.chosenExtinguisher]?.name.split(' ')[0] || item.chosenExtinguisher;
    doc.text(extName, margin + 98, y + 4.8);

    // Match Correct?
    doc.setFont('helvetica', 'bold');
    if (item.isCorrect) {
      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.text('CORRECT', margin + 136, y + 4.8);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.text('WRONG', margin + 136, y + 4.8);
    }

    // Time Taken
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(`${item.timeTakenSec.toFixed(1)}s`, margin + 154, y + 4.8);

    // Extinguished?
    doc.setFont('helvetica', 'bold');
    if (item.extinguished) {
      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.text('EXTINGUISHED', margin + 168, y + 4.8);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.text('FAILED', margin + 168, y + 4.8);
    }

    y += 7.2;
  });

  y += 4;

  // 4. Official Directorate Feedback & Standards Endorsement
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F');

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('DIRECTORATE OFFICE SAFETY AUDIT NOTE:', margin + 4, y + 4.5);

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const note = `The candidate completed the 10-Fire 5-Minute Airport Office Fire Sprint under NFPA 10 standards. Successfully extinguished ${data.firesExtinguished} of 10 fires in ${timeStr}, correctly identifying Water for Class A cellulosic documents, CO2 for Class C energized electronics, and ABC Dry Powder for Class B office solvents.`;
  const splitNote = doc.splitTextToSize(note, contentWidth - 8);
  doc.text(splitNote, margin + 4, y + 8.5);

  y += 20;

  // 5. Signatures Section
  const sigColW = (contentWidth - 12) / 3;

  // Sig 1: Candidate / User
  const s1X = margin + 2;
  doc.setDrawColor(slateText[0], slateText[1], slateText[2]);
  doc.line(s1X, y + 14, s1X + sigColW - 4, y + 14);
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(data.cadet.name, s1X, y + 18);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(`Candidate Responder (ID: ${data.cadet.badgeId})`, s1X, y + 21.5);

  // Sig 2: Tactical Evaluator
  const s2X = s1X + sigColW + 2;
  doc.line(s2X, y + 14, s2X + sigColW - 4, y + 14);
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(data.cadet.assessorName || 'Lead Tactical Evaluator', s2X, y + 18);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('KSIA Directorate Evaluator', s2X, y + 21.5);

  // Sig 3: Chief Incident Commander
  const s3X = s2X + sigColW + 2;
  doc.line(s3X, y + 14, s3X + sigColW - 4, y + 14);
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Chief Fire Officer - KSIA ARFF', s3X, y + 18);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Seal of Operational Compliance', s3X, y + 21.5);

  // Save the PDF
  const sanitizedName = data.cadet.name.replace(/[^a-zA-Z0-9]/g, '_');
  const sanitizedId = data.cadet.badgeId.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`KSIA_Office_Fire_Sprint_Report_${sanitizedName}_${sanitizedId}.pdf`);
}
