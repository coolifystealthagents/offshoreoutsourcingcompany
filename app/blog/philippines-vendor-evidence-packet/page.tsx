import type { Metadata } from 'next';
import { getAug23Metadata, renderAug23Article } from '../../aug23-content';
export const metadata: Metadata = getAug23Metadata('philippines-vendor-evidence-packet');
export default function Page(){return renderAug23Article('philippines-vendor-evidence-packet')}
