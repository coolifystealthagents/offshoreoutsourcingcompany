import type { Metadata } from 'next';
import { getAug23Metadata, renderAug23Article } from '../../aug23-content';
export const metadata: Metadata = getAug23Metadata('philippines-knowledge-gap-register');
export default function Page(){return renderAug23Article('philippines-knowledge-gap-register')}
