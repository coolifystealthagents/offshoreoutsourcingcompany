const releaseMarker = 'ooc-perfect-audit-2026-09-14-v1';

export function GET() {
  const sourceCommit =
    process.env.SOURCE_COMMIT ||
    process.env.COOLIFY_GIT_COMMIT_SHA ||
    process.env.GIT_COMMIT_SHA ||
    null;

  return Response.json(
    { site: 'offshoreoutsourcingcompany.com', release: releaseMarker, sourceCommit },
    { headers: { 'cache-control': 'no-store' } },
  );
}
