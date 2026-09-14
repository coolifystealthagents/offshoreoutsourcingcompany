import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header, Footer, CTA } from '../../components';
import { datedResearchPosts } from '../../data';
import { parseResearchBody } from '../../../lib/research-content';

const formatPublicDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const getModifiedDate = (post: unknown) => typeof post === 'object' && post !== null &&
  'modifiedDate' in post && typeof post.modifiedDate === 'string' ? post.modifiedDate : undefined;

const urlPattern = /https?:\/\/[^\s),]+/g;

function linkedText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(urlPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));
    const url = match[0].replace(/[.;]+$/, '');
    let label = 'External source';
    try { label = new URL(url).hostname.replace(/^www\./, ''); } catch {}
    nodes.push(<a href={url} rel="noreferrer" key={`${url}-${index}`}>{label}</a>);
    cursor = index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function ResearchBody({ body }: { body: readonly string[] }) {
  const { sections, sources } = parseResearchBody(body);

  return <div className="research-body">
    {sections.map((section, index) => section.heading
      ? <section className={`research-body-section research-${section.kind}`} key={`${section.kind}-${index}`}>
          <h2>{section.heading}</h2>
          <p>{linkedText(section.text)}</p>
        </section>
      : <p key={`paragraph-${index}`}>{linkedText(section.text)}</p>)}
    {sources.length > 0 && <section className="research-sources" aria-labelledby="research-sources-title">
      <h2 id="research-sources-title">Sources and further reading</h2>
      <ol className="research-source-list">
        {sources.map((url, index) => {
          let label = `Source ${index + 1}`;
          try { label = `${new URL(url).hostname.replace(/^www\./, '')} — source ${index + 1}`; } catch {}
          return <li key={url}><a href={url} rel="noreferrer">{label}</a></li>;
        })}
      </ol>
    </section>}
  </div>;
}

export function generateStaticParams() {
  return datedResearchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = datedResearchPosts.find((item) => item.slug === slug);
  const modifiedDate = getModifiedDate(post);
  const hero = post && 'hero' in post ? post.hero : undefined;
  return post ? {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/research/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: modifiedDate,
      images: hero ? [hero] : undefined,
    },
  } : {};
}

export default async function ResearchPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = datedResearchPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const hero = 'hero' in post ? post.hero : undefined;
  const relatedService = 'relatedService' in post ? post.relatedService : undefined;
  const modifiedDate = getModifiedDate(post);
  const articleUrl = `https://offshoreoutsourcingcompany.com/research/${post.slug}`;

  return <>
    <Header />
    <main className="section research-article-page">
      <article className="container guide-article research-article">
        <p className="eyebrow">Philippines staffing research</p>
        <h1>{post.title}</h1>
        <div className="article-meta">
          {post.date && <time dateTime={post.date}>Published {formatPublicDate(post.date)}</time>}
          {modifiedDate && <time dateTime={modifiedDate}>Updated {formatPublicDate(modifiedDate)}</time>}
          <span>Evidence, method, and operating limits</span>
        </div>
        <p className="lead">{post.excerpt}</p>
        {hero && <img className="research-article-hero" src={hero} alt={`${post.title} editorial illustration`} width="1536" height="1024" />}
        <ResearchBody body={post.body} />
        {relatedService && <aside className="research-role-brief" aria-label="Related Philippines staffing service">
          <p className="eyebrow">Apply the evidence</p>
          <h2>Turn this report into a role brief.</h2>
          <p>{relatedService.body}</p>
          <a id={`cta-research-${post.slug}-free-consultation`} className="btn primary" href="/contact-us">Book a Free Consultation</a>
        </aside>}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: modifiedDate,
        mainEntityOfPage: articleUrl,
        image: hero ? `https://offshoreoutsourcingcompany.com${hero}` : undefined,
      }) }} />
      <CTA />
    </main>
    <Footer />
  </>;
}
