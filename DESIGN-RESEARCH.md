# Design research

## Brief

- Site: OffshoreOutsourcingCompany.com
- Search intent: Philippines outsourcing company; hire an offshore team in the Philippines
- Sourcing rule: every staffing offer is limited to Filipino talent recruited and hired in the Philippines
- Recovery check: the repository was clean at `709a1f0`, but it had no `DESIGN-RESEARCH.md`. The homepage used a generic warm staffing template, an external stock image, the visible label `Premium staffing match`, and a JSX H1 built from `Hire managed` and `without screening alone.` The thank-you page still said `Placeholder confirmation page.` It was not ready for handoff.

## Five direct organic competitors

The search results were gathered from DuckDuckGo's HTML results on July 21, 2026. Each homepage was then opened and inspected in a desktop browser. Cookie overlays and unloaded areas are recorded as visible capture weaknesses, not claims about the intended site.

### 1. MCVO Talent

URL: https://www.mcvotalent.com/

The page leads with a large team photo and direct Philippines copy. Red, purple, navy, and yellow compete for attention, while rounded pills and cards soften the page. The real team image is the strongest trust cue. The captured page also showed a large blank band after the hero, zero-value counters, a testimonial loading state, and a crowded three-button header. Useful pattern: put people and the Philippines promise in the first screen. Avoid: stacked conversion actions and unsupported counters.

### 2. Clark Outsourcing

URL: https://clarkoutsourcing.com/

Clark uses a conventional navy and crimson corporate system with large white areas, soft cards, office photography, service icons, and a clear red quote button. Its section hierarchy is easy to follow, but the hero's right side appeared underfilled and several lower media areas looked empty in the capture. Useful pattern: repeat one strong CTA color and use office photography to keep the offer human. Avoid: long paragraphs and decorative space that does not carry information.

### 3. KDCI Outsourcing

URL: https://www.kdci.co/

KDCI pairs a magenta accent with a hero contact form, a global-business collage, client logos, icon cards, FAQs, and testimonial panels. The component system is consistent and conversion paths are obvious. A large consent banner covered much of the form in the inspected state, and the hero collage felt busy. Useful pattern: make the service range scannable and place trust near the top. Avoid: a first-screen form or overlay that competes with the main promise.

### 4. Penbrothers

URL: https://penbrothers.com/

Penbrothers uses deep blue, coral, aqua, bold rounded type, geometric illustration, and large modular cards. The page feels designed as one system rather than a stack of template sections. Its strongest ideas are the compact headline, role cards, process modules, cost-breakdown style, and asymmetrical color blocks. The inspected cookie panel hid part of the hero, proof arrived later than it should, and some lower cards had more empty space than content.

### 5. Shore360

URL: https://www.shore360.com/

Shore360 uses cyan, white, charcoal, grayscale workplace photography, wave masks, and large circular motifs. The Philippines message is immediate and workplace certifications receive prime placement. The captured consent bar covered the hero, the page offered no obvious hero CTA, and the visible media strip below `As Seen On` appeared sparse. Useful pattern: direct country positioning, people-focused imagery, and a section-led editorial rhythm. Avoid: letting awards or decorative shapes push the buyer's next step off screen.

## Selected direction

Winner: Penbrothers.

Penbrothers had the strongest overall visual system: compact copy, bold color blocking, role modules, process cards, and geometric structure. The redesign borrows that discipline, not its layout or assets. Shore360's direct Philippines positioning and MCVO's people-first first screen were useful secondary references.

## Original design decisions

- Built an original dark-teal, sea-glass, warm-paper, coral, and yellow operating-desk system. No competitor colors were copied exactly.
- Replaced the generic stock photo with a new local SVG showing two operations specialists, laptops, and a task board. The image description states only what is visible. Nearby copy carries the Filipino talent promise.
- Replaced the old letter logo with an original desk-and-building mark that fits the operating-brief concept.
- Built a new hero composition, four-part control strip, work-lane grid, sample handoff card, fit/pause pair, staffing-model comparison, guide cards, and final planning panel.
- Used process detail instead of client logos, testimonials, ratings, awards, or performance claims.
- Kept public pricing off the site. The sample handoff numbers are labeled as an example and do not claim measured results.
- Standardized the primary CTA as `Plan my Filipino team` and kept the routing disclosure beside the intake path.
- Preserved the service, guide, contact, thank-you, privacy, terms, cancellation, robots, and sitemap routes.

## Launch markers

- Design marker: `philippines-ops-desk-2026-07`
- H1: `Build your Filipino team without giving up the controls.`
- Old visible marker to reject: `Premium staffing match`
- Old source fragments to reject together: `Hire managed` and `without screening alone.`
