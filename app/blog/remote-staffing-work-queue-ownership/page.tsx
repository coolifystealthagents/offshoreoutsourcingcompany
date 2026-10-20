import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','remote-staffing-work-queue-ownership');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','remote-staffing-work-queue-ownership')}</EditorialArticleFrame>}
