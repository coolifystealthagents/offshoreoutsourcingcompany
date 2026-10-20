export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  heroImage: string;
  heroAlt: string;
  audience: string;
  keyword: string;
  scope: string[];
  inputs: string[];
  workflow: string[];
  deliverables: string[];
  boundaries: string[];
  quality: string[];
  scenarios: string[];
  faqs: ServiceFaq[];
  related: string[];
};

type ServiceSeed = {
  title: string;
  keyword: string;
  role: string;
  audience: string;
  heroImage: string;
  heroAlt: string;
  tasks: [string, string, string];
  inputs: [string, string, string];
  deliverables: [string, string, string];
  decisions: [string, string];
  scenarios: [string, string, string];
  related: [string, string, string];
};

function buildService(seed: ServiceSeed): ServiceContent {
  return {
    heroImage: seed.heroImage,
    heroAlt: seed.heroAlt,
    audience: seed.audience,
    keyword: seed.keyword,
    scope: [
      `${seed.title} covers ${seed.keyword} work such as ${seed.tasks[0]}.`,
      `${seed.role} can also handle ${seed.tasks[1]} within a documented queue and schedule.`,
      `The lane can include ${seed.tasks[2]}, with unusual cases returned to a named client owner.`,
    ],
    inputs: [
      seed.inputs[0],
      seed.inputs[1],
      seed.inputs[2],
    ],
    workflow: [
      `Agree the queue, service levels, owners, and examples for ${seed.keyword} before access is granted.`,
      `${seed.role} reviews new work, checks required fields, and records missing information.`,
      `Routine items move through the approved checklist while exceptions are paused and routed to the client owner.`,
      `Completed work is logged with evidence, then sampled during the weekly review so the instructions can improve.`,
    ],
    deliverables: [
      seed.deliverables[0],
      seed.deliverables[1],
      seed.deliverables[2],
    ],
    boundaries: [
      `${seed.decisions[0]} remains a client decision and is never inferred by the delivery team.`,
      `${seed.decisions[1]} requires approval from the named client owner before work continues.`,
    ],
    quality: [
      `Required-field and source checks are completed before each ${seed.keyword} item is closed.`,
      `A reviewer samples completed records against approved examples and records the reason for rework.`,
      `Queue age, exceptions, accuracy, and unresolved questions are reviewed with the client each week.`,
    ],
    scenarios: [seed.scenarios[0], seed.scenarios[1], seed.scenarios[2]],
    faqs: [
      {
        question: `What should be ready before ${seed.title.toLowerCase()} starts?`,
        answer: `Provide a representative work sample, the current instructions, system access rules, expected turnaround, and the person who will answer exceptions.`,
      },
      {
        question: `How is quality checked for ${seed.keyword}?`,
        answer: `The team uses required-field checks, saved evidence, and reviewer sampling. Results are discussed in a regular client review rather than hidden inside a general activity total.`,
      },
      {
        question: `Can the role make judgment calls?`,
        answer: `Only routine choices that are explicitly documented. Commercial, legal, policy, people, and other material decisions stay with an authorized client owner.`,
      },
      {
        question: `How does the service begin?`,
        answer: `Start with one bounded queue and a small set of examples. Calibrate the checklist and escalation path, then expand volume only after the quality evidence is stable.`,
      },
    ],
    related: seed.related,
  };
}

export const serviceContent: Record<string, ServiceContent> = {
  'operations-coordination': buildService({
    title: 'Operations Coordination', keyword: 'operations coordination', role: 'The operations coordinator',
    audience: 'For operations leaders whose recurring requests, due dates, and handoffs are spread across inboxes or meetings, creating unclear ownership and avoidable follow-up work.',
    heroImage: '/illustrations/getillustrations/grain-teamwork-illustrations-svg/teamwork-planning.svg',
    heroAlt: 'Operations teammates planning assignments around a shared workflow board',
    tasks: ['assigning requests and maintaining owners and due dates', 'preparing daily handoffs and chasing missing inputs', 'updating exception logs and owner-ready status notes'],
    inputs: ['A current request list with priority and due-date rules', 'Examples of complete handoffs and common exceptions', 'Named owners, escalation contacts, and system permissions'],
    deliverables: ['A current work queue with owners and due dates', 'A daily handoff note for open and blocked work', 'A weekly exception and workload review packet'],
    decisions: ['Priority changes and tradeoffs between teams', 'Commitments outside the approved service level'],
    scenarios: ['A shared inbox has no consistent owner or follow-up rhythm.', 'Daily handoffs omit blockers and create repeated questions.', 'Managers need one view of aging requests across several tools.'],
    related: ['project-tracking', 'process-documentation', 'reporting-administration'],
  }),
  'executive-administration': buildService({
    title: 'Executive Administration', keyword: 'executive administration', role: 'The executive support specialist',
    audience: 'For executives and leadership teams who need dependable calendar, meeting, and follow-up administration without delegating sensitive judgment or relationship decisions.',
    heroImage: '/blog/images/thumbs/philippines-outsourced-calendar-management.webp',
    heroAlt: 'Executive calendar and meeting schedule arranged for a focused workday',
    tasks: ['maintaining calendars within written scheduling preferences', 'assembling agendas, pre-reads, and meeting notes', 'tracking approved actions and routine follow-ups'],
    inputs: ['Calendar preferences, protected time, and scheduling rules', 'Meeting templates, participant details, and source materials', 'Approval limits and a named escalation contact'],
    deliverables: ['A maintained calendar with conflicts clearly flagged', 'Complete meeting packets and action lists', 'A follow-up register with owners and due dates'],
    decisions: ['Which relationships or meetings receive executive priority', 'Travel purchases, commitments, and sensitive communications'],
    scenarios: ['Calendar requests repeatedly interrupt leadership focus.', 'Meeting materials arrive late or in inconsistent formats.', 'Action items disappear after recurring leadership meetings.'],
    related: ['operations-coordination', 'project-tracking', 'recruitment-coordination'],
  }),
  'customer-support-operations': buildService({
    title: 'Customer Support Operations', keyword: 'customer support', role: 'The customer support specialist',
    audience: 'For support leaders with a repeatable inbound queue who need faster triage, consistent records, and clear escalations while policy exceptions remain under client control.',
    heroImage: '/blog/images/thumbs/philippines-customer-support-knowledge-base-workflow.webp',
    heroAlt: 'Customer support specialist reviewing a documented case and response guide',
    tasks: ['triaging messages by approved reason and urgency rules', 'sending approved responses and documenting outcomes', 'preparing escalations with a complete customer timeline'],
    inputs: ['Support policies, approved macros, and channel service levels', 'Examples of routine cases and escalation triggers', 'Account access, identity checks, and refund boundaries'],
    deliverables: ['A categorized and current support queue', 'Complete case records with response evidence', 'An escalation packet for policy or refund decisions'],
    decisions: ['Refunds, credits, and policy exceptions', 'Legal, safety, fraud, or high-risk customer responses'],
    scenarios: ['The inbox has inconsistent tags and unclear urgency.', 'Agents spend time rebuilding context for escalated cases.', 'Leaders need quality evidence beyond ticket volume.'],
    related: ['knowledge-base-management', 'ecommerce-operations', 'data-quality-review'],
  }),
  'sales-operations-support': buildService({
    title: 'Sales Operations Support', keyword: 'sales operations', role: 'The sales operations specialist',
    audience: 'For revenue teams whose lead records, routing, and pipeline fields are unreliable, leaving sellers to spend time on administration instead of qualified conversations.',
    heroImage: '/blog/images/thumbs/philippines-sales-operations-pipeline-hygiene-2026.webp',
    heroAlt: 'Sales operations specialist checking pipeline stages and lead records',
    tasks: ['checking lead records and routing approved assignments', 'preparing follow-up queues and missing-field requests', 'flagging stalled opportunities and stage inconsistencies'],
    inputs: ['Lifecycle definitions, territory rules, and required CRM fields', 'Approved lead sources and duplicate handling guidance', 'Pipeline review cadence and named sales owners'],
    deliverables: ['A clean lead intake and assignment queue', 'A follow-up list with missing information highlighted', 'A pipeline hygiene report with owner actions'],
    decisions: ['Lead qualification and opportunity strategy', 'Pricing, discount, forecast, and account ownership choices'],
    scenarios: ['New leads wait because assignment rules are applied manually.', 'Pipeline stages do not match the latest customer activity.', 'Duplicate and incomplete records distort weekly reporting.'],
    related: ['crm-administration', 'reporting-administration', 'data-quality-review'],
  }),
  'project-tracking': buildService({
    title: 'Project Tracking', keyword: 'project tracking', role: 'The project support specialist',
    audience: 'For delivery leaders who have defined projects but lack a dependable rhythm for updating milestones, collecting status evidence, and surfacing blocked work.',
    heroImage: '/blog/images/thumbs/philippines-project-status-reporting.webp',
    heroAlt: 'Project coordinator reviewing milestones, blockers, and action owners',
    tasks: ['maintaining milestones, owners, dependencies, and due dates', 'collecting updates and chasing missing status inputs', 'turning blockers into concise decision-ready reports'],
    inputs: ['The approved project plan and milestone definitions', 'Update templates, reporting cadence, and source systems', 'Escalation thresholds and accountable workstream owners'],
    deliverables: ['A current project board with evidence-linked updates', 'A blocker and dependency register', 'A concise status brief for the project owner'],
    decisions: ['Scope, budget, staffing, and deadline changes', 'Acceptance of risk or changes to delivery commitments'],
    scenarios: ['Status meetings are spent reconstructing basic progress.', 'Dependencies become visible only after a milestone slips.', 'Several workstream updates need one consistent format.'],
    related: ['operations-coordination', 'reporting-administration', 'process-documentation'],
  }),
  'vendor-coordination': buildService({
    title: 'Vendor Coordination', keyword: 'vendor coordination', role: 'The vendor coordinator',
    audience: 'For procurement and operations teams managing repeat vendor requests, documents, and due dates while retaining negotiation, supplier selection, and contract authority.',
    heroImage: '/blog/images/thumbs/philippines-vendor-follow-up-aging.webp',
    heroAlt: 'Vendor coordinator checking supplier documents, requests, and due dates',
    tasks: ['logging vendor requests and maintaining follow-up dates', 'collecting standard documents and checking completeness', 'preparing unresolved items for the internal vendor owner'],
    inputs: ['An approved vendor list and contact directory', 'Document checklists, due-date rules, and message templates', 'Escalation triggers and the responsible commercial owner'],
    deliverables: ['A vendor request tracker with current status', 'A completeness check for required supplier documents', 'An aging and escalation report for unresolved items'],
    decisions: ['Supplier selection, pricing, and commercial negotiation', 'Contract terms, exceptions, and vendor termination'],
    scenarios: ['Vendor follow-ups are spread across individual inboxes.', 'Missing documents delay onboarding or routine work.', 'Owners need a reliable view of overdue supplier actions.'],
    related: ['operations-coordination', 'finance-administration', 'process-documentation'],
  }),
  'data-quality-review': buildService({
    title: 'Data Quality Review', keyword: 'data quality', role: 'The data quality specialist',
    audience: 'For system owners whose operational records contain missing, inconsistent, or duplicate values and who need evidence-based review before authorized corrections are made.',
    heroImage: '/blog/images/thumbs/philippines-data-entry-quality-checks.webp',
    heroAlt: 'Data quality reviewer comparing records against validation requirements',
    tasks: ['checking records against required-field and format rules', 'identifying likely duplicates and source mismatches', 'building exception queues for authorized correction'],
    inputs: ['A data dictionary with valid values and required fields', 'Trusted source records and matching rules', 'Correction permissions and exception owners'],
    deliverables: ['A validated record set with check results', 'A duplicate and missing-data exception queue', 'A quality summary by error type and source'],
    decisions: ['Which source is authoritative when records conflict', 'Deletion, merge, or material correction of disputed records'],
    scenarios: ['A migration exposed inconsistent required fields.', 'Duplicate records interfere with routing and reporting.', 'Leaders need a repeatable sample before a bulk update.'],
    related: ['crm-administration', 'reporting-administration', 'sales-operations-support'],
  }),
  'reporting-administration': buildService({
    title: 'Reporting Administration', keyword: 'reporting administration', role: 'The reporting specialist',
    audience: 'For operations leaders who rely on recurring reports but lose time collecting sources, reconciling definitions, and checking whether each refresh is ready to publish.',
    heroImage: '/blog/images/thumbs/philippines-reporting-administration-2026.webp',
    heroAlt: 'Reporting specialist reconciling source data before a scheduled report',
    tasks: ['collecting approved source files on schedule', 'refreshing defined calculations and reconciliation checks', 'preparing publication notes and discrepancy escalations'],
    inputs: ['Report definitions, calculation logic, and reporting calendar', 'Approved source locations and prior accepted examples', 'Tolerance rules, reviewer assignments, and publish permissions'],
    deliverables: ['A refreshed report with source references', 'A reconciliation and discrepancy log', 'A reviewer-ready publication packet'],
    decisions: ['Changes to metric definitions or business interpretation', 'Acceptance of unresolved discrepancies and final publication'],
    scenarios: ['Recurring reports depend on manual source collection.', 'Teams debate metrics because definitions are not attached.', 'Reviewers need discrepancies highlighted before publication.'],
    related: ['data-quality-review', 'finance-administration', 'project-tracking'],
  }),
  'recruitment-coordination': buildService({
    title: 'Recruitment Coordination', keyword: 'recruitment coordination', role: 'The recruitment coordinator',
    audience: 'For hiring teams that need consistent interview scheduling, candidate records, and stage follow-up while evaluation and employment decisions remain with authorized leaders.',
    heroImage: '/blog/images/thumbs/philippines-recruitment-interview-coordination.webp',
    heroAlt: 'Recruitment coordinator organizing interview stages and candidate materials',
    tasks: ['scheduling interviews across candidate and panel calendars', 'maintaining stage records and approved candidate communications', 'collecting feedback and flagging delayed next steps'],
    inputs: ['Role stages, interview panels, and scheduling preferences', 'Approved templates, candidate privacy rules, and system access', 'Feedback deadlines and escalation contacts'],
    deliverables: ['A current candidate stage tracker', 'Confirmed interview schedules and complete packets', 'A feedback aging and next-step report'],
    decisions: ['Candidate evaluation, selection, and compensation', 'Exceptions to hiring policy or approved role requirements'],
    scenarios: ['Scheduling loops create delays for candidates and panels.', 'Interview feedback is late or stored inconsistently.', 'Recruiters need a clean view of stalled hiring stages.'],
    related: ['executive-administration', 'operations-coordination', 'process-documentation'],
  }),
  'knowledge-base-management': buildService({
    title: 'Knowledge Base Management', keyword: 'knowledge base', role: 'The knowledge specialist',
    audience: 'For support and operations teams whose approved answers are difficult to find, inconsistently structured, or left live after policies and processes change.',
    heroImage: '/blog/images/thumbs/philippines-knowledge-base-review-cadence-2026.webp',
    heroAlt: 'Knowledge specialist reviewing article ownership and scheduled update dates',
    tasks: ['drafting articles from approved source material', 'applying taxonomy, links, owners, and review dates', 'flagging stale or conflicting guidance for owner review'],
    inputs: ['Approved source documents and representative questions', 'Article templates, taxonomy, style, and publishing rules', 'Named subject owners and review frequency'],
    deliverables: ['Structured draft or updated knowledge articles', 'A stale-content and source-conflict register', 'An ownership and review-date dashboard'],
    decisions: ['Policy meaning and the approved answer to disputed questions', 'Final publication of sensitive or materially changed guidance'],
    scenarios: ['Teams answer the same question from different documents.', 'Published articles have no owner or review date.', 'Recurring support cases reveal missing internal guidance.'],
    related: ['process-documentation', 'customer-support-operations', 'operations-coordination'],
  }),
  'ecommerce-operations': buildService({
    title: 'Ecommerce Operations', keyword: 'ecommerce operations', role: 'The ecommerce operations specialist',
    audience: 'For online retail teams with repeat order, catalog, and fulfillment queues that need consistent monitoring while refunds, fraud, and commercial exceptions stay controlled.',
    heroImage: '/blog/images/thumbs/philippines-ecommerce-order-exception-controls.webp',
    heroAlt: 'Ecommerce operations specialist reviewing order status and fulfillment exceptions',
    tasks: ['monitoring order states and routine fulfillment exceptions', 'updating approved catalog and customer record fields', 'preparing refund, fraud, and inventory escalations'],
    inputs: ['Order-state definitions and fulfillment service levels', 'Catalog rules, approved templates, and platform permissions', 'Refund, fraud, inventory, and escalation boundaries'],
    deliverables: ['A current order and fulfillment exception queue', 'Completed routine catalog or record updates', 'An evidence packet for refund or fraud review'],
    decisions: ['Refund approval, fraud disposition, and customer concessions', 'Pricing, inventory allocation, and supplier commitments'],
    scenarios: ['Orders remain in exception states without clear ownership.', 'Routine catalog updates create inconsistent product data.', 'Refund reviewers receive cases without complete evidence.'],
    related: ['customer-support-operations', 'data-quality-review', 'vendor-coordination'],
  }),
  'crm-administration': buildService({
    title: 'CRM Administration', keyword: 'CRM administration', role: 'The CRM specialist',
    audience: 'For revenue and service teams whose CRM records, approved field changes, and ownership queues need disciplined administration without transferring commercial authority.',
    heroImage: '/blog/images/thumbs/philippines-crm-data-quality-review-2026.webp',
    heroAlt: 'CRM administrator checking account fields, duplicates, and ownership changes',
    tasks: ['completing approved field and lifecycle updates', 'reviewing duplicate, merge, and ownership queues', 'documenting change evidence and unresolved conflicts'],
    inputs: ['CRM field definitions and lifecycle rules', 'Approved change requests and trusted source evidence', 'Role permissions, merge rules, and accountable owners'],
    deliverables: ['A completed change queue with audit notes', 'A duplicate and ownership conflict register', 'A CRM completeness and aging report'],
    decisions: ['Account ownership and disputed lifecycle status', 'Bulk changes, record merges, and deletion approval'],
    scenarios: ['Field updates arrive through untracked chat messages.', 'Duplicate accounts split activity and reporting.', 'Ownership conflicts block routing and follow-up.'],
    related: ['sales-operations-support', 'data-quality-review', 'reporting-administration'],
  }),
  'finance-administration': buildService({
    title: 'Finance Administration', keyword: 'finance administration', role: 'The finance operations specialist',
    audience: 'For finance and operations teams with repeat invoice, transaction, and reconciliation preparation that must stay separate from payment authority and accounting judgment.',
    heroImage: '/blog/images/thumbs/philippines-month-end-administration-checklist.webp',
    heroAlt: 'Finance operations specialist preparing invoice and reconciliation support records',
    tasks: ['preparing invoice records and completeness checks', 'matching routine transactions to approved source evidence', 'maintaining discrepancy queues and follow-up notes'],
    inputs: ['Invoice requirements, coding references, and source locations', 'Reconciliation rules, period calendar, and accepted examples', 'Segregated permissions and named finance approvers'],
    deliverables: ['A complete invoice preparation queue', 'A transaction reconciliation worksheet', 'A discrepancy packet for finance owner review'],
    decisions: ['Payment release, accounting treatment, and tax position', 'Write-offs, credit decisions, and exceptions to finance policy'],
    scenarios: ['Invoices arrive without required evidence or coding.', 'Routine reconciliations consume qualified finance time.', 'Approvers need discrepancies separated from clean items.'],
    related: ['reporting-administration', 'vendor-coordination', 'data-quality-review'],
  }),
  'process-documentation': buildService({
    title: 'Process Documentation', keyword: 'process documentation', role: 'The process documentation specialist',
    audience: 'For operations teams that rely on tribal knowledge, outdated checklists, or scattered examples and need maintainable instructions with clear owner approval.',
    heroImage: '/blog/images/thumbs/philippines-operations-documentation-handoff.webp',
    heroAlt: 'Process documentation specialist organizing approved steps and workflow evidence',
    tasks: ['turning observed approved work into structured instructions', 'maintaining checklists, screenshots, sources, and version notes', 'routing gaps and contradictory guidance to process owners'],
    inputs: ['Approved examples, recordings, and current source material', 'Documentation templates, vocabulary, and repository access', 'Process owners, review dates, and publication rules'],
    deliverables: ['A structured process guide with decision points', 'A reusable checklist linked to source evidence', 'A gap, change, and scheduled-review register'],
    decisions: ['Which process or policy is authoritative', 'Approval of changed steps, controls, and published guidance'],
    scenarios: ['Key work depends on one experienced teammate.', 'Instructions no longer match the production workflow.', 'A new service lane needs a reviewable training baseline.'],
    related: ['knowledge-base-management', 'operations-coordination', 'project-tracking'],
  }),
};
