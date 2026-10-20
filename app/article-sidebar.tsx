'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { slugifyHeading } from '../lib/editorial';
import styles from './article-sidebar.module.css';

type TocItem = { id: string; label: string; level: 2 | 3 };

function TocLinks({ items, activeId }: { items: TocItem[]; activeId: string }) {
  if (items.length === 0) return <p className={styles.empty}>Sections appear as you read.</p>;
  return <ol className={styles.tocList}>{items.map((item) => <li className={item.level === 3 ? styles.nested : undefined} key={item.id}><a href={`#${item.id}`} aria-current={activeId === item.id ? 'location' : undefined}>{item.label}</a></li>)}</ol>;
}

export function ArticleSidebar() {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [article, setArticle] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = markerRef.current?.closest<HTMLElement>('[data-editorial-frame]')?.querySelector<HTMLElement>('article');
    if (!root) return;
    setArticle(root);
    const headings = [...root.querySelectorAll<HTMLElement>('h2, h3')];
    const claimed = new Set<string>();
    const nextItems = headings.map((heading) => {
      const baseId = heading.id || slugifyHeading(heading.textContent || 'section') || 'section';
      let uniqueHeadingId = baseId;
      let suffix = 2;
      while (claimed.has(uniqueHeadingId) || (document.getElementById(uniqueHeadingId) && document.getElementById(uniqueHeadingId) !== heading)) uniqueHeadingId = `${baseId}-${suffix++}`;
      claimed.add(uniqueHeadingId);
      heading.id = uniqueHeadingId;
      return { id: uniqueHeadingId, label: heading.textContent?.trim() || 'Section', level: Number(heading.tagName.slice(1)) as 2 | 3 };
    });
    setItems(nextItems);
    setActiveId(nextItems[0]?.id || '');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target.id) setActiveId(visible[0].target.id);
    }, { rootMargin: '-96px 0px -65% 0px', threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  const toc = <TocLinks items={items} activeId={activeId} />;
  const navigation = <>
    <details className={styles.mobileToc}><summary>On this page</summary>{toc}</details>
    <aside className={styles.desktopSidebar} aria-label="Article navigation">
      <p className={styles.kicker}>On this page</p><nav aria-label="Table of contents">{toc}</nav>
      <div className={styles.publisher}><strong>Published by Offshore Outsourcing Company</strong><span>Practical guidance for building controlled offshore workflows.</span></div>
      <a className={styles.nextAction} href="/contact-us">Discuss your staffing plan</a>
    </aside>
  </>;
  return <><span className={styles.marker} ref={markerRef} />{article ? createPortal(navigation, article) : null}</>;
}
