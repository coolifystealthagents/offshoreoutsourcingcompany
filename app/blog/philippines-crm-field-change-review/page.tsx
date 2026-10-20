import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('philippines-crm-field-change-review');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('philippines-crm-field-change-review')}</EditorialArticleFrame>}
