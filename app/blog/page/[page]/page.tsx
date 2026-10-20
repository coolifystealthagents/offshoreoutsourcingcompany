import { notFound, redirect } from "next/navigation";
import { Header, Footer, CTA } from "../../../components";
import { blogPosts, sortBlogPosts } from "../../../data";
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const totalBlogPages = () => Math.max(1, Math.ceil(blogPosts.length / 20));
const parseBlogPage = (page: string) => {
  if (!/^[1-9]\d*$/.test(page)) return null;
  const value = Number(page);
  return Number.isSafeInteger(value) && value <= totalBlogPages() ? value : null;
};

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const current = parseBlogPage(page);
  if (current === null) notFound();
  const title = `Philippines staffing blog - page ${current}`;
  const description = "Practical Philippines staffing guides.";
  const url = `https://offshoreoutsourcingcompany.com/blog/page/${current}`;
  const image = "https://offshoreoutsourcingcompany.com/opengraph-image.png";
  return {
    title,
    description,
    alternates: { canonical: `/blog/page/${current}` },
    openGraph: { title, description, url, type: "website", images: [{ url: image, alt: "Offshore Outsourcing Company" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function generateStaticParams() {
  const pages = Math.max(1, Math.ceil(blogPosts.length / 20));
  return Array.from({ length: pages }, (_, index) => ({
    page: String(index + 1),
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const current = parseBlogPage(page);
  if (current === null) notFound();
  const total = totalBlogPages();
  if (current === 1) redirect("/blog");
  const posts = sortBlogPosts(blogPosts).slice(
    (current - 1) * 20,
    current * 20,
  );
  return (
    <>
      <Header />
      <div className="section">
        <div className="container">
          <p className="eyebrow">Philippines staffing blog</p>
          <h1>Blog page {current}</h1>
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
              </a>
            ))}
          </div>
          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: total }, (_, index) => (
              <a
                aria-current={index + 1 === current ? "page" : undefined}
                href={index === 0 ? "/blog" : `/blog/page/${index + 1}`}
                key={index}
              >
                {index + 1}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <CTA />
      <Footer />
    </>
  );
}
