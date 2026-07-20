import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { metadataBase: new URL('https://offshoreoutsourcingcompany.com'), title: { default: 'Offshore Outsourcing Company | Offshore outsourcing guides', template: '%s | Offshore Outsourcing Company' }, description: 'our staffing team-style guides for offshore outsourcing company: services, onboarding, role scope, and provider questions.', openGraph: { title: 'Offshore Outsourcing Company', description: 'Practical outsourcing guides for business teams.', url: 'https://offshoreoutsourcingcompany.com', siteName: 'Offshore Outsourcing Company', type:'website' } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='en'><body>{children}</body></html>}
