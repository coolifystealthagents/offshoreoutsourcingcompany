import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('training-matrix-completion-before-scheduling');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('training-matrix-completion-before-scheduling')}</EditorialArticleFrame>}
