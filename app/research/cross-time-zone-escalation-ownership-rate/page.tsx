import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('cross-time-zone-escalation-ownership-rate');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('cross-time-zone-escalation-ownership-rate')}</EditorialArticleFrame>}
