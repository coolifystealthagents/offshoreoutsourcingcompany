import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const homepage = read('app/page.tsx');
const components = read('app/components.tsx');
const css = read('app/globals.css');
const data = read('app/data.ts');
const contactPage = read('app/contact-us/page.tsx');
const contactForm = read('app/contact-us/StandardContactForm.tsx');
const legacyContact = read('app/contact/page.tsx');
const thankYou = read('app/thank-you/page.tsx');
const servicesPage = read('app/services/[slug]/page.tsx');
const blogPage = read('app/blog/[slug]/page.tsx');
const blogProfile = JSON.parse(read('app/blog-banner-profile.json'));
const sitemap = read('app/sitemap.xml/route.ts');
const blogIndex = read('app/blog/page.tsx');
const blogPagination = read('app/blog/page/[page]/page.tsx');
const middleware = read('middleware.ts');
const canonicalHelper = read('lib/canonical-request.ts');
const dockerfile = read('Dockerfile');
const booking = read('app/booking-components.tsx');

assert.match(homepage, /alternates:\s*\{\s*canonical:\s*['"]\/['"]\s*\}/, 'homepage must declare its apex canonical');
assert.doesNotMatch(css, /fonts\.googleapis\.com/, 'fonts must not rely on a CSP-blocked external stylesheet');
assert.match(css, /@font-face[\s\S]*Instrument Sans/, 'Instrument Sans must be self-hosted');
assert.match(css, /@font-face[\s\S]*Newsreader/, 'Newsreader must be self-hosted');
assert.ok(existsSync(new URL('../public/fonts/instrument-sans.woff2', import.meta.url)), 'Instrument Sans font file missing');
assert.ok(existsSync(new URL('../public/fonts/newsreader.woff2', import.meta.url)), 'Newsreader font file missing');
assert.doesNotMatch(css, /\.comparison-row\s*\{\s*min-width:\s*680px/, 'mobile comparison rows must not force a clipped 680px layout');
assert.match(css, /@media\s*\(max-width:\s*720px\)[\s\S]*\.comparison-row\s*\{[^}]*grid-template-columns:\s*1fr/, 'mobile comparison rows must stack');
assert.match(homepage, /data-label=['"]Loose marketplace search['"]/i, 'mobile comparison cells must repeat the first model label');
assert.match(homepage, /data-label=['"]Philippines-first staffing plan['"]/i, 'mobile comparison cells must repeat the second model label');
assert.match(css, /content:\s*attr\(data-label\)/, 'mobile comparison labels must render visibly');
assert.match(css, /@media\s*\(max-width:\s*900px\)[\s\S]*\.article-table\s*\{[^}]*min-width:\s*0;[^}]*table-layout:\s*fixed/, 'article comparison tables must fit mobile and tablet viewports');
assert.match(css, /\.article-table th, \.article-table td\s*\{[^}]*overflow-wrap:\s*anywhere/, 'responsive article tables must safely wrap long cell content');
assert.doesNotMatch(blogPage + read('app/blog/[slug]/ecommerce-article.tsx'), /Swipe to compare|article-table-wrap[^>]*tabIndex/i, 'non-scrolling responsive tables must not advertise swiping or add a no-op focus stop');

assert.ok(existsSync(new URL('../app/thanks-whats-next/page.tsx', import.meta.url)), 'booking-confirmation route missing');
const confirmed = read('app/thanks-whats-next/page.tsx');
assert.match(confirmed, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/, 'confirmation route must be noindex');
assert.match(confirmed, /what happens next/i, 'confirmation route must explain next steps');
assert.match(legacyContact, /permanentRedirect\(['"]\/contact-us['"]\)/, '/contact must permanently redirect to /contact-us');

assert.doesNotMatch(contactPage + thankYou, /TestimonialsRail|Client testimonials|What Clients Say|Chad Sublet|Lindsay has been incredible/i, 'unsupported testimonials must not render');
const allowedInfra = /https:\/\/go\.oncehub\.com\/StealthAgentsTeam[^"'`<\s]*/gi;
assert.doesNotMatch(thankYou.replace(allowedInfra, ''), /stealth\s*agents|stealthagents/i, 'thank-you copy outside the OnceHub source must be site-branded');
assert.match(contactPage, /<Header\s*\/>[\s\S]*<Footer\s*\/>/, 'contact page must use the site shell');
assert.match(contactPage, /alternates:\s*\{\s*canonical:\s*['"]\/contact-us['"]\s*\}/, 'contact page must be canonical');
assert.doesNotMatch(contactForm, /[🇺🇸🇨🇦🇮🇩🇵🇭🇬🇧🇦🇺🇳🇿🇸🇬🇮🇳🇦🇪🇲🇽🇧🇷🇿🇦🇩🇪🇫🇷]/u, 'contact controls must not use emoji flags');
assert.match(contactForm, /@media\(max-width:700px\)[\s\S]*\.sa-phone\s*\{\s*grid-template-columns:\s*1fr/, 'phone controls must stack on narrow screens instead of clipping country labels');
assert.doesNotMatch(booking, /allow=['"][^'"]*(camera|microphone)/i, 'scheduler must not delegate unnecessary camera or microphone permissions');

assert.match(components, /id=['"]cta-sitewide-final-free-consultation['"][^>]*href=['"]\/contact-us['"][^>]*>[^<]*Free/i, 'shared CTA must have a stable ID, /contact-us destination, and Free label');
assert.match(homepage, /id="cta-home-hero-free-consultation"[^>]*href="\/contact-us"[^>]*>[^<]*Free/i, 'hero CTA must meet the conversion contract');
assert.match(homepage, /id="cta-home-final-free-consultation"[^>]*href="\/contact-us"[^>]*>[^<]*Free/i, 'homepage final CTA must meet the conversion contract');
assert.match(servicesPage, /id=\{`cta-service-\$\{s\.slug\}-free-consultation`\}[^>]*href="\/contact-us"[^>]*>[^<]*Free/i, 'service CTA must meet the conversion contract');
assert.doesNotMatch(blogPage, />Contact Us<|>\{banner\.label\}</, 'article marketing CTAs must not use ambiguous labels');
for (const [position, variants] of Object.entries(blogProfile.positions)) {
  for (const variant of variants) {
    assert.equal(variant.href, '/contact-us', `${position}/${variant.id} must target /contact-us`);
    assert.match(variant.cta, /free/i, `${position}/${variant.id} CTA must include Free`);
  }
}

for (const slug of ['finance-administration', 'process-documentation']) {
  assert.match(data, new RegExp(`slug:\\s*['"]${slug}['"]`), `optimized service ${slug} missing`);
}
const optimizationPath = new URL('../.paperclip/website-optimization/2026-09-14.json', import.meta.url);
assert.ok(existsSync(optimizationPath), 'Website Optimization Project evidence missing');
const optimization = JSON.parse(readFileSync(optimizationPath, 'utf8'));
assert.equal(optimization.site, 'offshoreoutsourcingcompany.com');
assert.equal(optimization.baseline_service_count, 12);
assert.equal(optimization.final_service_count, 14);
assert.deepEqual(optimization.added_service_slugs, ['finance-administration', 'process-documentation']);

assert.ok(!existsSync(new URL('../app/blog/top-50-offshore-outsourcing-companies-specialized-support/page.tsx', import.meta.url)), 'low-quality comparison route must be removed');
assert.doesNotMatch(sitemap, /top-50-offshore-outsourcing-companies-specialized-support/, 'removed comparison must not remain in sitemap');
assert.ok(!existsSync(new URL('../app/blog/FeaturedComparison.tsx', import.meta.url)), 'stale comparison promotion component must be removed');
assert.doesNotMatch(blogIndex + blogPagination, /FeaturedComparison|top-50-offshore-outsourcing-companies-specialized-support/, 'blog indexes must not promote the removed comparison');
assert.ok(existsSync(new URL('../middleware.ts', import.meta.url)), 'canonical host redirect middleware missing');
assert.match(middleware, /NextResponse\.redirect\(target,\s*308\)/, 'canonical redirects must be permanent 308 responses');
const canonicalJs = ts.transpileModule(canonicalHelper, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { canonicalRedirectTarget } = await import(`data:text/javascript;base64,${Buffer.from(canonicalJs).toString('base64')}`);
const canonical = 'https://offshoreoutsourcingcompany.com/';
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'offshoreoutsourcingcompany.com', forwardedProto: 'http', cloudflareVisitor: '{"scheme":"https"}' }), canonical, 'x-forwarded-proto=http must redirect independently');
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'offshoreoutsourcingcompany.com', forwardedProto: 'https', cloudflareVisitor: '{"scheme":"http"}' }), canonical, 'cf-visitor scheme=http must redirect independently');
assert.equal(canonicalRedirectTarget({ requestUrl: 'http://127.0.0.1:3102/path?q=1', host: 'offshoreoutsourcingcompany.com:3102', forwardedProto: 'https', cloudflareVisitor: '{"scheme":"https"}' }), 'https://offshoreoutsourcingcompany.com/path?q=1', 'request URL protocol must redirect while preserving path/query and stripping private port');
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'www.offshoreoutsourcingcompany.com', forwardedProto: 'https', cloudflareVisitor: '{"scheme":"https"}' }), canonical, 'www must redirect to apex');
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'offshoreoutsourcingcompany.com', forwardedProto: 'https', cloudflareVisitor: 'not-json' }), null, 'malformed cf-visitor must not crash or redirect a canonical HTTPS request');
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'offshoreoutsourcingcompany.com', forwardedProto: 'https', cloudflareVisitor: 'null' }), null, 'non-object cf-visitor must not crash');
assert.equal(canonicalRedirectTarget({ requestUrl: 'http://127.0.0.1:3102/', host: '127.0.0.1:3102', forwardedProto: 'http', cloudflareVisitor: '{"scheme":"http"}' }), null, 'local hosts must never be canonicalized');
assert.equal(canonicalRedirectTarget({ requestUrl: 'http://example.com/', host: 'example.com', forwardedProto: 'http' }), null, 'unrelated hosts must never be canonicalized');
assert.equal(canonicalRedirectTarget({ requestUrl: canonical, host: 'offshoreoutsourcingcompany.com', forwardedProto: 'https', cloudflareVisitor: '{"scheme":"https"}' }), null, 'canonical HTTPS requests must pass through');
assert.ok(existsSync(new URL('../app/api/revision/route.ts', import.meta.url)), 'public revision evidence endpoint missing');
assert.match(dockerfile, /COPY\s+--from=builder[^\n]*\/app\/\.next\/standalone\s+\.\//, 'runtime image must copy standalone output');
assert.match(dockerfile, /COPY\s+--from=builder[^\n]*\/app\/\.next\/static\s+\.\/\.next\/static/, 'runtime image must copy static assets');
assert.match(dockerfile, /COPY\s+--from=builder[^\n]*\/app\/public\s+\.\/public/, 'runtime image must copy public assets');
assert.match(dockerfile, /CMD\s*\[\s*['"]node['"]\s*,\s*['"]server\.js['"]\s*\]/, 'standalone runtime must start server.js directly');

console.log('site perfection source contract passed');
