import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

const contentPath = new URL('app/services/service-content.ts', root);
assert.ok(existsSync(contentPath), 'service content model must exist');

const source = read('app/services/service-content.ts');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { serviceContent } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const catalogSource = read('app/data.ts');
const catalogSlugs = [...catalogSource.matchAll(/\{ slug: ["']([^"']+)["'], title: ["'][^"']+["'], desc:/g)].map((match) => match[1]);

assert.equal(catalogSlugs.length, 14, 'catalog must contain exactly 14 services');
assert.deepEqual(Object.keys(serviceContent).sort(), catalogSlugs.sort(), 'every catalog service must have one content record');
assert.equal(new Set(Object.values(serviceContent).map((item) => item.heroImage)).size, 14, 'detail heroes must be unique by service');

for (const slug of catalogSlugs) {
  const item = serviceContent[slug];
  assert.ok(item.heroImage.startsWith('/'), `${slug} needs a local hero image`);
  assert.ok(existsSync(new URL(`public${item.heroImage}`, root)), `${slug} hero image must exist`);
  assert.ok(item.heroAlt.length >= 35, `${slug} needs descriptive hero alt text`);
  assert.ok(item.audience.length >= 80, `${slug} needs a specific audience and problem statement`);
  assert.ok(item.scope.length >= 3, `${slug} needs substantial service-specific scope`);
  assert.ok(item.inputs.length >= 3, `${slug} needs required inputs`);
  assert.ok(item.workflow.length >= 4, `${slug} needs a realistic workflow`);
  assert.ok(item.deliverables.length >= 3, `${slug} needs deliverables`);
  assert.ok(item.boundaries.length >= 2, `${slug} needs human decision boundaries`);
  assert.ok(item.quality.length >= 3, `${slug} needs quality controls`);
  assert.ok(item.scenarios.length >= 3, `${slug} needs starting scenarios`);
  assert.ok(item.faqs.length >= 4, `${slug} needs four useful FAQs`);
  assert.ok(item.related.length >= 3, `${slug} needs related services`);
  assert.ok(item.scope.join(' ').toLowerCase().includes(item.keyword.toLowerCase()), `${slug} scope must use topic-specific language`);
}

const detail = read('app/services/[slug]/page.tsx');
const index = read('app/services/page.tsx');
const css = read('app/services/services.css');

for (const section of ['Who this service is for', 'What the service can cover', 'What your team provides', 'How the workflow runs', 'Outputs and deliverables', 'Human decisions and boundaries', 'Quality controls', 'Common starting scenarios', 'Frequently asked questions', 'Related services']) {
  assert.match(detail, new RegExp(section, 'i'), `detail template missing ${section}`);
}
assert.match(detail, /openGraph:[\s\S]*images:/, 'detail metadata must include an OG image');
assert.match(detail, /FAQPage/, 'detail route must emit FAQ schema');
assert.match(detail, /BreadcrumbList/, 'detail route must emit breadcrumb schema');
assert.match(detail, /'@type': 'Service'/, 'detail route must emit Service schema');
assert.match(detail, /<Image[\s\S]*priority/, 'detail route must render a priority hero image');
assert.match(index, /How to choose a service lane/i, 'index needs operational decision guidance');
assert.match(index, /Frequently asked questions/i, 'index needs FAQs');
assert.match(index, /Ready to define the first handoff/i, 'index needs a strong final CTA');
assert.match(index, /openGraph:[\s\S]*images:/, 'index metadata must include an OG image');
assert.match(index, /FAQPage/, 'index must emit FAQ schema');
assert.match(index, /<Image[\s\S]*priority/, 'index must render a priority hero image');
assert.match(css, /@media\s*\(max-width:\s*720px\)/, 'service layouts need a narrow-screen breakpoint');
assert.doesNotMatch(detail + index, />\s*(?:0[1-9]|1[0-4]|[A-D])\s*</, 'service layouts must not use decorative number or letter labels');
assert.doesNotMatch(source + detail + index, /[–—]/u, 'service copy must not contain en or em dashes');

console.log('V3 service content contract passed');
