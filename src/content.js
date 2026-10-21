// Every fact here must be true and checkable.
// Sources: Data Freelancing/profile/master-facts.md, evidence/README.md (IDMC builds),
// Second Brain/My Editing Studio Brain (Retaincut samples and offer).
// Public wording rules: no client names beyond the ones listed, no emojis, plain language.

export const links = {
  whatsapp: 'https://wa.me/966510267231',
  whatsappLabel: '+966 51 026 7231',
  email: 'mahmoudmoustafa.ca@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mahmoud-moustafa-99727122a/',
  capability: '/capability-statement.pdf',
  capabilityName: 'Mahmoud Moustafa Capability Statement.pdf',
};

export const pages = [
  { key: 'data', href: '/data/', label: 'Data', long: 'Informatica data work' },
  { key: 'websites', href: '/websites/', label: 'Websites', long: 'Business websites' },
  { key: 'video', href: '/video/', label: 'Video', long: 'Video editing' },
];

/* ---------- Home ---------- */

export const ticker = [
  '20,060 rows read',
  '19,589 loaded',
  '471 rejected, each with a reason',
  '0 lost',
  'Arabic right-to-left websites',
  'WhatsApp one tap away',
  'Word-timed captions',
  'Sound mastered to -14 LUFS',
  'NDMO data governance, Riyadh',
  'English and Arabic',
];

export const doors = [
  {
    key: 'data',
    num: '01',
    title: 'Data you can trust',
    for: 'For data teams and Informatica partners',
    text: 'Informatica IDMC loads, data quality rules and governance setups that prove every row is accounted for.',
    cta: 'See the data work',
  },
  {
    key: 'websites',
    num: '02',
    title: 'Websites that sell',
    for: 'For small businesses in Saudi Arabia and Egypt',
    text: 'Fast, phone-first websites in Arabic, English or both, built to turn a visit into a WhatsApp message.',
    cta: 'See the websites',
  },
  {
    key: 'video',
    num: '03',
    title: 'Videos people finish',
    for: 'For creators, podcasters, agencies and businesses',
    text: 'Talking-head edits and shorts with clean cuts, word-timed captions and mastered sound, made at Retaincut, my editing studio.',
    cta: 'Watch the edits',
  },
];

export const habit = [
  { key: 'data', label: 'Data', text: 'The expected row counts are written down before the first run, and every delivery shows they add up.' },
  { key: 'websites', label: 'Websites', text: 'You review the whole site on a private link and ask for changes before anything goes public.' },
  { key: 'video', label: 'Video', text: 'You get a free 60-second test edit on your own footage before you pay for anything.' },
];

export const steps = [
  { title: 'Talk', text: 'A short WhatsApp chat or call about what you need, in English or Arabic.' },
  { title: 'Agree in writing', text: 'Scope, fixed price, date, and what the work has to pass. 50% to start.' },
  { title: 'Build and show', text: 'You see progress and review it before anything is final.' },
  { title: 'Hand over', text: 'Balance paid, then the files, access and a short handover note.' },
];

export const experience = [
  {
    when: 'Feb - Aug 2026',
    role: 'Data Management Specialist',
    where: 'Renad Al Majd (Informatica partner), Riyadh',
    text: 'National data governance program under the NDMO data management standards with government entities: IDMC profiling, data quality rules, Metadata Command Center extraction, users and access roles, data classification. Informatica and Power BI training sessions, and a data management workshop at King Saud Medical City.',
  },
  {
    when: 'Dec 2025 - Feb 2026',
    role: 'Contract developer',
    where: 'Pillar Arabian, Saudi Arabia',
    text: 'Stabilised an HR system for rollout: fixed access roles so users only see their own data, and added location-based clock-in and clock-out.',
  },
  {
    when: 'Jul 2023 - Dec 2025',
    role: 'Software developer',
    where: 'CPCC, Saudi Arabia',
    text: 'Backend developer (Python) on the company\'s in-house ERP system.',
  },
  {
    when: '2022',
    role: 'Bachelor of Computer Science',
    where: 'University of New Brunswick, Canada',
    text: 'Then a teaching assistant for Intro to Java at the same university.',
  },
];

export const credentials = [
  'Informatica Cloud Data Quality Professional certification (2026)',
  'Informatica CDQ Implementation Practitioner certification (2026)',
  'Informatica CDGC implementation training path (2026)',
  'Co-delivered a 12-hour Power BI course, and Power BI workshops',
  '3-day data management workshop at King Saud Medical City',
];

/* ---------- Data ---------- */

export const dataTools = [
  'Cloud Data Integration', 'Data Profiling', 'Cloud Data Quality', 'Metadata Command Center',
  'Taskflows and schedules', 'Secure Agent', 'PostgreSQL', 'NDMO standards',
];

export const dataServices = [
  {
    title: 'Data integration loads',
    text: 'Files and databases into warehouse tables in Informatica Cloud Data Integration: cleansing, standard formats, changes-only loads, taskflows and schedules, and loads that are safe to run again.',
  },
  {
    title: 'Data quality and profiling',
    text: 'Profiling reports (missing values, duplicates, invalid entries), data quality rules, and a rejects table with a reason for every row, so the business can fix the source.',
  },
  {
    title: 'Governance and metadata',
    text: 'Metadata Command Center extraction, users, roles and access in IDMC, Secure Agent and connections, and data classification work under NDMO standards.',
  },
  {
    title: 'Masked data for handovers',
    text: 'Extracts for vendors and partners with consistent fake names and hashed emails, checked for leaks before they leave.',
  },
  {
    title: 'Training and documents',
    text: 'Workshops, handover notes, data dictionaries and governance documents in English and Arabic, written for the people who will use them.',
  },
];

export const caseStudies = [
  {
    asset: 'm_CRM_Customers_to_RetailDW',
    tag: 'Cloud Data Integration',
    title: 'The load that said "Success" and had lost rows',
    problem:
      'A CRM customer file into a warehouse table: names in mixed case, broken emails, the same country written five ways, two date formats, an impossible date, a missing ID and duplicate customers.',
    built:
      'Cleansing and data quality rules in one IDMC mapping. Clean rows go to the customer table, every rejected row goes to a rejects table with its reason and the original record.',
    result: [
      { n: '30', l: 'read' },
      { n: '23', l: 'loaded' },
      { n: '7', l: 'rejected, with reasons' },
      { n: '0', l: 'errors' },
    ],
    lesson:
      'One run finished green with 0 errors but the counts did not add up: a missing NOT had sent rows to the wrong place. Checking rows read = rows loaded + rows rejected caught it. I run that check after every load.',
  },
  {
    asset: 'm_CRM_Customers_to_RetailDW (upsert)',
    tag: 'Changes-only load',
    title: 'Load only what changed, and make it safe to run twice',
    problem:
      'The load wiped the table and reloaded every row every night. Fine for 30 rows, hours of wasted work at real volume.',
    built:
      'The same mapping switched to update-or-insert on the customer ID: existing customers are updated, new ones added, the rest of the table is left alone.',
    result: [
      { n: '7', l: 'changed rows read' },
      { n: '6', l: 'applied' },
      { n: '1', l: 'rejected, with reason' },
      { n: '0', l: 'duplicates on rerun' },
    ],
    lesson:
      'Then I ran the same file again: same numbers, no duplicate keys. Loads fail halfway in real life, so a load you cannot safely rerun is not finished.',
  },
  {
    asset: 'tf_CRM_Customers_Daily',
    tag: 'Taskflow and schedule',
    title: 'A daily load that leaves a receipt',
    problem:
      'A 20,060-customer file with the usual mess. A job status only says Success or Failed, and Success can still hide missing rows.',
    built:
      'Expected numbers written down before the first run. A taskflow that loads, then writes one audit row per run: rows read, written, refused, and balanced yes or no. Scheduled daily at 06:00 Riyadh time.',
    result: [
      { n: '20,060', l: 'read' },
      { n: '19,589', l: 'loaded' },
      { n: '471', l: 'rejected, with reasons' },
      { n: 'Yes', l: 'balanced, as predicted' },
    ],
    lesson:
      'If the load had said 19,600, the job would still show Success. The numbers you expect before you run are what tell you something is wrong.',
  },
  {
    asset: 'm_CRM_Customers_Vendor_Masked',
    tag: 'Data masking',
    title: 'A masked customer file a vendor can actually use',
    problem:
      'A marketing vendor needs to match customers against its own list, without ever seeing a real name or email address.',
    built:
      'An extract where every name becomes a consistent fake name and every email a SHA-256 hash, plus a check that searches the file for every real email and full name before it leaves.',
    result: [
      { n: '20,210', l: 'customers' },
      { n: '0', l: 'real emails or full names found' },
      { n: '19,633', l: 'of 19,633 email hashes match' },
    ],
    lesson:
      'Hashed the usual way, 0 emails matched: the hash was taken over UTF-16 text, not UTF-8. Testing the file the way the receiver uses it caught that, and the exact recipe is now part of the file spec.',
  },
];

export const partnerModel = [
  'A defined work package under your brand and your process: a set of mappings, a profiling round, a migration batch, documentation.',
  'Rules and acceptance checks agreed in writing up front. Delivery comes with row counts and a short handover note.',
  'NDA by default. A short paid pilot task is welcome, so you can judge the quality first.',
];

export const dataFaqs = [
  {
    q: 'Which parts of Informatica do you work with?',
    a: 'Informatica Intelligent Data Management Cloud (IDMC): Cloud Data Integration, profiling, Cloud Data Quality, Metadata Command Center, and administration (Secure Agent, connections, users and roles). If your project needs something else, tell me what it is and I will tell you how I would deliver it.',
  },
  {
    q: 'Do you work as a subcontractor?',
    a: 'Yes. Under your brand and process, remote, with an NDA by default. English and Arabic, so I can also sit in front of Arabic-speaking business teams.',
  },
  {
    q: 'How do you price?',
    a: 'A fixed price per work package, agreed in writing before we start. For open-ended work, a day rate. 50% upfront or milestone payments, and the work is handed over once it is paid.',
  },
];

/* ---------- Websites ---------- */

export const websiteFeatures = [
  { title: 'Built for the phone first', text: 'Most of your customers will see it on a phone, so that is where it is designed first, and checked on iPhone Safari.' },
  { title: 'Arabic, English or both', text: 'Right-to-left Arabic done properly, not a flipped English page.' },
  { title: 'WhatsApp and call buttons', text: 'One tap from any page to message or call you. No forms to get lost in.' },
  { title: 'Ready for Google', text: 'Clear page titles and descriptions, and connected to Google Search Console so you can see how people find you.' },
  { title: 'Fast, on your own domain', text: 'Light pages that open quickly, on your own web address.' },
  { title: 'You see it before launch', text: 'A private link to review and request changes, before anything goes public.' },
];

export const hafi = {
  name: 'Ahmed Al Hafi',
  kind: 'Videographer and director, Riyadh',
  url: 'https://www.ahmedalhafi.com',
  urlLabel: 'ahmedalhafi.com',
  desktop: '/work/ahmed-al-hafi-desktop.jpg',
  tall: '/work/ahmed-al-hafi-mobile-tall.jpg',
  points: [
    'Arabic, right-to-left, written for brands in Riyadh',
    'Services, portfolio, partner logos and common questions on one page',
    'WhatsApp booking one tap away, in the header and the hero',
    'Live on his own domain',
  ],
};

export const websiteExtras = [
  { title: 'Monthly reels', text: 'Short videos for your Instagram and TikTok, edited at Retaincut.', href: '/video/' },
  { title: 'Monthly updates', text: 'New photos, prices or pages, done for you each month. Optional.' },
];

export const websiteFaqs = [
  {
    q: 'Are there costs after the website goes live?',
    a: 'Two possible costs, both told to you before we start. Your domain renews every year (around $10 to $15 for a .com). Hosting can start on a free plan that allows business use; if your site grows past its limits, a paid plan is needed, usually from about $20 a month. Monthly updates are optional.',
  },
  {
    q: 'What do you need from me?',
    a: 'Your logo, some photos, your WhatsApp number and a few lines about what you do. I can write the text with you, in Arabic or English.',
  },
  {
    q: 'How do you price?',
    a: 'A fixed price per website, agreed in writing before we start. 50% to start, the rest at handover.',
  },
];

/* ---------- Video ---------- */

const footageCredit = {
  text: '"A Wise Man Learns From Others" (David Gory, Airbuild), from Rick Turoczy\'s YouTube channel, CC BY 3.0, re-edited',
  href: 'https://www.youtube.com/watch?v=JAdLTPj5L40',
};
const musicCredit = {
  text: 'Music: "Bright Beginnings" by Gustavo_Alivera (freesound.org), CC BY 4.0',
};

export const shorts = [
  {
    id: 'hobby',
    title: 'No revenue? It\'s a hobby',
    length: '0:44',
    src: '/video/02-short-hobby.mp4',
    poster: '/video/02-short-hobby.jpg',
    notes: 'Cut from a long interview, designed headline cards, B-roll on the key line.',
  },
  {
    id: 'community',
    title: 'Lean on your community',
    length: '0:27',
    src: '/video/03-short-community.mp4',
    poster: '/video/03-short-community.jpg',
    notes: 'Animated list that builds with the speaker, word-timed captions.',
  },
  {
    id: 'wise-man',
    title: 'A wise man learns from others',
    length: '0:41',
    src: '/video/04-short-wise-man.mp4',
    poster: '/video/04-short-wise-man.jpg',
    notes: 'Split-screen source reframed onto the speaker, chapter headlines.',
  },
];

export const longform = {
  title: 'Founder advice: two best answers from a long interview',
  length: '1:50',
  src: '/video/01-founder-advice-longform.mp4',
  poster: '/video/01-founder-advice-longform.jpg',
  notes: 'Filler words and false starts out, word-timed captions, camera motion and layout changes on emphasis.',
};

export const credits = { footage: footageCredit, music: musicCredit };

export const videoServices = [
  { title: 'Talking-head long-form', text: 'YouTube videos, podcasts and interviews cut tight: fillers and false starts out, captions in, camera motion where it helps.' },
  { title: 'Shorts, Reels and TikToks', text: 'The best moments of a long video, reframed to vertical on the speaker, with headlines and word-timed captions.' },
  { title: 'Reels for businesses', text: 'Short videos for your brand\'s Instagram and TikTok, every month, from footage you film on your phone.' },
];

export const videoSpecs = [
  { k: 'Captions', v: 'Word-timed, styled, and delivered as an .srt file too' },
  { k: 'Sound', v: 'Mastered to about -14 LUFS, the loudness YouTube plays at' },
  { k: 'Framing', v: 'Vertical cuts reframed on the speaker, not just cropped' },
  { k: 'B-roll and icons', v: 'From licensed stock libraries, matched to what is being said' },
  { k: 'Music', v: 'Cleared for use and credited, mixed under the voice' },
  { k: 'Delivery', v: 'Final video, captions file and a short QC report' },
];

export const videoFaqs = [
  {
    q: 'How does the free test edit work?',
    a: 'Send me a link to one of your videos. I edit 60 seconds of it in the style you want and send it back. If you like it, we agree a fixed price per video. If not, you owe nothing.',
  },
  {
    q: 'How do I send my footage?',
    a: 'A Google Drive, Dropbox or WeTransfer link is fine. Raw footage is best, but a finished long video works for shorts.',
  },
  {
    q: 'What is Retaincut?',
    a: 'Retaincut is the name of my video editing studio. Same person, same standards, one place for all the video work.',
  },
  {
    q: 'How do you price?',
    a: 'A fixed price per video or per monthly package, agreed before we start. Agencies can work with me white-label.',
  },
];
