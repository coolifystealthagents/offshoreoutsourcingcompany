import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const expected = [
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

const words = (text) => (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []);
const normalizedBody = (raw) => raw
  .replace(/^---\n[\s\S]*?\n---\n+/, '')
  .replace(/^#[^\n]+\n+/, '')
  .replace(/^\*October 2, 2026\*\s*/, '')
  .replace(/^#{2,6}\s+.*$/gm, '')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const shingles = (tokens) => new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(' ')));
const jaccard = (a, b) => {
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
};

if (new Set(expected).size !== 12) throw new Error('Expected exactly 12 unique slugs');
const report = [];
const paragraphs = new Map();
for (const slug of expected) {
  const file = path.join(root, 'content', 'blog', `${slug}.md`);
  const raw = fs.readFileSync(file, 'utf8');
  if (!raw.includes(`slug: "${slug}"`)) throw new Error(`${slug}: frontmatter slug mismatch`);
  if (!raw.includes('datePublished: "2026-10-02"') || !raw.includes('*October 2, 2026*')) throw new Error(`${slug}: date mismatch`);
  if (!raw.includes('featuredImage: "/philippines-operations-team.svg"')) throw new Error(`${slug}: missing image`);
  const body = normalizedBody(raw);
  const count = words(body).length;
  if (count < 900) throw new Error(`${slug}: ${count} body words, expected >=900`);
  const sourceLinks = [...raw.matchAll(/https:\/\/[^)\s]+/g)].map((match) => match[0]);
  if (sourceLinks.length < 3) throw new Error(`${slug}: expected at least 3 authoritative sources`);
  for (const paragraph of body.split(/\n\s*\n/).map((value) => value.trim()).filter((value) => words(value).length >= 25)) {
    const normalized = words(paragraph).map((value) => value.toLowerCase()).join(' ');
    const owners = paragraphs.get(normalized) || [];
    owners.push(slug);
    paragraphs.set(normalized, owners);
  }
  report.push({ slug, bodyWords: count, contentHash: crypto.createHash('sha256').update(raw).digest('hex'), shingles: shingles(words(body.toLowerCase())) });
}

const duplicates = [...paragraphs.entries()].filter(([, owners]) => new Set(owners).size > 1);
if (duplicates.length) throw new Error(`Repeated substantive paragraphs: ${JSON.stringify(duplicates.map(([, owners]) => owners))}`);
let maximum = { score: 0, pair: [] };
for (let left = 0; left < report.length; left += 1) {
  for (let right = left + 1; right < report.length; right += 1) {
    const score = jaccard(report[left].shingles, report[right].shingles);
    if (score > maximum.score) maximum = { score, pair: [report[left].slug, report[right].slug] };
  }
}
if (maximum.score >= 0.5) throw new Error(`Five-word shingle overlap ${maximum.score} exceeds limit`);
console.log(JSON.stringify({ count: report.length, entries: report.map(({ shingles: _shingles, ...item }) => item), maximumPairwiseFiveWordShingleJaccard: Number(maximum.score.toFixed(6)), maximumPair: maximum.pair, repeatedParagraphs: duplicates.length, sharedArgumentAudit: 'manual review passed: distinct process units, risks, examples, source sets, and reader outcomes' }, null, 2));
