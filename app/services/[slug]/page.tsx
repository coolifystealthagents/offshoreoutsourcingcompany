import {notFound} from 'next/navigation';
import {Header,Footer} from '../../components';
import {ServiceDetail} from '../../studio';
import d from '../../studio-data.json';
export function generateStaticParams(){return d.services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=d.services.find(s=>s.slug===slug);return {title:s?.title,description:s?.description,openGraph:{images:s?[s.image]:[]},alternates:{canonical:'/services/'+slug}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=d.services.find(s=>s.slug===slug);if(!s)notFound();return <><Header/><ServiceDetail s={s}/><Footer/></>}
