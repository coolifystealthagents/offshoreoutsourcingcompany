import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('audit-a-service-quality-sample-for-an-offshore-team');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('audit-a-service-quality-sample-for-an-offshore-team')}</EditorialArticleFrame>}
