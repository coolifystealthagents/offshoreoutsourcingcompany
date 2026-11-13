'use client';
import {useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export function StudioMotion(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('.st-page .st-photo').forEach(el=>{gsap.fromTo(el.querySelector('img'),{scale:1.035},{scale:1,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})});gsap.utils.toArray<HTMLElement>('.st-reveal').forEach(el=>gsap.fromTo(el,{opacity:.72,y:12},{opacity:1,y:0,scrollTrigger:{trigger:el,start:'top 92%',end:'top 62%',scrub:true}}))});return()=>ctx.revert()});return()=>mm.revert()},[]);return null}
