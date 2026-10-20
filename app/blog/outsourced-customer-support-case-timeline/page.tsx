import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('outsourced-customer-support-case-timeline');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('outsourced-customer-support-case-timeline')}</EditorialArticleFrame>}
