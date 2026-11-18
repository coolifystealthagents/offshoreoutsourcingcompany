import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('recording-consent-log-coverage');
export default function Page(){return renderNov18Article('recording-consent-log-coverage')}
