import {existsSync} from 'node:fs';
import path from 'node:path';
import * as source from './data';
const extra:any={};
import assets from './studio-asset-index.json';
import config from './studio-data.json';
export function libraryPosts(kind:'blog'|'research'){
 const d=source as any,e=extra as any;
 const added:any[]=[];
 const raw=kind==='blog'?(d.allBlogPosts||d.blogPosts||[]):(d.datedResearchPosts||d.allResearchPosts||e.researchPosts||d.researchPosts||[]);
 const seen=new Set<string>();
 return [...added,...raw].filter(p=>p.slug&&!seen.has(p.slug)&&seen.add(p.slug)).map((p:any)=>{
 const detail=kind==='blog'?(d.getBlogDetailBySlug?.(p.slug)||d.blogDetails?.[p.slug]||{}):{};
 const candidates=[(assets as Record<string,string>)[p.slug],p.image,p.thumbnail,p.heroImage,detail.image,detail.thumbnail,detail.heroImage].filter(v=>typeof v==='string'&&v.length);
 const image=candidates.find(v=>v.startsWith('https://')||Object.values(assets).includes(v)||existsSync(path.join(process.cwd(),'public',v.replace(/^\//,''))))||config.services[Math.abs([...p.slug].reduce((h:number,c:string)=>h*31+c.charCodeAt(0)|0,0))%config.services.length].image;
 return {slug:p.slug,title:p.title,excerpt:p.excerpt||p.description||detail.excerpt||'',image,date:p.published||p.publishedAt||p.publishedDate||p.datePublished||p.date||detail.published||detail.datePublished||''};
 }).sort((a,b)=>b.date.localeCompare(a.date));
}
