import fs from 'node:fs';

const target = '2026-08-10';
const data = fs.readFileSync('app/data.ts', 'utf8');
const route = fs.readFileSync('app/blog/[slug]/page.tsx', 'utf8');
const index = fs.readFileSync('app/blog/page.tsx', 'utf8');
const pagedIndex = fs.readFileSync('app/blog/page/[page]/page.tsx', 'utf8');
const manifest = JSON.parse(fs.readFileSync('.paperclip/aug10-2026/blog.json', 'utf8'));
const sourceSlugs = [...data.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
const accepted = manifest.entries;
const frozenSlugs = [
  'philippines-appointment-scheduling-workflow', 'philippines-customer-feedback-review-routine', 'philippines-customer-onboarding-coordination',
  'philippines-customer-record-update-controls', 'philippines-customer-refund-case-preparation', 'philippines-ecommerce-catalog-data-checks',
  'philippines-employee-onboarding-administration', 'philippines-invoice-follow-up-process', 'philippines-knowledge-transfer-session-plan',
  'philippines-lead-list-quality-review', 'philippines-month-end-administration-checklist', 'philippines-operations-backlog-aging-review',
  'philippines-operations-documentation-handoff', 'philippines-outsourced-calendar-handoff', 'philippines-outsourced-knowledge-audit',
  'philippines-outsourced-order-entry-controls', 'philippines-outsourced-qa-sampling-plan', 'philippines-outsourced-research-assistant-scope',
  'philippines-outsourced-task-priority-rules', 'philippines-purchase-order-coordination', 'philippines-remote-work-continuity-checklist',
  'philippines-renewal-coordination-workflow', 'philippines-service-request-intake-form', 'philippines-shared-inbox-sla-controls',
  'philippines-support-ticket-tagging-guide',
];
if (accepted.length !== 25 || accepted.length < 22) throw new Error(`accepted count ${accepted.length} is not the frozen 25`);
if (new Set(accepted.map((entry) => entry.slug)).size !== accepted.length) throw new Error('duplicate accepted slug');
if (new Set(frozenSlugs).size !== 25 || frozenSlugs.some((slug) => !accepted.some((entry) => entry.slug === slug))) throw new Error('frozen identity mismatch');
for (const entry of accepted) {
  if (!entry.route.startsWith('/blog/') || entry.route !== `/blog/${entry.slug}`) throw new Error(`bad route ${entry.slug}`);
  if (!sourceSlugs.includes(entry.slug)) throw new Error(`missing source slug ${entry.slug}`);
  if (entry.sourceDate !== target || entry.renderedDate !== target) throw new Error(`bad date ${entry.slug}`);
  if (entry.sourceDateField !== 'publishedAt') throw new Error(`bad source field ${entry.slug}`);
  if (!entry.renderedDateFields.includes('datePublished') || !entry.renderedDateFields.includes('time[datetime]')) throw new Error(`missing rendered date fields ${entry.slug}`);
  if (!entry.route.includes('/blog/')) throw new Error(`wrong family ${entry.slug}`);
}
if (!route.includes("...(publishedAt ? { datePublished: publishedAt } : {})")) throw new Error('JSON-LD datePublished missing');
if (!route.includes('dateTime={publishedAt}')) throw new Error('visible time datetime missing');
if (!route.includes('Published August 10, 2026')) throw new Error('visible date missing');
if (!data.includes('const dateA = a.post.publishedAt ??')) throw new Error('normalized date comparator missing');
if (!data.includes('return dateB.localeCompare(dateA) || a.index - b.index')) throw new Error('deterministic newest-first comparator missing');
if (!index.includes('sortBlogPosts(blogPosts)') || !pagedIndex.includes('sortBlogPosts(blogPosts)')) throw new Error('index or paginated sort missing');
if (!route.includes('We can help turn the article into a practical staffing brief with tasks, access rules, and review checkpoints.')) throw new Error('non-date CTA content drift');
if (route.includes('Build the first support lane before hiring</h2><p>Share the work queue')) throw new Error('non-date CTA mutation detected');
if (manifest.family !== 'blog' || manifest.targetDate !== target || manifest.domain !== 'offshoreoutsourcingcompany.com') throw new Error('manifest identity mismatch');
console.log(`PASS: ${accepted.length} blog entries have source, rendered, route, and index-order evidence`);
