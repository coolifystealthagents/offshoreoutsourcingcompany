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
          <h1>Turn your recurring workload into a clear Filipino staffing brief.</h1>
          <p className="lead">Tell us which tasks repeat, which tools the role needs, and which decisions stay with your team. We will use those details to prepare a focused staffing conversation.</p>
        </div>
      </section>
      <section className="section">
        <div className="container intake-grid">
          <aside>
            <p className="eyebrow">What to bring</p>
            <h2>A real task list is more useful than a broad job title.</h2>
            <ul className="list">
              <li>Recurring work and expected weekly volume</li>
              <li>Systems, access limits, and working hours</li>
              <li>Examples of an acceptable finished result</li>
              <li>The owner for exceptions and quality review</li>
            </ul>
            <div className="support-strip">
              <h2>No commitment required</h2>
              <p>The consultation is free. Submitting this form does not create a staffing agreement or authorize any paid work.</p>
            </div>
          </aside>
          <StandardContactForm endpoint="/api/contact" encoding="form" />
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
