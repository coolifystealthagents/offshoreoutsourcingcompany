import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('language-allowance-change-payroll-cutoff-compliance');
export default function Page(){return renderNov21Article('language-allowance-change-payroll-cutoff-compliance')}
