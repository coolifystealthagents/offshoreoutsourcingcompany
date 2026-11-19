import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('verify-an-offshore-team-interpretation-request-against-the-session-log');
export default function Page(){return renderNov19Article('verify-an-offshore-team-interpretation-request-against-the-session-log')}
