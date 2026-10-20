import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('research','managed-outsourcing-review-cadence-research');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('research','managed-outsourcing-review-cadence-research')}</EditorialArticleFrame>}
