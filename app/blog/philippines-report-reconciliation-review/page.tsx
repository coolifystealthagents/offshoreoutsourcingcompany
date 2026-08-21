import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
export const metadata: Metadata = getAug20Metadata('philippines-report-reconciliation-review');
export default function Page(){return renderAug20Article('philippines-report-reconciliation-review')}
