import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('audit-an-offshore-team-corrective-action-against-the-quality-finding');
export default function Page(){return renderNov20Article('audit-an-offshore-team-corrective-action-against-the-quality-finding')}
