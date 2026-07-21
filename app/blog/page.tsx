import { Footer, Header } from '../components';
import { blogPosts } from '../data';

export default function Blog() {
  return <><Header/><main className="section"><div className="container"><p className="eyebrow">Philippines staffing guides</p><h1>Make the handoff less messy.</h1><p className="lead">Short notes on scoping, interviewing, and onboarding Filipino talent.</p><div className="cards">{blogPosts.map((post)=><a className="card" href={`/blog/${post.slug}`} key={post.slug}><h3>{post.title}</h3><p>{post.excerpt}</p><span className="pill">{post.minutes} min read</span></a>)}</div></div></main><Footer/></>;
}
