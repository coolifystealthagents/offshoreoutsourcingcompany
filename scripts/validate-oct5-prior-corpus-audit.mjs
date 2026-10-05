import fs from 'node:fs';
import path from 'node:path';

const cycleDirectory = '.paperclip/daily-content/2026-10-05';
const audit = JSON.parse(fs.readFileSync(`${cycleDirectory}/prior-corpus-topic-audit.json`, 'utf8'));
const blogAudit = JSON.parse(fs.readFileSync(`${cycleDirectory}/blog-topic-audit.json`, 'utf8'));
const researchManifest = JSON.parse(fs.readFileSync(`${cycleDirectory}/research.json`, 'utf8'));

const researchRows = researchManifest.articles || researchManifest.entries || researchManifest.items;
if (!Array.isArray(researchRows)) throw new Error('research manifest has no article array');

const expected = new Map([
  ...blogAudit.candidates.map(({slug}) => [slug, 'blog']),
  ...researchRows.map(({slug}) => [slug, 'research']),
]);
if (expected.size !== 17) throw new Error(`expected a 17-item combined batch, found ${expected.size}`);
if (!Array.isArray(audit.entries) || audit.entries.length !== 17) {
  throw new Error(`prior-corpus audit must contain exactly 17 entries, found ${audit.entries?.length ?? 0}`);
}

const currentSlugs = new Set(expected.keys());
const corpusSlugs = new Set(
  ['content/blog', 'content/research'].flatMap((directory) =>
    fs.readdirSync(directory)
      .filter((name) => name.endsWith('.md'))
      .map((name) => path.basename(name, '.md')),
  ),
);
const requiredDecisions = [
  'topicDecision',
  'nearestPrior',
  'coreArgumentDecision',
  'workedExampleDecision',
  'distinctReaderDecision',
];
const observed = new Set();

for (const entry of audit.entries) {
  if (!expected.has(entry.slug)) throw new Error(`${entry.slug}: not in the current combined batch`);
  if (observed.has(entry.slug)) throw new Error(`${entry.slug}: duplicate audit entry`);
  observed.add(entry.slug);
  if (entry.family !== expected.get(entry.slug)) {
    throw new Error(`${entry.slug}: expected ${expected.get(entry.slug)} family, found ${entry.family}`);
  }
  for (const field of requiredDecisions) {
    if (typeof entry[field] !== 'string' || entry[field].trim().length < 12) {
      throw new Error(`${entry.slug}: missing substantive ${field}`);
    }
  }
  if (!corpusSlugs.has(entry.nearestPrior)) {
    throw new Error(`${entry.slug}: nearest prior ${entry.nearestPrior} does not exist in Blog or Research`);
  }
  if (currentSlugs.has(entry.nearestPrior)) {
    throw new Error(`${entry.slug}: nearest prior points into the current batch`);
  }
}

for (const slug of expected.keys()) {
  if (!observed.has(slug)) throw new Error(`${slug}: missing from prior-corpus audit`);
}
for (const field of ['topicDecision', 'coreArgumentDecision', 'workedExampleDecision', 'distinctReaderDecision']) {
  const values = audit.entries.map((entry) => entry[field].trim().toLowerCase());
  if (new Set(values).size !== values.length) throw new Error(`${field}: duplicated across current batch`);
}
if (!String(audit.decision).startsWith('passed')) throw new Error('audit decision has not passed');

console.log(JSON.stringify({
  count: audit.entries.length,
  familyCounts: Object.fromEntries(['blog', 'research'].map((family) => [family, audit.entries.filter((entry) => entry.family === family).length])),
  priorCorpusSize: corpusSlugs.size - currentSlugs.size,
  checks: {
    exactCombinedBatchMembership: 'passed',
    fullEarlierBlogAndResearchNearestPriorResolution: 'passed',
    currentCrossFamilyDistinctness: 'passed',
    topicCoreArgumentWorkedExampleAndReaderDecision: 'passed',
  },
  decision: audit.decision,
}, null, 2));
