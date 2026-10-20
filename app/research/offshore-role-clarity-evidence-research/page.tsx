import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('research','offshore-role-clarity-evidence-research');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('research','offshore-role-clarity-evidence-research')}</EditorialArticleFrame>}
