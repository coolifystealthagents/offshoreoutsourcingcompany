import type { Metadata } from 'next';
import { getAug23Metadata, renderAug23Article } from '../../aug23-content';
import { EditorialArticleFrame } from '../../editorial-article-frame';
export const metadata: Metadata = getAug23Metadata('philippines-customer-contact-reason-coding');
export default function Page(){return <EditorialArticleFrame>{renderAug23Article('philippines-customer-contact-reason-coding')}</EditorialArticleFrame>}
