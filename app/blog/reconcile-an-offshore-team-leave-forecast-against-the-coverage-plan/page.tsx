import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('reconcile-an-offshore-team-leave-forecast-against-the-coverage-plan');
export default function Page(){return renderNov21Article('reconcile-an-offshore-team-leave-forecast-against-the-coverage-plan')}
