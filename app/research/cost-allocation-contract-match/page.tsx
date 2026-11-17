import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('cost-allocation-contract-match');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('cost-allocation-contract-match')}</EditorialArticleFrame>}
