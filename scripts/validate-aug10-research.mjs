import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const manifestPath = '.paperclip/aug10-2026/research.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const data = fs.readFileSync('app/data.ts', 'utf8');
const detail = fs.readFileSync('app/research/[slug]/page.tsx', 'utf8');
const index = fs.readFileSync('app/research/page.tsx', 'utf8');
const sitemap = fs.readFileSync('app/sitemap.xml/route.ts', 'utf8');
const expectedSlugs = [
  'philippines-outsourced-access-request-review',
  'philippines-outsourced-appointment-confirmation-controls',
  'philippines-outsourced-calendar-preparation-evidence',
  'philippines-outsourced-content-brief-quality-checks',
  'philippines-outsourced-customer-feedback-coding',
  'philippines-outsourced-handoff-acceptance-criteria',
  'philippines-outsourced-invoice-intake-controls',
  'philippines-outsourced-lead-research-qualification-controls',
  'philippines-outsourced-order-status-reconciliation',
  'philippines-outsourced-refund-request-routing',
  'philippines-outsourced-research-source-register',
  'philippines-outsourced-returns-intake-research',
  'philippines-outsourced-work-queue-prioritization',
  'philippines-outsourced-work-sample-review-method',
];
const manifestKeys = ['schemaVersion','contract','targetDate','family','domain','repository','branch','minimum','priorRunId','priorIssueId','validationCommands','cleanBuildPassed','existingCompliancePassed','indexNewestFirstPassed','entries'];
if (JSON.stringify(Object.keys(manifest)) !== JSON.stringify(manifestKeys)) throw new Error('manifest top-level keys mismatch');
if (JSON.stringify([...new Set(manifest.entries.map(entry => entry.slug))].sort()) !== JSON.stringify([...expectedSlugs].sort())) throw new Error('frozen slug identity mismatch');
if (manifest.entries.length < 10) throw new Error('accepted count below minimum');
if (manifest.entries.length !== 14) throw new Error(`unexpected accepted count: ${manifest.entries.length}`);
if (manifest.targetDate !== '2026-08-10' || manifest.family !== 'research') throw new Error('manifest scope mismatch');
const slugs = new Set();
for (const entry of manifest.entries) {
  if (slugs.has(entry.slug)) throw new Error(`duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  if (JSON.stringify(Object.keys(entry)) !== JSON.stringify(['slug','route','sourcePath','provenance','introducedByCommit','sourceDateField','sourceDate','renderedDateFields','renderedDate'])) throw new Error(`entry keys mismatch: ${entry.slug}`);
  if (!entry.route.startsWith('/research/')) throw new Error(`wrong family route: ${entry.route}`);
  if (!entry.sourcePath || !fs.existsSync(entry.sourcePath)) throw new Error(`missing source: ${entry.sourcePath}`);
  if (entry.sourceDateField !== 'date' || entry.sourceDate !== '2026-08-10') throw new Error(`bad source date: ${entry.slug}`);
  if (entry.renderedDate !== '2026-08-10' || !entry.renderedDateFields.includes('datePublished') || !entry.renderedDateFields.includes('time[datetime]')) throw new Error(`bad rendered date: ${entry.slug}`);
  if (!data.includes(`slug: '${entry.slug}'`)) throw new Error(`source record missing: ${entry.slug}`);
  if (entry.provenance !== 'original-aug10-batch') throw new Error(`bad provenance: ${entry.slug}`);
  if (!/^[0-9a-f]{40}$/.test(entry.introducedByCommit)) throw new Error(`bad introducing commit: ${entry.slug}`);
  if (entry.introducedByCommit !== 'f06001d383dafc10b8d572ed4e2c9167f71df72b') throw new Error(`wrong original introduction commit: ${entry.slug}`);
  execFileSync('git', ['show', `${entry.introducedByCommit}:${entry.sourcePath}`], {encoding: 'utf8'});
  const sourceRecord = `slug: '${entry.slug}', date: '2026-08-10'`;
  if (!data.includes(sourceRecord)) throw new Error(`dated source record missing: ${entry.slug}`);
  if (!detail.includes('datePublished') || !detail.includes('dateTime={p.date}')) throw new Error('rendered date implementation missing');
  if (!detail.includes(`canonical:\`/research/\${p.slug}\``)) throw new Error('canonical implementation missing');
  if (!sitemap.includes('researchPosts.map')) throw new Error('sitemap eligibility implementation missing');
}
if (!index.includes('sort((a,b)=>(b.date||\'0000-00-00\').localeCompare(a.date||\'0000-00-00\'))')) throw new Error('index is not newest-first');
if (!fs.existsSync('.next/server/app-paths-manifest.json')) throw new Error('clean build output missing');
for (const entry of manifest.entries) {
  const routePath = `.next/server/app/research/${entry.slug}.html`;
  if (!fs.existsSync(routePath)) throw new Error(`built route missing: ${entry.slug}`);
  const html = fs.readFileSync(routePath, 'utf8');
  if (!html.includes('2026-08-10')) throw new Error(`built date missing: ${entry.slug}`);
  if (!html.includes(`https://offshoreoutsourcingcompany.com/research/${entry.slug}`)) throw new Error(`canonical route missing: ${entry.slug}`);
}
console.log(`PASS ${manifest.entries.length} August 10 research entries; manifest sha256 ${crypto.createHash('sha256').update(fs.readFileSync(manifestPath)).digest('hex')}`);
