import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('audit-an-offshore-shift-attendance-record');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('audit-an-offshore-shift-attendance-record')}</EditorialArticleFrame>}
