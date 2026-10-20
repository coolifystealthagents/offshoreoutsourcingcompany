'use client';

const targetId = 'main-content';

export function SkipLink() {
  function focusTarget(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', `#${targetId}`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  }

  return <a className="skip-link" href={`#${targetId}`} onClick={focusTarget}>Skip to main content</a>;
}
