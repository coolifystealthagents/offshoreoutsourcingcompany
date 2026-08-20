import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { Header, Footer, CTA } from './components';
import meta from './aug19-meta.json';
const SITE='https://offshoreoutsourcingcompany.com';
type Family='blog'|'research';
type Item={family:Family,title:string,description:string,hero:string};
function item(slug:string):Item{return (meta as Record<string,Item>)[slug]}
function source(family:Family,slug:string){const raw=fs.readFileSync(path.join(process.cwd(),'content',family,slug+'.md'),'utf8');return raw.replace(/^---[\s\S]*?---\s*/,'').replace(/^#[^\n]+\n+/,'').replace(/^\*August 19, 2026\*\s*/,'')}
function blocks(text:string){return text.split(/\n\n+/).filter(Boolean).map((part,i)=>{if(part.startsWith('## '))return <h2 key={i}>{part.slice(3)}</h2>;if(part.startsWith('- '))return <ul key={i}>{part.split('\n').map((x,j)=><li key={j}>{x.replace(/^- /,'').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'$1: $2')}</li>)}</ul>;return <p key={i}>{part}</p>})}
export function getAug19Metadata(family:Family,slug:string):Metadata{const x=item(slug);return {title:x.title,description:x.description,alternates:{canonical:`/${family}/${slug}`},openGraph:{title:x.title,description:x.description,url:`${SITE}/${family}/${slug}`,images:[x.hero]}}}
export function renderAug19Article(family:Family,slug:string){const x=item(slug);const schema={'@context':'https://schema.org','@type':'Article',headline:x.title,datePublished:'2026-08-19',dateModified:'2026-08-19',mainEntityOfPage:`${SITE}/${family}/${slug}`,image:`${SITE}${x.hero}`};return <><Header/><main className="article-shell"><article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><p className="eyebrow">{family==='research'?'Research':'Blog'}</p><h1>{x.title}</h1><p><time dateTime="2026-08-19">August 19, 2026</time></p><img src={x.hero} alt={`${x.title} editorial illustration`} width="1536" height="1024" style={{width:'100%',height:'auto',borderRadius:'18px'}}/><div className="article-body">{blocks(source(family,slug))}</div></article><CTA/></main><Footer/></>}
