import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('verify-an-offshore-team-emergency-evacuation-drill-record');
export default function Page(){return renderNov21Article('verify-an-offshore-team-emergency-evacuation-drill-record')}
