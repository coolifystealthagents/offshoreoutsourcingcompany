export const MAX_CONTACT_BODY_BYTES = 64_000;

const CONTACT_ORIGINS = new Set([
  'https://offshoreoutsourcingcompany.com',
  'https://www.offshoreoutsourcingcompany.com',
]);

export function isAllowedContactRequest(headers: Headers) {
  const origin = headers.get('origin');
  if (origin) {
    try {
      return CONTACT_ORIGINS.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }
  return headers.get('sec-fetch-site')?.toLowerCase() !== 'cross-site';
}

export async function boundedContactFormData(request: Request, contentType: string) {
  if (!request.body) throw new Error('Missing request body');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_CONTACT_BODY_BYTES) {
        await reader.cancel();
        throw new Error('Request body too large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new Response(bytes, { headers: { 'content-type': contentType } }).formData();
}
