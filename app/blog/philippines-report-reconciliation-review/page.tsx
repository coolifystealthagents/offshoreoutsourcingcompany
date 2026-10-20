import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('philippines-report-reconciliation-review');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('philippines-report-reconciliation-review')}</EditorialArticleFrame>}
