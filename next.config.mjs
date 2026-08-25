/** @type {import("next").NextConfig} */
const csp = ["default-src 'self'", "script-src 'self' 'unsafe-inline' https://acrtracking.stealthagents.us", "connect-src 'self'", "img-src 'self' data: https:", "style-src 'self' 'unsafe-inline'", "font-src 'self' data:", "frame-src https://go.oncehub.com https://*.oncehub.com https://*.scheduleonce.com", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'self'"].join('; ');
const nextConfig = { async headers() { return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: csp }] }]; } };
export default nextConfig;
