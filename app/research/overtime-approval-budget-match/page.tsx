import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('overtime-approval-budget-match');
export default function Page(){return renderNov21Article('overtime-approval-budget-match')}
