import { Footer, Header, JsonLd } from './components';
import { blogPosts, services, site, staffingProcess } from './data';

const marker = 'philippines-ops-desk-2026-07';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.brand,
    url: `https://${site.domain.toLowerCase()}`,
    description: 'Independent guidance for building a managed team with Filipino talent.',
  };

  return <>
    <Header/>
    <main className="ops-home" data-design={marker}>
      <JsonLd data={schema}/>
      <section className="ops-hero">
        <div className="container ops-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Philippines-only staffing</p>
            <h1>Build your Filipino team without giving up the controls.</h1>
            <p className="hero-lead">Write the role before you review résumés. Map the work, set the access rules, and decide how you will check quality before a Filipino specialist joins your team.</p>
            <div className="actions"><a className="btn primary" href="/contact">Plan my Filipino team</a><a className="text-link" href="#roles">See the work lanes <span aria-hidden="true">↘</span></a></div>
            <p className="routing-note">This independent site may route your request to a partner that recruits and hires only in the Philippines.</p>
          </div>
          <div className="hero-visual">
            <img src="/philippines-operations-team.svg" alt="Two operations specialists reviewing a shared task board at a desk"/>
            <div className="visual-ticket ticket-one"><span>Role brief</span><b>12 tasks sorted</b></div>
            <div className="visual-ticket ticket-two"><span>Approval rule</span><b>Owner reviews refunds</b></div>
          </div>
        </div>
        <div className="container control-strip" aria-label="Staffing model summary"><div><span>Talent source</span><b>Philippines only</b></div><div><span>Start point</span><b>Written role scope</b></div><div><span>Launch rule</span><b>Limited access first</b></div><div><span>Review rhythm</span><b>Weekly handoff</b></div></div>
      </section>

      <section className="section roles-section" id="roles">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">Work lanes</p><h2>Give repeating work a clear home.</h2><p>A useful role has work the person can own, decisions they cannot make, and a reviewer who will answer the awkward questions.</p></div>
          <div className="role-grid">{services.map((service, index)=><a className="role-card" href={`/services/${service.slug}`} key={service.slug}><span className="role-number">0{index + 1}</span><div><h3>{service.title}</h3><p>{service.desc}</p></div><b>Open role guide <span aria-hidden="true">↗</span></b></a>)}</div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="container process-grid">
          <div className="process-intro"><p className="eyebrow light">The operating brief</p><h2>Map the work before day one.</h2><p>Most handoff trouble starts early: nobody chose an owner, wrote the exception rules, or decided what a good week looks like.</p><div className="brief-card"><span>Sample handoff</span><strong>Done: 18 tickets</strong><strong>Waiting: 3 owner calls</strong><strong>Next: update macros</strong></div></div>
          <div className="process-list">{staffingProcess.map((item)=><article key={item.step}><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section fit-section">
        <div className="container fit-grid">
          <div className="fit-card good"><p className="eyebrow">Good fit</p><h2>You have examples and a reviewer.</h2><ul><li>The work happens often enough to document.</li><li>Someone can answer questions during the first week.</li><li>Sensitive decisions have a clear approval line.</li></ul></div>
          <div className="fit-card pause"><p className="eyebrow">Pause first</p><h2>The process still lives in one person&apos;s head.</h2><ul><li>Every request needs a different answer.</li><li>No one has time to check sample work.</li><li>The new hire would get broad access on day one.</li></ul></div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="container">
          <div className="section-heading compact"><p className="eyebrow light">Choose the model</p><h2>A job board finds people. A staffing brief tells them how to work.</h2></div>
          <div className="comparison-table" role="table" aria-label="Staffing model comparison"><div className="comparison-row heading" role="row"><span>Decision</span><span>Loose marketplace search</span><span>Philippines-first staffing plan</span></div><div className="comparison-row" role="row"><b>Candidate source</b><span>Open-ended</span><span>Filipino talent only</span></div><div className="comparison-row" role="row"><b>Role setup</b><span>Job title and inbox</span><span>Tasks, limits, tools, reviewer</span></div><div className="comparison-row" role="row"><b>First week</b><span>Broad handoff</span><span>Samples and limited access</span></div><div className="comparison-row" role="row"><b>Quality check</b><span>Fix issues as they appear</span><span>Written scorecard and weekly handoff</span></div></div>
        </div>
      </section>

      <section className="section guide-section">
        <div className="container"><div className="section-heading"><p className="eyebrow">Desk notes</p><h2>Read these before the first interview.</h2></div><div className="guide-grid">{blogPosts.slice(0, 3).map((post)=><a href={`/blog/${post.slug}`} key={post.slug}><span>{post.minutes} min</span><h3>{post.title}</h3><p>{post.excerpt}</p><b>Read guide <span aria-hidden="true">↗</span></b></a>)}</div></div>
      </section>

      <section className="container final-panel"><div><p className="eyebrow light">Ready to write the role?</p><h2>Bring the task list. Leave with a Filipino staffing brief.</h2><p>We will map the work, the access rules, and the first-week checks before your request reaches a Philippines-only staffing partner.</p></div><a className="btn primary" href="/contact">Plan my Filipino team</a></section>
    </main>
    <Footer/>
  </>;
}
