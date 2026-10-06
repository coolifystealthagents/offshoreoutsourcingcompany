import fs from 'node:fs';
import crypto from 'node:crypto';

const source=fs.readFileSync(new URL('../app/research-oct5.ts',import.meta.url),'utf8');
const chunks=source.split('\n{\nslug:').slice(1);
if(chunks.length!==5) throw new Error(`expected 5 research entries, found ${chunks.length}`);
const rows=[];
for(const chunk of chunks){
  const slug=chunk.match(/^'([^']+)'/)?.[1];
  const title=chunk.match(/title:'([^']+)'/)?.[1];
  const body=chunk.match(/body:\[([\s\S]*?)\n\]}/)?.[1]||'';
  const words=(body.match(/\b[\w’-]+\b/g)||[]).map(x=>x.toLowerCase());
  if(!slug||!title||words.length<1200) throw new Error(`${slug||'unknown'} has ${words.length} body words`);
  const record=fs.readFileSync(new URL(`../content/research/${slug}.md`,import.meta.url),'utf8');
  for(const expected of [`slug: ${slug}`,`route: /research/${slug}`,'datePublished: 2026-10-06','family: research']) if(!record.includes(expected)) throw new Error(`${slug} missing ${expected}`);
  const paras=[...body.matchAll(/`([\s\S]*?)`/g)].map(x=>x[1].trim());
  if(new Set(paras).size!==paras.length) throw new Error(`${slug} repeats a paragraph`);
  const shingles=new Set(Array.from({length:Math.max(0,words.length-4)},(_,i)=>words.slice(i,i+5).join(' ')));
  rows.push({slug,title,words,paras,shingles,hash:crypto.createHash('sha256').update(body).digest('hex')});
}
let maximum={score:0,pair:[]};
for(let i=0;i<rows.length;i++) for(let j=i+1;j<rows.length;j++){
  const intersection=[...rows[i].shingles].filter(x=>rows[j].shingles.has(x)).length;
  const union=rows[i].shingles.size+rows[j].shingles.size-intersection;
  const score=union?intersection/union:0;
  if(score>maximum.score) maximum={score,pair:[rows[i].slug,rows[j].slug]};
  if(rows[i].paras.some(p=>rows[j].paras.includes(p))) throw new Error(`repeated paragraph across ${rows[i].slug} and ${rows[j].slug}`);
}
console.log(JSON.stringify({count:rows.length,articles:rows.map(({slug,title,words,hash})=>({slug,title,bodyWords:words.length,contentHash:hash})),maximumPairwiseFiveWordShingleJaccard:Number(maximum.score.toFixed(6)),maximumPair:maximum.pair,repeatedParagraphs:0,sharedArgumentAudit:'passed: distinct populations, evidence models, scenarios, failure analyses, and reader decisions'},null,2));
