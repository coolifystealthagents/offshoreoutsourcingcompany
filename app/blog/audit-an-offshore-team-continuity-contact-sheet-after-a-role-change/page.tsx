import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('audit-an-offshore-team-continuity-contact-sheet-after-a-role-change');
export default function Page(){return renderNov19Article('audit-an-offshore-team-continuity-contact-sheet-after-a-role-change')}
