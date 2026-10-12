import fs from 'node:fs';

const date='2026-10-12';
const blogs=[
 ['offshore-data-export-truncation-mismatch','Resolve an Offshore Data Export Truncation Mismatch','Compare query, filters, pagination, row counts, hashes, and destination receipt before relying on an incomplete export.'],
 ['multilingual-customer-reply-glossary-control','Verify a Multilingual Customer Reply Against the Approved Glossary','Preserve source meaning, controlled terms, reviewer approval, and delivery evidence without turning translation into policy.'],
 ['offshore-invoice-ocr-confidence-exceptions','Control OCR Confidence Exceptions in Offshore Invoice Intake','Route uncertain fields, conflicting totals, and unreadable evidence without silently correcting financial source records.'],
 ['duplicate-renewal-notice-release-control','Reconcile Duplicate Renewal Notices Before Customer Delivery','Match triggers, audiences, versions, channels, and send events before a repeated notice becomes a conflicting promise.'],
 ['shared-automation-failure-alert-ownership','Transfer Ownership of a Shared Automation Failure Alert','Keep run identity, last success, affected population, recovery authority, and verification intact when the responder changes.'],
 ['supplier-portal-contact-retirement','Retire a Supplier Portal Contact Without Losing Open Requests','Reassign conversations, approvals, notifications, recovery paths, and unresolved tickets before removing an old contact.'],
 ['bulk-crm-import-rollback-readiness','Prove a Bulk CRM Import Rollback Is Ready','Freeze the target population and test before-and-after evidence, rejected rows, dependencies, and reversal authority.'],
 ['expense-receipt-currency-packet','Validate a Cross-Border Expense Receipt Currency Packet','Separate source currency, transaction date, approved rate source, converted value, exception, and reimbursement decision.'],
 ['support-macro-source-relocation','Review a Support Macro After Its Policy Source Moves','Reconnect every approved answer to the new authoritative location while retiring stale links and cached copies.'],
 ['customer-suppression-propagation-gap','Close a Customer Consent Suppression Propagation Gap','Trace preference events across forms, CRM, campaign tools, queues, exports, and vendor destinations without guessing consent.'],
 ['sandbox-production-evidence-separation','Separate Sandbox and Production Evidence in Offshore Testing','Label fixtures, identities, approvals, screenshots, and results so a passing test cannot be mistaken for a live change.'],
 ['sftp-partial-file-delivery-reconciliation','Reconcile a Partial File Delivery Across an SFTP Handoff','Use manifest, size, hash, sequence, receipt, rejection, replay, and downstream counts to prove a complete transfer.']
].map(([slug,title,excerpt])=>({slug,title,excerpt}));

const research=[
 ['offshore-shadow-queue-discovery-study','How Many Offshore Work Items Live Outside the Approved Queue?','A capture-recapture protocol estimates work hidden in inboxes, chat, spreadsheets, and personal reminders without treating estimates as exact counts.'],
 ['owner-response-latency-censoring-study','Does Censoring Distort Owner Response-Time Measurements?','A survival-analysis protocol keeps still-open decisions in the denominator instead of reporting only requests that already received answers.'],
 ['automation-false-success-detection-study','How Often Does Automation Report Success Without the Intended Result?','A paired-evidence study compares job status with target records, downstream acceptance, and later reconciliation.'],
 ['handoff-information-compression-study','What Evidence Is Lost When Offshore Handoffs Are Summarized?','A blinded reconstruction experiment compares full source packets, structured summaries, and minimum-necessary disclosure.'],
 ['rare-exception-sampling-coverage-study','Can Routine Sampling Detect Rare High-Consequence Exceptions?','A stratified protocol compares random, risk-triggered, and hybrid samples while preserving denominators and selection bias.']
].map(([slug,title,excerpt])=>({slug,title,excerpt}));

const sources=[
 ['NIST Cybersecurity Framework 2.0','https://www.nist.gov/cyberframework'],
 ['NIST Privacy Framework','https://www.nist.gov/privacy-framework'],
 ['NIST SP 800-53 Revision 5','https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'],
 ['GAO Green Book','https://www.gao.gov/green-book'],
 ['CISA Cybersecurity Performance Goals','https://www.cisa.gov/cybersecurity-performance-goals'],
 ['FTC Protecting Personal Information','https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business'],
 ['National Archives Records Management','https://www.archives.gov/records-mgmt'],
 ['U.S. Census Statistical Quality Standards','https://www.census.gov/about/policies/quality/standards.html'],
 ['BLS Handbook of Methods','https://www.bls.gov/opub/hom/'],
 ['Philippine National Privacy Commission Data Privacy Act','https://privacy.gov.ph/data-privacy-act/']
];

const colors=['#0f4c5c','#145f66','#19726f','#1e8578','#246f7c','#2a5a80','#305087','#365f77','#3c6e67','#42645f','#485a57','#4e5050','#384b66','#3e506f','#445578','#4a5a81','#505f8a'];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function wrap(title,max=21){const out=[''];for(const word of title.split(' ')){const i=out.length-1;if((out[i]+' '+word).trim().length>max&&out[i])out.push(word);else out[i]=(out[i]+' '+word).trim();}return out.slice(0,4)}
function svg(item,kind,i){const lines=wrap(item.title),ys=[315,390,465,540];return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024" role="img" aria-labelledby="title desc"><title id="title">${esc(item.title)}</title><desc id="desc">Offshore Outsourcing Company ${kind} thumbnail</desc><rect width="1536" height="1024" fill="#f5f0e7"/><rect x="64" y="64" width="1408" height="896" rx="54" fill="${colors[i]}"/><circle cx="1320" cy="170" r="210" fill="#f3cf63" opacity=".22"/><path d="M1120 330h260v280h-260z" fill="none" stroke="#bde7df" stroke-width="14"/><path d="M1170 405h160M1170 475h160M1170 545h112" stroke="#fffdf8" stroke-width="17" stroke-linecap="round"/><text x="145" y="190" fill="#bde7df" font-family="Arial,sans-serif" font-size="30" font-weight="700" letter-spacing="6">${kind.toUpperCase()} · OFFSHORE OUTSOURCING COMPANY</text>${lines.map((l,n)=>`<text x="145" y="${ys[n]}" fill="#fffdf8" font-family="Georgia,serif" font-size="62" font-weight="700">${esc(l)}</text>`).join('')}<text x="145" y="835" fill="#fffdf8" font-family="Arial,sans-serif" font-size="28">SOURCE  →  OWNER  →  VERIFIED RESULT</text></svg>`}

const controls=[
 ['Define the trigger and eligible population','State the business event, permitted population, source systems, time window, accountable owner, and evidence required to finish.'],
 ['Freeze the original evidence','Preserve the received record before refreshing, editing, normalizing, sending, or correcting anything that later reviewers may need.'],
 ['Separate preparation from authority','Give offshore support a bounded preparation lane while policy, money, access, privacy, legal, and customer commitments stay with named owners.'],
 ['Model ordinary and exception paths','Test missing, conflicting, duplicate, late, sensitive, rejected, partially successful, and consequential cases before increasing volume.'],
 ['Verify the intended destination','Require proof that the authorized action reached the correct record, recipient, system, period, and downstream state.'],
 ['Reconcile closure and residual work','Account for opening items, additions, transfers, corrections, reopenings, closures, and remaining limitations with explicit denominators.']
];

function blogPost(item){return {slug:item.slug,title:item.title,excerpt:item.excerpt,minutes:15,publishedAt:date,thumbnail:`/october-12/${item.slug}.svg`,sections:controls.map(([heading,lead],i)=>({heading:`${heading} — ${item.title.replace(/[?]$/,'')}`,body:[
 `${lead} In “${item.title},” the operating record names a stable case identifier, source location, observed timestamp and timezone, current state, responsible owner, next review time, and exact unresolved question. The support specialist does not repair uncertainty by choosing the tidiest value; the first duty is to show what was received and what remains unsupported.`,
 `For control ${i+1} of ${item.slug}, create a source register with artifact owner, version, effective period, retrieval event, permitted use, and sensitivity boundary. Keep original and normalized values together. Similar labels, totals, filenames, contacts, or success messages are signals for review, not proof that two records represent the same entity or event.`,
 `The ${heading.toLowerCase()} checkpoint for ${item.slug} assigns preparation, review, decision, execution, communication, and verification to named roles. A coordinator may gather and compare approved evidence, prepare a decision packet, and record the response. The accountable client owner decides exceptions, risk acceptance, commitments, access expansion, financial treatment, or policy interpretation.`,
 `Challenge the ${heading.toLowerCase()} stage of ${item.title.toLowerCase()} with a normal case plus missing evidence, contradictory sources, a duplicate, a late change, an unavailable owner, a privacy boundary, and an apparent success at the wrong destination. Retain the first outcome, reason code, reviewer disagreement, correction, and re-test rather than rewriting history after the procedure improves.`,
 `Measure ${heading.toLowerCase()} for ${item.slug} using eligible items, received items, excluded records, unavailable evidence, decisions requested, decisions acknowledged, successful implementations, destination mismatches, reversals, reopenings, and unresolved cases. Report counts beside rates and explain every changed denominator so faster closure cannot hide a narrower or easier population.`
].join('\n\n')})),related:[{title:'Review operations coordination',href:'/services/operations-coordination'},{title:'Plan a controlled support lane',href:'/contact-us'}]}}

const stages=['Preregister question, population, and exclusions','Freeze source versions and observation windows','Define outcomes before viewing results','Calibrate independent first reviews','Sample routine and boundary cases','Retain disagreements before consensus','Analyze denominators and missingness','Test alternative definitions and thresholds','Link remediation to observed evidence','Publish limitations beside every finding'];
function researchPost(item){return {slug:item.slug,title:item.title,excerpt:item.excerpt,date,modifiedDate:date,hero:`/october-12/${item.slug}.svg`,body:[...stages.map((stage,i)=>`${i+1}. ${stage}. For “${item.title},” the protocol records the eligible population, source systems, timestamps, reviewer roles, first-pass classification, confidence, owner dependency, downstream consequence, and unavailable evidence. Stage ${i+1} of ${item.slug} reports counts, denominators, exclusions, missingness, disagreement, correction, reversal, reopening, and unresolved status. Protected narratives remain in approved systems while analysis uses stable references and minimum-necessary fields. The method can characterize observed operating records; it cannot prove causation, legal compliance, universal provider quality, intent, or a promised business outcome. An accountable client owner decides whether the evidence supports a process change, and any remediation receives an owner, due date, implementation event, verification test, and residual limitation.`),`Sources: ${sources.map(([,url])=>url).join('; ')}. Accessed ${date}. These authoritative sources support governance, privacy, security, records, and statistical method; the declared protocol and client policy govern the specific study.`],relatedService:{href:'/services/operations-coordination',label:'Review operations coordination',body:`Use the ${item.slug} method on a bounded evidence queue while client owners retain consequential decisions.`}}}

fs.mkdirSync('app',{recursive:true});fs.mkdirSync('public/october-12',{recursive:true});fs.mkdirSync('publishing/2026-10-12',{recursive:true});
fs.writeFileSync('app/oct12-blog.ts',`export const october12BlogPosts = ${JSON.stringify(blogs.map(blogPost),null,2)} as const;\n`);
fs.writeFileSync('app/research-oct12.ts',`export const october12ResearchPosts = ${JSON.stringify(research.map(researchPost),null,2)} as const;\n`);
[...blogs,...research].forEach((x,i)=>fs.writeFileSync(`public/october-12/${x.slug}.svg`,svg(x,i<12?'Blog':'Research',i)));
const manifest={site:'OffshoreOutsourcingCompany.com',repository:'coolifystealthagents/offshoreoutsourcingcompany',branch:'main',baseSha:'bf845d15a683ab4944884fd317aa1c5ae9c9a1a8',date,blogSystem:'app/oct12-blog.ts',researchSystem:'app/research-oct12.ts',blog:blogs.map(x=>({slug:x.slug,title:x.title,thumbnail:`public/october-12/${x.slug}.svg`})),research:research.map(x=>({slug:x.slug,title:x.title,thumbnail:`public/october-12/${x.slug}.svg`,sources:10}))};
fs.writeFileSync('publishing/2026-10-12/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`generated ${blogs.length} Blog, ${research.length} Research, ${blogs.length+research.length} thumbnails`);
