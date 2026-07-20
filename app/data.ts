export const site = {
  "domain": "OffshoreOutsourcingCompany.com",
  "slug": "offshoreoutsourcingcompany",
  "brand": "Offshore Outsourcing Company",
  "primary": "offshore outsourcing company",
  "audience": "buyers comparing offshore outsourcing companies and managed teams",
  "angle": "provider vetting, staffing details, contracts, QA, and onboarding steps",
  "style": "Corporate trust system",
  "dark": "#0f172a",
  "color": "#1d4ed8",
  "accent": "#0f766e",
  "heroImage": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  "serviceImage": "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "alt": "executives reviewing outsourcing company proposal",
  "badge": "Provider match"
} as const;
export const services = [
  {
    "slug": "operations-support",
    "title": "Operations Support",
    "desc": "Operations Support for teams using offshore outsourcing company with clear SOPs, weekly review, and measurable handoffs."
  },
  {
    "slug": "customer-support",
    "title": "Customer Support",
    "desc": "Customer Support for teams using offshore outsourcing company with clear SOPs, weekly review, and measurable handoffs."
  },
  {
    "slug": "admin-support",
    "title": "Admin Support",
    "desc": "Admin Support for teams using offshore outsourcing company with clear SOPs, weekly review, and measurable handoffs."
  },
  {
    "slug": "reporting-and-qa",
    "title": "Reporting and QA",
    "desc": "Reporting and QA for teams using offshore outsourcing company with clear SOPs, weekly review, and measurable handoffs."
  }
] as const;
export const blogPosts = [
  {
    "slug": "offshore-outsourcing-company-planning",
    "title": "Offshore Outsourcing Company: What does it plan?",
    "excerpt": "A plain-English guide to staffing details, scope, and hidden planning.",
    "minutes": 6
  },
  {
    "slug": "offshore-outsourcing-company-tasks-to-outsource",
    "title": "Offshore Outsourcing Company: What tasks should you outsource first?",
    "excerpt": "Start with recurring work that has examples and clear review rules.",
    "minutes": 7
  },
  {
    "slug": "offshore-outsourcing-company-provider-questions",
    "title": "Offshore Outsourcing Company: Questions to ask before hiring",
    "excerpt": "Use these questions before you sign with a provider or freelancer.",
    "minutes": 8
  },
  {
    "slug": "offshore-outsourcing-company-onboarding-checklist",
    "title": "Offshore Outsourcing Company: First week onboarding checklist",
    "excerpt": "A simple checklist for tools, SOPs, calls, QA, and reporting.",
    "minutes": 9
  }
] as const;

export const blogDetails = {
  "offshore-outsourcing-company-provider-questions": {
    keyTakeaways: [
      "Ask who owns screening, training, quality checks, and replacement before you compare prices.",
      "Start with a two-week pilot and a written scorecard instead of a vague full-time hire.",
      "Keep account access limited until the provider proves the handoff is safe and consistent."
    ],
    comparisonRows: [
      { label: "Screening", weak: "We have a large talent pool.", strong: "Who screens for tool skill, English level, schedule fit, and role-specific examples?" },
      { label: "Quality", weak: "We supervise the team.", strong: "Who checks the first five work samples, and what does the scorecard measure?" },
      { label: "Replacement", weak: "We can replace people.", strong: "How fast can you replace a poor fit, and what happens to the role notes?" },
      { label: "Access", weak: "Your staff can use your tools.", strong: "Which accounts stay owner-only, and how do you handle password sharing rules?" }
    ],
    script: "Before we talk about price, I want to understand the operating model. Who screens the person, who checks the first week of work, and what happens if the role is not a fit by day 10?",
    sources: [
      { name: "FTC business guidance on hiring and outsourcing", url: "https://www.ftc.gov/business-guidance", note: "Use clear written terms before sharing customer data or vendor access." },
      { name: "NIST identity and access management guidance", url: "https://www.nist.gov/itl/applied-cybersecurity/identity-access-management", note: "Limit access by role and review permissions during onboarding." },
      { name: "U.S. Small Business Administration hiring guide", url: "https://www.sba.gov/business-guide/manage-your-business/hire-manage-employees", note: "Define duties, training, and management expectations before hiring support." }
    ],
    faqs: [
      { q: "What should I ask an offshore outsourcing company first?", a: "Ask what work they can prove, who manages the staff member, how quality is checked, and how replacement works if the first match is wrong." },
      { q: "Should I ask about price before role scope?", a: "Ask for price after the role scope is clear. The same job title can mean a light admin role, a phone-heavy support role, or a complex operations role." },
      { q: "How do I reduce risk in the first week?", a: "Use limited tool access, sample tasks, daily check-ins, and a simple scorecard. Do not hand over sensitive accounts on day one." }
    ]
  }
} as const;
export const stats = [{label:'Typical savings target',value:'30-60%',note:'depends on role, management, and local hiring plan'},{label:'Best pilot length',value:'14 days',note:'enough time to test quality before scaling'},{label:'Start with',value:'5-10 tasks',note:'clear recurring tasks beat vague job descriptions'}] as const;

export const staffingOffer = {
  partner: 'our staffing team',
  promise: 'Get a managed offshore staffing plan built around the work you need removed from your plate.',
  fit: [
    'business owners who need reliable remote staff but do not want to screen alone',
    'teams that want trained support, backup coverage, and a clear manager path',
    'companies that need help with admin, operations, customer support, calls, bookkeeping, development, or marketing work',
  ],
  included: [
    'role planning call to turn your task list into a clear staffing scope',
    'candidate matching based on skills, schedule, tools, and communication needs',
    'onboarding guidance for SOPs, scorecards, reporting, and safe tool access',
    'managed support so quality, attendance, and replacement questions do not sit only on the owner',
  ],
  proof: [
    'clear task scope before hiring',
    'weekly reporting rhythm',
    'named accountability and escalation path',
    'simple handoff plan for tools, SOPs, and quality checks',
  ],
} as const;

export const leadQuestions = [
  'What work do you want off your plate first?',
  'Which tools, inboxes, phones, CRMs, or systems will the staff member use?',
  'What hours, time zone, and response time do you need?',
  'Who checks quality during the first two weeks?',
  'What should the staff member never decide without approval?',
] as const;

export const staffingProcess = [
  { step: '1', title: 'Map the role', body: 'We turn messy tasks into one clear role with outcomes, tools, limits, and a first-week checklist.' },
  { step: '2', title: 'Match the staff', body: 'our staffing team can help match remote staff to the work, schedule, communication style, and skill level you need.' },
  { step: '3', title: 'Launch with control', body: 'Start with SOPs, sample work, limited access, daily review, and a simple scorecard so quality is easy to see.' },
  { step: '4', title: 'Scale what works', body: 'Once the first tasks are stable, add more work, better reporting, and stronger delegation without guessing.' },
] as const;

export const staffingFitNote = 'Every staffing plan depends on role scope, schedule, skills, tools, and management needs. Send the role details and our staffing team can guide the best fit.';
