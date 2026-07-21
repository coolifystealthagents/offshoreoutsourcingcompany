import * as data from './data';

const dataAny = data as any;
const site = dataAny.site || {};
const footerItems = (dataAny.services || []).slice(0, 6);
const getTitle = (item: any) => typeof item === 'string' ? item : (item.title || item.name || String(item));
const getSlug = (item: any) => typeof item === 'string'
  ? item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  : (item.slug || getTitle(item).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const domain = site.domain || 'this site';
const year = new Date().getFullYear();

export function JsonLd({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function LogoMark() {
  return <span className="logo-mark-wrap"><img className="logo-img" src="/logo.svg" alt="" aria-hidden="true"/><span className="logo-name"><b>Offshore</b><span>Outsourcing Company</span></span></span>;
}

export function Header() {
  return <header className="nav"><div className="nav-inner"><a className="logo" href="/" aria-label={`${site.brand || domain} home`}><LogoMark/></a><nav className="links" aria-label="Main navigation"><a href="/#roles">Roles</a><a href="/#process">How it works</a><a href="/blog">Guides</a><a href="/contact">Contact</a></nav><a className="btn nav-cta" href="/contact">Plan my Filipino team</a></div></header>;
}

export function Footer() {
  return <footer className="legit-footer"><div className="footer-grid"><div className="footer-brand"><a className="footer-logo" href="/" aria-label={`${site.brand || domain} home`}><LogoMark/></a><p>Plan a role for Filipino talent with the tasks, access rules, and review rhythm written down before interviews begin.</p><p className="footer-note">This is an independent informational site. It does not employ candidates. Requests may be routed to a service partner that recruits and hires only in the Philippines.</p></div><div><h3>Roles</h3><div className="footer-links">{footerItems.map((item:any, idx:number)=><a href={`/services/${getSlug(item)}`} key={idx}>{getTitle(item)}</a>)}</div></div><div><h3>Site</h3><div className="footer-links"><a href="/contact">Contact</a><a href="/blog">Guides</a><a href="/privacy">Privacy policy</a><a href="/terms">Terms and conditions</a><a href="/cancellation-policy">Cancellation policy</a></div></div></div><div className="footer-bottom"><span>© {year} {site.brand || domain}. All rights reserved.</span><span>Philippines-only talent sourcing</span></div></footer>;
}

export function CTA() {
  return <section className="final-cta"><p className="eyebrow">Start with the work</p><h2>Put the Filipino role on paper before you interview.</h2><p>Share the tasks, tools, hours, and approval limits. We will turn them into a practical staffing brief.</p><a className="btn primary" href="/contact">Plan my Filipino team</a><small>Independent site. Requests may be routed to a Philippines-only staffing partner.</small></section>;
}
