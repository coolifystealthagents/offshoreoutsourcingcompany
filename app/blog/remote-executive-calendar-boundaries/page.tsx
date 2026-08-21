import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
export const metadata: Metadata = getAug20Metadata('remote-executive-calendar-boundaries');
export default function Page(){return renderAug20Article('remote-executive-calendar-boundaries')}
