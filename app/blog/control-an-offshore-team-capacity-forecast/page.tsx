import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('control-an-offshore-team-capacity-forecast');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('control-an-offshore-team-capacity-forecast')}</EditorialArticleFrame>}
