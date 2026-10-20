import { AcrClient } from './acr-client';
import Script from 'next/script';
import './globals.css';
import type { Metadata } from 'next';
import { VisiblePunctuationSanitizer } from './visible-punctuation-sanitizer';
import { SkipLink } from './skip-link';

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
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Offshore Outsourcing Company' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SkipLink /><div>{children}</div><VisiblePunctuationSanitizer /><AcrClient/><Script id="acr-tracker-config" strategy="beforeInteractive">{`window.ACR_TRACKER_CONFIG={siteId:'offshore-outsourcing-company',endpoint:'/ingest/track',debug:false,funnelSteps:[{path:'/contact-us',step:1,label:'Form Page',event:'funnel_form_page'},{path:'/contact',step:1,label:'Form Page',event:'funnel_form_page'}]};`}</Script><Script src="https://acrtracking.stealthagents.us/v1/tracker.js" strategy="afterInteractive"/></body></html>;
}
