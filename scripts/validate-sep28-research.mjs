import fs from 'node:fs';
import crypto from 'node:crypto';

const source=fs.readFileSync(new URL('../app/research-sep28.ts',import.meta.url),'utf8');
const chunks=source.split('\n{\nslug:').slice(1);
if(chunks.length!==5) throw new Error(`expected 5 research entries, found ${chunks.length}`);
const rows=[];
for(const chunk of chunks){
  const slug=chunk.match(/^'([^']+)'/)?.[1];
  const body=chunk.match(/body:\[([\s\S]*?)\n\]}/)?.[1]||'';
  const words=(body.match(/\b[\w’-]+\b/g)||[]).map(x=>x.toLowerCase());
  if(!slug||words.length<1200) throw new Error(`${slug||'unknown'} has ${words.length} body words`);
  const md=new URL(`../content/research/${slug}.md`,import.meta.url);
  const record=fs.readFileSync(md,'utf8');
  for(const expected of [`slug: ${slug}`,`route: /research/${slug}`,'datePublished: 2026-09-28','family: research']) if(!record.includes(expected)) throw new Error(`${slug} missing ${expected}`);
  for(const forbidden of ['dateModified:','ai agent','writing prompt','deployment mechanics','verification manifest']) if(body.toLowerCase().includes(forbidden.toLowerCase())) throw new Error(`${slug} exposes ${forbidden}`);
  const shingles=new Set(Array.from({length:Math.max(0,words.length-4)},(_,i)=>words.slice(i,i+5).join(' ')));
  rows.push({slug,words,shingles,hash:crypto.createHash('sha256').update(body).digest('hex')});
}
let maximum={score:0,pair:[]};
for(let i=0;i<rows.length;i++) for(let j=i+1;j<rows.length;j++){
  const intersection=[...rows[i].shingles].filter(x=>rows[j].shingles.has(x)).length;
  const union=rows[i].shingles.size+rows[j].shingles.size-intersection;
  const score=union?intersection/union:0;
  if(score>maximum.score) maximum={score,pair:[rows[i].slug,rows[j].slug]};
}
if(maximum.score>=0.5) throw new Error(`five-word shingle overlap ${maximum.score} for ${maximum.pair.join(', ')}`);
console.log(JSON.stringify({count:rows.length,articles:rows.map(({slug,words,hash})=>({slug,bodyWords:words.length,contentHash:hash})),maximumPairwiseFiveWordShingleJaccard:Number(maximum.score.toFixed(6)),maximumPair:maximum.pair},null,2));
