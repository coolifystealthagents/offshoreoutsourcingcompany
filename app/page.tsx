import * as data from './data';
import { Header, Footer, JsonLd } from './components';

const dataAny = data as any;
const site = dataAny.site || {};
const services = (dataAny.services || dataAny.roles || dataAny.industries || []).slice(0, 6);
const posts = (dataAny.blogPosts || []).slice(0, 4);
const stats = (dataAny.stats || []).slice(0, 3);
const process = (dataAny.staffingProcess || dataAny.checklistSteps || []).slice(0, 5);
const questions = (dataAny.leadQuestions || dataAny.faqs || []).slice(0, 5);
const compare = (dataAny.compareRows || dataAny.proofCards || dataAny.sourcePlaceholders || []).slice(0, 4);
const offer = dataAny.staffingOffer || {};
const formatList = (value: any) => Array.isArray(value) ? value.filter(Boolean).join(', ') : value;
const getTitle = (item: any, fallback = 'Service') => typeof item === 'string' ? item : (item.title || item.name || item.label || item.question || item.option || item.country || fallback);
const getText = (item: any, fallback = 'Clear scope, simple handoff, and a practical staffing plan built around the work.') => {
  if (typeof item === 'string') return item;
  const direct = item.desc || item.body || item.copy || item.excerpt || item.note || item.answer;
  if (direct) return formatList(direct);
  const parts = [
    item.bestFor ? `Best for: ${formatList(item.bestFor)}` : '',
    item.watch ? `Watch out for: ${formatList(item.watch)}` : '',
    item.ask ? `Ask: ${formatList(item.ask)}` : '',
    item.overlap ? `Coverage: ${formatList(item.overlap)}` : '',
  ].filter(Boolean);
  return parts.length ? parts.join(' • ') : fallback;
};

export default function Home(){
  const schema = { '@context':'https://schema.org', '@type':'WebSite', name: site.brand, url: `https://${site.domain}` };
  return <><Header/><main>
    <JsonLd data={schema}/>
    <section className="hero-shell">
      <div className="hero-kicker"><span>{site.badge || 'Staffing guide'}</span><span>{site.domain}</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Global logistics</p>
          <h1>Offshore Outsourcing Company: a route planner for clearer staffing decisions.</h1>
          <p className="lead">A redesigned offshore outsourcing company guide for buyers comparing offshore outsourcing companies and managed teams. The page now uses a distinct wide layered routes layout, industry-specific planning sections, and a conversion path that feels made for this niche.</p>
          <div className="hero-actions"><a className="btn primary" href="/contact">Request staffing plan</a><a className="btn secondary" href="#services">Explore the plan</a></div>
        </div>
        <figure className="hero-media"><img src={site.heroImage || site.serviceImage} alt={site.alt || `${site.brand} planning visual`}/><figcaption>route lines and port labels</figcaption></figure>
      </div>
    </section>

    <section className="journey-map"><p className="eyebrow">Customer journey</p><div>{['Messy task list','Role scope','Matched support','Measured handoff'].map((step, idx)=><article key={step}><span>{idx+1}</span><h3>{step}</h3><p>Move from guesswork to a defined staffing plan with tools, limits, and quality checks.</p></article>)}</div></section>
    <section className="quote-slab"><blockquote>“The right hire starts with a clean operating map, not a vague job post.”</blockquote><p>{site.primary} decisions get easier when every task has an owner, a standard, and a review rhythm.</p></section>
    <section className="two-column-list"><h2>What to clarify first</h2><div>{questions.slice(0,4).map((q:any, idx:number)=><p key={idx}><b>{String(idx+1).padStart(2,'0')}</b>{getTitle(q, String(q))}</p>)}</div></section>

    <section className="service-index" id="services">
      <div className="section-label"><span>Service index</span><b>{String(services.length).padStart(2,'0')}</b></div>
      <div className="index-list">{services.map((item:any, idx:number)=><a className="index-row" href={`/services/${item.slug || String(getTitle(item)).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} key={idx}><span>{String(idx+1).padStart(2,'0')}</span><strong>{getTitle(item)}</strong><em>{getText(item)}</em></a>)}</div>
    </section>

    <section className="process-ribbon" id="process">
      <div><p className="eyebrow">Operating rhythm</p><h2>Turn the scope into a managed handoff.</h2></div>
      <div className="timeline">{process.map((item:any, idx:number)=><article key={idx}><span>{String(idx+1).padStart(2,'0')}</span><h3>{getTitle(item, `Step ${idx+1}`)}</h3><p>{getText(item)}</p></article>)}</div>
    </section>

    <section className="question-block">
      <div className="question-intro"><p className="eyebrow">Before you request help</p><h2>Answer these before the first match.</h2><p>{dataAny.staffingFitNote || 'The best plan depends on scope, tools, schedule, skills, and the way quality will be checked.'}</p></div>
      <ul>{questions.map((q:any, idx:number)=><li key={idx}><span>{idx+1}</span>{getTitle(q, String(q))}</li>)}</ul>
    </section>

    <section className="resource-strip">
      <div><p className="eyebrow">Resource library</p><h2>Read the guides before you scale.</h2></div>
      <div className="resource-grid">{posts.map((post:any, idx:number)=><a href={`/blog/${post.slug || '#'}`} key={idx}><span>{post.minutes || 7} min</span><strong>{getTitle(post)}</strong><p>{getText(post)}</p></a>)}</div>
    </section>

    <section className="final-cta"><p className="eyebrow">Next step</p><h2>Send the role details and get the plan.</h2><p>{offer.promise || 'Share the work you want off your plate and get a practical staffing plan.'}</p><a className="btn primary" href="/contact">Request staffing plan</a></section>
  </main><Footer/></>;
}
