import Image from 'next/image';
import type { Metadata } from 'next';
import { CTA, Footer, Header, JsonLd } from '../components';
import { services, site } from '../data';
import { serviceContent } from './service-content';
import './services.css';

const base = `https://${site.domain.toLowerCase()}`;
const title = 'Philippines outsourcing services for defined operations work';
const description = 'Compare 14 Philippines-based outsourcing service lanes by scope, inputs, workflow, controls, and the decisions your team retains.';
const heroImage = '/illustrations/getillustrations/goodle-team-illustrations-svg/filipino-operations-team.svg';
const socialImage = `${base}/opengraph-image.png`;

const indexFaqs = [
  {
    question: 'How do we choose the first service lane?',
    answer: 'Choose a recurring queue with stable inputs, a clear owner, enough examples to teach the work, and decisions that can be separated from routine execution.',
  },
  {
    question: 'Do we need finished process documentation before starting?',
    answer: 'No. Current examples and a knowledgeable owner can be enough for a narrow pilot. The first workflow should still document required fields, exceptions, and review evidence before volume expands.',
  },
  {
    question: 'Which decisions stay with our team?',
    answer: 'Your authorized owners retain policy, commercial, legal, people, payment, and other material decisions. Each service page names additional boundaries for that work.',
  },
  {
    question: 'Can several services be combined?',
    answer: 'Yes, when the handoffs are explicit. Begin with one primary queue, measure quality and exceptions, then connect adjacent lanes without blurring ownership.',
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `${title} | ${site.brand}`,
    description,
    url: `${base}/services`,
    type: 'website',
    images: [{ url: socialImage, alt: 'Filipino operations team collaborating around a defined service workflow' }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | ${site.brand}`, description, images: [socialImage] },
};

export default function Services() {
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
          numberOfItems: services.length,
          itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: service.title,
            url: `${base}/services/${service.slug}`,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: indexFaqs.map((faq) => ({
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
        ],
      },
    ],
  };

  return <>
    <Header />
    <div className="services-page">
      <JsonLd data={schema} />
      <section className="services-index-hero">
        <div className="container services-hero-grid">
          <div>
            <p className="eyebrow">Philippines operations service directory</p>
            <h1>Choose a clear service lane, not a vague job description.</h1>
            <p className="lead">Compare the work, inputs, outputs, quality controls, and human decisions for each Philippines-based operations service before you plan the first handoff.</p>
            <div className="services-actions">
              <a className="btn primary" href="#service-directory">Compare services</a>
              <a className="services-text-link" href="/contact-us">Discuss your workflow</a>
            </div>
          </div>
          <div className="services-hero-image">
            <Image src={heroImage} alt="Filipino operations team collaborating around a defined service workflow" width={720} height={620} priority />
          </div>
        </div>
      </section>

      <section className="services-section services-intro" id="service-directory">
        <div className="container">
          <div className="services-heading">
            <div>
              <p className="eyebrow">Service catalog</p>
              <h2>Defined support for recurring operational work</h2>
            </div>
            <p>Every lane starts with a bounded queue and a named client owner. Open a service to review its practical workflow, deliverables, decision boundaries, and starting scenarios.</p>
          </div>
          <div className="service-directory-v3">
            {services.map((service) => {
              const content = serviceContent[service.slug];
              return <a className="service-card-v3" href={`/services/${service.slug}`} key={service.slug}>
                <div className="service-card-image">
                  <Image src={content.heroImage} alt={content.heroAlt} width={640} height={420} />
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span>Review scope and controls</span>
                </div>
              </a>;
            })}
          </div>
        </div>
      </section>

      <section className="services-section services-choice">
        <div className="container services-choice-grid">
          <div>
            <p className="eyebrow light">How to choose a service lane</p>
            <h2>Begin where the work is repeatable and the boundary is visible.</h2>
            <p>A productive first lane does not need to be the largest queue. It needs enough repetition to document, enough volume to review, and a client owner who can resolve exceptions.</p>
          </div>
          <div className="choice-list">
            <article><h3>Choose a real queue</h3><p>Use recurring requests with recognizable inputs and a visible completion state, not a broad goal such as helping the team.</p></article>
            <article><h3>Name the retained decisions</h3><p>Separate routine execution from policy, commercial, payment, hiring, and customer exception decisions.</p></article>
            <article><h3>Define review evidence</h3><p>Agree what will be sampled, which errors matter, and how queue age and exceptions will be discussed.</p></article>
            <article><h3>Expand after calibration</h3><p>Start with representative work, refine the instructions, and increase volume only when the evidence is stable.</p></article>
          </div>
        </div>
      </section>

      <section className="services-section services-faq-section">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Planning questions</p>
            <h2>Frequently asked questions</h2>
            <p className="lead">Use these answers to prepare an initial conversation. Each service detail page adds guidance for its specific workflow.</p>
          </div>
          <div className="faq-list">
            {indexFaqs.map((faq) => <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>)}
          </div>
        </div>
      </section>

      <section className="container services-final-panel">
        <div>
          <p className="eyebrow light">A practical first step</p>
          <h2>Ready to define the first handoff?</h2>
          <p>Bring one recurring queue, a few recent examples, and the name of the person who owns exceptions. We will help you identify a sensible starting boundary.</p>
        </div>
        <a className="btn primary" href="/contact-us">Book a free consultation</a>
      </section>
      <CTA />
    </div>
    <Footer />
  </>;
}
