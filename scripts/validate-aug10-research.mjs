import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const manifestPath = '.paperclip/aug10-2026/research.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const data = fs.readFileSync('app/data.ts', 'utf8');
const detail = fs.readFileSync('app/research/[slug]/page.tsx', 'utf8');
const index = fs.readFileSync('app/research/page.tsx', 'utf8');
const sitemap = fs.readFileSync('app/sitemap.xml/route.ts', 'utf8');
if (manifest.entries.length < 10) throw new Error('accepted count below minimum');
if (manifest.entries.length !== 14) throw new Error(`unexpected accepted count: ${manifest.entries.length}`);
if (manifest.targetDate !== '2026-08-10' || manifest.family !== 'research') throw new Error('manifest scope mismatch');
const slugs = new Set();
for (const entry of manifest.entries) {
  if (slugs.has(entry.slug)) throw new Error(`duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  if (!entry.route.startsWith('/research/')) throw new Error(`wrong family route: ${entry.route}`);
  if (!entry.sourcePath || !fs.existsSync(entry.sourcePath)) throw new Error(`missing source: ${entry.sourcePath}`);
  if (entry.sourceDateField !== 'date' || entry.sourceDate !== '2026-08-10') throw new Error(`bad source date: ${entry.slug}`);
  if (entry.renderedDate !== '2026-08-10' || !entry.renderedDateFields.includes('datePublished') || !entry.renderedDateFields.includes('time[datetime]')) throw new Error(`bad rendered date: ${entry.slug}`);
  if (!data.includes(`slug: '${entry.slug}'`)) throw new Error(`source record missing: ${entry.slug}`);
  if (!/^original-aug10-batch$|^repair-replacement$/.test(entry.provenance)) throw new Error(`bad provenance: ${entry.slug}`);
  if (!/^[0-9a-f]{40}$/.test(entry.introducedByCommit)) throw new Error(`bad introducing commit: ${entry.slug}`);
  const committedSource = execFileSync('git', ['show', `${entry.introducedByCommit}:${entry.sourcePath}`], {encoding: 'utf8'});
  const parentSource = execFileSync('git', ['show', `${entry.introducedByCommit}^:${entry.sourcePath}`], {encoding: 'utf8'});
  if (!committedSource.includes(`slug: '${entry.slug}'`)) throw new Error(`slug absent at introducing commit: ${entry.slug}`);
  if (parentSource.includes(`slug: '${entry.slug}'`)) throw new Error(`slug was present before introducing commit: ${entry.slug}`);
  if (!data.includes(`date: '2026-08-10'`)) throw new Error('source date mapping missing');
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
