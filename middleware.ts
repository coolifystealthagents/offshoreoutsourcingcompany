import { NextRequest, NextResponse } from 'next/server';
import { canonicalRedirectTarget } from './lib/canonical-request';

export function middleware(request: NextRequest) {
  const target = canonicalRedirectTarget({
    requestUrl: request.nextUrl.toString(),
    host: request.headers.get('host'),
    forwardedHost: request.headers.get('x-forwarded-host'),
    forwardedProto: request.headers.get('x-forwarded-proto'),
    cloudflareVisitor: request.headers.get('cf-visitor'),
  });

  return target ? NextResponse.redirect(target, 308) : NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
