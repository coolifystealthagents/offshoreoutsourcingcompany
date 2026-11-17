import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('client-report-figure-source-coverage');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('client-report-figure-source-coverage')}</EditorialArticleFrame>}
