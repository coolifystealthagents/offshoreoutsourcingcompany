import type { Metadata } from 'next';
import { getAug19Metadata, renderAug19Article } from '../../aug19-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug19Metadata('blog','offshore-vendor-change-control-record');
export default function Page(){return <EditorialArticleFrame>{renderAug19Article('blog','offshore-vendor-change-control-record')}</EditorialArticleFrame>}
