import type { Metadata } from 'next';

import { BookingEmbed } from '../booking-components';
import { Footer, Header } from '../components';

export const metadata: Metadata = {
  title: 'Choose a Consultation Time',
  description: 'Choose a time for a free consultation and review what to prepare for the conversation.',
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {

  return <>
    <Header />
    <div className="sa-booking-page">
      <div className="container sa-booking-grid">
        <section className="sa-booking-left">
          <p className="sa-booking-kicker">Consultation scheduling</p>
          <h1>Choose a time to review your Filipino staffing brief.</h1>
          <p className="sa-booking-lead">Bring one recurring workflow, the tools it touches, and the decisions that must stay with your team. Those details keep the consultation practical.</p>
          <img
            className="sa-booking-image"
            src="/illustrations/getillustrations/grain-teamwork-illustrations-svg/teamwork-planning.svg"
            alt="Team planning a documented staffing handoff"
            width="619"
            height="402"
          />
          <div className="support-strip">
            <h2>Prepare these four details</h2>
            <ul>
              <li>Weekly task volume</li>
              <li>Working hours and tools</li>
              <li>Approval limits</li>
              <li>Quality-review owner</li>
            </ul>
          </div>
        </section>
        <BookingEmbed />
      </div>
    </div>
    <Footer />
  </>;
}
