import type { Metadata } from 'next';
import { getAug23Metadata, renderAug23Article } from '../../aug23-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug23Metadata('philippines-remote-task-aging-review');
export default function Page(){return <EditorialArticleFrame>{renderAug23Article('philippines-remote-task-aging-review')}</EditorialArticleFrame>}
