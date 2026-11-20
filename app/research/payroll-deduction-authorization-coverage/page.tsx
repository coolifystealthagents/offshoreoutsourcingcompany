import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('payroll-deduction-authorization-coverage');
export default function Page(){return renderNov20Article('payroll-deduction-authorization-coverage')}
