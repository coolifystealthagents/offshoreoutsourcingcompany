import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('audit-an-offshore-team-certification-renewal-calendar');
export default function Page(){return renderNov18Article('audit-an-offshore-team-certification-renewal-calendar')}
