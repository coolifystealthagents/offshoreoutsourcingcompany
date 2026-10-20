import type { Metadata } from 'next';
import { Footer, Header } from './components';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <><Header /><div className="not-found-page"><div className="container"><p className="eyebrow">404</p><h1>Page not found</h1><p>The address may have changed. Continue with the service catalog or return to the home page.</p><div className="actions"><a className="btn primary" href="/">Return home</a><a className="btn" href="/services">Explore services</a></div></div></div><Footer /></>;
}
