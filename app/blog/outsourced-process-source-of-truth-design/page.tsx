import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','outsourced-process-source-of-truth-design');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','outsourced-process-source-of-truth-design')}</EditorialArticleFrame>}
