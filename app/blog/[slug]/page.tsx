import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header, CTA, JsonLd } from '../../components';
import { blogPosts, site } from '../../data';
import { EcommerceOperationsArticle } from './ecommerce-article';

const richSlug = 'philippines-customer-service-team-guide';
const ecommerceSlug = 'philippines-ecommerce-order-exception-controls';
const base = `https://${String(site.domain).toLowerCase()}`;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article', url: `${base}/blog/${post.slug}` },
  };
}

const articleBanners = [
  {
    title: 'Turn the queue into a real role brief',
    copy: 'List the channels, issue types, tools, and owner-only decisions before interviews start. A clear brief gives Filipino candidates a fair work sample and gives you something useful to review.',
    label: 'Plan the support role',
  },
  {
    title: 'Test the handoff with low-risk tickets',
    copy: 'Use old or staged tickets before a new team member touches a live customer account. Check the answer, the record update, and the escalation note as separate pieces of work.',
    label: 'Build the first week',
  },
  {
    title: 'Keep the owner in control of exceptions',
    copy: 'A Filipino support specialist can run documented work while sensitive decisions stay with your manager. Put those limits in writing so speed never replaces judgment.',
    label: 'Map the approval path',
  },
] as const;

function ArticleBanner({ index }: { index: number }) {
  const banner = articleBanners[index];
  return <aside className="article-banner" data-article-banner={index + 1} aria-label={`Article planning banner ${index + 1}`}>
    <div><h3>{banner.title}</h3><p>{banner.copy}</p></div>
    <a className="btn primary" href="/contact-us">{banner.label}</a>
  </aside>;
}

function RichArticle({ post }: { post: (typeof blogPosts)[number] }) {
  const url = `${base}/blog/${post.slug}`;
  const sources = [
    'https://data.worldbank.org/indicator/SL.SRV.EMPL.ZS?locations=PH',
    'https://data.worldbank.org/indicator/BX.GSR.CCIS.ZS?locations=PH',
    'https://data.worldbank.org/indicator/IT.NET.USER.ZS?locations=PH',
    'https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework',
    'https://www.cisa.gov/secure-our-world/use-strong-passwords',
    'https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html',
  ];
  const faqs = [
    { question: 'What should a Philippines customer service team handle first?', answer: 'Start with repeat questions that have approved answers and a clear record step. Hold refunds, account changes, legal threats, and unusual complaints for the owner until the team has passed sample reviews.' },
    { question: 'How should quality be checked?', answer: 'Review the customer answer, the system record, and the decision path separately. A warm reply can still be wrong if the specialist changed the wrong field or missed an escalation.' },
    { question: 'Can a Filipino support specialist work across channels?', answer: 'Yes, when the role brief names each channel and the expected handoff. Do not assume that strong email work automatically means the person is ready for phone, chat, or public social replies.' },
    { question: 'Who should own difficult customer decisions?', answer: 'Your manager should keep any decision that changes money, policy, legal exposure, or sensitive account access. The support specialist can gather facts and prepare the case, but the named owner makes the call.' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        url,
        datePublished: '2026-07-25',
        dateModified: '2026-07-25',
        author: { '@type': 'Organization', name: site.brand },
        publisher: { '@type': 'Organization', name: site.brand, url: base },
        about: ['Philippines customer service team', 'customer support operations', 'offshore staffing'],
        citation: sources,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return <>
    <Header />
    <main className="section">
      <JsonLd data={schema} />
      <article className="container guide-article rich-article">
        <p className="eyebrow">Philippines staffing blog</p>
        <h1>{post.title}</h1>
        <p className="lead">A Philippines customer service team works best when the queue is narrow, the rules are written, and a manager still owns hard decisions. This guide shows how to set up that kind of support role without handing over too much access on day one.</p>
        <div className="article-meta"><span>Published July 25, 2026</span><span>Philippines-only talent</span><span>11 minute guide</span></div>

        <div className="article-body">
          <section className="takeaway-box" aria-labelledby="takeaways">
            <h2 id="takeaways">What to decide before you hire</h2>
            <ul>
              <li>Name the channels and ticket types the Filipino specialist will own.</li>
              <li>Write the decisions that must go back to a manager.</li>
              <li>Score the reply, the record update, and the escalation separately.</li>
              <li>Begin with staged work and limited system access.</li>
            </ul>
          </section>

          <h2>Start with the queue, not the job title</h2>
          <p>"Customer service representative" can mean five different jobs in one company. One person may answer delivery questions by email, while another handles phone calls, account access, complaints, and public reviews.</p>
          <p>Pull a sample of recent contacts and group them by channel, reason, risk, and required action. This gives you a role built around work that exists, instead of a broad title that leaves the Filipino team member guessing.</p>
          <p>Keep the first scope small enough to teach and check. A useful starting lane might include order status, appointment reminders, basic product questions, ticket tagging, and clean handoffs to a manager.</p>

          <h2>Use the Philippines data as context, not a promise</h2>
          <p>The Philippines has a large service economy, but a national number cannot tell you whether one candidate can handle your customers. The World Bank reports that services accounted for 59.3% of Philippine employment in 2024, based on a modeled International Labour Organization estimate.</p>
          <p>The same source reports that information and communication technology services made up 16.0% of Philippine service exports in 2024. That figure helps explain the country's established service work base, but it does not replace a work sample, reference check, or role-specific interview.</p>
          <p>Internet use also needs a careful reading because home setup differs by city, provider, and household. World Bank data put Philippine internet use at 67.3% of the population in 2024, so every remote role still needs a direct connection test and a written backup plan.</p>

          <figure className="article-figure" aria-labelledby="services-chart-title services-chart-note">
            <svg viewBox="0 0 820 390" role="img" aria-labelledby="services-chart-title services-chart-desc">
              <title id="services-chart-title">Philippine employment in services, 2020 to 2024</title>
              <desc id="services-chart-desc">A bar chart showing the share of total Philippine employment in services: 56.8 percent in 2020, 56.8 in 2021, 58.7 in 2022, 59.0 in 2023, and 59.3 in 2024.</desc>
              <rect width="820" height="390" fill="#fffdf8" />
              <text x="30" y="38" fontSize="24" fontWeight="700" fill="#102a2e">Employment in services (% of total employment)</text>
              <text x="30" y="66" fontSize="14" fill="#5d6c6d">Philippines, modeled ILO estimate</text>
              <line x1="70" y1="310" x2="790" y2="310" stroke="#9fb5b4" />
              {[
                { x: 95, year: '2020', value: '56.8', height: 170 },
                { x: 235, year: '2021', value: '56.8', height: 170 },
                { x: 375, year: '2022', value: '58.7', height: 206 },
                { x: 515, year: '2023', value: '59.0', height: 212 },
                { x: 655, year: '2024', value: '59.3', height: 218 },
              ].map((bar) => <g key={bar.year}>
                <rect x={bar.x} y={310 - bar.height} width="90" height={bar.height} rx="5" fill={bar.year === '2024' ? '#f26b4f' : '#167c73'} />
                <text x={bar.x + 45} y={300 - bar.height} textAnchor="middle" fontSize="16" fontWeight="700" fill="#102a2e">{bar.value}%</text>
                <text x={bar.x + 45} y="340" textAnchor="middle" fontSize="15" fill="#102a2e">{bar.year}</text>
              </g>)}
              <text x="70" y="372" fontSize="13" fill="#5d6c6d">Unit: percent of total employment</text>
            </svg>
            <figcaption id="services-chart-note">Method note: values come from the World Bank indicator for employment in services, which uses modeled ILO estimates. The bars are rounded to one decimal place and show national context, not the performance of any worker or provider.</figcaption>
          </figure>

          <ArticleBanner index={0} />

          <h2>Write a support ownership table</h2>
          <p>A good ownership table tells the specialist what to do when a normal ticket stops being normal. It should name the approved action, the proof to save, and the person who decides the exception.</p>
          <p>Do not bury those rules in a long handbook that nobody opens during a live conversation. Put the short version beside the queue, then link each row to a fuller instruction and one finished example.</p>

          <span className="table-cue">Swipe to compare all columns on a small screen.</span>
          <div className="article-table-wrap" tabIndex={0} role="region" aria-label="Customer support ownership table">
            <table className="article-table">
              <thead><tr><th scope="col">Contact type</th><th scope="col">Specialist owns</th><th scope="col">Owner keeps</th><th scope="col">Proof to record</th></tr></thead>
              <tbody>
                <tr><td>Order status</td><td>Check approved systems, reply with the known status, tag the reason</td><td>Promises outside the written delivery policy</td><td>Order ID, status checked, reply sent</td></tr>
                <tr><td>Account access</td><td>Confirm the approved identity steps and collect missing details</td><td>Manual identity overrides or security exceptions</td><td>Checks completed, missing item, escalation owner</td></tr>
                <tr><td>Complaint</td><td>Acknowledge the problem, gather facts, and set the next update time</td><td>Policy exceptions, legal threats, or public statements</td><td>Customer claim, records reviewed, next owner</td></tr>
                <tr><td>Product question</td><td>Use the approved knowledge article and record any gap</td><td>Claims not covered by approved material</td><td>Article used, answer given, content gap</td></tr>
                <tr><td>Money request</td><td>Collect the reason and prepare the case for review</td><td>Any approval, reversal, or account credit</td><td>Reason, evidence, named decision maker</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Build one clear path through each ticket</h2>
          <p>The specialist needs a repeatable path that works during a busy hour. The path should begin with identity and issue checks, move through the approved answer, and end with either a clean close or a named escalation.</p>
          <p>Make the record step part of the work, not a chore for later. If the system note is missing, the next person cannot see what the customer said, what was checked, or why the case moved.</p>

          <figure className="article-figure" aria-labelledby="handoff-graphic-title handoff-graphic-note">
            <svg viewBox="0 0 900 330" role="img" aria-labelledby="handoff-graphic-title handoff-graphic-desc">
              <title id="handoff-graphic-title">A controlled customer support handoff</title>
              <desc id="handoff-graphic-desc">A five-step flow from customer contact to identity check, approved answer, decision gate, and either a recorded close or manager escalation.</desc>
              <rect width="900" height="330" rx="10" fill="#dff3ec" />
              <text x="34" y="44" fontSize="24" fontWeight="700" fill="#102a2e">The controlled ticket path</text>
              {[
                { x: 34, n: '1', label: 'Receive', note: 'Name the issue' },
                { x: 204, n: '2', label: 'Check', note: 'Identity and facts' },
                { x: 374, n: '3', label: 'Answer', note: 'Use approved material' },
                { x: 544, n: '4', label: 'Decide', note: 'Inside the limit?' },
                { x: 714, n: '5', label: 'Record', note: 'Close or escalate' },
              ].map((step, i) => <g key={step.n}>
                <rect x={step.x} y="105" width="150" height="112" rx="8" fill={i === 3 ? '#f3cf63' : '#fffdf8'} stroke="#167c73" strokeWidth="2" />
                <circle cx={step.x + 24} cy="130" r="15" fill="#167c73" />
                <text x={step.x + 24} y="136" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{step.n}</text>
                <text x={step.x + 18} y="171" fontSize="19" fontWeight="700" fill="#102a2e">{step.label}</text>
                <text x={step.x + 18} y="198" fontSize="13" fill="#5d6c6d">{step.note}</text>
                {i < 4 && <path d={`M ${step.x + 151} 161 L ${step.x + 169} 161`} stroke="#102a2e" strokeWidth="3" markerEnd="url(#arrow)" />}
              </g>)}
              <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#102a2e" /></marker></defs>
              <path d="M619 220 C619 285 790 285 790 225" fill="none" stroke="#f26b4f" strokeWidth="3" strokeDasharray="7 6" />
              <text x="625" y="270" fontSize="14" fontWeight="700" fill="#102a2e">Manager decides the exception.</text>
              <text x="625" y="292" fontSize="14" fontWeight="700" fill="#102a2e">The specialist records the result.</text>
            </svg>
            <figcaption id="handoff-graphic-note">This graphic separates the normal answer from the decision gate. A manager stays visible when the request falls outside the written limit.</figcaption>
          </figure>

          <h2>Protect access before speed becomes the goal</h2>
          <p>A support role often touches customer records, inboxes, and internal notes, so access needs its own launch plan. Give each Filipino specialist a named account, only the tools needed for the approved lane, and a clear process for reporting a suspicious login or message.</p>
          <p>CISA advises people to use long, random, unique passwords and a password manager. Its guidance also points people toward multifactor authentication, which gives the role owner another check when a password is exposed.</p>
          <p>The Philippine Data Privacy Act is another reason to keep personal information tied to a real business purpose. Your own legal and security advisers should decide the controls that apply to your systems, customers, and locations.</p>

          <blockquote className="expert-quote">
            The CSF has been a vital tool for many organizations, helping them anticipate and deal with cybersecurity threats.
            <cite>Laurie E. Locascio, Under Secretary of Commerce for Standards and Technology and NIST Director, NIST news release, February 26, 2024</cite>
          </blockquote>

          <p>Locascio's point matters because a support handoff is part of a wider security system. A checklist helps, but the owner also needs to review access, watch for changes, and remove permissions when the role changes or ends.</p>

          <ArticleBanner index={1} />

          <h2>Score the work in three separate parts</h2>
          <p>Customer support reviews often focus on warmth and grammar because those are easy to notice. A useful review also checks whether the answer was correct, the system record was complete, and the specialist followed the decision boundary.</p>
          <p>Use a small weekly sample that includes normal tickets and exceptions. Mark the exact line or action that needs work, then give the specialist a corrected example they can use on the next similar contact.</p>
          <p>A simple score can use four checks: correct answer, clear customer language, complete record, and correct handoff. Do not hide a serious access or approval mistake inside an average score, because some errors need an immediate stop and review.</p>

          <h2>Plan the first two weeks around proof</h2>
          <p>During the first three days, use staged tickets or old cases with customer details removed. Ask the candidate to draft answers, tag each issue, update a practice record, and explain when a manager should step in.</p>
          <p>During the next few days, open a limited live lane with close review. The manager should read every answer at first, then reduce review only after the specialist shows the same good judgment across several issue types.</p>
          <p>In week two, test a real handoff between channels or team members. A customer should not have to repeat the full story because the internal note was vague, and the next specialist should know the promised update time.</p>

          <h2>Write a short daily and weekly review</h2>
          <p>The daily note should be short enough to finish before signoff. Ask for open cases, blocked decisions, unusual customer patterns, knowledge gaps, and any account or device concern.</p>
          <p>The weekly review should look for repeat causes instead of stopping at individual mistakes. If five people ask the same question, the fix may belong in the product page, order message, or knowledge base rather than another coaching reminder.</p>
          <p>Keep a named owner for each change that comes out of the review. The Filipino specialist can draft a better article or tag rule, while the business owner approves any change that affects policy or customer promises.</p>

          <ArticleBanner index={2} />

          <h2>Use related pages to finish the plan</h2>
          <p>The support lane should connect to the rest of your operating plan. These pages cover the service scope, knowledge upkeep, and first-week handoff in more detail.</p>
          <nav className="related-links" aria-label="Related Philippines staffing guides">
            <a href="/services/customer-support-operations">Customer support operations</a>
            <a href="/services/knowledge-base-management">Knowledge base management</a>
            <a href="/blog">First-week checklist for Filipino talent</a>
          </nav>

          <section className="faq-list" aria-labelledby="faq-title">
            <h2 id="faq-title">Questions buyers ask</h2>
            {faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
          </section>

          <section className="source-box" aria-labelledby="sources-title">
            <h2 id="sources-title">Sources</h2>
            <ol>
              <li><a href={sources[0]}>World Bank, Employment in services (% of total employment), Philippines</a>. The 2024 value shown in the indicator is 59.316%.</li>
              <li><a href={sources[1]}>World Bank, ICT service exports (% of service exports), Philippines</a>. The 2024 value shown in the indicator is 15.957%.</li>
              <li><a href={sources[2]}>World Bank, Individuals using the Internet (% of population), Philippines</a>. The 2024 value shown in the indicator is 67.263%.</li>
              <li><a href={sources[3]}>National Institute of Standards and Technology, NIST Releases Version 2.0 of Landmark Cybersecurity Framework</a>, February 26, 2024.</li>
              <li><a href={sources[4]}>Cybersecurity and Infrastructure Security Agency, Use Strong Passwords</a>. The page covers unique passwords, password managers, and multifactor authentication.</li>
              <li><a href={sources[5]}>LawPhil Project, Republic Act No. 10173: Data Privacy Act of 2012</a>. The page reproduces the signed law and its rules for Philippine data protection.</li>
            </ol>
          </section>
        </div>
      </article>
    </main>
    <Footer />
  </>;
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  if (slug === richSlug) return <RichArticle post={post} />;
  if (slug === ecommerceSlug) return <EcommerceOperationsArticle post={post} />;
  const url = `${base}/blog/${post.slug}`;
  const publishedAt = 'publishedAt' in post ? post.publishedAt : undefined;
  return <><Header /><main className="section"><JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, url, ...(publishedAt ? { datePublished: publishedAt } : {}) }} /><article className="container guide-article"><p className="eyebrow">Philippines staffing blog</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p>{publishedAt && <div className="article-meta"><time dateTime={publishedAt}>Published August 10, 2026</time></div>}<div className='blog-standards-strip' aria-label='Article standards'><span>Source-backed guidance</span><span>Contextual internal links</span><span>Top, middle, and bottom CTAs</span></div><div className="card"><h2>Start with a defined role</h2><p>Write the recurring tasks, examples, tools, and approval boundaries before a Filipino specialist begins. Review <a href="/services/operations-coordination">operations coordination</a> for a practical scope.</p><h2>Build a controlled handoff</h2><p>Begin with low-risk samples and only the permissions required for the approved Philippines-based workload. Record questions and exceptions for the owner. See the <a href="/services/knowledge-base-management">knowledge base management</a> service for a durable handoff.</p><h2>Review the workload</h2><p>Use a weekly check of completed work, open decisions, and changing priorities. Update the role notes when the process changes.</p></div><p className='article-source-note'><a href="https://www.ilo.org/global/topics/non-standard-employment/WCMS_534825/lang--en/index.htm" target="_blank" rel="noopener noreferrer">International Labour Organization guidance on remote work arrangements</a> reinforces why remote role briefs should document expectations, communication rhythms, and accountable handoffs.</p><section className='related-links' aria-labelledby='related-title'><h2 id='related-title'>Related articles</h2><ul><li><a href='/blog/philippines-customer-service-team-guide'>Philippines customer service team guide</a></li><li><a href='/blog/philippines-ecommerce-order-exception-controls'>Ecommerce order exception controls</a></li><li><a href='/blog/philippines-operations-quality-scorecard'>Operations quality scorecard</a></li></ul></section><aside className='article-rotation-banner article-rotation-banner-top' data-article-banner='true'><p className='eyebrow'>Role planning checkpoint</p><h2>Turn this guide into a clear role brief</h2><p>Share the work queue, tools, review owner, and approval limits before adding outside support.</p><a className='btn' href='/contact-us'>Contact Us</a></aside><aside className='article-rotation-banner article-rotation-banner-bottom' data-article-banner='true'><p className='eyebrow'>Ready to scope the role?</p><h2>Build the first support lane before hiring</h2><p>Share the work queue, tools, review owner, and approval limits before adding outside support.</p><a className='btn' href='/contact-us'>Contact Us</a></aside></article><CTA /></main><Footer /></>;
}
