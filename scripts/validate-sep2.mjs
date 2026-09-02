import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const origin = process.env.VALIDATION_ORIGIN || 'http://127.0.0.1:39092';
const blog = [
  'philippines-content-morning-queue-triage',
  'offshore-editorial-working-window-design',
  'philippines-article-angle-collision-check',
  'offshore-content-source-expiry-review',
  'philippines-content-reviewer-backup-protocol',
  'offshore-article-fact-change-log',
  'philippines-editorial-link-destination-audit',
  'offshore-content-metadata-handoff',
  'philippines-content-sensitive-claim-routing',
  'offshore-article-post-build-reading-pass',
  'philippines-daily-content-recovery-queue',
  'offshore-publishing-evidence-bundle',
];
const research = [
  'offshore-editorial-queue-readiness-research',
  'philippines-content-source-freshness-study',
  'offshore-content-review-handoff-loss-study',
  'philippines-article-recovery-time-evidence-study',
  'offshore-publishing-manifest-integrity-research',
];
const manifest = [...blog.map(slug => ({ family: 'blog', slug })), ...research.map(slug => ({ family: 'research', slug }))];
assert.equal(blog.length, 12);
assert.equal(research.length, 5);
assert.equal(new Set(manifest.map(x => `/${x.family}/${x.slug}`)).size, 17);

const indexes = {
  blog: await (await fetch(`${origin}/blog`)).text(),
  research: await (await fetch(`${origin}/research`)).text(),
};
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const hashes = new Set();

for (const { family, slug } of manifest) {
  const path = `/${family}/${slug}`;
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path} did not return 200`);
  const html = await response.text();
  const canonical = `https://offshoreoutsourcingcompany.com${path}`;
  assert.match(html, /September 2, 2026/, `${path} missing visible date`);
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${path} is not self-canonical`);
  assert.ok(html.includes('"datePublished":"2026-09-02"'), `${path} missing JSON-LD datePublished`);
  assert.ok(html.includes(`"mainEntityOfPage":"${canonical}"`), `${path} missing structured canonical URL`);
  assert.ok(indexes[family].includes(`href="${path}"`), `${path} missing from ${family} index`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${path} missing from sitemap`);
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(article, `${path} missing article body`);
  const hash = createHash('sha256').update(article).digest('hex');
  assert.ok(!hashes.has(hash), `${path} duplicates another rendered article body`);
  hashes.add(hash);
}

for (const path of ['/blog/philippines-content-morning-queue-triage-near-match', '/research/offshore-editorial-queue-readiness-research-near-match']) {
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 404, `${path} is a soft fallback`);
}

console.log(`Validated ${blog.length} Blog + ${research.length} Research routes for 2026-09-02; ${hashes.size} unique article hashes.`);
