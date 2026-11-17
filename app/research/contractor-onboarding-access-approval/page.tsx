import type { Metadata } from 'next';
import { getNov16Metadata, renderNov16Article } from '../../nov17-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getNov16Metadata('contractor-onboarding-access-approval');
export default function Page(){return <EditorialArticleFrame>{renderNov16Article('contractor-onboarding-access-approval')}</EditorialArticleFrame>}
