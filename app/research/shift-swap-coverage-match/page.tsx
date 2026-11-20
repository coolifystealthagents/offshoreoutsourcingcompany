import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('shift-swap-coverage-match');
export default function Page(){return renderNov20Article('shift-swap-coverage-match')}
