import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
const fail=m=>{throw new Error(m)},read=f=>fs.readFileSync(f,'utf8');
const manifest=JSON.parse(read('publishing/2026-10-13/manifest.json'));
const immutableBase='20c3dd9bbf30a769550cd81497c815e1b3bfcf0b';
const baseManifest=JSON.parse(execFileSync('git',['show',`${immutableBase}:publishing/2026-10-12/manifest.json`],{encoding:'utf8'}));
const baseEntries=[...baseManifest.blog,...baseManifest.research];
const baseSlugs=new Set(baseEntries.map(x=>x.slug)),baseTitles=new Set(baseEntries.map(x=>x.title));
const checkedPriorCorpus=`${read('app/oct12-blog.ts')}\n${read('app/research-oct12.ts')}`;
const parse=(file,start,end)=>JSON.parse(read(file).slice(read(file).indexOf(start)+start.length,read(file).lastIndexOf(end)));
const blogs=parse('app/oct13-blog.ts','export const october13BlogPosts = ',' as const;');
const research=parse('app/research-oct13.ts','export const october13ResearchPosts = ',' as const;');
if(manifest.date!=='2026-10-13'||blogs.length!==12||research.length!==5)fail('date or counts');
const all=[...blogs.map(x=>({...x,kind:'Blog'})),...research.map(x=>({...x,kind:'Research'}))];
if(new Set(all.map(x=>x.slug)).size!==17||new Set(all.map(x=>x.title)).size!==17)fail('duplicate slug/title');
if(all.some(x=>/2026|oct(?:ober)?\s*13|10[-/]13/i.test(x.title)))fail('date-bearing title');
if(blogs.some(x=>x.publishedAt!=='2026-10-13')||research.some(x=>x.date!=='2026-10-13'))fail('publication date');
if(research.some(x=>x.modifiedDate!=='2026-10-13'))fail('research modified date');
for(const item of all){const m=[...manifest.blog,...manifest.research].find(x=>x.slug===item.slug);if(!m||m.title!==item.title)fail(`manifest mismatch ${item.slug}`);const asset=m.thumbnail;if(!fs.existsSync(asset))fail(`missing ${asset}`);const svg=read(asset);const xmlTitle=item.title.replaceAll('&','&amp;');if(!svg.includes('width="1536" height="1024"')||!svg.includes(`<title id="title">${xmlTitle}</title>`))fail(`thumbnail contract ${item.slug}`)}
for(const post of blogs){const words=post.sections.flatMap(x=>x.body.split(/\s+/)).length;if(words<1000)fail(`Blog depth ${post.slug}: ${words}`);if(!post.thumbnail||post.related.length<2)fail(`Blog media/related ${post.slug}`)}
const authoritativeHosts=new Set(['www.nist.gov','csrc.nist.gov','www.gao.gov','www.cisa.gov','www.ftc.gov','www.archives.gov','www.census.gov','www.bls.gov','privacy.gov.ph']);
for(const post of research){const sourceText=post.body.find(x=>x.startsWith('Sources: '))??'';const urls=sourceText.match(/https:\/\/[^;\s]+/g)??[];if(urls.length!==10||new Set(urls).size!==10)fail(`Research sources ${post.slug}: ${urls.length}`);for(const raw of urls){const url=new URL(raw);if(url.protocol!=='https:'||!authoritativeHosts.has(url.hostname))fail(`Research source authority ${post.slug}: ${raw}`)}const words=post.body.join(' ').split(/\s+/).length;if(words<1150)fail(`Research depth ${post.slug}: ${words}`);if(!post.hero||!post.relatedService)fail(`Research media/related ${post.slug}`)}
const paragraphs=[...blogs.flatMap(x=>x.sections.flatMap(s=>s.body.split(/\n\n/))),...research.flatMap(x=>x.body.filter(p=>!p.startsWith('Sources: ')))].filter(x=>x.split(/\s+/).length>=25).map(x=>x.toLowerCase().replace(/\s+/g,' ').trim());
const dup=[...new Set(paragraphs.filter((x,i,a)=>a.indexOf(x)!==i))];if(dup.length)fail(`duplicate substantive paragraphs ${dup.length}`);
for(const item of all)if(baseSlugs.has(item.slug)||baseTitles.has(item.title))fail(`collision with immutable base ${item.slug}`);
for(const item of all){const bodies=item.kind==='Blog'?item.sections.flatMap(x=>x.body.split(/\n\n/)):item.body.filter(x=>!x.startsWith('Sources: '));for(const body of bodies)if(checkedPriorCorpus.includes(body))fail(`paragraph duplicates checked prior corpus ${item.slug}`)}
const hashes=all.map(item=>{const entry=[...manifest.blog,...manifest.research].find(x=>x.slug===item.slug);return crypto.createHash('sha256').update(fs.readFileSync(entry.thumbnail)).digest('hex')});if(new Set(hashes).size!==17)fail('duplicate thumbnail bytes');
const data=read('app/data.ts');if(!data.includes('...october13BlogPosts')||!data.includes('...october13ResearchPosts'))fail('registries');
for(const f of ['app/blog/page.tsx','app/blog/page/[page]/page.tsx','app/blog/[slug]/page.tsx','app/research/page.tsx','app/research/[slug]/page.tsx'])if(!read(f).includes('<time'))fail(`visible dates ${f}`);
if(!read('app/blog/[slug]/page.tsx').includes('Related content')||!read('app/research/[slug]/page.tsx').includes('Related research'))fail('related content');
if(!read('app/sitemap.xml/route.ts').includes('blogPosts.map')||!read('app/sitemap.xml/route.ts').includes('datedResearchPosts.map'))fail('sitemap');
console.log(JSON.stringify({status:'PASS',date:'2026-10-13',blog:12,research:5,thumbnails:17,researchHttpsSources:50,duplicateSubstantiveParagraphs:0,existingTitleSlugCollisions:0,visibleDates:true,separateSystems:true,registryRoutesIndexesRelatedSitemap:true},null,2));
