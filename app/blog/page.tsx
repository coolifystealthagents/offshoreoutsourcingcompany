import { Header, Footer, CTA } from "../components";
import { blogPosts, site, sortBlogPosts } from "../data";
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export const metadata = {
  title: `Blog | ${site.brand}`,
  description: "Practical Philippines staffing guides.",
};

export default function Blog() {
  const posts = sortBlogPosts(blogPosts).slice(0, 20);
  const pages = Math.max(1, Math.ceil(blogPosts.length / 20));
  return (
    <>
      <Header />
      <main className="section">
        <div className="container">
          <p className="eyebrow">Philippines staffing blog</p>
          <h1>Practical role and handoff guides.</h1>
          <p className="lead">
            Read concise guidance for scoping and managing Filipino support
            roles. Existing article addresses remain available.
          </p>
          <div className="cards">
            {posts.map((post) => (
              <a className="card" href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                {"publishedAt" in post && post.publishedAt ? (
                  <time dateTime={post.publishedAt}>
                    Published {formatDate(post.publishedAt)}
                  </time>
                ) : null}
                <span>{post.minutes} min read</span>
              </a>
            ))}
          </div>
          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: pages }, (_, index) => (
              <a
                aria-current={index === 0 ? "page" : undefined}
                href={index === 0 ? "/blog" : `/blog/page/${index + 1}`}
                key={index}
              >
                {index + 1}
              </a>
            ))}
          </nav>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  );
}
