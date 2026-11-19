import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('visit-access-list-currency');
export default function Page(){return renderNov19Article('visit-access-list-currency')}
