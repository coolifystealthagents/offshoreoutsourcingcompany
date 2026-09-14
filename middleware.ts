import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'offshoreoutsourcingcompany.com';

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = (forwardedHost || request.headers.get('host') || '').split(':')[0].toLowerCase();
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim().toLowerCase();
  const isProductionHost = host === canonicalHost || host === `www.${canonicalHost}`;

  if (isProductionHost && (host !== canonicalHost || forwardedProto === 'http')) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = canonicalHost;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
