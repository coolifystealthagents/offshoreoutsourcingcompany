import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('seat-allocation-approval-coverage');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('seat-allocation-approval-coverage')}</EditorialArticleFrame>}
