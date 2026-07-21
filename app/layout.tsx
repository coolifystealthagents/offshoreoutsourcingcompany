import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://offshoreoutsourcingcompany.com'),
  title: {
    default: 'Offshore Outsourcing Company | Filipino talent planning',
    template: '%s | Offshore Outsourcing Company',
  },
  description: 'Plan a managed role for Filipino talent with clear tasks, access rules, launch checks, and weekly handoffs.',
  openGraph: {
    title: 'Offshore Outsourcing Company',
    description: 'Independent guidance for building a managed team with Filipino talent.',
    url: 'https://offshoreoutsourcingcompany.com',
    siteName: 'Offshore Outsourcing Company',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
