import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('corrective-action-evidence-closure');
export default function Page(){return renderNov20Article('corrective-action-evidence-closure')}
