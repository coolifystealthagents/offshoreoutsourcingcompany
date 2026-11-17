import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('capacity-forecast-variance');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('capacity-forecast-variance')}</EditorialArticleFrame>}
