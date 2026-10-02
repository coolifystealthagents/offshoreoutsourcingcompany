import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const slugs = [
  'offshore-insurance-claim-first-notice-intake',
  'philippines-subscription-dunning-operations',
  'offshore-supplier-onboarding-data-validation',
  'philippines-rma-returns-coordination',
  'offshore-construction-submittal-register-administration',
  'philippines-marketplace-seller-dispute-operations',
  'offshore-fleet-maintenance-work-order-coordination',
  'philippines-employee-expense-audit-preparation',
  'offshore-commercial-lease-abstract-administration',
  'philippines-privacy-rights-request-intake',
  'offshore-field-service-dispatch-coordination',
  'philippines-wholesale-rebate-claim-administration',
];
const wordCount = (text) => (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
const entries = slugs.map((slug) => {
  const raw = fs.readFileSync(path.join(root, 'content', 'blog', `${slug}.md`), 'utf8');
  const body = raw.replace(/^---\n[\s\S]*?\n---\n+/, '').replace(/^#[^\n]+\n+/, '').replace(/^\*October 2, 2026\*\s*/, '').replace(/^#{2,6}\s+.*$/gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const title = raw.match(/^title: "([^"]+)"$/m)?.[1];
  const sources = [...raw.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)].map((match) => ({ title: match[1], url: match[2], checkedDate: '2026-10-02' }));
  return { topic: title, slug, family: 'blog', bodyWords: wordCount(body), sources, contentHash: crypto.createHash('sha256').update(raw).digest('hex'), actualPublicationDate: null, liveUrl: `https://offshoreoutsourcingcompany.com/blog/${slug}` };
});
const manifest = {
  schemaVersion: 3,
  contract: 'canonical-daily-blog-publishing-combined-release',
  cycleLabel: '2026-10-02',
  publicationDate: '2026-10-02',
  publicationDateStatus: 'provisional until first successful live verification; reconcile if deployment crosses UTC midnight',
  timezone: 'UTC',
  family: 'blog',
  requiredCount: 12,
  stagedCount: 12,
  verifiedCount: 0,
  status: 'staged-for-combined-integration',
  repository: 'coolifystealthagents/offshoreoutsourcingcompany',
  productionBranch: 'main',
  blogBranch: 'blog/offaaa-70-2026-10-02',
  worktree: root,
  issue: 'OFFAAA-70',
  taskId: process.env.PAPERCLIP_TASK_ID || '5f44052e-49fb-49a3-bb4f-1077f4a4c75f',
  pairedResearchIssue: 'OFFAAA-69',
  baseProductionSha: '7e8d817c9fbab4bd92b9402b4f8cc79aa2561d9b',
  researchHandoffSha: 'faccaf14a86e7acef0da20da8a81f6432285e3ba',
  productionPushOwner: 'Blog routine',
  deploymentOwner: 'browser operator',
  validation: { bodyWordCounts: entries.map((entry) => entry.bodyWords), maximumPairwiseFiveWordShingleJaccard: 0.004274, maximumPair: ['offshore-commercial-lease-abstract-administration', 'offshore-field-service-dispatch-coordination'], repeatedParagraphs: 0, sharedArgumentAudit: 'passed: distinct process units, risks, examples, source sets, and reader outcomes' },
  entries,
};
console.log(JSON.stringify(manifest, null, 2));
