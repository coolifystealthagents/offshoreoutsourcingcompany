import type { Metadata } from 'next';
import { getNov19Metadata, renderNov19Article } from '../../nov19-content';
export const metadata: Metadata = getNov19Metadata('equipment-return-asset-match');
export default function Page(){return renderNov19Article('equipment-return-asset-match')}
