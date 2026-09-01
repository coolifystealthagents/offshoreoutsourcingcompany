import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const origin = process.env.VALIDATION_ORIGIN || 'http://127.0.0.1:39091';
const blog = [
  'philippines-daily-publishing-intake-control',
  'offshore-article-brief-readiness-check',
  'philippines-editorial-source-packet',
  'offshore-content-outline-approval-gate',
  'philippines-draft-to-review-handoff',
  'offshore-article-claim-verification-routine',
  'philippines-editorial-revision-queue',
  'offshore-content-canonical-route-checklist',
  'philippines-content-internal-link-review',
  'offshore-editorial-owner-wait-time',
  'philippines-publishing-day-closeout',
  'offshore-content-exception-retrospective',
];
const research = [
  'offshore-daily-publishing-throughput-evidence-study',
  'philippines-content-brief-completeness-research',
  'offshore-article-originality-route-distinctness-study',
  'philippines-editorial-review-agreement-study',
  'daily-content-publication-control-reliability-research',
];
const manifest = [...blog.map((slug) => ({ family: 'blog', slug })), ...research.map((slug) => ({ family: 'research', slug }))];
assert.equal(blog.length, 12);
assert.equal(research.length, 5);
assert.equal(new Set(manifest.map(({ family, slug }) => `/${family}/${slug}`)).size, 17);

const indexHtml = {
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
  assert.match(html, /September 1, 2026/, `${path} missing visible date`);
  assert.match(html, /2026-09-01/, `${path} missing structured date`);
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${path} is not self-canonical`);
  assert.ok(html.includes('"datePublished":"2026-09-01"'), `${path} missing JSON-LD datePublished`);
  assert.ok(indexHtml[family].includes(`href="${path}"`), `${path} missing from ${family} index`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${path} missing from sitemap`);
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] || html;
  hashes.add(createHash('sha256').update(main).digest('hex'));
}
assert.equal(hashes.size, 17, 'article response bodies are not all unique');
const missing = await fetch(`${origin}/blog/september-1-route-that-does-not-exist`, { redirect: 'manual' });
assert.equal(missing.status, 404, 'invalid slug is a soft fallback');
console.log(`Validated ${blog.length} Blog + ${research.length} Research routes for 2026-09-01; ${hashes.size} unique body hashes.`);
