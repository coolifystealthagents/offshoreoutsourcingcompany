import { notFound, redirect } from 'next/navigation';
import { Header, Footer, CTA } from '../../../components';
import { blogPosts, sortBlogPosts } from '../../../data';

export function generateStaticParams() {
  const pages = Math.max(1, Math.ceil(blogPosts.length / 20));
  return Array.from({ length: pages }, (_, index) => ({ page: String(index + 1) }));
}

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const current = Number(page);
  const total = Math.max(1, Math.ceil(blogPosts.length / 20));
  if (page === '1') redirect('/blog');
  if (!Number.isInteger(current) || current < 1 || current > total) notFound();
  const posts = sortBlogPosts(blogPosts).slice((current - 1) * 20, current * 20);
  return (
    <>
      <Header />
      <main className="section">
        <div className="container">
          <p className="eyebrow">Philippines staffing blog</p>
          <h1>Blog page {current}</h1>
          <div className="cards">
            {posts.map((post) => (
              <a className="card" href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </a>
            ))}
          </div>
          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: total }, (_, index) => (
              <a aria-current={index + 1 === current ? 'page' : undefined} href={index === 0 ? '/blog' : `/blog/page/${index + 1}`} key={index}>{index + 1}</a>
            ))}
          </nav>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  );
}
