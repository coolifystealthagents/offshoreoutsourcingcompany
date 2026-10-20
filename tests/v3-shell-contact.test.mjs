import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(url(path), 'utf8');

const components = read('app/components.tsx');
const layout = read('app/layout.tsx');
const globalCss = read('app/globals.css');
const contact = read('app/contact-us/page.tsx');
const contactCss = read('app/contact-us/contact.css');
const form = read('app/contact-us/StandardContactForm.tsx');

// The global shell remains present, readable, and deliberately small.
assert.match(components, /<nav[^>]+aria-label="Main navigation"[\s\S]*href="\/"[^>]*>Home<[\s\S]*href="\/services"[^>]*>Services<[\s\S]*href="\/contact-us"[^>]*>Contact Us</);
const navSource = components.match(/<nav[^>]+aria-label="Main navigation"[\s\S]*?<\/nav>/)?.[0] || '';
assert.equal((navSource.match(/<a\s/g) || []).length, 3, 'primary navigation must contain exactly three destinations');
assert.match(globalCss, /\.nav\s*\{[^}]*position:\s*sticky;[^}]*top:\s*0;/, 'site header must be sticky');
const skipLink = read('app/skip-link.tsx');
assert.match(layout, /<SkipLink \/>/, 'layout must provide the shared skip link');
assert.match(layout, /<GlobalHeader \/><main id="main-content" tabIndex=\{-1\}>\{children\}<\/main><GlobalFooter \/>/, 'skip link target must be the server-rendered main landmark after the global header');
assert.match(skipLink, /getElementById\(targetId\)/, 'skip link must target the server-rendered target');
assert.match(skipLink, /target\.focus/, 'skip target must receive programmatic focus');
assert.match(globalCss, /:target\s*\{[^}]*scroll-margin-top:/, 'anchor targets must clear the sticky header');
assert.match(globalCss, /:focus-visible\s*\{[^}]*outline:/, 'keyboard focus must be globally visible');

// Parent attribution is visible in both global placements and uses the approved mark.
assert.ok((components.match(/Powered by StealthAgents/g) || []).length >= 2, 'header and footer need explicit parent attribution');
assert.ok((components.match(/\/brand\/stealth-agents-logo-black\.png/g) || []).length >= 2, 'header and footer need the official parent logo');
assert.match(globalCss, /\.legit-footer \.parent-attribution\s*\{[^}]*color:\s*var\(--ink\);[^}]*background:\s*#fff/, 'footer attribution must place the official black mark and label on a readable light plate');
assert.ok(existsSync(url('public/brand/stealth-agents-logo-black.png')), 'approved StealthAgents logo must be copied locally');
assert.ok(existsSync(url('public/brand/stealth-agents-team-bacolod.png')), 'approved StealthAgents team photo must be copied locally');
assert.deepEqual(readFileSync(url('public/logo.svg')), readFileSync(url('app/icon.svg')), 'favicon and shell must use one subsidiary logo identity');

// Contact first fold: approved reviews at left, complete preserved form at right.
assert.match(contact, /<section className="tc-hero"[\s\S]*<ReviewsMarquee[\s\S]*<StandardContactForm endpoint="\/api\/contact" encoding="form"\s*\/>/);
const provenance = JSON.parse(read('app/data/review-provenance.json'));
assert.equal(provenance.records.length, 10, 'exactly ten approved reviews must be rendered');
assert.equal(new Set(provenance.records.map(({ body }) => body)).size, 10, 'approved reviews must be unique');
assert.equal(provenance.source, 'https://stealthagents.com/');
assert.ok(provenance.records.every(({ rating }) => rating === 5), 'first-party five-star provenance must accompany every review');
assert.match(provenance.ratingSource, /Official StealthAgents homepage testimonial cards/);
const marquee = read('app/contact-us/ReviewsMarquee.tsx');
assert.match(marquee, /Reviews published by StealthAgents/);
assert.match(marquee, /aria-label=\{`\$\{review\.rating\} stars`\}/, 'each review needs an accessible rating label');
assert.match(marquee, /"★"\.repeat\(review\.rating\)/, 'each review needs the visible first-party star treatment');
assert.equal((marquee.match(/records\.map/g) || []).length, 1, 'review records must not be duplicated to fake marquee length');
assert.match(marquee, /track\.append\(firstCard\)/, 'the single review set must rotate seamlessly rather than jump to zero');
assert.doesNotMatch(marquee, /position\s*=\s*0/, 'the marquee must not visibly reset to its beginning');
assert.match(marquee, /requestAnimationFrame/);
assert.match(marquee, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
assert.match(marquee, /hoveredRef\.current \|\| focusedRef\.current \|\| reducedMotion\.matches/, 'hover, focus, and reduced motion must independently pause the scroll loop');
assert.match(marquee, /onMouseLeave=\{\(\) => \{ hoveredRef\.current = false; \}\}/);
assert.match(marquee, /onBlur=\{\(event\) => \{ if \(!event\.currentTarget\.contains\(event\.relatedTarget\)\) focusedRef\.current = false; \}\}/);
assert.doesNotMatch(contactCss, /animation:\s*reviewDrift/, 'a second CSS motion system must not bypass JavaScript pause state');
assert.match(contactCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.reviews-viewport\s*\{[^}]*overflow-x:\s*auto/);
assert.doesNotMatch(marquee, /<button|aria-label=["'](?:play|pause|previous|next)|pagination/i, 'review marquee must expose no playback controls');
for (const name of ['firstName', 'lastName', 'email', 'phoneLocal', 'companyName', 'website', 'companySize', 'positions', 'referral', 'message']) {
  assert.match(form, new RegExp(`name=["']${name}["']`), `preserved form field missing: ${name}`);
}
assert.match(form, /type="submit"/);
assert.match(form, /destination\.pathname !== "\/thank-you"/, 'client must validate the accepted server destination');
assert.match(form, /window\.location\.assign\(`\$\{destination\.pathname\}/, 'client must preserve the accepted server destination');
assert.ok(form.indexOf('destination.pathname !== "/thank-you"') < form.indexOf('trackLead?.(payload)'), 'tracking must occur only after validating the acknowledged destination');

// Approved team block follows the first fold and unsupported claims are gone.
const heroEnd = contact.indexOf('</section>', contact.indexOf('className="tc-hero"'));
const teamStart = contact.indexOf('className="tc-team"');
assert.ok(teamStart > heroEnd, 'official team section must follow the first fold');
assert.ok(contact.slice(heroEnd, teamStart).trim().length < 80, 'no unrelated section may interrupt the contact and team sections');
assert.match(contact, /Official team, Bacolod/);
assert.match(contact, /\/brand\/stealth-agents-team-bacolod\.png/);
assert.match(contact, /\/brand\/stealth-agents-logo-black\.png/);
assert.match(contact, /managed service/i);
assert.doesNotMatch(contact, /Forbes|top rated|35\+ industries/i);

// SEO fallback, safe prose sanitization, and branded recovery route.
assert.match(layout, /images:\s*\[\s*\{\s*url:\s*['"]\/opengraph-image\.png['"]/);
assert.ok(existsSync(url('app/opengraph-image.png')), 'raster default OG image is required');
const sanitizer = read('app/visible-punctuation-sanitizer.tsx');
assert.match(sanitizer, /TreeWalker/);
assert.match(sanitizer, /SCRIPT|STYLE|CODE|PRE|TEXTAREA/);
assert.match(sanitizer, /MutationObserver/);
assert.match(layout, /<VisiblePunctuationSanitizer\s*\/>/);
assert.ok(existsSync(url('app/not-found.tsx')), 'branded 404 route is required');
const notFound = read('app/not-found.tsx');
assert.match(notFound, /<Header\s*\/>[\s\S]*Page not found[\s\S]*href="\/"[\s\S]*href="\/services"[\s\S]*<Footer\s*\/>/);

console.log('V3 shell and contact contract passed');
