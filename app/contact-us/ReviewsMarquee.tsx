"use client";

import { useEffect, useRef } from "react";
import reviews from "../data/review-provenance.json";

export default function ReviewsMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let priorTime = 0;
    const move = (time: number) => {
      if (priorTime) viewport.scrollLeft += (time - priorTime) * 0.025;
      priorTime = time;
      if (viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth) viewport.scrollLeft = 0;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <section className="reviews-marquee" aria-labelledby="reviews-heading">
    <div className="reviews-heading"><h2 id="reviews-heading">StealthAgents reviews</h2><a href={reviews.source}>Approved first-party source</a></div>
    <div className="reviews-viewport" ref={viewportRef} tabIndex={0}>
      <div className="reviews-track">{reviews.records.map((review) => <article className="review-card" key={review.name}>
        <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <h3>{review.headline}</h3>
        <blockquote>“{review.body}”</blockquote>
        <p><strong>{review.name}</strong><span>{review.detail}</span></p>
      </article>)}</div>
    </div>
  </section>;
}
