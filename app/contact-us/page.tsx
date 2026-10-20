import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header, JsonLd } from '../components';
import ReviewsMarquee from './ReviewsMarquee';
import StandardContactForm from './StandardContactForm';
import './contact.css';

const canonical = 'https://offshoreoutsourcingcompany.com/contact-us';

export const metadata: Metadata = {
  title: { absolute: 'Contact Offshore Outsourcing Company | Free Consultation' },
  description: 'Describe the recurring work, tools, schedule, and approval boundaries for your Philippines-based staffing plan.',
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact Offshore Outsourcing Company',
    description: 'Turn recurring work into a clear, accountable Philippines staffing role.',
    url: canonical,
    type: 'website',
    images: ['/brand/stealth-agents-team-bacolod.png'],
  },
};

const faqs = [
  ['What should I prepare for the consultation?', 'Bring a representative task list, the tools involved, required coverage hours, and the decisions that must stay with your team.'],
  ['What happens after I submit the form?', 'You will continue to a confirmation page where you can choose an available consultation time.'],
  ['Who manages the staffing relationship?', 'StealthAgents supports recruiting and the managed service relationship while your organization retains final business decisions and approvals.'],
];

export default function ContactUsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ContactPage', name: 'Contact Offshore Outsourcing Company', url: canonical },
      { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://offshoreoutsourcingcompany.com' },
        { '@type': 'ListItem', position: 2, name: 'Contact Us', item: canonical },
      ] },
    ],
  };

  return <><Header /><div className="tc-contact"><JsonLd data={schema} />
    <section className="tc-hero" aria-labelledby="contact-title">
      <div className="tc-shell tc-hero-grid">
        <div className="tc-intro">
          <p className="eyebrow">Philippines staffing intake</p>
          <h1 id="contact-title">Define the work before hiring begins.</h1>
          <p className="tc-lead">Share the tasks, tools, schedule, handoffs, and approval limits. The consultation starts with the operating reality, not a generic job description.</p>
          <ReviewsMarquee />
        </div>
        <StandardContactForm endpoint="/api/contact" encoding="form" />
      </div>
    </section>
    <section className="tc-team" aria-labelledby="team-title">
      <div className="tc-shell tc-team-grid">
        <div className="tc-team-copy">
          <img className="tc-parent-logo" src="/brand/stealth-agents-logo-black.png" width="198" height="66" alt="StealthAgents" />
          <p className="eyebrow">Powered by StealthAgents</p>
          <h2 id="team-title">A managed service with a real team behind it</h2>
          <p>Offshore Outsourcing Company is a specialist subsidiary identity supported by StealthAgents. Its team supports recruiting, matching, onboarding, and the managed service relationship. Your organization defines the work and retains final decisions, approvals, and regulated responsibilities.</p>
          <Link className="btn primary" href="#contactPageForm">Describe your staffing lane</Link>
        </div>
        <figure className="tc-team-photo">
          <img src="/brand/stealth-agents-team-bacolod.png" width="1200" height="394" alt="StealthAgents team in Bacolod" />
          <figcaption>Official team, Bacolod</figcaption>
        </figure>
      </div>
    </section>
    <section className="tc-expectations" aria-labelledby="expect-title"><div className="tc-shell">
      <p className="eyebrow">What the conversation covers</p><h2 id="expect-title">Build a scope that can be trained and reviewed.</h2>
      <div className="tc-cards"><article><h3>Work lane</h3><p>Identify repeatable tasks, inputs, expected outputs, and the exceptions that need escalation.</p></article><article><h3>Access and ownership</h3><p>Name the systems, permissions, reviewer, and decisions that remain with authorized personnel.</p></article><article><h3>Launch rhythm</h3><p>Agree on coverage, communication, sample review, feedback, and a practical first-week sequence.</p></article></div>
    </div></section>
    <section className="tc-faq" aria-labelledby="contact-faq"><div className="tc-shell"><h2 id="contact-faq">Frequently asked questions</h2>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  </div><Footer /></>;
}
