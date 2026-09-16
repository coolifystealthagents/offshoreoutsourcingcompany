import type { Metadata } from "next";
import { Header, Footer } from "../components";
import StandardContactForm from "./StandardContactForm";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us: Offshore Team Consultation",
  description: "Book a free consultation to plan a well-governed Philippines-based offshore operations team.",
  alternates: { canonical: "/contact-us" },
  robots: { index: true, follow: true },
  openGraph: { title: "Plan Your Offshore Team", description: "Scope tasks, access, coverage, and review controls for Philippines-based offshore support.", url: "/contact-us" },
};

const services = [
  ["Back-office operations", "Coordinate recurring queues, update systems, and keep exceptions visible to the accountable owner."],
  ["Customer support", "Handle approved inquiries and follow-up with documented scripts, service levels, and escalation rules."],
  ["Executive support", "Protect calendars, inboxes, meeting preparation, and follow-through with clear decision boundaries."],
  ["Research and reporting", "Prepare source-backed research, recurring reports, and exception summaries for internal review."],
];

const controls = [
  ["Document the role", "Define repeatable inputs, examples, systems, outputs, and the decisions that remain with your team."],
  ["Set safe access", "Match permissions to the work, name approvers, and establish an access review and offboarding path."],
  ["Review the operation", "Use a named manager, regular quality checks, and a simple launch scorecard to keep work accountable."],
];

export default function ContactUsPage(){return <>
  <Header/>
  <main className="trusted-contact">
    <section className="tc-hero"><div className="container tc-hero-grid">
      <div className="tc-copy"><p className="tc-kicker">Philippines operations, clearly scoped</p><h1>Build offshore capacity without losing control.</h1><p className="tc-lead">Tell us about your recurring work, systems, coverage hours, approval limits, and expected outcomes. We’ll help turn them into a practical offshore team brief.</p><div className="tc-proof-row"><span>35+ industries</span><span>Philippines talent focus</span><span>Free consultation</span></div><a className="tc-text-link" href="#offshore-support">Explore the planning model →</a></div>
      <StandardContactForm endpoint="/api/contact" encoding="form"/>
    </div></section>
    <section className="tc-strip"><div className="container tc-strip-grid"><strong>A practical consultation</strong><span>✓ Task inventory</span><span>✓ Access boundaries</span><span>✓ Coverage plan</span><span>✓ Review cadence</span></div></section>
    <section className="tc-section" id="offshore-support"><div className="container"><div className="tc-section-head"><div><p className="tc-kicker">Where offshore support fits</p><h2>Start with work that can be clearly owned.</h2></div><p>Strong offshore operations pair repeatable tasks with complete handoffs, visible owners, secure access, and unmistakable escalation points.</p></div><div className="tc-card-grid">{services.map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="tc-inline-cta"><strong>Already have a task list?</strong><a href="#contactPageForm">Discuss it with our team</a></div></div></section>
    <section className="tc-controls"><div className="container"><p className="tc-kicker">A governed operating model</p><h2>Scale the operation with visible controls.</h2><div className="tc-control-grid">{controls.map(([title,body])=><article key={title}><div aria-hidden="true">✓</div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="tc-section"><div className="container tc-check-grid"><div><p className="tc-kicker">Consultation checklist</p><h2>Bring the workflow, not just a job title.</h2><p>We’ll map the conditions that help a Philippines-based offshore specialist contribute safely and consistently.</p></div><ul><li>Recurring tasks and expected volume</li><li>Tools, permissions, and source systems</li><li>Coverage hours and response expectations</li><li>Approval and escalation ownership</li><li>Examples and definition of done</li><li>First-month quality scorecard</li></ul></div></section>
    <section className="tc-why"><div className="container tc-why-grid"><img src="/philippines-operations-team.svg" width="1200" height="800" alt="Philippines-based offshore operations team coordinating a documented workflow"/><div><p className="tc-kicker">Why structure matters</p><h2>Every handoff should strengthen accountability.</h2><p>We shape offshore support around documented inputs, named owners, secure access, measurable outputs, and clear escalation rules—so capacity grows without creating operational fog.</p><a href="#contactPageForm">Scope my offshore team →</a></div></div></section>
    <section className="tc-about"><div className="container tc-about-grid"><div><p className="tc-kicker">Powered by a proven team</p><h2>About Stealth Agents</h2><p>Stealth Agents works with over 35+ different industries. We're featured on Forbes as the top rated virtual assistant company.</p></div><a href="https://stealthagents.com" rel="noopener noreferrer">Powered by Stealth Agents</a></div></section>
    <section className="container tc-final"><div><p className="tc-kicker">A clearer offshore plan</p><h2>Build capacity your team can confidently manage.</h2><p>Share the work, systems, hours, and boundaries. We’ll help define the role and next steps.</p></div><a href="#contactPageForm">Book a free consultation</a></section>
  </main>
  <Footer/>
</>}
