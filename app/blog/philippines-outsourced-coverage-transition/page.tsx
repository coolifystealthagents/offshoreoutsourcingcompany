import type { Metadata } from 'next';
import { getAug23Metadata, renderAug23Article } from '../../aug23-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug23Metadata('philippines-outsourced-coverage-transition');
export default function Page(){return <EditorialArticleFrame>{renderAug23Article('philippines-outsourced-coverage-transition')}</EditorialArticleFrame>}
