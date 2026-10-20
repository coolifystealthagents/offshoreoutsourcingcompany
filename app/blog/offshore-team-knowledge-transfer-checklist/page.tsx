import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','offshore-team-knowledge-transfer-checklist');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','offshore-team-knowledge-transfer-checklist')}</EditorialArticleFrame>}
