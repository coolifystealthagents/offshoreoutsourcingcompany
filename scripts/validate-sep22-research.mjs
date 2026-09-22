import assert from 'node:assert/strict';

const origin = process.env.VALIDATION_ORIGIN || 'http://127.0.0.1:39122';
const canonicalOrigin = 'https://offshoreoutsourcingcompany.com';
const slugs = [
  'philippines-operations-queue-capacity-signal-study',
  'offshore-data-quality-correction-reversibility-research',
  'philippines-invoice-exception-evidence-sufficiency-study',
  'offshore-process-documentation-change-impact-research',
  'philippines-recruitment-interview-scheduling-equity-control-study',
];

assert.equal(slugs.length, 5);
assert.equal(new Set(slugs).size, 5);
const index = await (await fetch(`${origin}/research`)).text();
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const identities = new Set();

for (const slug of slugs) {
  const path = `/research/${slug}`;
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  const html = await response.text();
  assert.ok(html.includes('September 22, 2026'), `${path}: visible publication date`);
  assert.ok(html.includes('"datePublished":"2026-09-22"'), `${path}: structured datePublished`);
  assert.ok(html.includes(`<link rel="canonical" href="${canonicalOrigin}${path}"`), `${path}: self canonical`);
  assert.ok(index.includes(`href="${path}"`), `${path}: Research index membership`);
  assert.ok(sitemap.includes(`<loc>${canonicalOrigin}${path}</loc>`), `${path}: sitemap membership`);
  assert.ok(html.includes('/philippines-operations-team.svg'), `${path}: hero asset`);
  assert.ok(html.includes('Primary and authoritative sources'), `${path}: source register rendered`);
  assert.ok((html.match(/rel="noreferrer"/g) || []).length >= 3, `${path}: at least three linked authoritative sources`);
  assert.ok(html.includes('Book a Free Consultation'), `${path}: conversion path`);
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1] || '';
  const text = article.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
  assert.ok(text.split(' ').length >= 1200, `${path}: at least 1,200 substantive rendered words`);
  assert.ok(!identities.has(text), `${path}: unique article identity`);
  identities.add(text);
}

const datedLinks = [...index.matchAll(/href="(\/research\/[^"#?]+)"/g)].map(match => match[1]);
let datedCount = 0;
for (const path of new Set(datedLinks)) {
  const html = await (await fetch(`${origin}${path}`)).text();
  if (html.includes('"datePublished":"2026-09-22"')) datedCount += 1;
}
assert.equal(datedCount, 5, 'exactly five Research articles dated 2026-09-22');
console.log('PASS: exactly 5 new Research articles pass HTTP, date, schema, canonical, index, sitemap, asset, source, CTA, 1,200-word, and uniqueness gates.');
