import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('equipment-disposal-certificate-completeness');
export default function Page(){return renderNov18Article('equipment-disposal-certificate-completeness')}
