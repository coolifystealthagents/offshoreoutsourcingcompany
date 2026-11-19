import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('continuity-contact-sheet-currency');
export default function Page(){return renderNov19Article('continuity-contact-sheet-currency')}
