import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','philippines-team-access-approval-matrix');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','philippines-team-access-approval-matrix')}</EditorialArticleFrame>}
