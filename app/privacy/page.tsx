import type { Metadata } from 'next';
import * as data from '../data';
import { Header, Footer } from '../components';

const site = (data as { site?: { brand?: string; domain?: string } }).site || {};
const domain = site.domain || site.brand || 'this website';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${site.brand || domain}.`,
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return <>
    <Header />
    <main className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Privacy policy</p>
          <h1>Privacy Policy</h1>
          <p className="lead">This policy explains how {site.brand || domain} collects, uses, and shares information when you visit {domain} or submit an inquiry.</p>
          <div className="legal-meta"><span>Applies to {domain}</span><time dateTime="2026-09-14">Last updated: September 14, 2026</time></div>
        </div>
      </section>
      <section className="container">
        <article className="legal-card">
          <h2>Who we are</h2>
          <p>{site.brand || domain} is an independent information and referral website. It does not employ candidates. If you request a consultation, your information may be routed to a Philippines staffing partner so that the partner can respond.</p>

          <h2>Information you provide</h2>
          <p>The contact form collects your name, business email address, phone number, company name, company website, company size, number of positions to fill, referral source, and any message you choose to send.</p>

          <h2>Information collected automatically</h2>
          <p>When you use the website, we and our service providers may process technical and usage information such as your IP address, browser and device information, preferred language, referring page, pages viewed, form and call-to-action events, and submission time. We use this information to operate the site, protect forms, understand site performance, and measure inquiries.</p>

          <h2>How we use information</h2>
          <p>We use submitted information to respond to requests, prepare staffing or outsourcing guidance, route inquiries to an appropriate service team or partner, improve website content, reduce spam, measure site performance, and maintain necessary business records.</p>

          <h2>Service providers and lead routing</h2>
          <p>We may disclose information to providers that host the website, process analytics and lead events, operate lead-intake or CRM systems, deliver communications, prevent abuse, or respond to staffing inquiries. These providers may process information in countries other than the country where you live.</p>

          <h2>Cookies and similar technologies</h2>
          <p>This website may use hosting logs, analytics, pixels, cookies, or similar tools to understand traffic, improve pages, protect forms, and measure marketing performance. Your browser settings may allow you to limit or block cookies.</p>

          <h2>Data retention</h2>
          <p>We keep information only as long as reasonably needed for the purposes above, unless a longer period is required for legal, security, tax, dispute, or business-record reasons.</p>

          <h2>Security</h2>
          <p>We use reasonable administrative and technical safeguards intended to protect submitted information. No internet transmission or storage system can be guaranteed to be completely secure.</p>

          <h2>Your choices</h2>
          <p>You may contact us to request access, correction, or deletion of personal information where applicable. Some records may need to be retained when required by law or for legitimate security, dispute, or record-keeping purposes.</p>

          <h2>Policy changes</h2>
          <p>We may update this policy when our practices or services change. The date at the top of this page identifies the latest revision.</p>

          <h2>Contact</h2>
          <p>For privacy questions or requests, use the <a href="/contact-us">contact form</a> and write “Privacy request” in the message field so the request can be routed appropriately.</p>
        </article>
      </section>
    </main>
    <Footer />
  </>;
}
