import type { Metadata } from 'next';
import { Footer, Header } from '../components';
import StandardContactForm from './StandardContactForm';

export const metadata: Metadata = {
  title: 'Book a Free Philippines Staffing Consultation',
  description: 'Share the tasks, tools, schedule, and review rules for the Filipino specialist your business needs.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactUsPage() {
  return <>
    <Header />
    <main className="contact-page">
      <section className="architecture-hero">
        <div className="container">
          <p className="eyebrow">Free Philippines staffing consultation</p>
          <h1>Build a clear brief for your Philippines-based role.</h1>
          <p className="lead">Share the recurring tasks, tools, schedule, and decision limits. We’ll use them to prepare a focused staffing conversation.</p>
        </div>
      </section>
      <section className="section">
        <div className="container intake-grid">
          <StandardContactForm endpoint="/api/contact" encoding="form" />
          <aside className="contact-intake-copy">
            <p className="eyebrow">What to bring</p>
            <h2>Bring a task list—not just a job title.</h2>
            <ul className="list">
              <li>Recurring tasks and expected weekly volume</li>
              <li>Required systems, access limits, and working hours</li>
              <li>An example of an acceptable finished result</li>
              <li>The owner for exceptions and quality review</li>
            </ul>
            <div className="support-strip">
              <h2>No commitment required</h2>
              <p>The consultation is free. Submitting this form does not create a staffing agreement or authorize paid work.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
