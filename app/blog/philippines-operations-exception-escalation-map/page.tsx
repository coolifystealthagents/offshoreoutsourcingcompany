import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
export const metadata: Metadata = getAug19Metadata('blog','philippines-operations-exception-escalation-map');
export default function Page(){return renderAug19Article('blog','philippines-operations-exception-escalation-map')}
