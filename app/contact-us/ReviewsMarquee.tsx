"use client";

import { useEffect, useRef } from "react";
import reviews from "../data/review-provenance.json";

export default function ReviewsMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let priorTime = 0;
    let position = viewport.scrollLeft;
    const move = (time: number) => {
      if (hoveredRef.current || focusedRef.current || reducedMotion.matches) position = viewport.scrollLeft;
      else if (priorTime) {
        position += (time - priorTime) * 0.025;
        if (position >= viewport.scrollWidth - viewport.clientWidth) position = 0;
        viewport.scrollLeft = position;
      }
      priorTime = time;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <section className="reviews-marquee" aria-labelledby="reviews-heading">
    <div className="reviews-heading"><h2 id="reviews-heading">Reviews published by StealthAgents</h2><a href={reviews.source}>View the official source</a></div>
    <div
      className="reviews-viewport"
      ref={viewportRef}
      tabIndex={0}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      onFocus={() => { focusedRef.current = true; }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) focusedRef.current = false; }}
    >
      <div className="reviews-track">{reviews.records.map((review) => <article className="review-card" key={review.name}>
        <h3>{review.headline}</h3>
        <blockquote>“{review.body}”</blockquote>
        <p><strong>{review.name}</strong><span>{review.detail}</span></p>
      </article>)}</div>
    </div>
  </section>;
}
