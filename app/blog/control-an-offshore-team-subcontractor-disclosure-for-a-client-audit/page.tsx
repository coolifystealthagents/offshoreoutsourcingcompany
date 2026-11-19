import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('control-an-offshore-team-subcontractor-disclosure-for-a-client-audit');
export default function Page(){return renderNov19Article('control-an-offshore-team-subcontractor-disclosure-for-a-client-audit')}
