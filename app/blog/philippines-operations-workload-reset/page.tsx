import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
export const metadata: Metadata = getAug20Metadata('philippines-operations-workload-reset');
export default function Page(){return renderAug20Article('philippines-operations-workload-reset')}
