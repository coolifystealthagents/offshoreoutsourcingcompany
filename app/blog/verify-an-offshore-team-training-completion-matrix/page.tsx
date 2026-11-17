import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('verify-an-offshore-team-training-completion-matrix');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('verify-an-offshore-team-training-completion-matrix')}</EditorialArticleFrame>}
