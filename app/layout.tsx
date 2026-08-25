import { AcrClient } from './acr-client';
import Script from 'next/script';
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
  return <html lang="en"><body>{children}<AcrClient/><Script id="acr-tracker-config" strategy="beforeInteractive">{`window.ACR_TRACKER_CONFIG={siteId:'offshore-outsourcing-company',endpoint:'/ingest/track',debug:false,funnelSteps:[{path:'/contact-us',step:1,label:'Form Page',event:'funnel_form_page'},{path:'/contact',step:1,label:'Form Page',event:'funnel_form_page'},{path:'/thank-you',step:2,label:'Form Submitted',event:'funnel_form_submitted'},{path:'/thanks-whats-next',step:3,label:'Booking Confirmed',event:'funnel_booking_confirmed'}]};`}</Script><Script src="https://acrtracking.stealthagents.us/v1/tracker.js" strategy="afterInteractive"/></body></html>;
}
