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
const contactApi = read('app/api/contact/route.ts');
const legacyContact = read('app/contact/page.tsx');
const thankYou = read('app/thank-you/page.tsx');
const servicesPage = read('app/services/[slug]/page.tsx');
const blogPage = read('app/blog/[slug]/page.tsx');
const ecommerceArticle = read('app/blog/[slug]/ecommerce-article.tsx');
const blogLayout = read('app/blog/layout.tsx');
const blogProfile = JSON.parse(read('app/blog-banner-profile.json'));
const sitemap = read('app/sitemap.xml/route.ts');
const blogIndex = read('app/blog/page.tsx');
const blogPagination = read('app/blog/page/[page]/page.tsx');
const researchIndex = read('app/research/page.tsx');
const researchArticle = read('app/research/[slug]/page.tsx');
const privacyPage = read('app/privacy/page.tsx');
const acrClient = read('app/acr-client.tsx');
const middleware = read('middleware.ts');
const canonicalHelper = read('lib/canonical-request.ts');
const researchHelper = read('lib/research-content.ts');
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
assert.match(contactForm, /data-acr-handled=['"]1['"]/, 'controlled contact form must opt out of the global submit interceptor');
assert.match(contactForm, /if\s*\(!response\.ok\)\s*throw new Error[\s\S]*trackLead[\s\S]*window\.location\.assign\(['"]\/thank-you['"]\)[\s\S]*catch\s*\{\s*setError/, 'thank-you redirect must follow acknowledged backend delivery; errors must stay on-page');
assert.doesNotMatch(contactForm, /catch\s*\{[\s\S]{0,350}trackLead/, 'analytics must never substitute for failed lead delivery');
assert.doesNotMatch(contactApi, /origin\s*!==\s*request\.nextUrl\.origin/, 'contact CSRF validation must not reject same-host requests because a proxy reconstructed the internal origin');
assert.match(contactApi, /function sameOrigin[\s\S]*x-forwarded-host[\s\S]*new URL\(origin\)\.host/, 'contact CSRF validation must compare the submitted Origin host with the forwarded/request host');
assert.match(contactApi, /text\(form,['"]referral['"],300\)/, 'contact API must deliver the required referral answer');
assert.match(contactApi, /text\(form,['"]referralSpecify['"],300\)/, 'contact API must deliver the required Other referral detail');
assert.doesNotMatch(contactApi, /referral=text\(form,['"]source['"]/, 'form attribution source must not overwrite how the visitor heard about the site');
assert.doesNotMatch(contactForm, /#00adf4|#79cdf1|#111827|#34415a/i, 'contact form must use the established site palette instead of the unrelated slate/blue theme');
assert.match(contactForm, /background:\s*var\(--coral\)/, 'contact submit button must use the accessible site coral');
assert.match(contactForm, /@media\(max-width:700px\)[\s\S]*\.sa-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/, 'paired contact fields must remain compact at standard mobile widths');
assert.match(contactForm, /@media\(max-width:360px\)[\s\S]*\.sa-grid\s*\{[^}]*grid-template-columns:\s*1fr/, 'paired contact fields may stack only on very narrow screens');
assert.doesNotMatch(acrClient, /alert\s*\(/, 'lead failures must use inline status, never a popup');
assert.match(privacyPage, /<time\s+dateTime=['"]\d{4}-\d{2}-\d{2}['"]>/, 'privacy policy must publish a complete semantic revision date');
assert.match(privacyPage, /independent information and referral website/i, 'privacy policy must explain site and partner routing');
assert.match(privacyPage, /Information collected automatically/i, 'privacy policy must disclose technical and event data');
assert.match(privacyPage, /href="\/contact-us"[^>]*>contact form</i, 'privacy contact must use the verified site intake route');
assert.doesNotMatch(privacyPage, /hello@|mailto:/i, 'privacy policy must not synthesize an unverified mailbox');
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
assert.equal((data.match(/slug:\s*["'][^"']+["'],\s*title:\s*["'][^"']+["'],\s*desc:/g) || []).length, 14, 'service catalog must retain exactly 14 scoped services');
assert.doesNotMatch(data, /can handle [^"']+ with documented workflows, approval limits, and owner review/i, 'service descriptions must be task-specific rather than formulaic');
assert.match(homepage, /String\(index\s*\+\s*1\)\.padStart\(2,\s*['"]0['"]\)/, 'service numbering must render 01 through 14 without 010-style artifacts');
assert.doesNotMatch(blogLayout, /BlogBanner/, 'campaign banners must not render outside the blog page shell');
assert.equal((blogPage.match(/<ArticleBanner index=/g) || []).length, 1, 'rich article must contain one inline conversion banner');
assert.equal((ecommerceArticle.match(/<ArticleBanner index=/g) || []).length, 1, 'ecommerce article must contain one inline conversion banner');
assert.doesNotMatch(blogPage, /cta-article-bottom-free-consultation/, 'fallback articles must not duplicate the shared final CTA');
assert.match(blogIndex + blogPagination, /<CTA\s*\/>/, 'blog indexes must provide one deterministic final CTA inside the page shell');
assert.match(css, /@media\s*\(max-width:\s*980px\)[\s\S]*\.cards\s*\{[^}]*repeat\(2,\s*minmax\(0,\s*1fr\)\)/, 'blog cards must remain two-column at tablet widths');
assert.match(css, /@media\s*\(max-width:\s*720px\)[\s\S]*\.cards\s*\{[^}]*grid-template-columns:\s*1fr/, 'blog cards must stack on narrow screens');
assert.doesNotMatch(researchIndex, /clusters\[\(i%3\)\+1\]|Planning signal:/, 'research cards must not use cycling pseudo-categories or repeated generated filler');
assert.match(researchIndex, /featuredPosts\s*=\s*posts\.slice\(0,\s*18\)/, 'research index must curate a finite recent set');
assert.match(researchIndex, /<details className="research-archive"/, 'research index must preserve a compact discoverable archive');
assert.match(researchArticle, /ResearchBody/, 'research articles must use the editorial body renderer');
assert.doesNotMatch(researchArticle, /p\.body\.map\(x=><p/, 'research body strings must not render as an undifferentiated paragraph dump');
assert.match(researchArticle, /research-source-list/, 'research source URLs must render as a semantic source list');
const batchResearch = read('app/research-aug20.ts') + read('app/research-aug21.ts');
assert.doesNotMatch(batchResearch, /research-(?:heroes|aug21-heroes)\/[^'"` ]+\.png/, 'ambiguous generated-image research heroes must not render');
const researchIllustrations = batchResearch.match(/\/research-illustrations\/[^'"` ]+\.svg/g) || [];
assert.equal(researchIllustrations.length, 10, 'ten batch research heroes must use deterministic SVG illustrations');
for (const imagePath of researchIllustrations) {
  const relativePath = `public${imagePath}`;
  assert.ok(existsSync(new URL(`../${relativePath}`, import.meta.url)), `${relativePath} is missing`);
  const illustration = read(relativePath);
  assert.match(illustration, /<svg[^>]*role="img"[^>]*aria-labelledby="title desc"/, `${relativePath} must expose image semantics`);
  assert.match(illustration, /<title id="title">[^<]+<\/title>[\s\S]*<desc id="desc">[^<]+<\/desc>/, `${relativePath} needs a title and description`);
  assert.doesNotMatch(illustration, /(?:href|src)="https?:\/\//, `${relativePath} must not depend on external media`);
}
assert.match(researchArticle, /parseResearchBody\(body\)/, 'research renderer must use the executable corpus-safe parser');
const researchJs = ts.transpileModule(researchHelper, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { parseResearchBody } = await import(`data:text/javascript;base64,${Buffer.from(researchJs).toString('base64')}`);
const descriptiveSources = parseResearchBody([
  'Reputable sources: NIST explains audit records and continuity. Sources: https://www.nist.gov/cyberframework; https://www.cisa.gov/resources-tools.',
]);
assert.equal(descriptiveSources.sections[0].heading, 'Evidence sources and relevance');
assert.match(descriptiveSources.sections[0].text, /NIST explains audit records and continuity/);
assert.deepEqual(descriptiveSources.sources, ['https://www.nist.gov/cyberframework', 'https://www.cisa.gov/resources-tools']);
const methodologySources = parseResearchBody([
  'Methodology and sources: define the eligible request population and retain the evidence at https://www.pmi.org/standards.',
  'References: https://www.nist.gov/privacy-framework/privacy-framework.',
]);
assert.equal(methodologySources.sections[0].heading, 'How the study was structured');
assert.match(methodologySources.sections[0].text, /define the eligible request population/);
assert.deepEqual(methodologySources.sources, ['https://www.nist.gov/privacy-framework/privacy-framework']);
const datedSources = parseResearchBody([
  'Evidence-led conclusion: this result is bounded. Sources: https://www.nist.gov/cyberframework; https://www.cisa.gov/resources-tools. Retrieved 2026-08-20.',
]);
assert.deepEqual(datedSources.sources, ['https://www.nist.gov/cyberframework', 'https://www.cisa.gov/resources-tools']);
assert.match(datedSources.sections.map(({ text }) => text).join(' '), /Retrieved 2026-08-20\./, 'citation access dates after source URLs must remain visible');
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
