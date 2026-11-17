import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('control-an-offshore-team-vpn-access-review');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('control-an-offshore-team-vpn-access-review')}</EditorialArticleFrame>}
