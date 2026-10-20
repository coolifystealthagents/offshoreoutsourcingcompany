import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('offshore-research-brief-evidence-map');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('offshore-research-brief-evidence-map')}</EditorialArticleFrame>}
