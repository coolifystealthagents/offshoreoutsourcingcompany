import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('subcontractor-timesheet-billing-evidence');
export default function Page(){return renderNov21Article('subcontractor-timesheet-billing-evidence')}
