import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

assert.ok(existsSync(new URL('app/opengraph-image.png', root)), 'global file-convention Open Graph image must exist');
assert.match(read('app/blog/page.tsx'), /alternates:\s*\{\s*canonical:\s*["']\/blog["']/, 'blog index needs a canonical');
assert.match(read('app/blog/page/[page]/page.tsx'), /generateMetadata[\s\S]*canonical:\s*`\/blog\/page\/\$\{page\}`/, 'blog pagination needs page-specific canonicals');
assert.match(read('app/blog/[slug]/page.tsx'), /withSocialImage\(metadata\)/, 'every dynamic blog metadata branch needs the shared social-image fallback');
assert.match(read('app/aug23-content.tsx'), /getAug23Metadata[\s\S]*openGraph:[\s\S]*images:[\s\S]*twitter:[\s\S]*images:/, 'explicit August blog routes need Open Graph and Twitter images');
assert.match(read('app/terms/page.tsx'), /canonical:\s*['"]\/terms['"]/, 'terms needs a canonical');
assert.match(read('app/cancellation-policy/page.tsx'), /canonical:\s*['"]\/cancellation-policy['"]/, 'cancellation policy needs a canonical');

const researchSources = [read('app/research-oct2.ts'), read('app/research-oct5.ts'), read('app/research-sep28.ts')].join('\n');
for (const stale of ['bookkeeping-support','customer-support','ecommerce-support','inbox-management','marketing-operations','procurement-support','recruitment-support','technical-support']) {
  assert.doesNotMatch(researchSources, new RegExp(`related\\(['"]${stale}['"]`), `stale service slug ${stale} must not be emitted`);
}
console.log('release SEO/link contract passed');
