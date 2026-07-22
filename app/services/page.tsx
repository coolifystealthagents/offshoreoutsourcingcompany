import type { Metadata } from 'next';
import { CTA, Footer, Header, JsonLd } from '../components';
import { services, site } from '../data';

const base = `https://${site.domain.toLowerCase()}`;
const title = 'Philippines outsourcing services';
const description = 'Compare Philippines-based operations staffing services by task scope, owner controls, and review needs.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `${title} | ${site.brand}`,
    description,
    url: `${base}/services`,
    type: 'website',
  },
};

export default function Services() {
  const serviceItems = services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.title,
    url: `${base}/services/${service.slug}`,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${base}/services#page`,
        name: `${title} | ${site.brand}`,
        description,
        url: `${base}/services`,
        mainEntity: {
          '@type': 'ItemList',
          name: 'Philippines outsourcing service directory',
          numberOfItems: serviceItems.length,
          itemListElement: serviceItems,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/services` },
        ],
      },
    ],
  };

  return <>
    <Header/>
    <main>
      <JsonLd data={schema}/>
      <section className="architecture-hero">
        <div className="container">
          <p className="eyebrow">Philippines service directory</p>
          <h1>Specialized support for a defined workload.</h1>
          <p className="lead">Choose a Filipino support lane built around repeatable tasks and written controls. Each service page explains the role before the staffing intake begins.</p>
        </div>
      </section>
      <section className="section">
        <div className="container service-directory">
          {services.map((service) => <a className="card" href={`/services/${service.slug}`} key={service.slug}>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
            <span>Explore service →</span>
          </a>)}
        </div>
      </section>
      <CTA/>
    </main>
    <Footer/>
  </>;
}
