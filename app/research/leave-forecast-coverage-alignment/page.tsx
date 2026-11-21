import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('leave-forecast-coverage-alignment');
export default function Page(){return renderNov21Article('leave-forecast-coverage-alignment')}
