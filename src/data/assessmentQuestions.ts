/**
 * KSIA ERT (King Salman International Airport Emergency Response Team)
 * 40-Question Personality, Experience & Preference Assessment
 * 
 * Specifically designed for non-native English speakers (Plain English + Arabic support).
 * Designed for quick completion in 15–25 minutes (less than 30 minutes).
 * 
 * Evaluates candidates for 5 Brigade Roles:
 * 1. Team Leader (Incident Commander)
 * 2. Fire Suppression Lead
 * 3. Casualty Care Lead (Medical / First Aid)
 * 4. Evacuation Support Lead (Crowd & Safety)
 * 5. External Agency Liaison (Communications)
 */

export interface RoleScores {
  suppressionLead: number;
  casualtyCareLead: number;
  evacuationSupportLead: number;
  externalLiaison: number;
}

export interface CompetencyScores {
  decisiveness: number;
  physicalReadiness: number;
  traumaComposure: number;
  crowdControl: number;
  communicationProtocol: number;
}

export interface AssessmentOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  arabicText?: string;
  roleWeights: Partial<RoleScores & { teamLeader?: number }>;
  competencies: Partial<CompetencyScores>;
  learningInsight: string;
}

export interface AssessmentQuestion {
  id: number;
  module: string;
  arabicModule: string;
  category: 'command' | 'suppression' | 'medical' | 'evacuation' | 'liaison';
  question: string;
  arabicQuestion?: string;
  contextNote?: string;
  options: AssessmentOption[];
}

export interface RoleDefinition {
  id: keyof RoleScores;
  name: string;
  arabicName: string;
  tagline: string;
  badgeColor: string;
  iconName: string;
  standards: string[];
  keyTraits: string[];
  operationalDuties: string[];
  idealPersonality: string;
  recommendedTrainingPath: string[];
}

export const BRIGADE_ROLES: Record<keyof RoleScores, RoleDefinition> = {
  suppressionLead: {
    id: 'suppressionLead',
    name: 'Fire Suppression & Hazmat Lead',
    arabicName: 'مسؤول الإطفاء والمواد الخطرة',
    tagline: 'Physical Action, Equipment Mastery & Hazard Abatement',
    badgeColor: 'rose',
    iconName: 'Flame',
    standards: ['NFPA 1081 (Fire Brigade)', 'NFPA 10 (Extinguishers)', 'ICAO Doc 9137'],
    keyTraits: [
      'Enjoys direct physical, hands-on work',
      'High courage and comfort around heat and gear',
      'Quick mechanical problem-solver',
      'Follows equipment safety rules strictly',
      'Strong stamina and high physical readiness'
    ],
    operationalDuties: [
      'Turn off electrical power and gas valves quickly',
      'Select and use the correct fire extinguisher or water line',
      'Attack the base of the fire safely from 3 meters',
      'Check walls and doors for dangerous heat levels',
      'Contain hazardous spills before they spread'
    ],
    idealPersonality: 'Energetic, hands-on doers who feel at home working with tools, mechanical switches, extinguishers, and physical protective gear.',
    recommendedTrainingPath: [
      'NFPA 1081 Practical Fire Fighting Techniques',
      'Electrical Isolation & Hazmat First Responder',
      'Thermal Imaging & Breathing Apparatus (SCBA) Training'
    ]
  },
  casualtyCareLead: {
    id: 'casualtyCareLead',
    name: 'Casualty Care & Medical Lead',
    arabicName: 'مسؤول الرعاية الطبية والإسعاف',
    tagline: 'First Aid, Calm around Injuries & Patient Care',
    badgeColor: 'emerald',
    iconName: 'Stethoscope',
    standards: ['AHA / ILCOR BLS Guidelines', 'START Triage', 'ATMIST Medical Handover'],
    keyTraits: [
      'Remains calm and steady when seeing blood or injuries',
      'Deep care and empathy for hurt people',
      'Methodical in applying first-aid and CPR steps',
      'Good at calming scared, wounded victims',
      'Very careful with medical details and vital signs'
    ],
    operationalDuties: [
      'Quickly check unresponsive casualties for breathing and pulse',
      'Perform high-quality 30:2 CPR and use AED defibrillators',
      'Stop heavy bleeding with bandages and tourniquets',
      'Sort patients by urgency (Red, Yellow, Green)',
      'Deliver clear ATMIST reports to Red Crescent ambulance medics'
    ],
    idealPersonality: 'Compassionate and steady individuals who stay emotionally grounded when someone is hurt, focusing on saving lives with precision.',
    recommendedTrainingPath: [
      'AHA Basic Life Support (BLS) & First Aid Certification',
      'Stop The Bleed & Traumatic Hemorrhage Control',
      'Mass-Casualty Triage & Pre-Hospital Care'
    ]
  },
  evacuationSupportLead: {
    id: 'evacuationSupportLead',
    name: 'Evacuation & Crowd Dynamics Lead',
    arabicName: 'مسؤول الإخلاء وإدارة الحشود',
    tagline: 'Crowd Leadership, Safe Corridors & Systematic Sweeps',
    badgeColor: 'blue',
    iconName: 'DoorOpen',
    standards: ['NFPA 101 (Life Safety Code)', 'ICAO Terminal Evacuation Guidelines'],
    keyTraits: [
      'Strong, clear, and commanding speaking voice',
      'Naturally understands how crowds move and panic',
      'Patient yet firm when people hesitate or argue',
      'Systematic and thorough (checks every room and door)',
      'Alert to blocked exits and narrow choke points'
    ],
    operationalDuties: [
      'Open emergency exit doors and guide people along safe routes',
      'Prevent dangerous crowd crushes and bottlenecks',
      'Perform thorough checks of bathrooms and shops',
      'Help passengers with wheelchairs or reduced mobility',
      'Stop passengers from running back inside for luggage'
    ],
    idealPersonality: 'Authoritative, vocal, and organized communicators who can direct large groups of people with confidence and clear hand gestures.',
    recommendedTrainingPath: [
      'Airport Crowd Dynamics & Panic Management',
      'Life Safety Codes & Evacuation Route Planning',
      'De-escalation & Managing Difficult Passenger Behaviors'
    ]
  },
  externalLiaison: {
    id: 'externalLiaison',
    name: 'External Agency Liaison & Comms',
    arabicName: 'مسؤول الاتصال والتنسيق الخارجي',
    tagline: 'Clear Communications, Radio Discipline & Coordination',
    badgeColor: 'purple',
    iconName: 'Radio',
    standards: ['GACA Crisis Communication Standards', 'ICAO Annex 11', 'FEMA NIMS'],
    keyTraits: [
      'Very clear speaker on the phone and two-way radio',
      'Keeps accurate notes and timestamps without forgetting',
      'Polite, respectful, and diplomatic with outside agencies',
      'Speaks in simple plain language without confusing slang',
      'Maintains composure in noisy, chaotic control rooms'
    ],
    operationalDuties: [
      'Send regular L-N-N-H crisis updates to Airport Control (AOCC)',
      'Meet Civil Defense and Police at airport security gates',
      'Manage backup radio frequencies if channels fail',
      'Keep the official written log of all orders and actions',
      'Connect the airport leadership with emergency services'
    ],
    idealPersonality: 'Organized, clear-thinking communicators who excel at sharing information, coordinating between different teams, and keeping structured records.',
    recommendedTrainingPath: [
      'Aviation VHF/UHF Emergency Radio Procedures',
      'Inter-Agency Disaster Coordination & Protocol',
      'Crisis Incident Logging & Technical Reporting'
    ]
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ==========================================
  // SECTION 1: Personal Style & Stress Reaction (Q1 - Q10)
  // ==========================================
  {
    id: 1,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'When a sudden emergency happens, what is your immediate natural reaction?',
    arabicQuestion: 'عند وقوع حالة طوارئ مفاجئة، ما هو رد فعلك التلقائي الأول؟',
    options: [
      {
        id: 'A',
        text: 'I pause for a few seconds to understand the big picture and decide what needs to be done.',
        arabicText: 'أتوقف لبضع ثوانٍ لفهم الصورة الكاملة وتحديد ما يجب فعله.',
        roleWeights: { teamLeader: 5, externalLiaison: 2 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Taking a brief moment to evaluate the overall situation prevents rushed mistakes and is the hallmark of effective leadership.'
      },
      {
        id: 'B',
        text: 'I want to jump in right away and physically fix or stop the danger with my hands.',
        arabicText: 'أريد التدخل فوراً وإيقاف الخطر عملياً بيدي.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Immediate physical readiness is essential for fire suppression and stopping hazards before they grow.'
      },
      {
        id: 'C',
        text: 'My first thought goes to whether anyone is hurt and needs immediate medical help.',
        arabicText: 'أول ما أفكر فيه هو ما إذا كان هناك مصابون يحتاجون إلى مساعدة طبية عاجلة.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, decisiveness: 2 },
        learningInsight: 'Focusing on human life first is the core mindset of a medical first responder.'
      },
      {
        id: 'D',
        text: 'I immediately look around to see where people are running and how to guide them safely.',
        arabicText: 'أنظر حولي فوراً لمعرفة اتجاه حركة الناس وكيفية توجيههم بأمان.',
        roleWeights: { evacuationSupportLead: 4, externalLiaison: 3 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Monitoring people movement helps prevent panic and crowd bottlenecks during evacuations.'
      }
    ]
  },
  {
    id: 2,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'In a group project or team task, which role do you naturally prefer taking?',
    arabicQuestion: 'في المشاريع الجماعية، ما هو الدور الذي تفضل توليه عادة؟',
    options: [
      {
        id: 'A',
        text: 'The coordinator: organizing roles, setting priorities, and ensuring the team stays on track.',
        arabicText: 'المنسق: تنظيم الأدوار، وتحديد الأولويات، والتأكد من سير العمل.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 4 },
        learningInsight: 'Organizing and delegating allows the whole team to work together without confusion.'
      },
      {
        id: 'B',
        text: 'The practical builder: handling the hardest technical tools, equipment, or physical tasks.',
        arabicText: 'المنفذ العملي: التعامل مع الأدوات والمعدات والمهام العملية الشاقة.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 2 },
        learningInsight: 'Hands-on specialists turn plans into reality through practical mastery.'
      },
      {
        id: 'C',
        text: 'The caretaker: checking on team members, solving personal distress, and supporting well-being.',
        arabicText: 'الداعم: الاطمئنان على أعضاء الفريق ومساعدتهم وقت التعب.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, communicationProtocol: 3 },
        learningInsight: 'Caring for personal well-being builds resilience and rapid recovery during tough challenges.'
      },
      {
        id: 'D',
        text: 'The communicator: sharing updates, writing clean notes, and speaking with other groups.',
        arabicText: 'المتواصل: نقل المستجدات وتدوين الملاحظات والتواصل مع المجموعات الأخرى.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Clear reporting ensures different teams coordinate without misunderstandings.'
      }
    ]
  },
  {
    id: 3,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'When you have to make a tough decision and you do not have all the details, what do you do?',
    arabicQuestion: 'عندما تضطر لاتخاذ قرار صعب دون اكتمال المعلومات، ماذا تفعل؟',
    options: [
      {
        id: 'A',
        text: 'I trust my judgment, choose the safest clear direction, and take full responsibility.',
        arabicText: 'أثق في تقديري، وأختار الاتجاه الأكثر أماناً، وأتحمل المسؤولية كاملة.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Decisiveness under uncertainty is critical in emergency leadership where hesitation costs time.'
      },
      {
        id: 'B',
        text: 'I focus on the immediate physical safety problem right in front of me first.',
        arabicText: 'أركز أولاً على معالجة الخطر المادي المباشر الذي أمامي.',
        roleWeights: { suppressionLead: 4, casualtyCareLead: 2 },
        competencies: { physicalReadiness: 4, decisiveness: 4 },
        learningInsight: 'Fixing the most urgent immediate hazard often stabilizes the rest of the problem.'
      },
      {
        id: 'C',
        text: 'I immediately call control or senior support on the radio to share what I know and ask for advice.',
        arabicText: 'أتصل فوراً بغرفة التحكم عبر اللاسلكي لمشاركة ما لدي وطلب التوجيه.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Keeping control informed ensures higher-level resources can be deployed to assist.'
      },
      {
        id: 'D',
        text: 'I prioritize getting people to a safe area before spending time debating choices.',
        arabicText: 'أعطي الأولوية لنقل الأشخاص إلى مكان آمن قبل الخوض في نقاشات.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, decisiveness: 4 },
        learningInsight: 'Moving people out of the danger zone is always the safest default action in a crisis.'
      }
    ]
  },
  {
    id: 4,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'How do you feel when loud alarms are ringing and multiple people are talking at the same time?',
    arabicQuestion: 'كيف تشعر عندما تنطلق صفارات الإنذار ويتحدث عدة أشخاص في نفس الوقت؟',
    options: [
      {
        id: 'A',
        text: 'I can filter out the noise, step back, and keep my mind calm and clear.',
        arabicText: 'أستطيع عزل الضوضاء، والهدوء، والتفكير بوضوح.',
        roleWeights: { teamLeader: 5, externalLiaison: 3 },
        competencies: { decisiveness: 5, traumaComposure: 4 },
        learningInsight: 'Filtering sensory overload allows leaders to maintain situational awareness.'
      },
      {
        id: 'B',
        text: 'It gets my adrenaline flowing and gives me high energy to take quick physical action.',
        arabicText: 'يحفزني ذلك بدنياً ويمنحني طاقة عالية للتحرك العملي السريع.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'High energy and adrenaline help frontline responders execute tough physical tasks.'
      },
      {
        id: 'C',
        text: 'I focus entirely on the person in front of me who needs help, ignoring the loud background.',
        arabicText: 'أركز تماماً على الشخص الذي أمامي ويحتاج مساعدة، متجاهلاً الضوضاء.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, physicalReadiness: 2 },
        learningInsight: 'Laser-focus on a patient ensures medical steps are delivered accurately.'
      },
      {
        id: 'D',
        text: 'I speak up with a loud, confident voice so everyone can hear instructions over the noise.',
        arabicText: 'أتحدث بصوت قوي وواضح حتى يسمع الجميع التعليمات رغم الضوضاء.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 4 },
        learningInsight: 'A confident, projected voice cuts through panic and alarm sounds.'
      }
    ]
  },
  {
    id: 5,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'If you see a team member looking shocked or frozen in an emergency, what is your instinct?',
    arabicQuestion: 'إذا رأيت زميلاً متجمداً أو متوتراً أثناء طوارئ، ما هو تصرفك التلقائي؟',
    options: [
      {
        id: 'A',
        text: 'I look them in the eyes, speak calmly, and give them one simple task to get them moving.',
        arabicText: 'أنظر في عينيه بهدوء وأعطيه مهمة واحدة محددة ليعود للعمل.',
        roleWeights: { teamLeader: 5, evacuationSupportLead: 2 },
        competencies: { decisiveness: 4, crowdControl: 4 },
        learningInsight: 'Giving a single clear task is the proven psychological way to break a freeze response.'
      },
      {
        id: 'B',
        text: 'I quickly take over the equipment they were holding and complete the job myself.',
        arabicText: 'آخذ المعدات التي بيده سريعاً وأكمل المهمة بنفسي.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Taking the gear prevents vital fire suppression steps from stalling.'
      },
      {
        id: 'C',
        text: 'I check if they are feeling faint or injured, sit them down safely, and give them water.',
        arabicText: 'أتأكد من سلامته، وأجلسه في مكان آمن، وأقدم له الماء.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 2 },
        learningInsight: 'Checking team health protects responders from collapsing under physical stress.'
      },
      {
        id: 'D',
        text: 'I guide them back to a safer area while maintaining continuous verbal encouragement.',
        arabicText: 'أوجهه إلى منطقة أكثر أماناً مع تشجيعه بكلمات مطمئنة.',
        roleWeights: { evacuationSupportLead: 4, externalLiaison: 2 },
        competencies: { crowdControl: 4, communicationProtocol: 3 },
        learningInsight: 'Relocating stressed individuals to a quiet area prevents panic from spreading.'
      }
    ]
  },
  {
    id: 6,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'Which of these environments do you feel most comfortable working in?',
    arabicQuestion: 'أي من بيئات العمل التالية تجد نفسك أكثر راحة فيها؟',
    options: [
      {
        id: 'A',
        text: 'An Incident Command Post where I can see the whole area and coordinate teams.',
        arabicText: 'مركز قيادة الحادث حيث يمكنني رؤية المشهد كاملاً وتوجيه الفرق.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 4, communicationProtocol: 4 },
        learningInsight: 'Command posts require strategic overview rather than direct physical fighting.'
      },
      {
        id: 'B',
        text: 'Frontline areas with boots on the ground, handling extinguishers and mechanical gear.',
        arabicText: 'الميدان الأمامي المباشر مع المعدات وأجهزة الإطفاء.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Frontline action requires comfort with heavy gear and physical challenges.'
      },
      {
        id: 'C',
        text: 'A clean First Aid staging post where injured people can be treated and bandaged.',
        arabicText: 'نقطة إسعاف أولية نظيفة لعلاج المصابين وتضميد الجروح.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 2 },
        learningInsight: 'Medical stations require an organized, caring, and protocol-driven setting.'
      },
      {
        id: 'D',
        text: 'Corridors and exit halls where I can guide hundreds of people safely outside.',
        arabicText: 'الممرات ومخارج الطوارئ حيث أوجه مئات الأشخاص بأمان إلى الخارج.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Exit pathways require strong interpersonal direction and spatial awareness.'
      }
    ]
  },
  {
    id: 7,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'How do you handle rules and standard operating procedures (SOPs)?',
    arabicQuestion: 'كيف تتعامل مع الأنظمة وإجراءات التشغيل القياسية (SOPs)؟',
    options: [
      {
        id: 'A',
        text: 'I follow safety principles strictly, but I adapt the plan if the situation changes.',
        arabicText: 'ألتزم بمبادئ السلامة، لكنني أعدل الخطة بمرونة إذا تغيرت الظروف.',
        roleWeights: { teamLeader: 5, externalLiaison: 2 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Flexible leadership applies safety rules while adapting to unpredictable reality.'
      },
      {
        id: 'B',
        text: 'I follow equipment and tool safety rules with 100% discipline to protect my crew.',
        arabicText: 'ألتزم بتعليمات تشغيل المعدات بحزم تام لحماية زملائي.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 2 },
        learningInsight: 'Equipment discipline prevents fatal accidents around high voltage and thermal heat.'
      },
      {
        id: 'C',
        text: 'I follow medical steps (ABC: Airway, Breathing, Circulation) precisely without skipping anything.',
        arabicText: 'أتبع الخطوات الطبية بدقة متناهية دون إهمال أي تفصيل.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 3 },
        learningInsight: 'Medical algorithms (CPR ratios, shock timing) only save lives when followed exactly.'
      },
      {
        id: 'D',
        text: 'I ensure clear-text radio rules are respected (no confusing codes or personal chatter).',
        arabicText: 'أحرص على وضوح عبارات اللاسلكي والابتعاد عن الرموز المعقدة أو الأحاديث الجانبية.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Radio discipline keeps airwaves open for life-saving emergency transmissions.'
      }
    ]
  },
  {
    id: 8,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'When an unexpected problem ruins the original plan, how do you feel emotionally?',
    arabicQuestion: 'عندما تفشل الخطة الأصلية بسبب مفاجأة غير متوقعة، كيف تشعر؟',
    options: [
      {
        id: 'A',
        text: 'I stay calm; unexpected problems are normal in emergencies. I make Plan B right away.',
        arabicText: 'أبقى هادئاً؛ فالمفاجآت أمر طبيعي في الطوارئ، وأبدأ فوراً في الخطة البديلة.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Mental resilience and rapid replanning prevent command collapse.'
      },
      {
        id: 'B',
        text: 'I look for a physical solution: another door, another tool, or another valve to shut.',
        arabicText: 'أبحث عن حل عملي فوري: مخرج آخر، أداة بديلة، أو صمام إغلاق.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Practical problem solving finds alternate physical paths around blocked hazards.'
      },
      {
        id: 'C',
        text: 'My priority is protecting the people nearby so the new problem doesn’t hurt anyone.',
        arabicText: 'أولويتي هي حماية الأشخاص المتواجدين كي لا يصاب أحد بالأذى.',
        roleWeights: { casualtyCareLead: 4, evacuationSupportLead: 4 },
        competencies: { traumaComposure: 4, crowdControl: 4 },
        learningInsight: 'Immediate protective instincts ensure civilian safety remains uncompromised.'
      },
      {
        id: 'D',
        text: 'I quickly broadcast the update to everyone so no one is operating on old information.',
        arabicText: 'أبادر بإبلاغ الجميع بالمستجدات سريعاً حتى لا يعمل أحد على معلومات قديمة.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Broadcasting plan changes keeps all teams aligned and prevents friendly incidents.'
      }
    ]
  },
  {
    id: 9,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'How do you prefer to receive feedback after a training drill or job?',
    arabicQuestion: 'كيف تفضل تلقي التقييم والملاحظات بعد التدريب أو العمل؟',
    options: [
      {
        id: 'A',
        text: 'A structured review of our decisions, time to respond, and how we coordinated.',
        arabicText: 'مراجعة منظمة للقرارات المتخذة وسرعة الاستجابة ومستوى التنسيق.',
        roleWeights: { teamLeader: 5, externalLiaison: 3 },
        competencies: { decisiveness: 4, communicationProtocol: 4 },
        learningInsight: 'Structured debriefs turn training experiences into permanent team capability.'
      },
      {
        id: 'B',
        text: 'Clear technical feedback on my tool handling, speed, and equipment technique.',
        arabicText: 'ملاحظات فنية دقيقة حول سرعة استخدام الأدوات وإتقان المعدات.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 2 },
        learningInsight: 'Focusing on mechanical feedback sharpens hands-on firefighting skills.'
      },
      {
        id: 'C',
        text: 'Feedback on patient care accuracy, CPR depth, and how fast help was given.',
        arabicText: 'تقييم دقة الرعاية الطبية، وجودة الإنعاش القلبي، وسرعة الاستجابة للمصاب.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 2 },
        learningInsight: 'Reviewing clinical metrics improves survival rates in cardiac and trauma events.'
      },
      {
        id: 'D',
        text: 'Feedback on crowd flow, how fast the area cleared, and exit bottlenecks.',
        arabicText: 'ملاحظات حول تدفق الحشود وسرعة إخلاء المكان وتفادي نقاط الاختناق.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Analyzing crowd flow metrics leads to better terminal evacuation plans.'
      }
    ]
  },
  {
    id: 10,
    module: 'Section 1: Work Style & Stress Reaction',
    arabicModule: 'القسم 1: أسلوب العمل والاستجابة للضغوط',
    category: 'command',
    question: 'What gives you the greatest feeling of satisfaction at the end of a hard day?',
    arabicQuestion: 'ما الذي يمنحك أكبر شعور بالرضا والإنجاز في نهاية يوم شاق؟',
    options: [
      {
        id: 'A',
        text: 'Knowing that my team operated smoothly and achieved the goal under my guidance.',
        arabicText: 'معرفة أن فريقي عمل بتناغم وحقق الهدف بفضل التوجيه السليم.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 4 },
        learningInsight: 'The reward of leadership is seeing your team succeed and stay safe together.'
      },
      {
        id: 'B',
        text: 'Physically defeating a dangerous fire or hazard with proper gear and hard work.',
        arabicText: 'إخماد خطر حقيقي أو حريق بنجاح باستخدام المعدات والجهد البدني.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Physical problem-solvers find deep satisfaction in tangible hazard removal.'
      },
      {
        id: 'C',
        text: 'Knowing that I saved a life, relieved someone’s pain, or helped someone survive.',
        arabicText: 'الشعور بأنني أنقذت حياة إنسان أو خففت من آلام مصاب.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 2 },
        learningInsight: 'Direct human life-saving is the greatest calling for medical responders.'
      },
      {
        id: 'D',
        text: 'Knowing that hundreds of passengers were guided safely out of danger with zero injuries.',
        arabicText: 'الاطمئنان إلى إخلاء مئات المسافرين بسلام دون تسجيل أي إصابات.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Preventing mass injuries through smooth crowd evacuation protects an entire airport.'
      }
    ]
  },

  // ==========================================
  // SECTION 2: Physical Gear, Tools & Hazards (Q11 - Q20)
  // ==========================================
  {
    id: 11,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'How comfortable are you wearing heavy protective gear, boots, and a breathing mask?',
    arabicQuestion: 'ما مدى راحتك في ارتداء معدات الحماية الثقيلة وخوذة وأقنعة التنفس؟',
    options: [
      {
        id: 'A',
        text: 'Very comfortable; I like wearing heavy gear and feel protected and ready for action.',
        arabicText: 'مرتاح جداً؛ أحب ارتداء المعدات الثقيلة وأشعر بالحماية والجاهزية للعمل.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Comfort inside heavy turnout gear and breathing apparatus is essential for fire teams.'
      },
      {
        id: 'B',
        text: 'I can wear it if needed, but I prefer moving freely so I can move and guide people.',
        arabicText: 'أستطيع ارتداءها عند الحاجة، لكني أفضل حرية الحركة لتوجيه ومساعدة الناس.',
        roleWeights: { evacuationSupportLead: 4, teamLeader: 2 },
        competencies: { crowdControl: 4, physicalReadiness: 3 },
        learningInsight: 'Evacuation leads benefit from light, mobile gear to navigate crowds quickly.'
      },
      {
        id: 'C',
        text: 'I prefer lighter medical vests so I can kneel and provide delicate care to patients.',
        arabicText: 'أفضل السترات الإسعافية الخفيفة التي تسهل الانحناء وتقديم الإسعافات.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, physicalReadiness: 2 },
        learningInsight: 'Medical responders need agility to kneel, compress chests, and place dressings.'
      },
      {
        id: 'D',
        text: 'I prefer wearing high-visibility command vests with radios and clear identification.',
        arabicText: 'أفضل ارتداء سترة القيادة الفسفورية المجهزة بأجهزة الاتصال.',
        roleWeights: { externalLiaison: 4, teamLeader: 3 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Command and liaison officers must be visibly recognizable by outside agencies.'
      }
    ]
  },
  {
    id: 12,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'If you have to use a fire extinguisher right now, what is your experience and confidence?',
    arabicQuestion: 'إذا اضطررت لاستخدام طفاية حريق الآن، ما هو مستوى ثقتك وخبرتك؟',
    options: [
      {
        id: 'A',
        text: 'High confidence: I know PASS (Pull, Aim, Squeeze, Sweep) and aim at the fuel base.',
        arabicText: 'ثقة عالية جداً: أعرف تقنية سحب المسمار والتوجيه نحو قاعدة اللهب بدقة.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 4 },
        learningInsight: 'Mastery of PASS mechanics ensures maximum chemical knockdown of flames.'
      },
      {
        id: 'B',
        text: 'I can use one, but my priority is first making sure everyone is evacuated from the room.',
        arabicText: 'أعرف استخدامها، لكن أولويتي الأولى التأكد من خلو الغرفة من الأشخاص.',
        roleWeights: { evacuationSupportLead: 4, teamLeader: 2 },
        competencies: { crowdControl: 5, decisiveness: 3 },
        learningInsight: 'Life safety always comes before fighting property fires.'
      },
      {
        id: 'C',
        text: 'I know how it works, but I would make sure power is turned off first before spraying.',
        arabicText: 'أعرف طريقتها، لكنني أحرص أولاً على فصل الكهرباء لتفادي الصعق.',
        roleWeights: { suppressionLead: 4, teamLeader: 2 },
        competencies: { physicalReadiness: 4, decisiveness: 4 },
        learningInsight: 'De-energizing electrical panels prevents deadly electrocution during fire attack.'
      },
      {
        id: 'D',
        text: 'I would report the fire to the operations center first so heavy trucks are dispatched.',
        arabicText: 'سأبلغ مركز العمليات أولاً لضمان تحرك سيارات الإطفاء الكبيرة.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Calling emergency backup early guarantees professional help is already en route.'
      }
    ]
  },
  {
    id: 13,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'How do you feel about working with electrical switches, power trips, or machinery?',
    arabicQuestion: 'كيف تشعر حيال التعامل مع قواطع الكهرباء والمفاتيح والمعدات الميكانيكية؟',
    options: [
      {
        id: 'A',
        text: 'Very comfortable; I understand mechanical systems and like technical switches.',
        arabicText: 'مرتاح جداً؛ أفهم الأنظمة الميكانيكية وأحب التعامل مع لوحات التحكم.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Mechanical comfort enables rapid remote isolation of power and fuel systems.'
      },
      {
        id: 'B',
        text: 'I prefer focusing on people rather than machines or electrical breakers.',
        arabicText: 'أفضل التركيز على مساعدة الناس بدلاً من الآلات والقواطع الكهربائية.',
        roleWeights: { casualtyCareLead: 4, evacuationSupportLead: 4 },
        competencies: { traumaComposure: 4, crowdControl: 4 },
        learningInsight: 'People-oriented responders shine brightest in medical triage and crowd guidance.'
      },
      {
        id: 'C',
        text: 'I care about results: did the switch de-energize the room so my team is safe?',
        arabicText: 'أهتم بالنتيجة: هل تم فصل الكهرباء وتأمين سلامة الفريق لدخول المكان؟',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, physicalReadiness: 2 },
        learningInsight: 'Commanders verify safety isolations before giving entry permission.'
      },
      {
        id: 'D',
        text: 'I confirm the breaker status and log the exact time it was tripped with control.',
        arabicText: 'أؤكد حالة القاطع وأسجل التوقيت الدقيق لإغلاقه مع غرفة العمليات.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Accurate logging of utility shutdowns is vital for incident investigation.'
      }
    ]
  },
  {
    id: 14,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'If you have to enter a smoky hallway to search for someone, what is your mindset?',
    arabicQuestion: 'إذا اضطررت لدخول ممر فيه دخان للبحث عن شخص، ما هي طريقة تفكيرك؟',
    options: [
      {
        id: 'A',
        text: 'I check my air gauge, stay low beneath the smoke, and keep one hand on the wall.',
        arabicText: 'أتفقد أسطوانة الهواء، وأنخفض تحت مستوى الدخان، وأبقي يدي على الجدار.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 4 },
        learningInsight: 'Staying low and maintaining wall contact prevents disorientation in smoke.'
      },
      {
        id: 'B',
        text: 'I make sure someone outside has my name and knows exactly where I am going.',
        arabicText: 'أتأكد أن هناك مسؤولاً بالخارج سجل اسمي ويعرف مكان دخولي بدقة.',
        roleWeights: { teamLeader: 4, externalLiaison: 3 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Accountability boards track every responder entering a hazardous smoke zone.'
      },
      {
        id: 'C',
        text: 'I bring a spare resuscitation mask or emergency smoke hood to protect the victim.',
        arabicText: 'آخذ معي قناع تنفس إضافي لحماية المصاب عند العثور عليه.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, physicalReadiness: 3 },
        learningInsight: 'Supplying fresh air immediately to smoke victims dramatically reduces mortality.'
      },
      {
        id: 'D',
        text: 'I shout loudly in clear Arabic and English so anyone conscious can call back to me.',
        arabicText: 'أنادي بصوت قوي باللغتين العربية والإنجليزية ليرد أي شخص واعٍ.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 4 },
        learningInsight: 'Acoustic call-outs find conscious victims trapped behind closed interior doors.'
      }
    ]
  },
  {
    id: 15,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'How do you react to physical exhaustion or heavy physical lifting?',
    arabicQuestion: 'كيف تتعامل مع التعب البدني الشاق أو رفع الأوزان الثقيلة؟',
    options: [
      {
        id: 'A',
        text: 'I have good physical stamina and enjoy pushing through tough physical exertion.',
        arabicText: 'لدي لياقة بدنية جيدة وأتحمل المجهود العضلي الشاق بحماس.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'High physical endurance is the backbone of fire hose handling and equipment carries.'
      },
      {
        id: 'B',
        text: 'I believe in pacing: working smart, using team lifting, and avoiding sudden exhaustion.',
        arabicText: 'أؤمن بالعمل الذكي ورفع الأوزان جماعياً لتفادي الإجهاد السريع.',
        roleWeights: { casualtyCareLead: 4, evacuationSupportLead: 3 },
        competencies: { physicalReadiness: 4, traumaComposure: 3 },
        learningInsight: 'Proper ergonomic team lifting protects stretcher operators from back injury.'
      },
      {
        id: 'C',
        text: 'I prefer managing tasks so that team members rotate before anyone collapses from heat.',
        arabicText: 'أفضل إدارة المهام وتدوير الزملاء قبل أن ينهار أي شخص من الإجهاد.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 4, communicationProtocol: 3 },
        learningInsight: 'Crew rotation (work-rest cycles) keeps frontline response strength at 100%.'
      },
      {
        id: 'D',
        text: 'I track rest times and water supplies to make sure the team stays hydrated.',
        arabicText: 'أتابع فترات الراحة وتوفر مياه الشرب للحفاظ على طاقة الفريق.',
        roleWeights: { externalLiaison: 4, casualtyCareLead: 3 },
        competencies: { communicationProtocol: 4, traumaComposure: 3 },
        learningInsight: 'Hydration and rehab support prevent heat exhaustion in airport ramp environments.'
      }
    ]
  },
  {
    id: 16,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'When checking an unknown door where heat is suspected on the other side, what is your habit?',
    arabicQuestion: 'عند فحص باب يشتبه بوجود حريق خلفه، ما هو تصرفك المعتاد؟',
    options: [
      {
        id: 'A',
        text: 'I touch it carefully with the back of my hand from bottom to top before opening.',
        arabicText: 'أتحسس حرارة الباب بظهر يدي من الأسفل إلى الأعلى بحذر قبل فتحه.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 4 },
        learningInsight: 'Testing doors with the back of the hand prevents opening into a lethal flashover.'
      },
      {
        id: 'B',
        text: 'I make sure everyone behind me is clear and has an escape route before touching it.',
        arabicText: 'أتأكد أن الممر خلفي خالٍ وأن للجميع طريقاً آمناً للانسحاب.',
        roleWeights: { evacuationSupportLead: 4, teamLeader: 2 },
        competencies: { crowdControl: 4, physicalReadiness: 3 },
        learningInsight: 'Always verify an unblocked retreat path before opening any fire boundary door.'
      },
      {
        id: 'C',
        text: 'I prepare medical burn dressings just in case anyone inside needs immediate cooling.',
        arabicText: 'أجهز ضمادات الحروق تحسباً لوجود مصابين بالداخل يحتاجون تبريداً فورياً.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 4, physicalReadiness: 2 },
        learningInsight: 'Anticipating thermal burns allows instant application of cooling water dressings.'
      },
      {
        id: 'D',
        text: 'I radio my team to report: "Checking Room B door now; standing by for entry."',
        arabicText: 'أبلغ الفريق عبر اللاسلكي: جاري فحص باب الغرفة والاستعداد للدخول.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Reporting door entry lets the team know exactly where help is needed if flashover hits.'
      }
    ]
  },
  {
    id: 17,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'How do you feel about working with technical emergency vehicles or fire trucks?',
    arabicQuestion: 'ما هو مدى اهتمامك بالعمل على سيارات الإطفاء الكبيرة والمعدات الهيدروليكية؟',
    options: [
      {
        id: 'A',
        text: 'Excited: I enjoy vehicle pumps, heavy hoses, nozzles, and high-pressure mechanics.',
        arabicText: 'متحمس جداً: أحب المضخات وخراطيم الإطفاء والمعدات الميكانيكية القوية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Passion for apparatus pumps and nozzles drives excellence in airport firefighting.'
      },
      {
        id: 'B',
        text: 'I am interested in ambulances, stretchers, and mobile patient monitoring gear.',
        arabicText: 'أهتم بسيارات الإسعاف والنقالات وأجهزة مراقبة العلامات الحيوية.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, physicalReadiness: 2 },
        learningInsight: 'Mobile medical transport skills ensure safe transit to hospital emergency rooms.'
      },
      {
        id: 'C',
        text: 'I focus on coordinating truck arrival gates and guiding them safely across the runway.',
        arabicText: 'أركز على تنسيق بوابات دخول الآليات وتوجيهها بأمان عبر مدرج المطار.',
        roleWeights: { externalLiaison: 5, teamLeader: 2 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Escorting emergency convoys across active aviation aprons prevents runway incursions.'
      },
      {
        id: 'D',
        text: 'I make sure all passengers stay away from moving fire trucks and spinning tires.',
        arabicText: 'أحرص على إبعاد الركاب والمشاة عن مسار الشاحنات والإطارات الضخمة.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, physicalReadiness: 3 },
        learningInsight: 'Keeping crowds away from heavy emergency vehicles prevents secondary crushing.'
      }
    ]
  },
  {
    id: 18,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'If you smell an unknown chemical spill in a baggage area, what is your first thought?',
    arabicQuestion: 'إذا شممت رائحة تسرب كيميائي مجهول في منطقة الحقائب، ما هو تفكيرك الأول؟',
    options: [
      {
        id: 'A',
        text: 'Stop immediately, stay upwind, avoid touching it, and identify the UN hazard code.',
        arabicText: 'أتوقف فوراً، وأبقى في اتجاه معاكس للريح، وأتحقق من رمز المادة الخطرة.',
        roleWeights: { suppressionLead: 5, externalLiaison: 2 },
        competencies: { physicalReadiness: 4, decisiveness: 4 },
        learningInsight: 'Staying upwind and finding the UN placard prevents toxic inhalation poisonings.'
      },
      {
        id: 'B',
        text: 'Evacuate all baggage workers immediately out of the room to fresh air.',
        arabicText: 'إخلاء جميع العمال فوراً من الغرفة ونقلهم إلى الهواء النقي.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, decisiveness: 4 },
        learningInsight: 'Fast evacuation of confined chemical areas saves lives before gas concentrations peak.'
      },
      {
        id: 'C',
        text: 'Check if any workers are coughing, having eye burns, or need clean water eye-washing.',
        arabicText: 'فحص العمال للتأكد من خلوهم من حروق العين وصعوبة التنفس وغسل عيونهم بالماء.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, physicalReadiness: 3 },
        learningInsight: 'Immediate water flushing for 15+ minutes prevents permanent chemical eye damage.'
      },
      {
        id: 'D',
        text: 'Establish an isolation perimeter and inform Airport Control to alert Civil Defense Hazmat.',
        arabicText: 'تحديد منطقة عزل وإبلاغ العمليات لاستدعاء فرقة المواد الخطرة بالدفاع المدني.',
        roleWeights: { teamLeader: 4, externalLiaison: 4 },
        competencies: { decisiveness: 4, communicationProtocol: 5 },
        learningInsight: 'Calling specialized Hazmat teams ensures gas-tight suits are dispatched early.'
      }
    ]
  },
  {
    id: 19,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'In your daily life, are you someone who likes fixing things with your hands?',
    arabicQuestion: 'في حياتك اليومية، هل أنت شخص يحب إصلاح الأشياء بيديه؟',
    options: [
      {
        id: 'A',
        text: 'Yes, very much. I enjoy fixing cars, electrical items, plumbing, and home repairs.',
        arabicText: 'نعم جداً، أحب صيانة السيارات، والأجهزة الكهربائية، وإصلاح الأشياء بيدي.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 2 },
        learningInsight: 'Mechanical hobbies correlate directly with skill in equipment-based fire suppression.'
      },
      {
        id: 'B',
        text: 'I prefer organizing events, planning schedules, and managing people.',
        arabicText: 'أفضل تنظيم الفعاليات، ووضع الجداول، وإدارة شؤون الأشخاص.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 4, communicationProtocol: 4 },
        learningInsight: 'Organizational skills translate naturally into emergency incident management.'
      },
      {
        id: 'C',
        text: 'I prefer learning about health, biology, helping family when sick, and fitness.',
        arabicText: 'أفضل القراءة في الصحة والإسعافات ورعاية أفراد العائلة عند المرض.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 2 },
        learningInsight: 'Natural health and caregiving interests build empathetic, precise medical leads.'
      },
      {
        id: 'D',
        text: 'I enjoy social media, writing clearly, communicating, and public speaking.',
        arabicText: 'أحب التواصل والكتابة الواضحة والتحدث أمام الناس والشرح لهم.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 4 },
        competencies: { communicationProtocol: 5, crowdControl: 4 },
        learningInsight: 'Strong public speaking skills translate into excellent crowd leadership and radio comms.'
      }
    ]
  },
  {
    id: 20,
    module: 'Section 2: Equipment & Physical Action',
    arabicModule: 'القسم 2: المعدات والتعامل مع المخاطر المادية',
    category: 'suppression',
    question: 'How do you handle working in tight, narrow, or hot spaces?',
    arabicQuestion: 'كيف تتعامل مع العمل في الأماكن الضيقة أو الحارة؟',
    options: [
      {
        id: 'A',
        text: 'I stay calm and focused on the job; tight spaces do not bother me at all.',
        arabicText: 'أبقى هادئاً ومركزاً؛ الأماكن الضيقة والحارة لا تزعجني إطلاقاً.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, decisiveness: 3 },
        learningInsight: 'Claustrophobia resistance is essential for searching aircraft cargo holds and risers.'
      },
      {
        id: 'B',
        text: 'I can do it, but I prefer wide corridors where I can see and direct people.',
        arabicText: 'أستطيع ذلك، لكنني أفضل الممرات الواسعة حيث يمكنني توجيه الحشود.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, physicalReadiness: 2 },
        learningInsight: 'Wide open concourses are where crowd management leaders do their best work.'
      },
      {
        id: 'C',
        text: 'I focus on whether a patient can be moved safely out of the tight space first.',
        arabicText: 'أركز على كيفية إخراج المصاب بأمان من المكان الضيق بنقالة مناسبة.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, physicalReadiness: 3 },
        learningInsight: 'Confined-space rescue requires specialized patient immobilization and extrication.'
      },
      {
        id: 'D',
        text: 'I ensure our team has continuous radio comms and a safety backup line outside.',
        arabicText: 'أحرص على بقاء الاتصال اللاسلكي مستمراً مع وجود فريق دعم خارجي.',
        roleWeights: { externalLiaison: 4, teamLeader: 3 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Confined space safety requires a dedicated safety watch and continuous communications.'
      }
    ]
  },

  // ==========================================
  // SECTION 3: Care, First Aid & Calm with Injuries (Q21 - Q30)
  // ==========================================
  {
    id: 21,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'How do you feel when you see deep cuts, blood, or severe injuries?',
    arabicQuestion: 'كيف تشعر عندما ترى جروحاً عميقة أو دماءً أو إصابات مؤلمة؟',
    options: [
      {
        id: 'A',
        text: 'I stay very calm; blood does not make me dizzy. I immediately want to stop the bleeding.',
        arabicText: 'أبقى هادئاً جداً ولا أشعر بالدوار، وأرغب فوراً في الضغط لإيقاف النزيف.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 6, decisiveness: 4 },
        learningInsight: 'Natural composure around trauma is the top indicator for medical and first aid success.'
      },
      {
        id: 'B',
        text: 'It makes me uncomfortable, so I prefer handling physical containment and fire safety instead.',
        arabicText: 'أشعر بعدم الارتياح، لذا أفضل التعامل مع إخماد النيران وتأمين الموقع بدلاً من ذلك.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, traumaComposure: 1 },
        learningInsight: 'Knowing your limits allows you to excel where your strengths lie, such as suppression.'
      },
      {
        id: 'C',
        text: 'I focus on calling ambulances quickly and clearing a path so paramedics can reach them.',
        arabicText: 'أركز على طلب الإسعاف فوراً وفتح ممر لسيارات الهلال الأحمر للوصول.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 4 },
        competencies: { communicationProtocol: 5, crowdControl: 4 },
        learningInsight: 'Clearing access corridors allows paramedical teams to arrive without delay.'
      },
      {
        id: 'D',
        text: 'I assign my best medical responder to help them while I continue managing the scene.',
        arabicText: 'أكلف المسعف في فريقي برعايتهم فوراً بينما أواصل إدارة المشهد العام.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Delegating medical care ensures the commander does not lose macro control.'
      }
    ]
  },
  {
    id: 22,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'Have you ever learned or practiced CPR (chest compressions) and AED defibrillators?',
    arabicQuestion: 'هل سبق لك تعلم أو ممارسة الإنعاش القلبي (CPR) وجهاز صدمات القلب (AED)؟',
    options: [
      {
        id: 'A',
        text: 'Yes, I know how to push hard and fast on the center of the chest (100–120 per minute).',
        arabicText: 'نعم، وأعرف كيفية الضغط بقوة وسرعة في منتصف الصدر (100-120 ضغطة/دقيقة).',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 5, decisiveness: 4 },
        learningInsight: 'High-quality CPR compressions maintain blood and oxygen flow to the brain.'
      },
      {
        id: 'B',
        text: 'I have seen it, and I am very interested in mastering life-saving medical skills.',
        arabicText: 'شاهدته وأرغب بشدة في إتقان مهارات إنقاذ الحياة الإسعافية.',
        roleWeights: { casualtyCareLead: 4, evacuationSupportLead: 2 },
        competencies: { traumaComposure: 4, communicationProtocol: 2 },
        learningInsight: 'Eagerness to learn first aid is the starting point for certified airport responders.'
      },
      {
        id: 'C',
        text: 'I know my role would be quickly running to retrieve the AED machine from the wall.',
        arabicText: 'أعرف أن دوري سيكون الركض سريعاً لإحضار جهاز الصدمات المعلق في المطار.',
        roleWeights: { evacuationSupportLead: 4, suppressionLead: 3 },
        competencies: { physicalReadiness: 4, decisiveness: 3 },
        learningInsight: 'Rapid retrieval of an AED within 3 minutes increases survival rates over 70%.'
      },
      {
        id: 'D',
        text: 'I know how to record the exact time compressions started and when shocks were delivered.',
        arabicText: 'أعرف كيفية تسجيل وقت بدء الإنعاش وتوقيت إعطاء الصدمات الكهربائية.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Accurate CPR timestamps help emergency doctors choose cardiac medications.'
      }
    ]
  },
  {
    id: 23,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'How do you talk to someone who is crying, terrified, or in extreme pain?',
    arabicQuestion: 'كيف تتحدث مع شخص يبكي أو خائف بشدة أو يعاني من ألم حاد؟',
    options: [
      {
        id: 'A',
        text: 'I speak gently, hold their hand if appropriate, and say: "You are safe now, help is here."',
        arabicText: 'أتحدث معه بلطف، وأطمئنه قائلاً: أنت بأمان الآن والمساعدة هنا.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, crowdControl: 3 },
        learningInsight: 'Gentle, comforting reassurance reduces heart rate and shock in injured victims.'
      },
      {
        id: 'B',
        text: 'I use a firm, confident voice: "Follow me right now, we are moving to safety."',
        arabicText: 'أتحدث بصوت حازم وواضح: اتبعني فوراً، نحن ننتقل إلى مكان آمن.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, decisiveness: 3 },
        learningInsight: 'Clear, authoritative commands help disoriented people move away from danger.'
      },
      {
        id: 'C',
        text: 'I stay calm, assess their physical injuries rapidly, and focus on practical relief.',
        arabicText: 'أحافظ على هدوئي، وأفحص إصاباته سريعاً، وأركز على تقديم العلاج العملي.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, decisiveness: 4 },
        learningInsight: 'Combining clinical focus with emotional steadiness delivers optimal first aid.'
      },
      {
        id: 'D',
        text: 'I find their family members or companions to comfort them in the safe waiting area.',
        arabicText: 'أساعد في جمعهم مع عائلاتهم في منطقة الانتظار الآمنة لطمأنتهم.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 3 },
        competencies: { communicationProtocol: 4, crowdControl: 4 },
        learningInsight: 'Reuniting families is an essential part of humanitarian crisis management.'
      }
    ]
  },
  {
    id: 24,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'When multiple people are hurt at once, how do you decide who gets help first?',
    arabicQuestion: 'عندما يصاب عدة أشخاص معاً، كيف تحدد من يتلقى المساعدة أولاً؟',
    options: [
      {
        id: 'A',
        text: 'I follow Triage rules: check who is not breathing or bleeding heavily, and treat them first.',
        arabicText: 'أتبع نظام الفرز الطبي (Triage): فحص من لا يتنفس أو ينزف بغزارة وعلاجه أولاً.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 6, decisiveness: 5 },
        learningInsight: 'Triage protocol ensures life-saving interventions go to the most critical patients first.'
      },
      {
        id: 'B',
        text: 'I call out: "Anyone who can walk, please follow me to the exit!" to clear minor cases first.',
        arabicText: 'أنادي بصوت مسموع: كل من يستطيع المشي يتبعني نحو المخرج لفرز الحالات الخفيفة.',
        roleWeights: { evacuationSupportLead: 5, casualtyCareLead: 3 },
        competencies: { crowdControl: 5, decisiveness: 4 },
        learningInsight: 'Calling walking wounded away immediately isolates the severely injured victims.'
      },
      {
        id: 'C',
        text: 'I count the total casualties and radio Red Crescent with the exact numbers needed.',
        arabicText: 'أقوم بعدّ المصابين بدقة وإبلاغ الهلال الأحمر بالعدد المطلوب من الإسعاف.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Transmitting accurate casualty counts ensures hospitals prepare trauma teams.'
      },
      {
        id: 'D',
        text: 'I establish a clean, safe triage zone away from smoke so doctors can work safely.',
        arabicText: 'أحدد موقعاً آمناً ونظيفاً بعيداً عن الدخان لفرز وعلاج المصابين.',
        roleWeights: { teamLeader: 4, casualtyCareLead: 3 },
        competencies: { decisiveness: 4, physicalReadiness: 3 },
        learningInsight: 'Securing a safe triage area protects both casualties and medical staff.'
      }
    ]
  },
  {
    id: 25,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'If someone is suffering from a hot water or steam burn, what is your first thought?',
    arabicQuestion: 'إذا تعرض شخص لحروق ناتجة عن ماء ساخن أو بخار، ما هو أول تصرف تفكر فيه؟',
    options: [
      {
        id: 'A',
        text: 'Cool the burn with clean running water for at least 20 minutes; do NOT use ice or butter.',
        arabicText: 'تبريد الحرق بالماء النظيف لمدة 20 دقيقة على الأقل، وعدم استخدام الثلج إطلاقاً.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 5, decisiveness: 4 },
        learningInsight: '20 minutes of clean tap water cools deep tissue and prevents severe burn scars.'
      },
      {
        id: 'B',
        text: 'Quickly remove them from the steam area so they don’t inhale superheated vapor.',
        arabicText: 'إبعادهم فوراً عن مصدر البخار الساخن حتى لا يستنشقوا هواءً حارقاً للرئتين.',
        roleWeights: { suppressionLead: 4, evacuationSupportLead: 3 },
        competencies: { physicalReadiness: 4, decisiveness: 3 },
        learningInsight: 'Removing victims from steam prevents catastrophic internal airway burns.'
      },
      {
        id: 'C',
        text: 'Cover them gently with a clean burn sheet and keep them warm to prevent shock.',
        arabicText: 'تغطيتهم بغطاء طبي نظيف والحفاظ على دفء الجسم لمنع الصدمة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 4, communicationProtocol: 2 },
        learningInsight: 'Burn victims lose body heat rapidly; keeping them warm prevents hypothermia.'
      },
      {
        id: 'D',
        text: 'Log the burn location and estimated body surface area for the medical report.',
        arabicText: 'تسجيل مكان الحرق والنسبة التقديرية لمساحة الجسم في التقرير الطبي.',
        roleWeights: { externalLiaison: 4, casualtyCareLead: 2 },
        competencies: { communicationProtocol: 5, traumaComposure: 2 },
        learningInsight: 'Estimating burn surface area helps hospital burn units prepare IV fluids.'
      }
    ]
  },
  {
    id: 26,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'How patient and attentive are you when checking details like pulse, breathing, and symptoms?',
    arabicQuestion: 'ما مدى دقتك وصبرك عند فحص النبض والتنفس والأعراض لدى مريض؟',
    options: [
      {
        id: 'A',
        text: 'Very attentive: I have patience and care deeply about getting exact medical signs right.',
        arabicText: 'دقيق جداً: لدي صبر واهتمام كبير بتسجيل العلامات الحيوية بشكل صحيح.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 5, communicationProtocol: 3 },
        learningInsight: 'Patience and careful observation prevent missing subtle signs of internal bleeding.'
      },
      {
        id: 'B',
        text: 'I prefer fast physical action rather than sitting quietly to check pulses.',
        arabicText: 'أفضل التحرك البدني السريع على الجلوس بهدوء لفحص النبض.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, traumaComposure: 1 },
        learningInsight: 'Action-oriented responders are best utilized on physical suppression tasks.'
      },
      {
        id: 'C',
        text: 'I want to know the bottom line: is the patient stable or do they need immediate transport?',
        arabicText: 'أريد معرفة النتيجة النهائية: هل المريض مستقر أم يحتاج نقل فوري بالمروحية؟',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Commanders need rapid binary classifications (stable vs unstable) to prioritize.'
      },
      {
        id: 'D',
        text: 'I record the pulse, blood pressure, and time in a clear notebook for the ambulance team.',
        arabicText: 'أدون النبض والضغط والوقت في مذكرة واضحة لتسليمها لطاقم الإسعاف.',
        roleWeights: { externalLiaison: 5, casualtyCareLead: 2 },
        competencies: { communicationProtocol: 5, traumaComposure: 3 },
        learningInsight: 'Written vital signs trends show paramedics whether a patient is improving or crashing.'
      }
    ]
  },
  {
    id: 27,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'If an elderly passenger falls down the stairs and complains of severe neck pain, what do you do?',
    arabicQuestion: 'إذا سقط مسافر مسن على الدرج واشتكى من ألم شديد في رقبته، ماذا تفعل؟',
    options: [
      {
        id: 'A',
        text: 'Hold their head still with both hands, tell them NOT to move, and protect their spine.',
        arabicText: 'أثبت رأسه بيدي وأطلب منه عدم التحرك لحماية العمود الفقري والرقبة.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 5, decisiveness: 4 },
        learningInsight: 'Manual neck stabilization prevents secondary spinal cord injury and paralysis.'
      },
      {
        id: 'B',
        text: 'Try to help them stand up and walk to clear the stairs for other passengers.',
        arabicText: 'أحاول مساعدته على الوقوف والمشي لإخلاء الدرج للآخرين.',
        roleWeights: { casualtyCareLead: -4 },
        competencies: { traumaComposure: 1, decisiveness: 1 },
        learningInsight: 'CRITICAL ERROR: Forcing someone with neck fractures to stand can cause paralysis.'
      },
      {
        id: 'C',
        text: 'Divert people to a different stairwell so nobody bumps into the injured passenger.',
        arabicText: 'أحول مسار حركة الناس إلى درج آخر حتى لا يصطدم أحد بالمصاب.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, decisiveness: 3 },
        learningInsight: 'Diverting crowds protects medical responders and patients in stairwells.'
      },
      {
        id: 'D',
        text: 'Radio for a rigid spinal backboard and stretcher team to meet us on Floor 2.',
        arabicText: 'أطلب عبر اللاسلكي إحضار نقالة صلبة لتثبيت الظهر والرقبة في الطابق الثاني.',
        roleWeights: { externalLiaison: 4, casualtyCareLead: 3 },
        competencies: { communicationProtocol: 5, physicalReadiness: 2 },
        learningInsight: 'Calling for spinal immobilization equipment ensures safe extrication.'
      }
    ]
  },
  {
    id: 28,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'How do you feel about learning medical acronyms like ATMIST (Age, Time, Mechanism, Injury, Signs, Treatment)?',
    arabicQuestion: 'ما مدى اهتمامك بحفظ المصطلحات الطبية المختصرة لتسليم التقارير للمسعفين؟',
    options: [
      {
        id: 'A',
        text: 'I like it: structured medical handovers make communication fast and professional.',
        arabicText: 'أحب ذلك: التقارير المنظمة تجعل تسليم المصابين سريعاً ومهنياً.',
        roleWeights: { casualtyCareLead: 5, externalLiaison: 4 },
        competencies: { communicationProtocol: 5, traumaComposure: 4 },
        learningInsight: 'ATMIST is the international gold standard for pre-hospital patient handovers.'
      },
      {
        id: 'B',
        text: 'I prefer simple plain speech without too many medical formulas.',
        arabicText: 'أفضل الكلام البسيط المباشر دون تعقيد المصطلحات.',
        roleWeights: { evacuationSupportLead: 4, suppressionLead: 3 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Plain speech is best when commanding crowds and directing rapid movements.'
      },
      {
        id: 'C',
        text: 'I care that the incoming paramedic team understands the exact injuries within 30 seconds.',
        arabicText: 'يهمني أن يفهم طاقم الإسعاف نوع الإصابة وحالتها بدقة في أقل من نصف دقيقة.',
        roleWeights: { casualtyCareLead: 5, teamLeader: 2 },
        competencies: { communicationProtocol: 4, traumaComposure: 4 },
        learningInsight: 'Concise medical handovers save vital minutes when transferring trauma victims.'
      },
      {
        id: 'D',
        text: 'I enjoy writing down all six letters (A-T-M-I-S-T) on the patient wrist tag.',
        arabicText: 'أحرص على تدوين بيانات التقرير الطبي على البطاقة المعلقة بمعصم المصاب.',
        roleWeights: { externalLiaison: 5, casualtyCareLead: 2 },
        competencies: { communicationProtocol: 5, decisiveness: 2 },
        learningInsight: 'Tagging patients with written vital signs prevents lost clinical data.'
      }
    ]
  },
  {
    id: 29,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'If you have to apply strong pressure with your hands on a bleeding wound for 10 minutes without letting go, how do you handle it?',
    arabicQuestion: 'إذا اضطررت للضغط بيدك بقوة على جرح ينزف لمدة 10 دقائق متواصلة، كيف تتعامل مع ذلك؟',
    options: [
      {
        id: 'A',
        text: 'I will hold it firmly and steadily with zero hesitation until bleeding stops or a tourniquet is set.',
        arabicText: 'سأضغط بقوة وثبات دون أي تردد حتى يتوقف النزيف أو يتم تركيب رباط ضاغط.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 6, physicalReadiness: 4 },
        learningInsight: 'Uninterrupted direct pressure is the fundamental treatment for severe bleeding.'
      },
      {
        id: 'B',
        text: 'I would look for a mechanical clamp or emergency tourniquet to stop it faster.',
        arabicText: 'سأبحث عن رباط ضاغط شرياني (Tourniquet) لإيقاف النزيف بأسرع وقت.',
        roleWeights: { suppressionLead: 4, casualtyCareLead: 4 },
        competencies: { physicalReadiness: 4, decisiveness: 4 },
        learningInsight: 'Tourniquets occlude arterial blood flow in limbs within seconds.'
      },
      {
        id: 'C',
        text: 'I keep speaking to the patient to keep them awake, breathing, and feeling safe.',
        arabicText: 'أواصل الحديث مع المصاب لإبقائه واعياً ومطمئناً ومركزاً على التنفس.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 5, communicationProtocol: 3 },
        learningInsight: 'Keeping shock patients talking monitors their level of consciousness and airway.'
      },
      {
        id: 'D',
        text: 'I call for someone to bring more sterile gauze and alert the transport team.',
        arabicText: 'أطلب من الزملاء إحضار المزيد من الشاش المعقم وتجهيز سيارة النقل.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 2 },
        competencies: { communicationProtocol: 4, decisiveness: 3 },
        learningInsight: 'Calling for additional supplies ensures pressure is maintained continuously.'
      }
    ]
  },
  {
    id: 30,
    module: 'Section 3: First Aid & Patient Care',
    arabicModule: 'القسم 3: الإسعافات الأولية ورعاية المصابين',
    category: 'medical',
    question: 'After an intense emergency where people were hurt, how do you support a teammate who feels overwhelmed?',
    arabicQuestion: 'بعد انتهاء حادث صعب تأذى فيه أشخاص، كيف تدعم زميلك الذي يشعر بالحزن أو التأثر؟',
    options: [
      {
        id: 'A',
        text: 'I sit with them, listen with empathy, and remind them that we did our absolute best.',
        arabicText: 'أجلس معه، وأستمع إليه بتعاطف، وأذكره بأننا بذلنا أقصى ما في وسعنا.',
        roleWeights: { casualtyCareLead: 5, teamLeader: 3 },
        competencies: { traumaComposure: 5, communicationProtocol: 4 },
        learningInsight: 'Peer psychological support prevents long-term acute stress reactions in responders.'
      },
      {
        id: 'B',
        text: 'I suggest taking a break, drinking cold water, and walking in fresh air.',
        arabicText: 'أقترح عليه أخذ استراحة وشرب ماء بارد والمشي في الهواء النقي.',
        roleWeights: { casualtyCareLead: 4, evacuationSupportLead: 3 },
        competencies: { traumaComposure: 4, physicalReadiness: 2 },
        learningInsight: 'Basic physical recovery (hydration, fresh air) lowers elevated stress hormones.'
      },
      {
        id: 'C',
        text: 'I give them a lighter organizational task so they stay engaged without emotional burden.',
        arabicText: 'أعطيه مهمة تنظيمية خفيفة ليبقى منشغلاً دون ضغط نفسي إضافي.',
        roleWeights: { teamLeader: 5, externalLiaison: 3 },
        competencies: { decisiveness: 4, communicationProtocol: 3 },
        learningInsight: 'Task rotation allows responders to decompress while staying productive.'
      },
      {
        id: 'D',
        text: 'I organize a group debrief so everyone can talk openly about what went well and what was hard.',
        arabicText: 'أنظم جلسة مراجعة جماعية ليتحدث الجميع بحرية عما جرى ونتبادل الدعم.',
        roleWeights: { teamLeader: 5, externalLiaison: 4 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Group debriefing builds psychological safety and shared team resilience.'
      }
    ]
  },

  // ==========================================
  // SECTION 4: Crowd Dynamics, Egress & Communications (Q31 - Q40)
  // ==========================================
  {
    id: 31,
    module: 'Section 4: Crowd Guidance & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'evacuation',
    question: 'How comfortable are you speaking with a loud, assertive voice in front of 100+ strangers?',
    arabicQuestion: 'ما مدى ثقتك وراحتك في التحدث بصوت قوي وواضح أمام أكثر من 100 شخص غريب؟',
    options: [
      {
        id: 'A',
        text: 'Very comfortable: I have a loud voice, confident body language, and people naturally listen.',
        arabicText: 'مرتاح جداً: صوتي قوي وحضوري واثق والناس يستمعون لي تلقائياً.',
        roleWeights: { evacuationSupportLead: 6 },
        competencies: { crowdControl: 6, communicationProtocol: 4 },
        learningInsight: 'Vocal presence and confident body language immediately command large crowd attention.'
      },
      {
        id: 'B',
        text: 'I prefer speaking one-on-one or over a radio rather than shouting to a huge crowd.',
        arabicText: 'أفضل التحدث فردياً أو عبر اللاسلكي بدلاً من الصراخ وسط حشد ضخم.',
        roleWeights: { externalLiaison: 5, casualtyCareLead: 3 },
        competencies: { communicationProtocol: 5, crowdControl: 1 },
        learningInsight: 'Quiet, disciplined communicators excel at two-way radios and technical reports.'
      },
      {
        id: 'C',
        text: 'I prefer working silently with tools and equipment where actions speak louder than words.',
        arabicText: 'أفضل العمل الصامت مع المعدات والأدوات حيث الفعل أبلغ من القول.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, crowdControl: 1 },
        learningInsight: 'Tactical doers prefer focusing on physical tasks rather than public speech.'
      },
      {
        id: 'D',
        text: 'I prefer telling the group leads what to say, and letting them announce it.',
        arabicText: 'أفضل تحديد الرسالة المطلوب إيصالها وتكليف مسؤولي المجموعات بإعلانها.',
        roleWeights: { teamLeader: 5 },
        competencies: { decisiveness: 5, communicationProtocol: 3 },
        learningInsight: 'Commanders formulate the message and delegate public announcements to sector leads.'
      }
    ]
  },
  {
    id: 32,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'evacuation',
    question: 'When an exit doorway is jammed with panicked passengers pushing each other, what do you do?',
    arabicQuestion: 'عندما يتكدس مخرج طوارئ بركاب متدافعين بسبب الخوف، كيف تتصرف؟',
    options: [
      {
        id: 'A',
        text: 'I open the adjacent emergency double-door immediately and yell: "USE THIS DOOR! WALK, DO NOT PUSH!"',
        arabicText: 'أفتح الباب المجاور فوراً وأنادي بقوة: استخدموا هذا الباب! امشوا بانتظام ولا تتدافعوا!',
        roleWeights: { evacuationSupportLead: 6 },
        competencies: { crowdControl: 6, decisiveness: 5 },
        learningInsight: 'Opening secondary doors relieves crush pressure and breaks dangerous crowd bottlenecks.'
      },
      {
        id: 'B',
        text: 'I push people back physically with full strength to stop them from entering the door.',
        arabicText: 'أدفع الناس للخلف بقوة بدنية لإيقاف تقدمهم.',
        roleWeights: { evacuationSupportLead: -4 },
        competencies: { crowdControl: 1, decisiveness: 1 },
        learningInsight: 'CRITICAL ERROR: Pushing against a crowd wave can trigger a lethal crowd collapse.'
      },
      {
        id: 'C',
        text: 'I look for anyone who has fallen down to pick them up before they get stepped on.',
        arabicText: 'أبحث عن أي شخص سقط على الأرض لرفعه فوراً قبل أن يدوسه الآخرون.',
        roleWeights: { casualtyCareLead: 5, evacuationSupportLead: 3 },
        competencies: { traumaComposure: 5, crowdControl: 4 },
        learningInsight: 'Lifting fallen individuals in a crowd crush prevents fatal asphyxiation.'
      },
      {
        id: 'D',
        text: 'I radio Airport Security Control to trigger remote electronic release of all security turnstiles.',
        arabicText: 'أتصل بأمن المطار لاسلكياً لفتح جميع بوابات التفتيش إلكترونياً عن بُعد.',
        roleWeights: { externalLiaison: 5, teamLeader: 2 },
        competencies: { communicationProtocol: 5, decisiveness: 4 },
        learningInsight: 'Electronic turnstile overrides instantly open wide transit corridors.'
      }
    ]
  },
  {
    id: 33,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'evacuation',
    question: 'If a passenger refuses to leave and insists on going back inside for their laptop or luggage, how do you respond?',
    arabicQuestion: 'إذا رفض مسافر الخروج وأصر على العودة لجلب حقيبته أو حاسوبه، ماذا تفعل؟',
    options: [
      {
        id: 'A',
        text: 'I stand firmly in their way, look them in the eyes, and say: "No entry. Your life cannot be replaced."',
        arabicText: 'أقف أمامه بحزم وأنظر في عينيه: الدخول ممنوع، حياتك أهم من أي حقيبة.',
        roleWeights: { evacuationSupportLead: 6, teamLeader: 2 },
        competencies: { crowdControl: 6, decisiveness: 5 },
        learningInsight: 'Firm de-escalation prevents occupants from re-entering toxic smoke zones.'
      },
      {
        id: 'B',
        text: 'I let them go back in quickly since it is their personal choice and property.',
        arabicText: 'أسمح له بالدخول سريعاً بما أنه اختياره الشخصي وممتلكاته.',
        roleWeights: { evacuationSupportLead: -5, teamLeader: -4 },
        competencies: { crowdControl: 1, decisiveness: 1 },
        learningInsight: 'CRITICAL FATALITY HAZARD: Many civilian fire deaths occur during re-entry.'
      },
      {
        id: 'C',
        text: 'I wave over nearby airport police to escort them safely to the assembly point.',
        arabicText: 'أشير لرجال أمن المطار القريبين لاصطحابه بأمان إلى نقطة التجمع.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 4 },
        competencies: { communicationProtocol: 4, crowdControl: 4 },
        learningInsight: 'Using law enforcement support resolves non-compliant passenger situations smoothly.'
      },
      {
        id: 'D',
        text: 'I reassure them that the police and airport staff secure all evacuated sectors against theft.',
        arabicText: 'أطمئنه بأن شرطة المطار تؤمن المكان بالكامل ولن تضيع ممتلكاته.',
        roleWeights: { evacuationSupportLead: 5, casualtyCareLead: 2 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Removing fear of theft eliminates the psychological motivation for dangerous re-entry.'
      }
    ]
  },
  {
    id: 34,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'evacuation',
    question: 'When sweeping and checking a sector to make sure nobody is left behind, what is your style?',
    arabicQuestion: 'عند تمشيط وتفتيش منطقة للتأكد من خلوها من أي محتجزين، ما هو أسلوبك؟',
    options: [
      {
        id: 'A',
        text: 'Methodical: I check every single restroom stall, storage closet, and mark the door with a tag.',
        arabicText: 'منظم ودقيق: أفتش كل دورة مياه وغرفة تخزين، وأضع علامة على الباب بعد التأكد.',
        roleWeights: { evacuationSupportLead: 6 },
        competencies: { crowdControl: 6, physicalReadiness: 4 },
        learningInsight: 'Systematic left-to-right sweeps and door tagging ensure no child or casualty is missed.'
      },
      {
        id: 'B',
        text: 'I just glance quickly down the corridor; if I don’t hear coughing or screams, I keep moving.',
        arabicText: 'ألقي نظرة سريعة في الممر؛ وإذا لم أسمع صراخاً أو سعالاً أواصل السير.',
        roleWeights: { evacuationSupportLead: -4 },
        competencies: { crowdControl: 1, physicalReadiness: 1 },
        learningInsight: 'Superficial checks leave unconscious smoke-inhalation victims trapped behind closed doors.'
      },
      {
        id: 'C',
        text: 'I make sure responders work in pairs (buddy system) so no searcher gets lost alone.',
        arabicText: 'أحرص على أن يعمل فريق البحث في ثنائيات (نظام الزميل) لسلامة الجميع.',
        roleWeights: { teamLeader: 5, suppressionLead: 3 },
        competencies: { decisiveness: 4, physicalReadiness: 4 },
        learningInsight: 'The buddy system is a core firefighter safety rule for all interior searches.'
      },
      {
        id: 'D',
        text: 'I radio the sector clearance update: "Concourse B retail area 100% swept and all clear."',
        arabicText: 'أبلغ لاسلكياً: تم تمشيط محلات الصالة (ب) بالكامل والتأكد من خلوها تماماً.',
        roleWeights: { externalLiaison: 5, teamLeader: 2 },
        competencies: { communicationProtocol: 5, decisiveness: 3 },
        learningInsight: 'Confirming all-clear reports allows Incident Command to advance suppression efforts.'
      }
    ]
  },
  {
    id: 35,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'liaison',
    question: 'How comfortable are you speaking on a two-way tactical radio or microphone?',
    arabicQuestion: 'ما هو مدى راحتك في استخدام أجهزة اللاسلكي والتحدث عبر موجات الطوارئ؟',
    options: [
      {
        id: 'A',
        text: 'Very comfortable: I speak slowly, clearly, hold the mic 2 inches away, and release PTT when done.',
        arabicText: 'مرتاح جداً: أتحدث بهدوء ووضوح، وأبعد المايك مسافة مناسبة، وأترك زر التحدث فور الانتهاء.',
        roleWeights: { externalLiaison: 6 },
        competencies: { communicationProtocol: 6, decisiveness: 3 },
        learningInsight: 'Proper radio mic technique ensures clean audio over emergency airport repeaters.'
      },
      {
        id: 'B',
        text: 'I prefer listening to orders on the radio rather than making long reports myself.',
        arabicText: 'أفضل الاستماع للتعليمات عبر اللاسلكي على تقديم تقارير طويلة بنفسي.',
        roleWeights: { suppressionLead: 4, casualtyCareLead: 3 },
        competencies: { physicalReadiness: 3, communicationProtocol: 3 },
        learningInsight: 'Frontline action leads listen for tactical commands and keep airwaves clear.'
      },
      {
        id: 'C',
        text: 'I like using structured L-N-N-H (Location, Nature, Numbers, Hazards) reports so words are not wasted.',
        arabicText: 'أحب التقارير المختصرة: (الموقع، نوع الحادث، عدد المصابين، المخاطر الحالية).',
        roleWeights: { externalLiaison: 6, teamLeader: 3 },
        competencies: { communicationProtocol: 6, decisiveness: 4 },
        learningInsight: 'The L-N-N-H format delivers all essential disaster parameters in under 20 seconds.'
      },
      {
        id: 'D',
        text: 'I use the megaphone to direct crowds instead of radio channels.',
        arabicText: 'أستخدم مكبر الصوت اليدوي (الميكروفون) لتوجيه المسافرين بدلاً من اللاسلكي.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 5, communicationProtocol: 3 },
        learningInsight: 'Megaphones project directional authority in noisy departure halls.'
      }
    ]
  },
  {
    id: 36,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'liaison',
    question: 'If the main radio channel goes dead with static noise during an emergency, what is your reaction?',
    arabicQuestion: 'إذا تعطلت قناة اللاسلكي الرئيسية فجأة وظهر تشويش أثناء الطوارئ، ما هو تصرفك؟',
    options: [
      {
        id: 'A',
        text: 'I immediately switch to the pre-planned backup channel (Channel 2 Simplex) and test comms.',
        arabicText: 'أحول فوراً إلى القناة البديلة المحددة مسبقاً (قناة 2 المباشرة) وأفحص الاتصال.',
        roleWeights: { externalLiaison: 6, teamLeader: 2 },
        competencies: { communicationProtocol: 6, decisiveness: 5 },
        learningInsight: 'Pre-planned backup channels (PACE comms plan) keep teams connected when repeaters fail.'
      },
      {
        id: 'B',
        text: 'I send a physical runner on foot to the command post to deliver our handwritten status note.',
        arabicText: 'أرسل زميلاً كعداء سريع إلى مركز القيادة لتسليم تقرير خطي باليد.',
        roleWeights: { externalLiaison: 4, evacuationSupportLead: 3 },
        competencies: { physicalReadiness: 4, communicationProtocol: 4 },
        learningInsight: 'Physical runners remain the most reliable backup in hardened airport buildings.'
      },
      {
        id: 'C',
        text: 'I continue my local mission (fire containment or first aid) based on the commander’s original intent.',
        arabicText: 'أواصل مهمتي الميدانية الحالية (إخماد أو إسعاف) بناءً على الهدف العام المحدد مسبقاً.',
        roleWeights: { suppressionLead: 5, casualtyCareLead: 4 },
        competencies: { physicalReadiness: 4, decisiveness: 4 },
        learningInsight: 'Understanding commander’s intent allows autonomous work when radio links go dark.'
      },
      {
        id: 'D',
        text: 'I use pre-agreed whistle blasts or hand signals to communicate with adjacent squads.',
        arabicText: 'أستخدم إشارات الصفارة المتفق عليها أو إشارات اليد للتواصل مع الفرق المجاورة.',
        roleWeights: { evacuationSupportLead: 4, externalLiaison: 3 },
        competencies: { crowdControl: 4, communicationProtocol: 4 },
        learningInsight: 'Whistles and visual signals bypass electrical failures and noisy environments.'
      }
    ]
  },
  {
    id: 37,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'liaison',
    question: 'How do you feel about coordinating with outside government agencies like Saudi Civil Defense and Police?',
    arabicQuestion: 'ما مدى قدرتك على التنسيق الدبلوماسي مع الجهات الحكومية كالدفاع المدني والشرطة؟',
    options: [
      {
        id: 'A',
        text: 'Very comfortable: I am polite, diplomatic, professional, and explain airport sector grids clearly.',
        arabicText: 'مرتاح جداً: أتعامل بدبلوماسية واحترام وأشرح لهم خريطة قطاعات المطار بوضوح.',
        roleWeights: { externalLiaison: 6, teamLeader: 3 },
        competencies: { communicationProtocol: 6, decisiveness: 4 },
        learningInsight: 'Diplomatic liaison officers ensure municipal teams and airport brigades work seamlessly.'
      },
      {
        id: 'B',
        text: 'I prefer letting commanders talk to outside agencies while I stay focused on physical work.',
        arabicText: 'أفضل أن يتولى القادة الحديث مع الجهات الخارجية بينما أركز أنا على الجهد الميداني.',
        roleWeights: { suppressionLead: 4, casualtyCareLead: 3 },
        competencies: { physicalReadiness: 4, communicationProtocol: 1 },
        learningInsight: 'Clear separation of duties keeps frontline responders focused on life safety.'
      },
      {
        id: 'C',
        text: 'I hand over maps showing hydrant locations so Civil Defense trucks can connect water immediately.',
        arabicText: 'أسلمهم خرائط أماكن محابس المياه (الهيدرنت) لتوصيل خراطيم الشاحنات فوراً.',
        roleWeights: { externalLiaison: 5, suppressionLead: 3 },
        competencies: { communicationProtocol: 5, physicalReadiness: 3 },
        learningInsight: 'Providing hydrant maps saves critical minutes when municipal fire engines arrive.'
      },
      {
        id: 'D',
        text: 'I guide them to the rendezvous gate and escort their convoy across the airport.',
        arabicText: 'أستقبلهم عند بوابة التجمع وأقود موكبهم بأمان عبر طرق المطار الداخلية.',
        roleWeights: { externalLiaison: 5, evacuationSupportLead: 3 },
        competencies: { communicationProtocol: 5, crowdControl: 4 },
        learningInsight: 'Lead escorts ensure outside emergency vehicles never cross active runways by mistake.'
      }
    ]
  },
  {
    id: 38,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'liaison',
    question: 'How good are you at keeping written notes, tracking times, and maintaining a neat logbook?',
    arabicQuestion: 'ما مدى مهارتك في تدوين الملاحظات المكتوبة وتسجيل التوقيتات بدقة وتنظيم؟',
    options: [
      {
        id: 'A',
        text: 'Very organized: I naturally record exact times, orders, and action completions neatly.',
        arabicText: 'منظم جداً: أدون بطبيعتي التوقيتات الدقيقة والأوامر وما تم تنفيذه بكل ترتيب.',
        roleWeights: { externalLiaison: 6 },
        competencies: { communicationProtocol: 6, decisiveness: 3 },
        learningInsight: 'Detailed chronological logs protect the airport legally during post-incident investigations.'
      },
      {
        id: 'B',
        text: 'I find writing slow during an emergency; I would rather be moving and doing physical tasks.',
        arabicText: 'أجد الكتابة بطيئة أثناء الطوارئ، وأفضل التحرك والقيام بالمهام العملية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 5, communicationProtocol: 1 },
        learningInsight: 'Physical responders should not be assigned to documentation duties.'
      },
      {
        id: 'C',
        text: 'I write down casualty triage numbers and ambulance IDs to track where injured people were sent.',
        arabicText: 'أسجل أرقام بطاقات المصابين وأرقام سيارات الإسعاف لمعرفة وجهة كل مريض.',
        roleWeights: { externalLiaison: 5, casualtyCareLead: 4 },
        competencies: { communicationProtocol: 5, traumaComposure: 3 },
        learningInsight: 'Tracking ambulance IDs prevents lost patient inquiries from worried families.'
      },
      {
        id: 'D',
        text: 'I review the logbook every 10 minutes to verify if tactical milestones are being met on time.',
        arabicText: 'أراجع سجل الأحداث دورياً للتأكد من إنجاز الأهداف التكتيكية في وقتها المحدد.',
        roleWeights: { teamLeader: 5, externalLiaison: 2 },
        competencies: { decisiveness: 5, communicationProtocol: 4 },
        learningInsight: 'Time tracking ensures the incident commander monitors critical benchmarks.'
      }
    ]
  },
  {
    id: 39,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'liaison',
    question: 'When wild rumors start spreading on social media or among passengers, how do you handle it?',
    arabicQuestion: 'عندما تنتشر شائعات غير صحيحة بين الركاب أو في وسائل التواصل، كيف تتعامل معها؟',
    options: [
      {
        id: 'A',
        text: 'Deliver calm, factual announcements through the airport speaker system to kill the rumor immediately.',
        arabicText: 'إذاعة تنبيهات هادئة ودقيقة عبر مكبرات الصوت لدحض الشائعة فوراً.',
        roleWeights: { externalLiaison: 5, evacuationSupportLead: 4 },
        competencies: { communicationProtocol: 6, crowdControl: 5 },
        learningInsight: 'Official, transparent crisis messages stop secondary panic waves and stampedes.'
      },
      {
        id: 'B',
        text: 'Walk among passenger clusters in the assembly area, talking face-to-face to reassure them.',
        arabicText: 'التجول بين مجموعات الركاب والتحدث معهم وجهاً لوجه لطمأنتهم بالحقائق.',
        roleWeights: { evacuationSupportLead: 5, casualtyCareLead: 3 },
        competencies: { crowdControl: 5, traumaComposure: 4 },
        learningInsight: 'Direct human contact from uniformed responders reduces fear much faster than sirens.'
      },
      {
        id: 'C',
        text: 'Ignore rumors and stay laser-focused on extinguishing the fire and securing the scene.',
        arabicText: 'تجاهل الشائعات والتركيز الكامل على إخماد الخطر وتأمين الموقع.',
        roleWeights: { suppressionLead: 4, teamLeader: 2 },
        competencies: { physicalReadiness: 4, decisiveness: 3 },
        learningInsight: 'Frontline crews must remain focused on physical hazard control.'
      },
      {
        id: 'D',
        text: 'Log the rumor in the crisis book and inform the Airport PR Director for official press release.',
        arabicText: 'تدوين الشائعة في سجل الأزمة وإبلاغ إدارة العلاقات العامة لبيان الحقيقة رسمياً.',
        roleWeights: { externalLiaison: 6 },
        competencies: { communicationProtocol: 6, decisiveness: 2 },
        learningInsight: 'Informing airport corporate comms ensures verified updates reach media outlets.'
      }
    ]
  },
  {
    id: 40,
    module: 'Section 4: Crowd Dynamics & Communications',
    arabicModule: 'القسم 4: إدارة الحشود وتوجيه الإخلاء والاتصالات',
    category: 'command',
    question: 'Looking deep inside yourself, which of these 5 statements best describes your true inner strength?',
    arabicQuestion: 'في ختام التقييم، أي من العبارات التالية تصف قوتك وشغفك الحقيقي بأمانة؟',
    options: [
      {
        id: 'A',
        text: 'I am a natural Leader: I want to command the big picture, coordinate people, and take responsibility.',
        arabicText: 'قائد بالفطرة: أحب رؤية الصورة الكبرى، وتوجيه الفريق، وتحمل المسؤولية الكاملة.',
        roleWeights: { teamLeader: 6 },
        competencies: { decisiveness: 6, communicationProtocol: 4 },
        learningInsight: 'Team Leader drive: strategic mindset, accountability, decisiveness, and total mission focus.'
      },
      {
        id: 'B',
        text: 'I am a Fighter: I want to be where the physical action is, fighting fire with tools and gear.',
        arabicText: 'مكافح ميداني: أحب العمل الحركي المباشر، ومكافحة النيران بالمعدات والأدوات.',
        roleWeights: { suppressionLead: 6 },
        competencies: { physicalReadiness: 6, decisiveness: 4 },
        learningInsight: 'Fire Suppression drive: physical courage, mechanical mastery, and frontline action.'
      },
      {
        id: 'C',
        text: 'I am a Lifesaver: I want to help injured people, treat wounds, give CPR, and comfort human pain.',
        arabicText: 'منقذ أرواح: أرغب في إسعاف المصابين، وعلاج الجروح، وتخفيف آلام الناس.',
        roleWeights: { casualtyCareLead: 6 },
        competencies: { traumaComposure: 6, decisiveness: 4 },
        learningInsight: 'Casualty Care drive: deep empathy, clinical composure, and saving human lives directly.'
      },
      {
        id: 'D',
        text: 'I am a Guide or Communicator: I excel at commanding crowds safely, or managing high-level radio comms.',
        arabicText: 'مرشد ومتواصل: أبرع في قيادة الحشود وتوجيههم، أو إدارة موجات اللاسلكي بدقة.',
        roleWeights: { evacuationSupportLead: 4, externalLiaison: 4 },
        competencies: { crowdControl: 5, communicationProtocol: 5 },
        learningInsight: 'Evacuation & Communications drive: vocal authority, public guidance, and inter-agency coordination.'
      }
    ]
  }
];
