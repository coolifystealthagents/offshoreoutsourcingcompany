import type { Metadata } from 'next';
import { getAug20Metadata, renderAug20Article } from '../../aug20-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug20Metadata('philippines-daily-queue-ownership');
export default function Page(){return <EditorialArticleFrame>{renderAug20Article('philippines-daily-queue-ownership')}</EditorialArticleFrame>}
