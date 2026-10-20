import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','philippines-staffing-launch-readiness-review');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','philippines-staffing-launch-readiness-review')}</EditorialArticleFrame>}
