import { Footer, Header, JsonLd } from '../components';
import { leadQuestions, site, staffingFitNote, staffingOffer } from '../data';

export const metadata = {
  title: `Contact ${site.brand}`,
  description: 'Request a Philippines-only staffing plan. Share the role, tasks, tools, schedule, and quality needs.',
};

export default function Contact() {
  const siteUrl = `https://${String(site.domain).toLowerCase()}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ContactPage', name: `Contact ${site.brand}`, url: `${siteUrl}/contact` },
      { '@type': 'Organization', name: site.brand, url: siteUrl },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
      ] },
    ],
  };

  return <><Header/><main className="section"><JsonLd data={schema}/><div className="container two"><div><p className="eyebrow">Philippines staffing intake</p><h1>Put the Filipino role on paper.</h1><p className="lead">Tell us what keeps landing back on your desk. We will map the tasks, tools, hours, approval limits, and first-week checks for a Filipino team member.</p><div className="card"><h2>What goes into the brief</h2><ul className="list">{staffingOffer.included.map((item)=><li key={item}>{item}</li>)}</ul></div><div className="card"><h2>Questions worth answering now</h2><ul className="list">{leadQuestions.map((question)=><li key={question}>{question}</li>)}</ul></div><p className="callout"><b>How requests are handled:</b> {staffingFitNote}</p></div><form className="card" action="/thank-you"><p className="eyebrow">Your role notes</p><h2>Plan my Filipino team</h2><label>Name<input required name="name"/></label><label>Email<input required name="email" type="email"/></label><label>Company or website<input name="company"/></label><label>What work should the Filipino team member own?<textarea name="tasks" rows={6}/></label><label>What needs the most thought?<select name="concern"><option>Finding the right Filipino specialist</option><option>Quality checks and reporting</option><option>Working hours and coverage</option><option>Tool access and data safety</option><option>Adding another Philippines-based role later</option></select></label><button className="btn" type="submit">Plan my Filipino team</button><small>By submitting, you agree that your request may be sent to a staffing partner that recruits and hires only in the Philippines.</small></form></div></main><Footer/></>;
}
