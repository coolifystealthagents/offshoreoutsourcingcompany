import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTA, Footer, Header, JsonLd } from '../../components';
import { services, site } from '../../data';
import { serviceContent } from '../service-content';
import '../services.css';

const base = `https://${String(site.domain).toLowerCase()}`;

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = serviceContent[slug];
  if (!service || !content) return { title: 'Service not found' };
  const url = `${base}/services/${service.slug}`;
  const socialImage = `${base}/opengraph-image.png`;
  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.brand}`,
      description: service.desc,
      url,
      type: 'website',
      images: [{ url: socialImage, alt: content.heroAlt }],
    },
    twitter: { card: 'summary_large_image', title: `${service.title} | ${site.brand}`, description: service.desc, images: [socialImage] },
  };
}

function ListSection({ title, items, className = '' }: { title: string; items: string[]; className?: string }) {
  return <section className={`service-detail-block ${className}`}>
    <h2>{title}</h2>
    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
  </section>;
}

export default async function Service({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = serviceContent[slug];
  if (!service || !content) notFound();
  const url = `${base}/services/${service.slug}`;
  const relatedServices = content.related.map((relatedSlug) => services.find((item) => item.slug === relatedSlug)).filter((item): item is (typeof services)[number] => Boolean(item));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        description: service.desc,
        url,
        image: `${base}${content.heroImage}`,
        provider: { '@type': 'Organization', name: site.brand, url: base },
        areaServed: { '@type': 'Country', name: 'Philippines' },
        serviceType: service.title,
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
    ],
  };

  return <>
    <Header />
    <div className="services-page service-detail-page">
      <JsonLd data={schema} />
      <section className="service-detail-hero">
        <div className="container services-hero-grid">
          <div>
            <p className="eyebrow">Philippines-based service</p>
            <p className="service-breadcrumb"><a href="/services">Services</a><span>/</span>{service.title}</p>
            <h1>{service.title}</h1>
            <p className="lead">{service.desc}</p>
            <div className="services-actions">
              <a id={`cta-service-${service.slug}-free-consultation`} className="btn primary" href="/contact-us">Book a free consultation</a>
              <a className="services-text-link dark" href="#service-scope">Review the workflow</a>
            </div>
          </div>
          <div className="services-hero-image detail-image">
            <Image src={content.heroImage} alt={content.heroAlt} width={760} height={600} priority />
          </div>
        </div>
      </section>

      <section className="services-section detail-audience">
        <div className="container detail-intro-grid">
          <div>
            <p className="eyebrow">The operating need</p>
            <h2>Who this service is for</h2>
          </div>
          <p>{content.audience}</p>
        </div>
      </section>

      <section className="services-section service-detail-content" id="service-scope">
        <div className="container detail-content-grid">
          <ListSection title="What the service can cover" items={content.scope} />
          <ListSection title="What your team provides" items={content.inputs} className="tinted" />
          <section className="service-detail-block workflow-block">
            <h2>How the workflow runs</h2>
            <div className="workflow-list">
              {content.workflow.map((item) => <article key={item}><span aria-hidden="true" /><p>{item}</p></article>)}
            </div>
          </section>
          <ListSection title="Outputs and deliverables" items={content.deliverables} className="accented" />
          <ListSection title="Human decisions and boundaries" items={content.boundaries} className="boundary-block" />
          <ListSection title="Quality controls" items={content.quality} />
        </div>
      </section>

      <section className="services-section scenarios-section">
        <div className="container">
          <div className="services-heading compact-heading">
            <div>
              <p className="eyebrow light">When to consider this lane</p>
              <h2>Common starting scenarios</h2>
            </div>
            <p>These are useful signals for discovery, not promises that every queue should be transferred as it stands.</p>
          </div>
          <div className="scenario-grid">
            {content.scenarios.map((scenario) => <article key={scenario}><p>{scenario}</p></article>)}
          </div>
        </div>
      </section>

      <section className="services-section services-faq-section">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Service questions</p>
            <h2>Frequently asked questions</h2>
            <p className="lead">The answers describe a controlled starting model. The final scope depends on your systems, examples, permissions, and approval rules.</p>
          </div>
          <div className="faq-list">
            {content.faqs.map((faq) => <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>)}
          </div>
        </div>
      </section>

      <section className="services-section related-services-section">
        <div className="container">
          <div className="services-heading compact-heading">
            <div><p className="eyebrow">Adjacent workflows</p><h2>Related services</h2></div>
            <p>Explore connected lanes when the handoff between queues can be documented without combining their decision owners.</p>
          </div>
          <div className="related-services-grid">
            {relatedServices.map((related) => <a href={`/services/${related.slug}`} key={related.slug}>
              <h3>{related.title}</h3>
              <p>{related.desc}</p>
              <span>Explore this service</span>
            </a>)}
          </div>
        </div>
      </section>

      <section className="container services-final-panel">
        <div>
          <p className="eyebrow light">Define the first handoff</p>
          <h2>Bring a real {service.title.toLowerCase()} queue to the conversation.</h2>
          <p>We can review representative work, identify the decisions your team should retain, and outline a measured starting scope.</p>
        </div>
        <a className="btn primary" href="/contact-us">Book a free consultation</a>
      </section>
      <CTA />
    </div>
    <Footer />
  </>;
}
