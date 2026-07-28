import { Footer, Header, JsonLd } from '../../components';
import { site } from '../../data';

type ArticlePost = {
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
};

const base = `https://${String(site.domain).toLowerCase()}`;

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
    <a className="btn primary" href="/contact">{banner.label}</a>
  </aside>;
}

export function EcommerceOperationsArticle({ post }: { post: ArticlePost }) {
  const url = `${base}/blog/${post.slug}`;
  const sourceUrls = [
    'https://www.bsp.gov.ph/SitePages/MediaAndResearch/MediaDisp.aspx?ItemId=7580',
    'https://www.bsp.gov.ph/PaymentAndSettlement/2024_Report_on_E-payments_Measurement.pdf',
    'https://www.bsp.gov.ph/SitePages/MediaAndResearch/MediaDisp.aspx?ItemId=7182',
    'https://api.worldbank.org/v2/country/PHL/indicator/IT.NET.USER.ZS?format=json&per_page=10&date=2024:2024',
    'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final',
    'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
    'https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html',
  ];
  const faqs = [
    { question: 'What should a Philippines ecommerce operations specialist own first?', answer: 'Start with normal orders that follow a written path, such as status checks, approved address verification, order notes, and carrier follow-up. Keep refunds, manual payment changes, fraud decisions, and policy exceptions with named managers.' },
    { question: 'Why should preparation and approval be separate?', answer: 'The second check catches mistakes before a sensitive action reaches the customer, payment record, or warehouse. It also leaves a clearer record of who prepared the case and who made the decision.' },
    { question: 'What proof should stay with an order exception?', answer: 'Save the order ID, system state, customer request, outside record used for checking, decision owner, action taken, and time completed. Do not copy sensitive data into a general chat channel when the approved system can hold the note.' },
    { question: 'How should the first two weeks work?', answer: 'Use staged orders first, then open one narrow live queue with close review. Add more exception types only after the specialist can follow the normal path, stop at the right boundary, and leave a complete note.' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        url,
        datePublished: '2026-07-28',
        dateModified: '2026-07-28',
        author: { '@type': 'Organization', name: site.brand },
        publisher: { '@type': 'Organization', name: site.brand, url: base },
        about: ['Philippines ecommerce operations team', 'order exception controls', 'offshore staffing'],
        citation: sourceUrls,
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

  const paymentSeries = [
    { x: 100, year: '2018', volume: 10.0, value: 20.0 },
    { x: 205, year: '2019', volume: 14.0, value: 24.0 },
    { x: 310, year: '2020', volume: 20.1, value: 26.8 },
    { x: 415, year: '2021', volume: 30.3, value: 44.1 },
    { x: 520, year: '2022', volume: 42.1, value: 40.1 },
    { x: 625, year: '2023', volume: 52.8, value: 55.3 },
    { x: 730, year: '2024', volume: 57.4, value: 59.0 },
  ];
  const y = (value: number) => 310 - value * 3.7;
  const line = (field: 'volume' | 'value') => paymentSeries.map((point) => `${point.x},${y(point[field])}`).join(' ');

  return <>
    <Header />
    <main className="section">
      <JsonLd data={schema} />
      <article className="container guide-article rich-article" data-article-kind="ecommerce-order-exception-controls">
        <p className="eyebrow">Philippines staffing blog</p>
        <h1>{post.title}</h1>
        <p className="lead">An ecommerce operations team needs more than a task list. This guide shows how to give a Philippines-based specialist a clear order queue while managers keep sensitive decisions and exceptions.</p>
        <div className="article-meta"><span>Published July 28, 2026</span><span>Philippines-only talent</span><span>{post.minutes} minute guide</span></div>

        <div className="article-body">
          <section className="takeaway-box" aria-labelledby="takeaways">
            <h2 id="takeaways">Decisions to make before hiring</h2>
            <ul>
              <li>Map each normal order state and the event that turns it into an exception.</li>
              <li>Separate case preparation from approval for sensitive changes.</li>
              <li>Save enough evidence for the next person to understand the decision.</li>
              <li>Measure unresolved work, repeat errors, and missed boundaries.</li>
            </ul>
          </section>

          <h2>Build the role around order states</h2>
          <p>An ecommerce job title can hide a dozen different queues. A Filipino operations specialist might check orders, watch inventory mismatches, contact carriers, update customers, or prepare exception cases for a manager.</p>
          <p>Start by drawing the states an order can occupy in your systems. Common states include received, payment checked, held, released, picked, shipped, delivered, cancelled, and returned.</p>
          <p>Then name the proof needed to move an order from one state to the next. The specialist should know which system is authoritative when the storefront, order manager, payment record, and carrier page disagree.</p>

          <h2>Use payment data as market context</h2>
          <p>The <a href={sourceUrls[0]}>Bangko Sentral ng Pilipinas report published July 6, 2025</a> says digital payments represented 57.4% of monthly Philippine retail transactions by volume in 2024. The share by value was 59.0% in the same measurement.</p>
          <p>Merchant payments made up 66.4% of monthly digital payment volume in 2024, while person-to-person transfers and supplier payments added another 26.8 percentage points. These figures describe a national payment environment, not the skill or output of any candidate.</p>
          <p>The earlier <a href={sourceUrls[2]}>BSP release published July 22, 2024</a> put the 2023 digital share at 52.8% by volume and 55.3% by value. That history supports careful payment reconciliation, but a company still has to write its own checks for duplicate records, failed captures, reversals, and refunds.</p>

          <figure className="article-figure" aria-labelledby="payments-chart-title payments-chart-note">
            <svg viewBox="0 0 850 390" role="img" aria-labelledby="payments-chart-title payments-chart-desc">
              <title id="payments-chart-title">Digital share of Philippine monthly retail payments, 2018 to 2024</title>
              <desc id="payments-chart-desc">A two-line chart showing digital payment volume rising from 10 percent in 2018 to 57.4 percent in 2024, and digital payment value rising from 20 percent to 59 percent over the same years.</desc>
              <rect width="850" height="390" fill="#fffdf8" />
              <text x="30" y="36" fontSize="23" fontWeight="700" fill="#102a2e">Digital share of monthly retail payments</text>
              <text x="30" y="62" fontSize="14" fill="#5d6c6d">Philippines, percent of total volume and value</text>
              {[0, 20, 40, 60].map((tick) => <g key={tick}>
                <line x1="70" y1={y(tick)} x2="810" y2={y(tick)} stroke="#d4dfdc" />
                <text x="60" y={y(tick) + 5} textAnchor="end" fontSize="13" fill="#5d6c6d">{tick}%</text>
              </g>)}
              <polyline points={line('volume')} fill="none" stroke="#167c73" strokeWidth="5" />
              <polyline points={line('value')} fill="none" stroke="#f26b4f" strokeWidth="5" />
              {paymentSeries.map((point) => <g key={point.year}>
                <circle cx={point.x} cy={y(point.volume)} r="5" fill="#167c73" />
                <circle cx={point.x} cy={y(point.value)} r="5" fill="#f26b4f" />
                <text x={point.x} y="337" textAnchor="middle" fontSize="13" fill="#102a2e">{point.year}</text>
              </g>)}
              <rect x="510" y="74" width="14" height="14" fill="#167c73" /><text x="532" y="86" fontSize="13" fill="#102a2e">Volume</text>
              <rect x="610" y="74" width="14" height="14" fill="#f26b4f" /><text x="632" y="86" fontSize="13" fill="#102a2e">Value</text>
              <text x="70" y="370" fontSize="13" fill="#5d6c6d">Unit: percent of monthly retail payments</text>
            </svg>
            <figcaption id="payments-chart-note">Method note: the series comes from BSP's 2024 digital payments release and report. It covers Philippine retail payments, not ecommerce alone, and does not measure staffing performance.</figcaption>
          </figure>

          <ArticleBanner index={0} />

          <h2>Write an order exception control table</h2>
          <p>A normal order can follow an approved path with little debate. An exception needs a stop point, a named preparer, a named decision owner, and a record that explains what happened.</p>
          <p>Use the table as a starting structure rather than a universal rule. Your payment provider, carrier, legal adviser, and internal managers should set the exact boundaries for your business.</p>

          <span className="table-cue">Swipe to compare all columns on a small screen.</span>
          <div className="article-table-wrap" tabIndex={0} role="region" aria-label="Ecommerce order exception control table">
            <table className="article-table">
              <thead><tr><th scope="col">Order event</th><th scope="col">Filipino specialist prepares</th><th scope="col">Manager decides</th><th scope="col">Proof to save</th></tr></thead>
              <tbody>
                <tr><td>Payment mismatch</td><td>Compare the gateway ID, order record, status, and time</td><td>Any manual correction or money movement</td><td>Order ID, gateway reference, screenshots or export</td></tr>
                <tr><td>Address change</td><td>Collect the request through an approved channel and check order state</td><td>Late or unusual changes that cross the written boundary</td><td>Old and new details, verification step, decision owner</td></tr>
                <tr><td>Inventory shortfall</td><td>Confirm the stock record and list approved options</td><td>Substitution, delay promise, or cancellation exception</td><td>Stock snapshot, affected item, customer response</td></tr>
                <tr><td>Delivery failure</td><td>Open the carrier case and gather scan history</td><td>Replacement, refund, or policy exception</td><td>Tracking record, carrier case, customer contact</td></tr>
                <tr><td>Suspected fraud</td><td>Hold the order and collect the rule flags</td><td>Release, cancel, or request further verification</td><td>Signals reviewed, decision, person approving</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Separate the person who prepares from the person who approves</h2>
          <p>A specialist can gather facts, compare records, and prepare the next action without having permission to carry out every sensitive change. This split is especially useful for refunds, unusual address changes, manual payment edits, and orders with fraud signals.</p>
          <p><a href={sourceUrls[4]}>NIST Special Publication 800-53 Revision 5</a> includes control families for access, audit records, and separation of duties. It is general security guidance, so your team should adapt the idea to its own systems and risk decisions rather than claim that every row is a legal requirement.</p>
          <p>The approval record should name the case, preparer, decision owner, evidence reviewed, action, and completion time. A chat reaction or vague message such as "looks fine" does not give the next reviewer enough context.</p>

          <h2>Move every exception through the same loop</h2>
          <p>A simple loop helps the specialist stop before an uncertain action becomes a customer problem. The team detects the mismatch, holds the action, checks an independent record, asks the named owner, carries out the decision, and saves the result.</p>
          <p>The hold matters because speed can make a wrong action harder to reverse. The saved note matters because the same issue may return through another channel after the first person has signed off.</p>

          <figure className="article-figure" aria-labelledby="exception-graphic-title exception-graphic-note">
            <svg viewBox="0 0 920 350" role="img" aria-labelledby="exception-graphic-title exception-graphic-desc">
              <title id="exception-graphic-title">The ecommerce order exception loop</title>
              <desc id="exception-graphic-desc">A six-step explanatory flow: detect, hold, verify, decide, act, and record, with a manager approval gate between verify and act.</desc>
              <rect width="920" height="350" rx="10" fill="#dff3ec" />
              <text x="34" y="43" fontSize="24" fontWeight="700" fill="#102a2e">The order exception loop</text>
              {[
                { x: 32, n: '1', label: 'Detect', note: 'Find mismatch' },
                { x: 177, n: '2', label: 'Hold', note: 'Pause action' },
                { x: 322, n: '3', label: 'Verify', note: 'Check another record' },
                { x: 467, n: '4', label: 'Decide', note: 'Named owner' },
                { x: 612, n: '5', label: 'Act', note: 'Use approved step' },
                { x: 757, n: '6', label: 'Record', note: 'Save proof' },
              ].map((step, index) => <g key={step.n}>
                <rect x={step.x} y="102" width="130" height="112" rx="8" fill={index === 3 ? '#f3cf63' : '#fffdf8'} stroke="#167c73" strokeWidth="2" />
                <circle cx={step.x + 22} cy="126" r="14" fill="#167c73" />
                <text x={step.x + 22} y="131" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">{step.n}</text>
                <text x={step.x + 15} y="166" fontSize="18" fontWeight="700" fill="#102a2e">{step.label}</text>
                <text x={step.x + 15} y="193" fontSize="12" fill="#5d6c6d">{step.note}</text>
                {index < 5 && <path d={`M ${step.x + 131} 158 L ${step.x + 143} 158`} stroke="#102a2e" strokeWidth="3" markerEnd="url(#ecommerce-arrow)" />}
              </g>)}
              <defs><marker id="ecommerce-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#102a2e" /></marker></defs>
              <path d="M820 220 C820 330 95 330 95 222" fill="none" stroke="#f26b4f" strokeWidth="3" strokeDasharray="7 6" />
              <text x="330" y="270" fontSize="14" fontWeight="700" fill="#102a2e">Repeat causes go back into the rules and work samples.</text>
            </svg>
            <figcaption id="exception-graphic-note">This is a recommended operating design. The decision gate keeps approval with the named manager, while the record lets the team review repeat causes later.</figcaption>
          </figure>

          <ArticleBanner index={1} />

          <h2>Protect order and customer access</h2>
          <p>Give each Filipino specialist an individual account with only the screens and actions needed for the assigned queue. Shared sign-ins make it harder to understand who changed an order, exported a record, or approved a sensitive action.</p>
          <p>The <a href={sourceUrls[3]}>World Bank indicator for 2024</a> records internet use in the Philippines at 67.263% of the population. That national figure is context only, so each remote hire still needs a direct connection check, device rules, and a tested backup plan.</p>
          <p><a href={sourceUrls[5]}>CISA's phishing guidance</a> warns that social engineering can use urgent requests and spoofed messages to push a person into revealing information or taking an unsafe action. Address changes, supplier messages, account recovery, and payment questions need an approved verification channel that does not rely on the incoming message alone.</p>
          <p>The <a href={sourceUrls[6]}>Philippine Data Privacy Act of 2012</a> gives the team another reason to limit personal data to a real purpose and approved system. Legal and security advisers should decide how the law and other obligations apply to the company, its customers, and its locations.</p>

          <blockquote className="expert-quote">
            The BSP continues to pursue its vision of harnessing technology and finance not only to connect markets but also to ensure that every Filipino becomes part of the formal financial system.
            <cite>Eli M. Remolona, Governor of the Bangko Sentral ng Pilipinas, BSP release, July 6, 2025</cite>
          </blockquote>

          <p>Remolona was speaking about the country's wider financial system, not endorsing an ecommerce staffing model. For an operations team, the useful lesson is narrower: digital transactions need safety and trust beside access and convenience.</p>

          <h2>Use work samples that include a normal order and an exception</h2>
          <p>A normal sample shows whether the candidate can follow the main path and leave a clean record. An exception sample shows whether the person notices a mismatch, stops at the boundary, and explains the case without guessing.</p>
          <p>Remove real customer details and use a staged order with a payment mismatch, late address request, or missing carrier scan. Ask the candidate to identify the authoritative records, prepare the next step, and name the decision that belongs to a manager.</p>
          <p>Score accuracy, evidence, written clarity, and boundary judgment separately. One polished customer message should not hide a wrong system change or a missing approval.</p>

          <h2>Run the first two weeks as a controlled opening</h2>
          <p>During the first three days, keep the work in a practice environment or on old orders with personal details removed. Let the specialist compare systems, build exception notes, and explain where the manager enters the process.</p>
          <p>Next, open one live order state with close review, such as shipped-order follow-up or inventory mismatch preparation. The manager should inspect every completed case until the records and handoffs remain consistent across several examples.</p>
          <p>Add another order state only when the first one is stable. Broad access on the first day makes it difficult to tell whether an error came from unclear rules, weak training, or a permission that should never have been granted.</p>

          <h2>Review the queue with counts people can act on</h2>
          <p>Track open exceptions, the oldest case, cases returned for missing proof, and correct decision handoffs. Keep serious access or approval failures outside any blended score because one sensitive mistake may need an immediate stop.</p>
          <p>Group repeat exceptions by cause, not just by employee. If address changes keep arriving after warehouse release, the better fix may be an earlier customer message or a storefront check rather than another reminder to the operations team.</p>
          <p>End the review with an owner and a due date for each rule change. The Filipino specialist can document the repeated pattern and draft the updated step, while the manager approves any change that affects customer promises, money, access, or policy.</p>

          <ArticleBanner index={2} />

          <h2>Connect the role to related operating work</h2>
          <p>Ecommerce order control touches quality checks, reporting, and outside handoffs. These service pages can help a buyer divide the work without giving one person every decision.</p>
          <nav className="related-links" aria-label="Related Philippines ecommerce staffing pages">
            <a href="/services/ecommerce-operations">Ecommerce operations</a>
            <a href="/services/data-quality-review">Data quality review</a>
            <a href="/services/reporting-administration">Reporting administration</a>
            <a href="/services/vendor-coordination">Vendor coordination</a>
          </nav>

          <section className="faq-list" aria-labelledby="faq-title">
            <h2 id="faq-title">Questions buyers ask</h2>
            {faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
          </section>

          <section className="source-box" aria-labelledby="sources-title">
            <h2 id="sources-title">Sources</h2>
            <ol>
              <li><a href={sourceUrls[0]}>Bangko Sentral ng Pilipinas, PH sustains growth in digital payments usage</a>, published July 6, 2025. This release reports the 2024 digital shares, payment-use mix, QR Ph merchant growth, and the quoted statement.</li>
              <li><a href={sourceUrls[1]}>Bangko Sentral ng Pilipinas, 2024 Report on the Status of Digital Payments in the Philippines</a>. This is the full report linked from the BSP release.</li>
              <li><a href={sourceUrls[2]}>Bangko Sentral ng Pilipinas, Philippines Hits Target of Digitalizing 50 Percent of Retail Payments</a>, published July 22, 2024. This release reports the 2023 volume and value shares.</li>
              <li><a href={sourceUrls[3]}>World Bank API, Individuals using the Internet (% of population), Philippines</a>. The 2024 observation is 67.26300914%, with the International Telecommunication Union named as the source.</li>
              <li><a href={sourceUrls[4]}>National Institute of Standards and Technology, Security and Privacy Controls for Information Systems and Organizations</a>, SP 800-53 Revision 5. The control catalog covers access, audit records, and separation of duties.</li>
              <li><a href={sourceUrls[5]}>Cybersecurity and Infrastructure Security Agency, Avoiding Social Engineering and Phishing Attacks</a>. The guidance explains common manipulation methods and protective steps.</li>
              <li><a href={sourceUrls[6]}>LawPhil Project, Republic Act No. 10173: Data Privacy Act of 2012</a>. This page reproduces the signed Philippine law.</li>
            </ol>
          </section>
        </div>
      </article>
    </main>
    <Footer />
  </>;
}
