import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('incident-response-notice-coverage');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('incident-response-notice-coverage')}</EditorialArticleFrame>}
