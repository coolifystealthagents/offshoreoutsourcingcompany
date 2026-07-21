import { Header, Footer, CTA, JsonLd } from '../../components';
import { blogDetails, blogPosts, site } from '../../data';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  return { title: p?.title || 'Guide', description: p?.excerpt };
}

const siteUrl = `https://${String(site.domain).toLowerCase()}`;

type BlogDetail = (typeof blogDetails)[keyof typeof blogDetails];

function detailFor(slug: string): BlogDetail | undefined {
  return (blogDetails as Record<string, BlogDetail | undefined>)[slug];
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug) || blogPosts[0];
  const detail = detailFor(slug);
  const url = `${siteUrl}/blog/${p.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        url,
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: site.brand, url: siteUrl },
        publisher: { '@type': 'Organization', name: site.brand, url: siteUrl },
        citation: detail?.sources.map((source) => source.url),
      },
      detail
        ? {
            '@type': 'FAQPage',
            mainEntity: detail.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }
        : undefined,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <>
      <Header />
      <main className="section">
        <JsonLd data={schema} />
        <article className="container" style={{ maxWidth: 920 }}>
          <p className="eyebrow">Philippines staffing guide</p>
          <h1>{p.title}</h1>
          <p className="lead">{p.excerpt}</p>

          {detail ? (
            <>
              <div className="card">
                <h2>Key takeaways</h2>
                <ul className="list">
                  {detail.keyTakeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h2>Better provider questions</h2>
                <p>
                  A weak answer sounds friendly but leaves the risk with you. A useful answer names the owner,
                  the check, and the fallback.
                </p>
                <div style={{ display: 'grid', gap: 12 }}>
                  {detail.comparisonRows.map((row) => (
                    <div className="card" key={row.label} style={{ boxShadow: 'none' }}>
                      <p className="eyebrow">{row.label}</p>
                      <p><b>Weak:</b> {row.weak}</p>
                      <p><b>Ask instead:</b> {row.strong}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2>Copy-ready script</h2>
                <p className="quote">"{detail.script}"</p>
              </div>

              <div className="card">
                <h2>First-week risk check</h2>
                <p>
                  Give the provider five real samples before you share broad account access. Check one sample
                  together, then let the staff member complete the next few while you track errors, response time,
                  and judgment calls. If the provider cannot explain who fixes mistakes, pause before scaling.
                </p>
              </div>

              <div className="card">
                <h2>Sources</h2>
                <ul className="list">
                  {detail.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url}>{source.name}</a>: {source.note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h2>FAQ</h2>
                {detail.faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card">
              <h2>The short answer</h2>
              <p>Start with one role, a short task list, and a weekly scorecard. Do not outsource a messy process until examples and rules are clear.</p>
              <h2>What to prepare</h2>
              <ul>
                <li>Task examples and sample replies</li>
                <li>Tool access and permission rules</li>
                <li>Daily output target</li>
                <li>Escalation rules for anything sensitive</li>
              </ul>
              <h2>Questions to ask</h2>
              <ul>
                <li>Who screens the worker?</li>
                <li>Who checks quality?</li>
                <li>What happens if fit is poor?</li>
                <li>How are passwords and customer data handled?</li>
              </ul>
            </div>
          )}
        </article>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
