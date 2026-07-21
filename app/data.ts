export const site = {
  domain: 'OffshoreOutsourcingCompany.com',
  slug: 'offshoreoutsourcingcompany',
  brand: 'Offshore Outsourcing Company',
  primary: 'Filipino operations staffing',
  audience: 'buyers planning a managed team in the Philippines',
  angle: 'role scope, hiring checks, access rules, launch steps, and weekly review',
  style: 'Philippines operations desk',
  dark: '#102a2e',
  color: '#167c73',
  accent: '#f26b4f',
  heroImage: '/philippines-operations-team.svg',
  serviceImage: '/philippines-operations-team.svg',
  alt: 'Two operations specialists reviewing a shared task board at a desk',
  badge: 'Philippines-only staffing',
} as const;

export const services = [
  {
    slug: 'operations-support',
    title: 'Operations support',
    desc: 'Filipino operations specialists can keep recurring tasks, handoffs, and status updates moving against written rules.',
  },
  {
    slug: 'customer-support',
    title: 'Customer support',
    desc: 'Filipino customer support specialists can manage tickets and follow-up while your team keeps control of exceptions.',
  },
  {
    slug: 'admin-support',
    title: 'Admin support',
    desc: 'Filipino admin specialists can take on inbox upkeep, records, scheduling, and routine coordination with clear approval limits.',
  },
  {
    slug: 'reporting-and-qa',
    title: 'Reporting and QA',
    desc: 'Filipino reporting specialists can maintain scorecards, check samples, and flag work that needs an owner decision.',
  },
] as const;

export const blogPosts = [
  {
    slug: 'offshore-outsourcing-company-planning',
    title: 'Plan a Philippines-based outsourcing role',
    excerpt: 'Turn a loose task list into a role that a Filipino specialist can own without guesswork.',
    minutes: 6,
  },
  {
    slug: 'offshore-outsourcing-company-tasks-to-outsource',
    title: 'Choose the first tasks for a Filipino team member',
    excerpt: 'Start with recurring work that has examples, boundaries, and a clear reviewer.',
    minutes: 7,
  },
  {
    slug: 'offshore-outsourcing-company-provider-questions',
    title: 'Questions to ask a Philippines staffing provider',
    excerpt: 'Use these questions before you share systems, customer data, or a job brief.',
    minutes: 8,
  },
  {
    slug: 'offshore-outsourcing-company-onboarding-checklist',
    title: 'A first-week checklist for Filipino talent',
    excerpt: 'Set up tools, sample work, review calls, and escalation rules before the role goes live.',
    minutes: 9,
  },
] as const;

export const blogDetails = {
  'offshore-outsourcing-company-provider-questions': {
    keyTakeaways: [
      'Ask who owns screening, training, quality checks, and replacement before you compare providers.',
      'Start with sample work and a written scorecard instead of handing over a vague full-time role.',
      'Keep account access limited until the Filipino team member has proved the handoff is safe and consistent.',
    ],
    comparisonRows: [
      { label: 'Screening', weak: 'We have a large talent pool.', strong: 'How do you screen Filipino candidates for tool skill, communication, schedule fit, and role examples?' },
      { label: 'Quality', weak: 'We supervise the team.', strong: 'Who checks the first five work samples, and what does the scorecard measure?' },
      { label: 'Replacement', weak: 'We can replace people.', strong: 'What happens to the role notes and open work if the first match is wrong?' },
      { label: 'Access', weak: 'Your staff can use your tools.', strong: 'Which accounts stay owner-only, and how will you review permissions?' },
    ],
    script: 'Before we discuss a candidate, I want to understand the operating model. Who screens the Filipino specialist, who checks the first week of work, and what happens if the role is not a fit?',
    sources: [
      { name: 'FTC business guidance on hiring and outsourcing', url: 'https://www.ftc.gov/business-guidance', note: 'Use clear written terms before sharing customer data or vendor access.' },
      { name: 'NIST identity and access management guidance', url: 'https://www.nist.gov/itl/applied-cybersecurity/identity-access-management', note: 'Limit access by role and review permissions during onboarding.' },
      { name: 'U.S. Small Business Administration hiring guide', url: 'https://www.sba.gov/business-guide/manage-your-business/hire-manage-employees', note: 'Define duties, training, and management expectations before hiring support.' },
    ],
    faqs: [
      { q: 'What should I ask a Philippines staffing provider first?', a: 'Ask what work candidates can show, who manages the role, how quality is checked, and what happens if the first match is wrong.' },
      { q: 'Should I discuss the role or the contract first?', a: 'Start with the role. A job title can hide very different schedules, tools, and approval duties.' },
      { q: 'How do I reduce risk in the first week?', a: 'Use limited tool access, sample tasks, daily check-ins, and one simple scorecard. Keep sensitive accounts with the owner until the handoff is stable.' },
    ],
  },
} as const;

export const staffingOffer = {
  partner: 'an appropriate Philippines staffing partner',
  promise: 'Get a Philippines-only staffing plan built around the work you need handled.',
  fit: [
    'owners who want Filipino talent and a written role before interviews begin',
    'teams that can provide examples, a reviewer, and clear approval limits',
    'companies planning admin, operations, customer support, reporting, or QA work',
  ],
  included: [
    'a role brief built from your tasks, tools, schedule, and approval limits',
    'Philippines-only candidate criteria for skills, communication, and working hours',
    'a first-week plan for samples, access, review, and escalation',
    'a weekly handoff rhythm so work and open decisions stay visible',
  ],
  proof: [
    'task scope before hiring',
    'named reviewer and escalation path',
    'limited access during the first week',
    'a written handoff for tools, examples, and quality checks',
  ],
} as const;

export const leadQuestions = [
  'What work should the Filipino team member own first?',
  'Which tools, inboxes, phones, or systems will the person use?',
  'What hours and response times does the role need?',
  'Who checks quality during the first two weeks?',
  'What must always come back to an owner for approval?',
] as const;

export const staffingProcess = [
  { step: '01', title: 'Write the role', body: 'Turn the task pile into one job with clear outputs, examples, tools, and limits.' },
  { step: '02', title: 'Set the Philippines brief', body: 'Define the skills, communication needs, working hours, and proof you want from Filipino candidates.' },
  { step: '03', title: 'Run sample work', body: 'Use real but low-risk tasks before broad access or independent customer decisions.' },
  { step: '04', title: 'Review the handoff', body: 'Check completed work, open questions, and exceptions on a fixed weekly rhythm.' },
] as const;

export const staffingFitNote = 'This independent site does not employ candidates. Requests may be routed to a staffing partner that recruits and hires only in the Philippines.';
