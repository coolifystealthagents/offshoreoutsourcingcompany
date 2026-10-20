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
assert.match(layout, /className="skip-link"[^>]+href="#main-content"/, 'layout must provide a skip link');
assert.match(layout, /id="main-content"[^>]+tabIndex=\{-1\}/, 'skip target must be programmatically focusable');
assert.match(globalCss, /:target\s*\{[^}]*scroll-margin-top:/, 'anchor targets must clear the sticky header');
assert.match(globalCss, /:focus-visible\s*\{[^}]*outline:/, 'keyboard focus must be globally visible');

// Parent attribution is visible in both global placements and uses the approved mark.
assert.ok((components.match(/Powered by StealthAgents/g) || []).length >= 2, 'header and footer need explicit parent attribution');
assert.ok((components.match(/\/brand\/stealth-agents-logo-black\.png/g) || []).length >= 2, 'header and footer need the official parent logo');
assert.ok(existsSync(url('public/brand/stealth-agents-logo-black.png')), 'approved StealthAgents logo must be copied locally');
assert.ok(existsSync(url('public/brand/stealth-agents-team-bacolod.png')), 'approved StealthAgents team photo must be copied locally');
assert.deepEqual(readFileSync(url('public/logo.svg')), readFileSync(url('app/icon.svg')), 'favicon and shell must use one subsidiary logo identity');

// Contact first fold: approved reviews at left, complete preserved form at right.
assert.match(contact, /<section className="tc-hero"[\s\S]*<ReviewsMarquee[\s\S]*<StandardContactForm endpoint="\/api\/contact" encoding="form"\s*\/>/);
const provenance = JSON.parse(read('app/data/review-provenance.json'));
assert.equal(provenance.records.length, 10, 'exactly ten approved reviews must be rendered');
assert.equal(new Set(provenance.records.map(({ body }) => body)).size, 10, 'approved reviews must be unique');
assert.equal(provenance.source, 'https://stealthagents.com/');
const marquee = read('app/contact-us/ReviewsMarquee.tsx');
assert.match(marquee, /StealthAgents reviews/);
assert.match(marquee, /aria-label="5 out of 5 stars"/);
assert.equal((marquee.match(/records\.map/g) || []).length, 1, 'review records must not be duplicated to fake marquee length');
assert.match(marquee, /requestAnimationFrame/);
assert.match(marquee, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
assert.match(contactCss, /\.reviews-marquee:hover \.reviews-track[\s\S]*animation-play-state:\s*paused/);
assert.match(contactCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.reviews-viewport\s*\{[^}]*overflow-x:\s*auto/);
assert.doesNotMatch(marquee, /<button|play|pause|previous|next|pagination/i, 'review marquee must expose no playback controls');
for (const name of ['firstName', 'lastName', 'email', 'phoneLocal', 'companyName', 'website', 'companySize', 'positions', 'referral', 'message']) {
  assert.match(form, new RegExp(`name=["']${name}["']`), `preserved form field missing: ${name}`);
}
assert.match(form, /type="submit"/);
assert.match(form, /window\.location\.assign\("\/thank-you"\)/);

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
assert.match(layout, /images:\s*\[\s*\{\s*url:\s*['"]\/brand\/og-default\.svg['"]/);
assert.ok(existsSync(url('public/brand/og-default.svg')), 'default OG image is required');
const sanitizer = read('app/visible-punctuation-sanitizer.tsx');
assert.match(sanitizer, /TreeWalker/);
assert.match(sanitizer, /SCRIPT|STYLE|CODE|PRE|TEXTAREA/);
assert.match(sanitizer, /MutationObserver/);
assert.match(layout, /<VisiblePunctuationSanitizer\s*\/>/);
assert.ok(existsSync(url('app/not-found.tsx')), 'branded 404 route is required');
const notFound = read('app/not-found.tsx');
assert.match(notFound, /<Header\s*\/>[\s\S]*Page not found[\s\S]*href="\/"[\s\S]*href="\/services"[\s\S]*<Footer\s*\/>/);

console.log('V3 shell and contact contract passed');
