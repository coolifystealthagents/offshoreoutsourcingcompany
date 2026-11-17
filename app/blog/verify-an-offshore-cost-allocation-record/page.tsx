import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('verify-an-offshore-cost-allocation-record');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('verify-an-offshore-cost-allocation-record')}</EditorialArticleFrame>}
