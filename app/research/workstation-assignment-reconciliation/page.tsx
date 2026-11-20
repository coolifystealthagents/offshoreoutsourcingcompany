import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('workstation-assignment-reconciliation');
export default function Page(){return renderNov20Article('workstation-assignment-reconciliation')}
