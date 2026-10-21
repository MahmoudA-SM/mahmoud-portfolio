// Every fact here must be true and checkable (source: Data Freelancing/profile/master-facts.md).
// Public wording rules: no client names beyond the ones listed, no emojis, plain language.

export const links = {
  whatsapp: 'https://wa.me/966510267231',
  whatsappLabel: '+966 51 026 7231',
  email: 'mahmoudmoustafa.ca@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mahmoud-moustafa-99727122a/',
  capability: '/Mahmoud Moustafa Capability Statement.pdf',
};

export const proof = [
  { value: '6 months', label: 'on a national data governance program in Riyadh, under NDMO standards' },
  { value: '20,060', label: 'customer rows loaded in one run, every row accounted for' },
  { value: '0', label: 'real emails or names left in a 20,210-customer masked vendor file' },
  { value: '2 languages', label: 'English and Arabic, for workshops, documents and client calls' },
];

export const dataServices = [
  {
    title: 'Data integration loads',
    text: 'Files and databases into warehouse tables in Informatica Cloud Data Integration: cleansing, standard formats, changes-only loads, schedules, and loads that are safe to run again.',
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
    title: 'Training and documents',
    text: 'Workshops, handover notes, data dictionaries and governance documents in English and Arabic, written for the people who will use them.',
  },
];

export const caseStudies = [
  {
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
    tag: 'Data masking',
    title: 'A masked customer file a vendor can actually use',
    problem:
      'A marketing vendor needs to match customers against its own list, without ever seeing a real name or email address.',
    built:
      'An extract where every name becomes a consistent fake name and every email a SHA-256 hash, plus a check that searches the file for every real email and full name before it leaves.',
    result: [
      { n: '20,210', l: 'customers' },
      { n: '0', l: 'real emails or names found' },
      { n: '19,633', l: 'hashes that match' },
    ],
    lesson:
      'Hashed the usual way, 0 emails matched: the hash was taken over UTF-16 text, not UTF-8. Testing the file the way the receiver uses it caught that, and the exact recipe is now part of the file spec.',
  },
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
  'Delivered a 12-hour Power BI course and Power BI workshops',
  '3-day data management workshop at King Saud Medical City',
];

export const websiteFeatures = [
  { title: 'Built for the phone first', text: 'Most of your customers will see it on a phone, so that is where it is designed and tested, iPhone included.' },
  { title: 'Arabic, English or both', text: 'Right-to-left Arabic done properly, not a flipped English page.' },
  { title: 'WhatsApp and call buttons', text: 'One tap from any page to message or call you. No forms to get lost in.' },
  { title: 'Found on Google', text: 'Set up in Google Search Console with clear page titles, so people searching for you find you.' },
  { title: 'Fast and on your own domain', text: 'Light pages that open quickly, on your own .com or .sa address.' },
  { title: 'You see it before launch', text: 'A private link to review and request changes, before anything goes public.' },
];

export const websites = [
  {
    name: 'Ahmed Al Hafi',
    kind: 'Videographer and director, Riyadh',
    text: 'An Arabic website with his services, portfolio, common questions, and WhatsApp booking one tap away.',
    url: 'https://www.ahmedalhafi.com',
    urlLabel: 'ahmedalhafi.com',
    desktop: '/work/ahmed-al-hafi-desktop.jpg',
    mobile: '/work/ahmed-al-hafi-mobile.jpg',
  },
  {
    name: 'Studify',
    kind: 'My own product',
    text: 'A study app in English and Arabic: students upload a lecture PDF and get a clear summary and exam questions. Sign-in, free trial and dark mode.',
    url: 'https://www.studifyai.online',
    urlLabel: 'studifyai.online',
    desktop: '/work/studify-desktop.jpg',
  },
];

export const steps = [
  { title: 'Talk', text: 'A short WhatsApp chat or call about what you need. In English or Arabic.' },
  { title: 'Agree in writing', text: 'Scope, fixed price, date, and the checks the work has to pass. 50% to start.' },
  { title: 'Build and show', text: 'You get progress and a preview to review. Data work comes with row counts, not just "it ran".' },
  { title: 'Hand over', text: 'Balance paid, then the files, access and a short handover note so your team can run it.' },
];

export const faqs = [
  {
    q: 'Do you work as a subcontractor for Informatica partners?',
    a: 'Yes. I take defined work packages, such as a set of mappings, a profiling round or documentation, under your brand and your process, with an NDA by default. A short paid pilot task is welcome so you can judge the quality first.',
  },
  {
    q: 'Which parts of Informatica do you work with?',
    a: 'Informatica Intelligent Data Management Cloud (IDMC): Cloud Data Integration, profiling, Cloud Data Quality, Metadata Command Center, and administration (Secure Agent, connections, users and roles). If your project needs something else, tell me what it is and I will tell you how I would deliver it.',
  },
  {
    q: 'How do you price?',
    a: 'A fixed price per work package or per website, agreed in writing before we start. For open-ended data work, a day rate. 50% upfront or milestone payments, and the work is handed over once it is paid.',
  },
  {
    q: 'Are there costs after a website goes live?',
    a: 'Your domain renews every year, and I tell you its price before we start. Small sites usually run on free hosting; if your traffic grows past the free limits, a paid plan is needed, and I tell you that price up front too. Monthly updates are optional.',
  },
  {
    q: 'What do you need from me for a website?',
    a: 'Your logo, some photos, your WhatsApp number and a few lines about what you do. I can write the text with you, in Arabic or English.',
  },
  {
    q: 'Where are you based?',
    a: 'I work remotely with clients in Saudi Arabia, Egypt and elsewhere, on Saudi and Egypt time.',
  },
];
