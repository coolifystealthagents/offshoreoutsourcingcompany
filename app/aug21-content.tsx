import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import meta from './aug21-meta.json';
import { Header, Footer, CTA } from './components';
const SITE='https://offshoreoutsourcingcompany.com';
type Item={family:'blog';title:string;description:string;hero:string};
function item(slug:string):Item{return (meta as Record<string,Item>)[slug]}
function source(slug:string){return fs.readFileSync(path.join(process.cwd(),'content','blog',slug+'.md'),'utf8').replace(/^---\n[\s\S]*?\n---\n+/,'').replace(/^#[^\n]+\n+/,'').replace(/^\*August 21, 2026\*\s*/,'')}
function blocks(text:string){return text.split(/\n\n+/).filter(Boolean).map((part,i)=>part.startsWith('## ')?<h2 key={i}>{part.slice(3)}</h2>:<p key={i}>{part}</p>)}
export function getAug21Metadata(slug:string):Metadata{const x=item(slug);return {title:x.title,description:x.description,alternates:{canonical:`/blog/${slug}`},openGraph:{title:x.title,description:x.description,url:`${SITE}/blog/${slug}`,images:[x.hero]}}}
export function renderAug21Article(slug:string){const x=item(slug);const url=`${SITE}/blog/${slug}`;const schema={'@context':'https://schema.org','@type':'Article',headline:x.title,description:x.description,datePublished:'2026-08-21',dateModified:'2026-08-21',mainEntityOfPage:url,image:`${SITE}${x.hero}`};return <><Header/><main className="article-shell"><article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><p className="eyebrow">Philippines staffing blog</p><h1>{x.title}</h1><p><time dateTime="2026-08-21">August 21, 2026</time></p><img src={x.hero} alt={`${x.title} editorial illustration`} width="1536" height="1024" style={{width:'100%',height:'auto',borderRadius:'18px'}}/><div className="article-body">{blocks(source(slug))}</div></article><CTA/></main><Footer/></>}
