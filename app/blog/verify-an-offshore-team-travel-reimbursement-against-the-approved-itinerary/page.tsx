import type { Metadata } from 'next';
import { getNov20Metadata, renderNov20Article } from '../../nov20-content';
export const metadata: Metadata = getNov20Metadata('verify-an-offshore-team-travel-reimbursement-against-the-approved-itinerary');
export default function Page(){return renderNov20Article('verify-an-offshore-team-travel-reimbursement-against-the-approved-itinerary')}
