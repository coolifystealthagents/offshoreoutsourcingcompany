import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import ts from 'typescript';

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
assert.doesNotMatch(contactRoute, /ooc_lead_receipt/, 'direct-access scheduling must not rely on a browser receipt');
assert.match(form, /response\.url/);
assert.match(form, /destination\.origin !== window\.location\.origin/);
assert.doesNotMatch(thankYou, /Request received|Your staffing request was received|cookies\(\)|redirect\(/, 'direct scheduling visits must remain accessible without claiming accepted ingestion');
assert.doesNotMatch(nextSteps, /Consultation confirmed|Your time is reserved/);
assert.match(nextSteps, /Visiting this page alone does not confirm a booking/);
assert.match(booking, /href="https:\/\/go\.oncehub\.com\/StealthAgentsTeam"/, 'scheduler needs a same-destination fallback link');
assert.match(layout, /<GlobalHeader \/><main id="main-content" tabIndex=\{-1\}>\{children\}<\/main><GlobalFooter \/>/, 'skip target must be the server-rendered landmark between the global shell');
assert.match(contactRoute, /boundedContactFormData\(request,ct\)/, 'all bodies, including chunked bodies, must pass through the byte cap');
assert.match(contactRoute, /text\(form,'company'[^\n]*text\(form,'companyName'/, 'native form company field must reach canonical payload');
assert.match(contactRoute, /text\(form,'countryCode'[^\n]*text\(form,'phoneLocal'/, 'native phone fields must reach canonical payload');

const contactRequestSource = read('lib/contact-request.ts');
const contactRequestJs = ts.transpileModule(contactRequestSource, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
const { boundedContactFormData, isAllowedContactRequest, MAX_CONTACT_BODY_BYTES } = await import(`data:text/javascript;base64,${Buffer.from(contactRequestJs).toString('base64')}`);
for (const origin of ['https://offshoreoutsourcingcompany.com', 'https://www.offshoreoutsourcingcompany.com']) assert.equal(isAllowedContactRequest(new Headers({ origin })), true);
for (const origin of ['http://offshoreoutsourcingcompany.com', 'https://attacker.example', 'not a URL']) assert.equal(isAllowedContactRequest(new Headers({ origin })), false);
assert.equal(isAllowedContactRequest(new Headers({ 'sec-fetch-site': 'cross-site' })), false);
assert.equal(isAllowedContactRequest(new Headers({ 'sec-fetch-site': 'same-origin' })), true);
const encoded = new URLSearchParams({ firstName: 'Ada', companyName: 'Example Co' }).toString();
const encodedRequest = new Request('https://offshoreoutsourcingcompany.com/api/contact', { method: 'POST', body: encoded, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
const parsed = await boundedContactFormData(encodedRequest, encodedRequest.headers.get('content-type'));
assert.equal(parsed.get('companyName'), 'Example Co');
const oversizedRequest = new Request('https://offshoreoutsourcingcompany.com/api/contact', { method: 'POST', body: 'x'.repeat(MAX_CONTACT_BODY_BYTES + 1), headers: { 'content-type': 'application/x-www-form-urlencoded' } });
await assert.rejects(() => boundedContactFormData(oversizedRequest, oversizedRequest.headers.get('content-type')), /too large/);

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
for (const [name, source] of [['services index', services]]) {
  assert.match(source, /opengraph-image\.png/, `${name} must use a raster social image`);
  assert.doesNotMatch(source.match(/openGraph:[\s\S]*?\n\s*},/)?.[0] || '', /\.svg/, `${name} social metadata must not advertise SVG`);
}
assert.match(serviceDetail, /const socialImage = `\$\{base\}\$\{content\.heroImage\}`/, 'service social metadata must use the route-specific raster image');
assert.match(serviceDetail, /images: \[\{ url: socialImage, width: 1200, height: 630, alt: content\.heroAlt \}\]/, 'service Open Graph metadata must describe the actual image');

console.log(`independent review regressions passed across ${articlePages.length} concrete article routes`);
