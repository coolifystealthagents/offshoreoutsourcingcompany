import type { Metadata } from 'next';
import { Footer, Header, CTA } from '../../components';
import { services, site } from '../../data';

const siteUrl = 'https://offshoreoutsourcingcompany.com';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: 'Service' };
  }

  const canonical = `${siteUrl}/services/${service.slug}`;

  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical },
    openGraph: {
      title: `${service.title} | ${site.brand}`,
      description: service.desc,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug) || services[0];
  const canonical = `${siteUrl}/services/${service.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: service.title,
        description: service.desc,
        mainEntity: { '@id': `${canonical}#service` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: service.title,
        description: service.desc,
        url: canonical,
        provider: {
          '@type': 'Organization',
          name: site.brand,
          url: siteUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: service.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="service-hero">
          <div className="container two">
            <div>
              <p className="eyebrow">{site.brand} service</p>
              <h1>{service.title}</h1>
              <p className="lead">{service.desc}</p>
              <a className="btn" href="/contact">
                Plan this role
              </a>
            </div>
            <div className="hero-card">
              <img
                src={site.serviceImage}
                alt={`${service.title} offshore service team`}
              />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container cards">
            <div className="card">
              <h3>Best tasks</h3>
              <ul>
                <li>Recurring work with examples</li>
                <li>Inbox, tickets, reports, updates, or follow-up</li>
                <li>Tasks with clear approval rules</li>
              </ul>
            </div>
            <div className="card">
              <h3>Quality controls</h3>
              <ul>
                <li>Daily notes</li>
                <li>Weekly scorecard</li>
                <li>Escalation list</li>
              </ul>
            </div>
            <div className="card">
              <h3>First week</h3>
              <ul>
                <li>Tool access</li>
                <li>Sample work</li>
                <li>Review call</li>
              </ul>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
