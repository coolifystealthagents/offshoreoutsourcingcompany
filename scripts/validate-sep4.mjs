import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const origin = process.env.VALIDATION_ORIGIN || 'http://127.0.0.1:39094';
const canonicalOrigin = 'https://offshoreoutsourcingcompany.com';
const blog = [
  'philippines-operations-friday-queue-close',
  'offshore-customer-support-promise-register',
  'philippines-crm-ownerless-record-review',
  'offshore-vendor-certificate-expiry-tracker',
  'philippines-ecommerce-address-change-handoff',
  'offshore-executive-inbox-decision-digest',
  'philippines-recruitment-reference-check-handoff',
  'offshore-report-distribution-access-check',
  'philippines-knowledge-base-broken-link-sweep',
  'offshore-sales-meeting-followup-control',
  'philippines-project-blocker-age-review',
  'offshore-content-publication-readiness-huddle',
];
const research = [
  'philippines-operations-handoff-retrieval-study',
  'offshore-support-promise-completion-evidence-study',
  'philippines-crm-routing-rule-drift-research',
  'offshore-document-expiry-reminder-timing-study',
  'philippines-knowledge-base-link-decay-study',
];
const manifest = [...blog.map(slug => ({ family: 'blog', slug })), ...research.map(slug => ({ family: 'research', slug }))];
assert.equal(blog.length, 12);
assert.equal(research.length, 5);
assert.equal(new Set(manifest.map(x => `/${x.family}/${x.slug}`)).size, 17);

const indexResponses = Object.fromEntries(await Promise.all(['blog', 'research'].map(async family => {
  const response = await fetch(`${origin}/${family}`);
  assert.equal(response.status, 200, `/${family} index did not return 200`);
  return [family, await response.text()];
})));
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, '/sitemap.xml did not return 200');
const sitemap = await sitemapResponse.text();
const identities = new Set();

for (const { family, slug } of manifest) {
  const path = `/${family}/${slug}`;
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path}: direct HTTP 200`);
  const html = await response.text();
  const canonical = `${canonicalOrigin}${path}`;
  assert.match(html, /September 4, 2026/, `${path}: visible date`);
  assert.ok(html.includes('"datePublished":"2026-09-04"'), `${path}: structured datePublished`);
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${path}: self-canonical`);
  assert.ok(indexResponses[family].includes(`href="${path}"`), `${path}: family index membership`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${path}: sitemap membership`);
  const imageSrc = html.match(/<img[^>]+src="([^"]+)"/)?.[1];
  assert.ok(imageSrc, `${path}: rendered image`);
  const imageUrl = new URL(imageSrc, origin);
  const imageResponse = await fetch(imageUrl);
  assert.equal(imageResponse.status, 200, `${path}: image HTTP 200`);
  assert.match(imageResponse.headers.get('content-type') || '', /^image\//, `${path}: valid image content type`);
  assert.match(html, /<meta name="viewport"/, `${path}: responsive viewport`);
  assert.match(html, /width:100%;height:auto/, `${path}: responsive image sizing`);
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(article, `${path}: article body`);
  const identity = createHash('sha256').update(article.replace(/<script[\s\S]*?<\/script>/g, '')).digest('hex');
  assert.ok(!identities.has(identity), `${path}: unique content identity`);
  identities.add(identity);
}

for (const [family, expected] of [['blog', 12], ['research', 5]]) {
  const paths = [...new Set([...indexResponses[family].matchAll(new RegExp(`href="(/${family}/[^"]+)"`, 'g'))].map(match => match[1]))];
  let dated = 0;
  for (const path of paths) {
    const html = await (await fetch(`${origin}${path}`)).text();
    if (html.includes('"datePublished":"2026-09-04"')) dated += 1;
  }
  assert.equal(dated, expected, `${family}: exact September 4 count`);
}

console.log(`PASS: exactly ${blog.length} Blog + ${research.length} Research routes for 2026-09-04; all 17 passed HTTP, date, canonical, family, index, sitemap, image, responsive, and unique-identity gates.`);
