import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('holiday-coverage-roster-completion');
export default function Page(){return renderNov18Article('holiday-coverage-roster-completion')}
