# Service-led topic map

This map connects existing Philippines-only operations research to the service page that gives a buyer the next planning step. It is an execution ledger, not a publishing plan. Each source answers one operational question; each destination is an existing service page. A future contextual handoff must be added only after checking the generated source `<main>` so it does not repeat a link already rendered by the shared template.

## Pillars and supporting research

| Service pillar | Existing supporting research | Reader question | Route-local service link | Next action |
| --- | --- | --- | --- | --- |
| Operations Coordination | `/research/philippines-operations-coordination-capacity-research` | What recurring work and exception load fit a coordination role? | Absent | Candidate after the priority row. |
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
| CRM Administration | `/research/philippines-crm-data-quality-review` | How can a buyer review CRM cleanup without silently changing disputed records? | Absent | **Priority 1.** Add one route-local handoff to `/services/crm-administration` that preserves the owner’s control over disputed fields, access, and business rules. |

## Execution guardrails

- Keep every handoff specific to the source question and point it only to its matching existing service page.
- Philippines specialists may prepare, check, classify, and route work. Owners retain customer, financial, security, privacy, policy, hiring, and commercial decisions.
- Before shipping a candidate, confirm the source and destination H1s, canonical URLs, route-local link count, and sitemap entries from a fresh production build.
- Refresh the source route’s actual modified value for a rendered handoff and verify Article, Open Graph, and sitemap parity where the route model supports those fields.
