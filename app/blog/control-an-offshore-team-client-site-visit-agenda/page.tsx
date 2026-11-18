import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('control-an-offshore-team-client-site-visit-agenda');
export default function Page(){return renderNov18Article('control-an-offshore-team-client-site-visit-agenda')}
