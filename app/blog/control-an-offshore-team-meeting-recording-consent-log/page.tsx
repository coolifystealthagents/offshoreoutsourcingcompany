import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('control-an-offshore-team-meeting-recording-consent-log');
export default function Page(){return renderNov18Article('control-an-offshore-team-meeting-recording-consent-log')}
