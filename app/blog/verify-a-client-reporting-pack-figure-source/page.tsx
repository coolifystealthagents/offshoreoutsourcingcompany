import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('verify-a-client-reporting-pack-figure-source');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('verify-a-client-reporting-pack-figure-source')}</EditorialArticleFrame>}
