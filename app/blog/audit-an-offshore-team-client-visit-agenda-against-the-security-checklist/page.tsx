import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('audit-an-offshore-team-client-visit-agenda-against-the-security-checklist');
export default function Page(){return renderNov21Article('audit-an-offshore-team-client-visit-agenda-against-the-security-checklist')}
