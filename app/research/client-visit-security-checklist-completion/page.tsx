import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('client-visit-security-checklist-completion');
export default function Page(){return renderNov21Article('client-visit-security-checklist-completion')}
