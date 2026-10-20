import type { Metadata } from "next";
import { Header, Footer } from "../components";
import { datedResearchPosts } from "../data";

export const metadata: Metadata = {
  title: { absolute: "Staffing Research | Offshore Outsourcing Company" },
  description:
    "Original research and source-backed analysis for planning Philippines-based support.",
  alternates: { canonical: "/research" },
  openGraph: { title: "Staffing Research", description: "Original research and source-backed analysis for planning Philippines-based support.", url: "/research", type: "website", images: ["/opengraph-image.png"] },
  twitter: { card: "summary_large_image", title: "Staffing Research", description: "Original research and source-backed analysis for planning Philippines-based support.", images: ["/opengraph-image.png"] },
};

const classifyResearch = (title: string, slug: string) => {
  const value = `${title} ${slug}`.toLowerCase();
  if (/cost|rate|salary|benchmark|market|capacity|volume/.test(value))
    return "Benchmarks";
  if (/hire|candidate|interview|work-sample|recruit|role-scope/.test(value))
    return "Hiring controls";
  if (/security|access|privacy|risk|approval|fraud/.test(value))
    return "Risk and access";
  if (/quality|audit|review|metric|score|evidence/.test(value))
    return "Quality systems";
  return "Workflow design";
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export default function Research() {
  const posts = [...datedResearchPosts].sort(
    (a, b) =>
      (b.date || "0000-00-00").localeCompare(a.date || "0000-00-00") ||
      a.slug.localeCompare(b.slug),
  );
  const featuredPosts = posts.slice(0, 18);
  const archivePosts = posts.slice(18);

  return (
    <>
      <Header />
      <div className="research-index-page">
        <section className="research-hero">
          <div className="container research-hero-grid">
            <div>
              <p className="eyebrow light">Research library</p>
              <h1>Source-backed research for better staffing decisions.</h1>
              <p className="lead">
                Compare role scope, controls, and operating evidence before
                building a Philippines-based support team. Every report keeps
                recommendations separate from owner-only decisions.
              </p>
              <div className="research-meta">
                <span>{posts.length} reports</span>
                <span>Methods disclosed</span>
                <span>Sources retained</span>
              </div>
            </div>
            <aside
              className="research-hero-card"
              aria-label="How to use this research"
            >
              <div>
                <strong>Start with the question</strong>
                <span>Identify the business decision this report should inform.</span>
              </div>
              <div>
                <strong>Check the method</strong>
                <span>Review the evidence, scope, and stated limitations.</span>
              </div>
              <div>
                <strong>Retain ownership</strong>
                <span>Keep consequential decisions with the accountable owner.</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section research-library-section">
          <div className="container">
            <div className="research-index-intro">
              <div>
                <p className="eyebrow">Latest reports</p>
                <h2>Recent evidence, organized by the decision it supports.</h2>
              </div>
              <p>
                The latest reports are shown as full summaries. The complete
                archive remains directly linked below without turning the page
                into a repetitive card wall.
              </p>
            </div>
            <div className="research-card-grid">
              {featuredPosts.map((post) => (
                <a
                  className="research-library-card"
                  href={`/research/${post.slug}`}
                  key={post.slug}
                >
                  <span className="research-card-badge">
                    {classifyResearch(post.title, post.slug)}
                  </span>
                  <h3>{post.title}</h3>
                  <p className="research-card-excerpt">{post.excerpt}</p>
                  <div className="research-card-meta">
                    {post.date ? (
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    ) : (
                      <span>Undated report</span>
                    )}
                    <span>
                      Read report <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {archivePosts.length > 0 && (
              <details className="research-archive">
                <summary>
                  Browse the complete research archive{" "}
                  <span>{archivePosts.length} additional reports</span>
                </summary>
                <div className="research-archive-list">
                  {archivePosts.map((post) => (
                    <a href={`/research/${post.slug}`} key={post.slug}>
                      <span>{classifyResearch(post.title, post.slug)}</span>
                      <strong>{post.title}</strong>
                      {post.date && (
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      )}
                    </a>
                  ))}
                </div>
              </details>
            )}
          </div>
        </section>

        <section className="research-methodology">
          <div className="container">
            <p className="eyebrow">How to read the library</p>
            <h2>Evidence is context - not a staffing promise.</h2>
            <p>
              Each report states a bounded question, method, evidence,
              limitations, and an operating implication. National or industry
              data never substitutes for a role-specific work sample, reference
              check, security review, or accountable owner.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
