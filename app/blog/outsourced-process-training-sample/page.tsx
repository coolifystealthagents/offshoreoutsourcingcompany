import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
export const metadata: Metadata = getAug20Metadata('outsourced-process-training-sample');
export default function Page(){return renderAug20Article('outsourced-process-training-sample')}
