import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('reconcile-a-client-escalation-log-across-time-zones');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('reconcile-a-client-escalation-log-across-time-zones')}</EditorialArticleFrame>}
