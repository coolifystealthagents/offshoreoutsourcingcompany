'use client';

import { useEffect } from 'react';

/*
 * October 22 sticky table of contents.
 *
 * Add <Oct22Toc /> inside the article page. It reads the rendered H2 elements,
 * assigns stable ids, inserts one compact disclosure at the top of the article
 * for mobile, and keeps a sticky sidebar list on desktop. Anchor targets get
 * scroll-margin so the fixed header does not cover the heading.
 *
 * The host page must not clip the article with overflow: hidden. Use
 * overflow-x: clip on html/body if horizontal clipping is required.
 */

const CSS = `
.o22-sticky-toc{position:sticky;top:84px;z-index:40;margin:0 0 1rem auto;width:fit-content;max-width:calc(100% - 1rem);border:1px solid #17202a;border-radius:12px;background:#fff;color:#17202a;box-shadow:0 8px 20px rgba(0,0,0,.14)}
.o22-sticky-toc>summary{display:flex;align-items:center;gap:.5rem;min-height:42px;padding:.5rem .9rem;font:800 .74rem/1.2 Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;list-style:none}
.o22-sticky-toc>summary::-webkit-details-marker{display:none}
.o22-sticky-toc>summary::after{content:'+';font-size:1rem;line-height:1}
.o22-sticky-toc[open]>summary::after{content:'-'}
.o22-sticky-toc>nav{max-height:calc(100vh - 160px);overflow:auto;padding:.3rem .9rem .8rem;border-top:1px solid #e5e7eb}
.o22-sticky-toc a{display:block;padding:.5rem 0;color:inherit;text-decoration:none;border-top:1px solid rgba(0,0,0,.08);font:500 .86rem/1.35 Arial,sans-serif}
.o22-sticky-toc a:first-child{border-top:0}
.o22-toc-desktop{position:sticky;top:88px;align-self:start;max-height:calc(100vh - 110px);overflow:auto;padding:.85rem 1rem;border-left:3px solid currentColor;background:rgba(127,127,127,.07);margin:0 0 1rem}
.o22-toc-desktop strong{display:block;margin-bottom:.5rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}
.o22-toc-desktop a{display:block;padding:.3rem 0;font-size:.82rem;line-height:1.35;text-decoration:none;color:inherit}
.o22-toc-desktop a[data-o22-active="true"]{font-weight:800;text-decoration:underline;text-underline-offset:.2em}
@media(max-width:900px){.o22-toc-desktop{display:none!important}}
@media(min-width:901px){.o22-sticky-toc{display:none!important}}
`;

export default function Oct22Toc() {
  useEffect(() => {
    const main = document.querySelector('main') || document.body;
    const article = main.querySelector('article') || main;
    const headings = Array.from(article.querySelectorAll<HTMLElement>('h2'))
      .filter((node) => node.offsetParent !== null)
      .map((node, index) => {
        if (!node.id) node.id = `o22-section-${index + 1}`;
        return node;
      });
    if (headings.length < 2) return;

    const header = document.querySelector<HTMLElement>('.site-header, header');
    const top = header && ['fixed', 'sticky'].includes(getComputedStyle(header).position) ? header.offsetHeight + 8 : 8;
    headings.forEach((node) => {
      node.style.scrollMarginTop = `${top + 96}px`;
    });

    const existing = article.querySelector<HTMLDetailsElement>('details[data-o22-copy="true"]');
    let mobile = existing;
    if (!mobile) {
      mobile = document.createElement('details');
      mobile.dataset.o22Copy = 'true';
      mobile.className = 'o22-sticky-toc';
      article.insertBefore(mobile, article.firstElementChild);
    }
    mobile.innerHTML = `<summary>Contents <span>${headings.length} sections</span></summary><nav aria-label="Table of contents mobile"><ol></ol></nav>`;
    mobile.style.top = `${top}px`;
    const mobileList = mobile.querySelector('ol')!;

    let desktop = article.querySelector<HTMLElement>('.o22-toc-desktop');
    if (!desktop) {
      desktop = document.createElement('nav');
      desktop.className = 'o22-toc-desktop o22-aside';
      desktop.setAttribute('aria-label', 'Table of contents');
      const host = article.parentElement || article;
      host.insertBefore(desktop, article);
    }
    desktop.innerHTML = '<strong>Contents</strong><ol></ol>';
    const desktopList = desktop.querySelector('ol')!;

    headings.forEach((node) => {
      const label = (node.textContent || '').trim();
      const mobileItem = document.createElement('li');
      const mobileLink = document.createElement('a');
      mobileLink.href = `#${node.id}`;
      mobileLink.textContent = label;
      mobileItem.appendChild(mobileLink);
      mobileList.appendChild(mobileItem);

      const desktopItem = document.createElement('li');
      const desktopLink = document.createElement('a');
      desktopLink.href = `#${node.id}`;
      desktopLink.textContent = label;
      desktopItem.appendChild(desktopLink);
      desktopList.appendChild(desktopItem);
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - 160 <= 0) current = heading.id;
        else break;
      }
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        if (link.getAttribute('href') === `#${current}`) link.dataset.o22Active = 'true';
        else delete link.dataset.o22Active;
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
