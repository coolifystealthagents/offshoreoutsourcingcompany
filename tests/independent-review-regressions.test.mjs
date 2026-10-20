import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

const layout = read('app/layout.tsx');
const contactRoute = read('app/api/contact/route.ts');
const form = read('app/contact-us/StandardContactForm.tsx');
const thankYou = read('app/thank-you/page.tsx');
const nextSteps = read('app/thanks-whats-next/page.tsx');
const booking = read('app/booking-components.tsx');
const sidebar = read('app/article-sidebar.tsx');
const services = read('app/services/page.tsx');
const serviceDetail = read('app/services/[slug]/page.tsx');
const pagination = read('app/blog/page/[page]/page.tsx');

assert.doesNotMatch(layout, /path:'\/thank-you'|path:'\/thanks-whats-next'/, 'untrusted route visits must not be funnel conversions');
assert.match(contactRoute, /cookies\.set\('ooc_lead_receipt'/, 'accepted lead must receive a short-lived server receipt');
assert.match(contactRoute, /httpOnly:true/);
assert.match(contactRoute, /sameSite:'lax'/);
assert.match(form, /response\.url/);
assert.match(form, /destination\.origin !== window\.location\.origin/);
assert.match(thankYou, /cookies\(\)/);
assert.match(thankYou, /if \(!receipt\) redirect\('\/contact-us\?status=submit-first'\)/, 'direct thank-you visits must not claim acceptance');
assert.doesNotMatch(nextSteps, /Consultation confirmed|Your time is reserved/);
assert.match(nextSteps, /Visiting this page alone does not confirm a booking/);
assert.match(booking, /href="https:\/\/go\.oncehub\.com\/StealthAgentsTeam"/, 'scheduler needs a same-destination fallback link');

assert.match(sidebar, /root\.prepend\(slot\)/, 'TOC portal slot must precede article content');
assert.match(sidebar, /window\.location\.hash/);
assert.match(sidebar, /scrollIntoView/, 'initial fragment navigation must be retried after heading IDs exist');
const articlePages = [];
for (const family of ['blog', 'research']) {
  const familyUrl = new URL(`app/${family}/`, root);
  for (const dir of readdirSync(familyUrl, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name === '[slug]' || dir.name === 'page') continue;
    const path = `app/${family}/${dir.name}/page.tsx`;
    articlePages.push(path);
    assert.match(read(path), /EditorialArticleFrame/, `${path} must use the shared editorial frame`);
  }
}
assert.equal(articlePages.length, 41, 'all concrete article routes must be covered');

assert.match(pagination, /openGraph:[\s\S]*url[\s\S]*images/);
assert.match(pagination, /twitter:[\s\S]*images/);
for (const [name, source] of [['services index', services], ['service details', serviceDetail]]) {
  assert.match(source, /opengraph-image\.png/, `${name} must use a raster social image`);
  assert.doesNotMatch(source.match(/openGraph:[\s\S]*?\n\s*},/)?.[0] || '', /\.svg/, `${name} social metadata must not advertise SVG`);
}

console.log(`independent review regressions passed across ${articlePages.length} concrete article routes`);
