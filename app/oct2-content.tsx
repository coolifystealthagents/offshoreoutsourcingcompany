import fs from 'node:fs';
import path from 'node:path';
import type { ComponentType } from 'react';
import type { Metadata } from 'next';

const DATE = '2026-10-02';
const DATE_LABEL = 'October 2, 2026';
const SITE = 'https://offshoreoutsourcingcompany.com';
const IMAGE = '/philippines-operations-team.svg';

export const october2BlogPosts = [
  { slug: 'offshore-insurance-claim-first-notice-intake', title: 'How to Run Insurance Claim First-Notice Intake with an Offshore Team', excerpt: 'A practical design for delegating first-notice-of-loss intake while adjusters and licensed owners retain coverage and settlement decisions.', service: '/services/customer-support-operations' },
  { slug: 'philippines-subscription-dunning-operations', title: 'Designing Subscription Dunning Operations for a Philippines Team', excerpt: 'A customer-aware dunning workflow for offshore billing support, with clear payment, access, and exception boundaries.', service: '/services/finance-administration' },
  { slug: 'offshore-supplier-onboarding-data-validation', title: 'Offshore Supplier Onboarding Data Validation Without Approval Risk', excerpt: 'How to delegate supplier-record preparation while keeping identity, banking, tax, compliance, and approval decisions controlled.', service: '/services/vendor-coordination' },
  { slug: 'philippines-rma-returns-coordination', title: 'A Philippines RMA and Product Returns Coordination Workflow', excerpt: 'Design product-return coordination with clear eligibility, logistics, inspection, refund, and fraud boundaries.', service: '/services/ecommerce-operations' },
  { slug: 'offshore-construction-submittal-register-administration', title: 'Offshore Construction Submittal Register Administration', excerpt: 'A controlled workflow for delegating submittal tracking without shifting design review, contractual acceptance, or field authority.', service: '/services/project-tracking' },
  { slug: 'philippines-marketplace-seller-dispute-operations', title: 'Marketplace Seller Dispute Operations for a Philippines Team', excerpt: 'How to delegate marketplace case assembly and deadline control while retaining policy, fraud, and financial decisions.', service: '/services/ecommerce-operations' },
  { slug: 'offshore-fleet-maintenance-work-order-coordination', title: 'Offshore Fleet Maintenance Work-Order Coordination', excerpt: 'A workflow for remote maintenance scheduling and evidence control that keeps safety and return-to-service authority with qualified owners.', service: '/services/operations-coordination' },
  { slug: 'philippines-employee-expense-audit-preparation', title: 'Employee Expense Audit Preparation with a Philippines Team', excerpt: 'Delegate receipt checks and exception preparation without handing over reimbursement approval, tax interpretation, or misconduct decisions.', service: '/services/finance-administration' },
  { slug: 'offshore-commercial-lease-abstract-administration', title: 'Offshore Commercial Lease Abstract Administration', excerpt: 'A careful workflow for lease data capture and deadline monitoring that leaves legal interpretation and tenant decisions with authorized owners.', service: '/services/data-quality-review' },
  { slug: 'philippines-privacy-rights-request-intake', title: 'Privacy Rights Request Intake for a Philippines Operations Team', excerpt: 'A privacy-request intake model that supports identity checks, deadlines, discovery, and evidence without delegating legal determinations.', service: '/services/customer-support-operations' },
  { slug: 'offshore-field-service-dispatch-coordination', title: 'Offshore Field Service Dispatch Coordination', excerpt: 'A dispatch model for remote scheduling, technician handoffs, customer updates, and escalation without remote safety or repair decisions.', service: '/services/operations-coordination' },
  { slug: 'philippines-wholesale-rebate-claim-administration', title: 'Wholesale Rebate Claim Administration with a Philippines Team', excerpt: 'A controlled process for claim intake, eligibility evidence, deduction matching, and review without delegating commercial approval.', service: '/services/sales-operations-support' },
] as const;

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const inline = (value: string) => escapeHtml(value)
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');

function markdown(slug: string) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'blog', `${slug}.md`), 'utf8')
    .replace(/^---\n[\s\S]*?\n---\n+/, '')
    .replace(/^#[^\n]+\n+/, '')
    .replace(/^\*October 2, 2026\*\s*/, '');
  const lines = raw.split(/\n/);
  let html = '';
  let list = false;
  for (const line of lines) {
    if (line.startsWith('- ')) {
      if (!list) { html += '<ul>'; list = true; }
      html += `<li>${inline(line.slice(2))}</li>`;
      continue;
    }
    if (list) { html += '</ul>'; list = false; }
    if (!line.trim()) continue;
    if (line.startsWith('### ')) html += `<h3>${inline(line.slice(4))}</h3>`;
    else if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`;
    else html += `<p>${inline(line)}</p>`;
  }
  if (list) html += '</ul>';
  return html;
}

export function getOctober2BlogMetadata(slug: string): Metadata {
  const post = october2BlogPosts.find((item) => item.slug === slug)!;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article', url: `${SITE}/blog/${post.slug}`, publishedTime: DATE, images: [IMAGE] },
  };
}

export function renderOctober2BlogArticle(slug: string, Header: ComponentType, Footer: ComponentType, CTA: ComponentType) {
  const post = october2BlogPosts.find((item) => item.slug === slug)!;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE}/blog/${post.slug}`,
    datePublished: DATE,
    author: { '@type': 'Organization', name: 'Offshore Outsourcing Company' },
    publisher: { '@type': 'Organization', name: 'Offshore Outsourcing Company', url: SITE },
  };
  return <><Header/><main className="section"><article className="container guide-article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><p className="eyebrow">Philippines staffing blog</p><h1>{post.title}</h1><div className="article-meta"><time dateTime={DATE}>Published {DATE_LABEL}</time><span>Practical staffing guide</span></div><p className="lead">{post.excerpt}</p><img src={IMAGE} alt="Philippines operations specialists reviewing a controlled workflow" width="1200" height="800" style={{ width: '100%', height: 'auto', borderRadius: '18px', margin: '24px 0' }}/><div className="article-body" dangerouslySetInnerHTML={{ __html: markdown(slug) }}/><section><h2>Discuss this operating model</h2><p>Connect this workflow to the relevant <a href={post.service}>service guide</a>, then bring the actual scope, systems, examples, and retained decisions to a <a href="/contact-us">free consultation</a>.</p></section></article><CTA/></main><Footer/></>;
}
