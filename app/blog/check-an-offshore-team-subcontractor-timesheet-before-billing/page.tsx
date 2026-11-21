import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('check-an-offshore-team-subcontractor-timesheet-before-billing');
export default function Page(){return renderNov21Article('check-an-offshore-team-subcontractor-timesheet-before-billing')}
