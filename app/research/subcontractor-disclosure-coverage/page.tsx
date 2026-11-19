import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('subcontractor-disclosure-coverage');
export default function Page(){return renderNov19Article('subcontractor-disclosure-coverage')}
