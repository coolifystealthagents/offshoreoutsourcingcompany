export type CanonicalRequestSignals = {
  requestUrl: string;
  host?: string | null;
  forwardedHost?: string | null;
  forwardedProto?: string | null;
  cloudflareVisitor?: string | null;
};

export const canonicalHost = 'offshoreoutsourcingcompany.com';

function firstHeaderValue(value?: string | null) {
  return value?.split(',')[0]?.trim().toLowerCase() || '';
}

function cloudflareScheme(value?: string | null) {
  try {
    const visitor: unknown = JSON.parse(value || '{}');
    if (visitor && typeof visitor === 'object' && 'scheme' in visitor) {
      const scheme = (visitor as { scheme?: unknown }).scheme;
      return typeof scheme === 'string' ? scheme.toLowerCase() : '';
    }
  } catch {
    // Ignore malformed edge metadata and fall back to standard protocol signals.
  }
  return '';
}

export function canonicalRedirectTarget(signals: CanonicalRequestSignals): string | null {
  const url = new URL(signals.requestUrl);
  const host = firstHeaderValue(signals.forwardedHost || signals.host).split(':')[0];
  const isProductionHost = host === canonicalHost || host === `www.${canonicalHost}`;
  if (!isProductionHost) return null;

  const requestProto = url.protocol.replace(':', '').toLowerCase();
  const forwardedProto = firstHeaderValue(signals.forwardedProto);
  const visitorProto = cloudflareScheme(signals.cloudflareVisitor);
  const isHttpRequest = requestProto === 'http' || forwardedProto === 'http' || visitorProto === 'http';

  if (host === canonicalHost && !isHttpRequest) return null;

  url.protocol = 'https:';
  url.hostname = canonicalHost;
  url.port = '';
  return url.toString();
}
