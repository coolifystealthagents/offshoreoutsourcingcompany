'use client';

import { useEffect } from 'react';

const targetId = 'main-content';

export function SkipLink() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (!main) return;
    if (!main.id) main.id = targetId;
    if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
  }, []);

  function focusMain(event: React.MouseEvent<HTMLAnchorElement>) {
    const main = document.querySelector<HTMLElement>('main');
    if (!main) return;
    event.preventDefault();
    if (!main.id) main.id = targetId;
    if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
    history.replaceState(null, '', `#${main.id}`);
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  }

  return <a className="skip-link" href={`#${targetId}`} onClick={focusMain}>Skip to main content</a>;
}
