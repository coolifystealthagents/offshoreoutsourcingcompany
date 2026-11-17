import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov16-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('verify-a-subcontractor-disclosure-for-an-offshore-program');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('verify-a-subcontractor-disclosure-for-an-offshore-program')}</EditorialArticleFrame>}
