import type { Metadata } from 'next';
import { getNov21Metadata, renderNov21Article } from '../../nov21-content';
export const metadata: Metadata = getNov21Metadata('evacuation-drill-record-currency');
export default function Page(){return renderNov21Article('evacuation-drill-record-currency')}
