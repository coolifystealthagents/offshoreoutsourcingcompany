import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('verify-an-offshore-team-interpretation-request-record');
export default function Page(){return renderNov18Article('verify-an-offshore-team-interpretation-request-record')}
