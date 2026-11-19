import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('reconcile-an-offshore-team-overtime-approval-with-the-payroll-export');
export default function Page(){return renderNov19Article('reconcile-an-offshore-team-overtime-approval-with-the-payroll-export')}
