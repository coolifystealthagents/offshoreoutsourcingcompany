import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import meta from './aug23-meta.json';
import { Header, Footer, CTA } from './components';
const SITE='https://offshoreoutsourcingcompany.com';
type Item={family:'blog';title:string;description:string;hero:string};
function item(slug:string):Item{return (meta as Record<string,Item>)[slug]}
function source(slug:string){return fs.readFileSync(path.join(process.cwd(),'content','blog',slug+'.md'),'utf8').replace(/^---\n[\s\S]*?\n---\n+/,'').replace(/^#[^\n]+\n+/,'')}
function blocks(text:string){return text.split(/\n\n+/).filter(Boolean).map((part,i)=>part.startsWith('## ')?<h2 key={i}>{part.slice(3)}</h2>:<p key={i}>{part}</p>)}
export function getAug23Metadata(slug:string):Metadata{const x=item(slug);return {title:x.title,description:x.description,alternates:{canonical:`/blog/${slug}`},openGraph:{title:x.title,description:x.description,url:`${SITE}/blog/${slug}`,images:[{url:`${SITE}/opengraph-image.png`,alt:`${x.title} | Offshore Outsourcing Company`}]},twitter:{card:'summary_large_image',title:x.title,description:x.description,images:[`${SITE}/opengraph-image.png`]}}}
export function renderAug23Article(slug:string){const x=item(slug);const url=`${SITE}/blog/${slug}`;const schema={'@context':'https://schema.org','@type':'Article',headline:x.title,description:x.description,url,datePublished:'2026-08-23',dateModified:'2026-08-23',mainEntityOfPage:url,image:`${SITE}/opengraph-image.png`,author:{'@type':'Organization',name:'Offshore Outsourcing Company'},publisher:{'@type':'Organization',name:'Offshore Outsourcing Company',url:SITE}};return <><Header/><div className="article-shell"><article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><p className="eyebrow">Philippines staffing blog</p><h1>{x.title}</h1><p><time dateTime="2026-08-23">August 23, 2026</time></p><div className="article-body">{blocks(source(slug))}</div></article><CTA/></div><Footer/></>}
