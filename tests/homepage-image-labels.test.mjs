import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const components = readFileSync(new URL('../app/components.tsx', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const imageTags = (source) => [...source.matchAll(/<img\b[^>]*>/gs)].map(([tag]) => tag);
const pageImages = imageTags(page);
const sharedImages = imageTags(components);
const renderedImages = [...pageImages, ...sharedImages, ...sharedImages];
const missingLabels = renderedImages.filter((tag) => {
  const alt = tag.match(/\balt\s*=\s*(["'])(.*?)\1/s);
  return !alt || !alt[2].trim();
});
const hiddenLabels = renderedImages.filter((tag) => /\baria-hidden\s*=\s*["']true["']/.test(tag));

assert.equal(renderedImages.length, 10, 'homepage image inventory changed');
assert.equal(missingLabels.length, 0, `found ${missingLabels.length} rendered homepage images without labels`);
assert.equal(hiddenLabels.length, 0, `found ${hiddenLabels.length} rendered homepage image labels hidden from assistive technology`);
assert.equal((page.match(/<h1\b/g) || []).length, 1, 'homepage must render exactly one H1');
const title = layout.match(/default:\s*(["'])(.*?)\1/s)?.[2];
assert.ok(title, 'homepage metadata title was not found');
assert.ok(title.length >= 30 && title.length <= 60, `homepage title length ${title.length} is outside 30-60 characters`);
console.log(`homepage contract passed: ${renderedImages.length} labeled images, 1 H1, title length ${title.length}`);
