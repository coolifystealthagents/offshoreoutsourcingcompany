import type { Metadata } from 'next';
import { Footer, Header } from '../components';

export const metadata: Metadata = {
  title: 'Consultation Confirmed — What Happens Next',
  description: 'Your free staffing consultation is confirmed. Review what to prepare and what the conversation will cover.',
  robots: { index: false, follow: false },
};

export default function BookingConfirmedPage() {
  return <>
    <Header />
    <main>
      <section className="architecture-hero">
        <div className="container">
          <p className="eyebrow">Consultation confirmed</p>
          <h1>Your time is reserved. Here is what happens next.</h1>
          <p className="lead">You will receive the meeting details at the email address used in the scheduler. No paid work begins from this booking alone.</p>
        </div>
      </section>
      <section className="section">
        <div className="container cards">
          <article className="card"><h2>1. Bring one workflow</h2><p>Choose a recurring task lane and note its volume, deadlines, tools, and current owner.</p></article>
          <article className="card"><h2>2. Mark the decision limits</h2><p>List refunds, payments, policy exceptions, or sensitive account changes that stay with your team.</p></article>
          <article className="card"><h2>3. Define a useful first week</h2><p>Bring examples of acceptable work and decide who can review samples and answer questions.</p></article>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
