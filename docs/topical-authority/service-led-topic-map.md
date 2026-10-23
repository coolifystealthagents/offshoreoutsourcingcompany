# Service-led topic map

This map connects existing Philippines-only operations research to the service page that gives a buyer the next planning step. It is an execution ledger, not a publishing plan. Each source answers one operational question; each destination is an existing service page. A future contextual handoff must be added only after checking the generated source `<main>` so it does not repeat a link already rendered by the shared template.

## Pillars and supporting research

| Service pillar | Existing supporting research | Reader question | Route-local service link | Next action |
| --- | --- | --- | --- | --- |
| Operations Coordination | `/research/philippines-operations-coordination-capacity-research` | What recurring work and exception load fit a coordination role? | Delivered in rendered source — `dfb2d8ad805f8905ccb3491b2a83040304a52132` | Keep the record-owned service handoff. The route has one contextual link to `/services/operations-coordination`; do not add another. |
| Executive Administration | `/research/philippines-executive-admin-calendar-controls` | What can a specialist prepare without deciding executive priorities? | Absent | Candidate after the priority row. |
| Customer Support Operations | `/research/philippines-outsourced-case-mix-study` | Which support work can be prepared while customer commitments stay with the owner? | Delivered | Keep the existing handoff; do not add another. |
| Sales Operations Support | `/research/philippines-sales-operations-pipeline-hygiene` | Which pipeline fields can be maintained without making sales decisions? | Absent | Candidate after the priority row. |
| Project Tracking | `/research/philippines-project-tracking-status-evidence` | What turns a project status update into evidence for the next owner decision? | Absent | Candidate after the priority row. |
| Vendor Coordination | `/research/philippines-vendor-coordination-controls-2026` | How can a coordinator follow up while contract and commercial decisions stay authorized? | Delivered | Keep the existing handoff; do not add another. |
| Data Quality Review | `/research/philippines-data-quality-error-taxonomy` | How should a buyer classify recurring record errors before assigning cleanup work? | Absent | Candidate after the priority row. |
| Reporting Administration | `/research/philippines-reporting-administration-method` | What needs checking before an owner interprets a recurring report? | Delivered | Keep the existing handoff; do not add another. |
| Recruitment Coordination | `/research/philippines-recruitment-coordination-record-controls` | Which candidate-record tasks are coordination rather than hiring decisions? | Absent | Candidate after the priority row. |
| Knowledge Base Management | `/research/philippines-knowledge-base-maintenance` | What keeps internal guidance current and tied to an owner? | Absent | Candidate after the priority row. |
| Ecommerce Operations | `/research/philippines-ecommerce-exception-controls` | Which order exceptions need evidence and an owner approval path? | Absent | Candidate after the priority row. |
| CRM Administration | `/research/philippines-crm-data-quality-review` | How can a buyer review CRM cleanup without silently changing disputed records? | Delivered locally — `aaedff7160337d999eceec54890b9f92fee1978e` | Do not add another. The typed route-local handoff already points to `/services/crm-administration` and keeps disputed fields, access, and business rules with the owner. |

## Execution guardrails

- Keep every handoff specific to the source question and point it only to its matching existing service page.
- Philippines specialists may prepare, check, classify, and route work. Owners retain customer, financial, security, privacy, policy, hiring, and commercial decisions.
- Before shipping a candidate, confirm the source and destination H1s, canonical URLs, route-local link count, and sitemap entries from a fresh production build.
- Refresh the source route’s actual modified value for a rendered handoff and verify Article, Open Graph, and sitemap parity where the route model supports those fields.

## 2026-10-15 public-verification status

- Rendered source: `dfb2d8ad805f8905ccb3491b2a83040304a52132` added the record-owned Operations Coordination handoff. Fresh local artifacts had the source H1 and canonical, one route-local `Plan operations coordination support` link to `/services/operations-coordination`, `article:modified_time` and Article `dateModified` of `2026-10-15`, and source/target sitemap entries.
- Preserve rendered-source commit: `dfb2d8ad805f8905ccb3491b2a83040304a52132`. No repository-approved deployment identifier or deployment routine was found, so no deploy was inferred or triggered.
- Canonical route responded `200 text/html` with the expected H1 and canonical but lacked the new marker, destination href, and updated date. The `www` route first returned `308` to the canonical host and its final `200 text/html` page had the same stale facts. The canonical sitemap responded `200 application/xml`, includes the source URL, and has no `lastmod` under this repository contract.
- Status: `deployment_pending_public_verification / deployment_configuration_unavailable / public_stale`. Recheck the same route markers after an approved deployment target is supplied; do not add a duplicate CTA.

## 2026-10-21 candidate review — customer support operations

- **Service pillar:** [Customer Support Operations](/services/customer-support-operations)
- **Reader question:** How can a Philippines support team prepare a clear customer escalation without deciding the remedy or making a customer promise?
- **Supporting page:** [Customer-escalation briefs for Philippines support](/blog/philippines-outsourced-customer-escalation-brief)
- **Search intent:** Learn how to assemble an escalation brief with the case facts, customer impact, policy context, and the decision an accountable owner still needs to make.
- **Artifact check:** The fresh production build generated one self-canonical source artifact with the expected H1, one self-canonical target artifact with the expected H1, and one sitemap entry for each route. The source page has zero `/services/customer-support-operations` anchors inside its route-local `<main>`; one sitewide occurrence sits outside that evidence scope.
- **Candidate state:** Verified absent. A future rendered change may add one data-owned, contextual handoff only after the source record, exact placement, modified-date contract, and owner-boundary regression are reviewed.
- **Decision boundary:** A Philippines-based specialist may assemble the timeline, policy reference, prior communication, and missing evidence. The authorized client owner decides any refund, credit, exception, legal position, safety action, or customer commitment.

## 2026-10-23 public-verification status — customer support operations

- Rendered source: `644775979f04021d58e802ac22870211fc98ff07` added the record-owned `/services/customer-support-operations` next action to `/blog/philippines-outsourced-customer-escalation-brief` and made the client-owner decision boundary explicit.
- Preserve rendered-source commit: `644775979f04021d58e802ac22870211fc98ff07`.
- Fresh local artifact: the source had its expected H1 and self-canonical, one route-local `Plan a controlled customer support role` anchor, the client-owner boundary, and a sitemap entry. This sitemap contract intentionally has no `<lastmod>`.
- Served facts: the canonical route returned `200 text/html` with the expected H1 and canonical but lacked the new label and decision-boundary marker. The `www` route first returned `308` to the canonical host. The canonical sitemap returned `200 application/xml`, includes the exact route, and has no `<lastmod>`.
- Status: `deployment_pending_public_verification / deployment_configuration_unavailable / public_stale`. No repository-approved deployment identifier or workflow was available, so no deploy was inferred or triggered. Recheck the exact local markers after an approved deployment target is available; do not add another handoff.
