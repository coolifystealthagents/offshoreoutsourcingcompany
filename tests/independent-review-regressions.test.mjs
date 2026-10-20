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
const components = read('app/components.tsx');
const serviceContent = read('app/services/service-content.ts');
const editorial = read('lib/editorial.ts');
const aug19 = read('app/aug19-content.tsx');
const aug20 = read('app/aug20-content.tsx');
const aug23 = read('app/aug23-content.tsx');

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
assert.match(layout, /<GlobalHeader \/><main id="main-content" tabIndex=\{-1\}>\{children\}<\/main><GlobalFooter \/>/, 'skip target must be the server-rendered landmark between the global shell');
assert.match(contactRoute, /boundedFormData\(request,ct\)/, 'all bodies, including chunked bodies, must pass through the byte cap');
assert.match(contactRoute, /total>MAX_BODY_BYTES/, 'streamed request bodies must enforce the byte cap');
assert.match(contactRoute, /text\(form,'company'[^\n]*text\(form,'companyName'/, 'native form company field must reach canonical payload');
assert.match(contactRoute, /text\(form,'countryCode'[^\n]*text\(form,'phoneLocal'/, 'native phone fields must reach canonical payload');

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
    const source = read(path);
    assert.match(source, /return\s*<EditorialArticleFrame>[\s\S]*render\w+Article\([\s\S]*<\/EditorialArticleFrame>/, `${path} must return the article renderer inside the shared editorial frame`);
  }
}
assert.equal(articlePages.length, 41, 'all concrete article routes must be covered');

assert.match(pagination, /openGraph:[\s\S]*url[\s\S]*images/);
assert.match(pagination, /twitter:[\s\S]*images/);
assert.match(pagination, /\^\[1-9\]\\d\*\$[\s\S]*Number\.isSafeInteger/, 'pagination must accept only canonical positive decimal strings');
assert.doesNotMatch(serviceContent, /heroImage:[^\n]*\.svg/, 'visible service cards must use raster assets');
for (const [name, source] of [['shared editorial metadata', editorial], ['August 19 metadata', aug19], ['August 20 metadata', aug20], ['August 23 metadata', aug23]]) {
  assert.match(source, /twitter:[\s\S]*summary_large_image[\s\S]*images/, `${name} must provide Twitter identity`);
}
for (const [name, source] of [['August 19 schema', aug19], ['August 20 schema', aug20], ['August 23 schema', aug23]]) {
  for (const key of ['description', 'url', 'image', 'author', 'publisher']) assert.match(source, new RegExp(`${key}:`), `${name} needs ${key}`);
}
for (const [name, source] of [['services index', services], ['service details', serviceDetail]]) {
  assert.match(source, /opengraph-image\.png/, `${name} must use a raster social image`);
  assert.doesNotMatch(source.match(/openGraph:[\s\S]*?\n\s*},/)?.[0] || '', /\.svg/, `${name} social metadata must not advertise SVG`);
}

console.log(`independent review regressions passed across ${articlePages.length} concrete article routes`);
