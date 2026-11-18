import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('client-site-visit-agenda-lead-time');
export default function Page(){return renderNov18Article('client-site-visit-agenda-lead-time')}
