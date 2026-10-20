import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const blogRoute = read('app/blog/[slug]/page.tsx');
const researchRoute = read('app/research/[slug]/page.tsx');
const sidebar = read('app/article-sidebar.tsx');
const sidebarCss = read('app/article-sidebar.module.css');
const helper = read('lib/editorial.ts');

const importedContentModules = [...blogRoute.matchAll(/from ['"]\.\.\/\.\.\/([^'"]+-content)['"]/g)]
  .map(([, module]) => `app/${module}.tsx`);
const standalonePages = [
  ...read('app/aug19-content.tsx').matchAll(/export function render\w*Article/g),
];
assert.ok(standalonePages.length > 0, 'standalone article renderers must remain discoverable');
const rendererPaths = [...new Set([
  ...importedContentModules,
  'app/aug19-content.tsx',
  'app/aug20-content.tsx',
  'app/aug23-content.tsx',
  'app/blog/[slug]/ecommerce-article.tsx',
  'app/blog/[slug]/page.tsx',
  'app/research/[slug]/page.tsx',
])];

assert.match(blogRoute, /EditorialArticleFrame/, 'the blog dispatcher must wrap every renderer in the shared editorial frame');
assert.match(researchRoute, /EditorialArticleFrame/, 'the research route must use the shared editorial frame');
for (const path of rendererPaths) {
  assert.ok(existsSync(new URL(path, root)), `${path} must exist`);
}

assert.match(sidebar, /^['"]use client['"];/, 'the active-section sidebar must be a client component');
assert.match(sidebar, /IntersectionObserver/, 'the TOC must track the active section while scrolling');
assert.match(sidebar, /querySelectorAll<HTMLElement>\(['"]h2, h3['"]\)/, 'the TOC must include every meaningful h2 and h3');
assert.match(sidebar, /heading\.id\s*=\s*uniqueHeadingId/, 'headings must receive stable anchor IDs');
assert.match(sidebar, /root\.prepend\(slot\)/, 'article navigation must be inserted before article content');
assert.match(sidebar, /window\.location\.hash[\s\S]*scrollIntoView/, 'initial fragment navigation must recover after client IDs are assigned');
assert.match(sidebar, /<details[^>]*className=\{styles\.mobileToc\}/, 'mobile must use an accessible in-flow disclosure');
assert.match(sidebar, /aria-current=\{activeId === item\.id \? ['"]location['"] : undefined\}/, 'the active TOC link must be exposed accessibly');
assert.match(sidebar, /Published by Offshore Outsourcing Company/, 'the sidebar must identify the publisher');
assert.match(sidebar, /href="\/contact-us"/, 'the sidebar must offer a relevant next action');
assert.doesNotMatch(sidebarCss, /(^|\n):global\(/, 'CSS-module selectors must be scoped through a local frame class');
assert.match(sidebarCss, /position:\s*sticky/, 'the desktop sidebar must be sticky');
assert.match(sidebarCss, /top:\s*(?:9[0-9]|1[0-2][0-9])px/, 'the sticky sidebar must clear the 82px header');
assert.match(sidebarCss, /max-height:\s*calc\(100vh\s*-\s*\d+px\)/, 'a long sidebar must fit within the viewport');
assert.match(sidebarCss, /overflow-y:\s*auto/, 'a long sidebar must scroll internally');
assert.match(sidebarCss, /max-width:\s*(?:6[0-9]|7[0-5])ch/, 'article prose must use a comfortable reading measure');
assert.match(sidebarCss, /scroll-margin-top:\s*(?:9[0-9]|1[0-2][0-9])px/, 'heading anchors must clear the sticky header');
assert.match(sidebarCss, /@media\s*\(max-width:\s*\d+px\)[\s\S]*\.desktopSidebar\s*\{[^}]*display:\s*none/, 'desktop sidebar must collapse on narrow screens');
assert.match(sidebarCss, /@media\s*\(min-width:\s*\d+px\)[\s\S]*\.mobileToc\s*\{[^}]*display:\s*none/, 'mobile disclosure must not duplicate the desktop TOC');

const helperJs = ts.transpileModule(helper, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const editorial = await import(`data:text/javascript;base64,${Buffer.from(helperJs).toString('base64')}`);
assert.equal(editorial.slugifyHeading('  Access & approval: owner’s guide  '), 'access-approval-owners-guide');
assert.equal(editorial.sanitizeVisibleText('Plan — review – approve -- record'), 'Plan - review - approve - record');
assert.equal(editorial.sanitizeVisibleText('https://example.com/a--b --flag'), 'https://example.com/a--b --flag', 'URL and code-like tokens must remain intact');
const queueHero = editorial.getEditorialHero('remote-team-daily-capacity-review', 'Daily queue capacity review');
const accessHero = editorial.getEditorialHero('philippines-team-access-approval-matrix', 'Access approval matrix');
assert.notEqual(queueHero, accessHero, 'topic fallbacks must vary instead of reusing one generic hero');
for (const hero of [queueHero, accessHero]) {
  assert.ok(existsSync(new URL(`public${hero}`, root)), `fallback hero ${hero} must exist`);
}
const metadata = editorial.buildArticleMetadata({
  family: 'blog', slug: 'queue-review', title: 'Queue review', description: 'A bounded review.', date: '2026-10-19',
});
assert.equal(metadata.alternates.canonical, '/blog/queue-review');
assert.equal(metadata.openGraph.images.length, 1);
assert.equal(metadata.openGraph.type, 'article');
assert.equal(metadata.openGraph.publishedTime, '2026-10-19');

assert.match(blogRoute, /buildArticleSchema|ArticleSchema/, 'the fallback blog branch must use shared Article schema support');
assert.match(researchRoute, /buildArticleMetadata/, 'research metadata must use the canonical and image fallback helper');
assert.match(researchRoute, /buildArticleSchema|ArticleSchema/, 'research articles must use shared Article schema support');

console.log(`editorial V3 contract passed for ${rendererPaths.length} rendering branches`);
