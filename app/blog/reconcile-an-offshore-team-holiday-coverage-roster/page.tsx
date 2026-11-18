import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('reconcile-an-offshore-team-holiday-coverage-roster');
export default function Page(){return renderNov18Article('reconcile-an-offshore-team-holiday-coverage-roster')}
