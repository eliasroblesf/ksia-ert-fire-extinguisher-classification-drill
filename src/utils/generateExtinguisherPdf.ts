import { jsPDF } from 'jspdf';
import { CadetProfile, CadetStats } from '../types/fireTraining';

export function generateExtinguisherCertificatePdf(cadet: CadetProfile, stats: CadetStats): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const darkNavy = [10, 15, 26];
  const gold = [217, 119, 6];
  const emerald = [16, 185, 129];
  const slateText = [51, 65, 85];
  const mutedText = [100, 116, 139];
  const borderGrey = [226, 232, 240];

  // ==========================================
  // PAGE 1: OFFICIAL DIPLOMA CERTIFICATE
  // ==========================================

  // Border Outer Frame
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.5);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - margin * 2 + 8);

  doc.setDrawColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setLineWidth(0.5);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - margin * 2 + 4);

  // Top Directorate Header Banner
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(margin, margin, contentWidth, 26, 'F');

  // Gold accent stripe
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, margin + 26, contentWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('KING SALMAN INTERNATIONAL AIRPORT (KSIA)', margin + 6, margin + 11);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('EMERGENCY RESPONSE DIRECTORATE | RESCUE & FIRE FIGHTING (ARFF)', margin + 6, margin + 18);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('CERTIFICATE ID: KSIA-ERT-EXT-2026', pageWidth - margin - 6, margin + 11, { align: 'right' });
  doc.setTextColor(203, 213, 225);
  doc.text('NFPA 10 / ICAO DOC 9137 COMPLIANT', pageWidth - margin - 6, margin + 18, { align: 'right' });

  let y = margin + 38;

  // Certificate Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('CERTIFICATE OF OPERATIONAL QUALIFICATION', pageWidth / 2, y, { align: 'center' });
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('PORTABLE FIRE EXTINGUISHER CLASSIFICATION & TACTICAL SUPPRESSION', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('This is to officially certify that Emergency Response Team Cadet', pageWidth / 2, y, { align: 'center' });
  y += 8;

  // Cadet Name (Prominent Callout)
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(cadet.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 5;

  // Underline name
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 50, y, pageWidth / 2 + 50, y);
  y += 7;

  // Metadata Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin + 10, y, contentWidth - 20, 22, 2, 2, 'FD');

  const metaY1 = y + 7;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('BADGE ID NUMBER:', margin + 16, metaY1);
  doc.setFont('helvetica', 'normal');
  doc.text(cadet.badgeId, margin + 48, metaY1);

  doc.setFont('helvetica', 'bold');
  doc.text('AIRPORT DIVISION:', margin + 90, metaY1);
  doc.setFont('helvetica', 'normal');
  doc.text(cadet.division, margin + 124, metaY1);

  const metaY2 = y + 15;
  doc.setFont('helvetica', 'bold');
  doc.text('COMPLETION DATE:', margin + 16, metaY2);
  doc.setFont('helvetica', 'normal');
  doc.text(cadet.certificationDate || new Date().toLocaleDateString(), margin + 48, metaY2);

  doc.setFont('helvetica', 'bold');
  doc.text('QUALIFICATION STATUS:', margin + 90, metaY2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('CERTIFIED ACTIVE RESPONDER', margin + 130, metaY2);

  y += 30;

  // Performance Highlights Box
  doc.setFillColor(254, 252, 246);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin + 10, y, contentWidth - 20, 42, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('TACTICAL PROFICIENCY BREAKDOWN', margin + 16, y + 6);

  // 3 performance columns
  const statColW = (contentWidth - 32) / 3;
  const colY = y + 14;

  // Col 1: Live Fires Extinguished
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('LIVE FIRES SUPPRESSED', margin + 16, colY);
  doc.setFontSize(14);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`${stats.firesExtinguished}`, margin + 16, colY + 8);
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Validated Airport Incidents', margin + 16, colY + 14);

  // Col 2: P.A.S.S. Protocol Mastery
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('P.A.S.S. MASTERY RATING', margin + 16 + statColW, colY);
  doc.setFontSize(14);
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('100%', margin + 16 + statColW, colY + 8);
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Pull, Aim, Squeeze, Sweep', margin + 16 + statColW, colY + 14);

  // Col 3: Reflex Blitz Score
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('REFLEX BLITZ RECORD', margin + 16 + statColW * 2, colY);
  doc.setFontSize(14);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(`${stats.blitzHighScore} PTS`, margin + 16 + statColW * 2, colY + 8);
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(`Streak: ${stats.blitzStreakRecord}x Multiplier`, margin + 16 + statColW * 2, colY + 14);

  y += 50;

  // Fire Classes Competence Audit
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('VERIFIED FIRE CLASSIFICATION COMPETENCE (NFPA 10):', margin + 10, y);
  y += 5;

  const classes = [
    { code: 'A', name: 'Class A: Ordinary Combustibles (Luggage, Paper, Wood)', agent: 'Water / AFFF Foam' },
    { code: 'B', name: 'Class B: Flammable Liquids (Jet A-1 Fuel, Solvents)', agent: 'AFFF Foam / Purple-K' },
    { code: 'C', name: 'Class C: Energized Electrical (Avionics, Radar)', agent: 'Clean Agent / CO2' },
    { code: 'D', name: 'Class D: Combustible Metals (Magnesium Aircraft Brakes)', agent: 'Class D Dry Powder' },
    { code: 'K', name: 'Class K: Cooking Oils & Galley Fryers', agent: 'Wet Chemical (Saponification)' }
  ];

  classes.forEach((c) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin + 10, y, contentWidth - 20, 8, 1, 1, 'F');

    doc.setFontSize(7.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(c.name, margin + 14, y + 5.2);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.text(`[APPROVED AGENT: ${c.agent}]`, margin + 108, y + 5.2);

    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('PASS', margin + contentWidth - 26, y + 5.2);

    y += 9.5;
  });

  y += 10;

  // Signatures Section
  const sigColW = (contentWidth - 20) / 3;

  // Sig 1: Candidate
  const s1X = margin + 10;
  doc.setDrawColor(slateText[0], slateText[1], slateText[2]);
  doc.line(s1X, y + 18, s1X + sigColW - 6, y + 18);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(cadet.name, s1X, y + 23);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Candidate Responder Signature', s1X, y + 27);

  // Sig 2: Evaluator
  const s2X = s1X + sigColW;
  doc.line(s2X, y + 18, s2X + sigColW - 6, y + 18);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(cadet.assessorName || 'Lead Tactical Evaluator', s2X, y + 23);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Directorate Certified Instructor', s2X, y + 27);

  // Sig 3: Chief Officer
  const s3X = s2X + sigColW;
  doc.line(s3X, y + 18, s3X + sigColW - 6, y + 18);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('KSIA Fire Chief Officer', s3X, y + 23);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Seal of Operational Accreditation', s3X, y + 27);

  // Save the PDF
  const cleanName = cadet.name.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`KSIA_Fire_Extinguisher_Certificate_${cleanName}.pdf`);
}
