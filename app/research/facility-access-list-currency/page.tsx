import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('facility-access-list-currency');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('facility-access-list-currency')}</EditorialArticleFrame>}
