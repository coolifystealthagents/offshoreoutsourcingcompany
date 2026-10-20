import type { Metadata } from 'next';
import { Footer, Header } from '../components';

export const metadata: Metadata = {
  title: 'After Scheduling - Prepare for Your Consultation',
  description: 'Review what to prepare after using the consultation scheduler. Your scheduler confirmation remains the source of truth for meeting status.',
  robots: { index: false, follow: false },
};

export default function BookingNextStepsPage() {
  return <>
    <Header />
    <div>
      <section className="architecture-hero">
        <div className="container">
          <p className="eyebrow">Consultation preparation</p>
          <h1>What happens next after you use the scheduler?</h1>
          <p className="lead">Check the confirmation shown by OnceHub or sent to your email for the authoritative meeting status and joining details. Visiting this page alone does not confirm a booking.</p>
        </div>
      </section>
      <section className="section">
        <div className="container cards">
          <article className="card"><h2>1. Bring one workflow</h2><p>Choose a recurring task lane and note its volume, deadlines, tools, and current owner.</p></article>
          <article className="card"><h2>2. Mark the decision limits</h2><p>List refunds, payments, policy exceptions, or sensitive account changes that stay with your team.</p></article>
          <article className="card"><h2>3. Define a useful first week</h2><p>Bring examples of acceptable work and decide who can review samples and answer questions.</p></article>
        </div>
      </section>
    </div>
    <Footer />
  </>;
}
