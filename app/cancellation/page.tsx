import { permanentRedirect } from 'next/navigation';

export default function LegacyCancellationPage() {
  permanentRedirect('/cancellation-policy');
}
