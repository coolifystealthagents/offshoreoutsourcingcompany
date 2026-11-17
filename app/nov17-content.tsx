import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { Header, Footer, CTA } from './components';
import meta from './nov17-meta.json';
const SITE='https://offshoreoutsourcingcompany.com';
type Item={family:'blog'|'research';title:string;description:string;hero:string};
function item(slug:string):Item{return (meta as Record<string,Item>)[slug]}
function source(slug:string){const raw=fs.readFileSync(path.join(process.cwd(),'content',item(slug).family,slug+'.md'),'utf8');return raw.replace(/^---[\s\S]*?---\s*/,'').replace(/^#[^\n]+\n+/,'').replace(/^\*November 17, 2026\*\s*/,'')}
function blocks(text:string){return text.split(/\n\n+/).filter(Boolean).map((part,i)=>part.startsWith('## ')?<h2 key={i}>{part.slice(3)}</h2>:part.startsWith('- ')?<p key={i}>{part.slice(2)}</p>:<p key={i}>{part}</p>)}
export function getNov16Metadata(slug:string):Metadata{const x=item(slug),url=`${SITE}/${x.family}/${slug}`,social=`${SITE}/opengraph-image.png`;return {title:x.title,description:x.description,alternates:{canonical:`/${x.family}/${slug}`},openGraph:{title:x.title,description:x.description,type:'article',url,images:[{url:social,alt:`${x.title} | Offshore Outsourcing Company`}]},twitter:{card:'summary_large_image',title:x.title,description:x.description,images:[social]}}}
export function renderNov16Article(slug:string){const x=item(slug);const url=`${SITE}/${x.family}/${slug}`;const schema={'@context':'https://schema.org','@type':'Article',headline:x.title,description:x.description,url,datePublished:'2026-11-17',dateModified:'2026-11-17',mainEntityOfPage:url,image:`${SITE}${x.hero}`,author:{'@type':'Organization',name:'Offshore Outsourcing Company'},publisher:{'@type':'Organization',name:'Offshore Outsourcing Company',url:SITE}};return <><Header/><div className="article-shell"><article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><p className="eyebrow">Philippines staffing {x.family}</p><h1>{x.title}</h1><p><time dateTime="2026-11-17">November 17, 2026</time></p><img src={x.hero} alt={`${x.title} editorial illustration`} width="1536" height="1024" style={{width:'100%',height:'auto',borderRadius:'18px'}}/><div className="article-body">{blocks(source(slug))}</div></article><CTA/></div><Footer/></>}
