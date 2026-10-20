import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('offshore-operations-offboarding-checklist');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('offshore-operations-offboarding-checklist')}</EditorialArticleFrame>}
