import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('reporting-pack-source-match');
export default function Page(){return renderNov20Article('reporting-pack-source-match')}
