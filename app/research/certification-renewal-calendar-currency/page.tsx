import type { Metadata } from 'next';
import { getNov18Metadata, renderNov18Article } from '../../nov18-content';
export const metadata: Metadata = getNov18Metadata('certification-renewal-calendar-currency');
export default function Page(){return renderNov18Article('certification-renewal-calendar-currency')}
