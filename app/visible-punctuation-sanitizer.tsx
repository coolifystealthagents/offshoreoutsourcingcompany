'use client';

import { useEffect } from 'react';

const excludedParents = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA']);
const replacements: Array<[RegExp, string]> = [
  [/\u2014/g, ' - '],
  [/\u2013/g, '-'],
  [/\u2026/g, '...'],
  [/\u00a0/g, ' '],
];

function sanitize(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    const parent = current.parentElement;
    if (parent && !excludedParents.has(parent.tagName)) nodes.push(current as Text);
    current = walker.nextNode();
  }
  for (const node of nodes) {
    let value = node.data;
    for (const [pattern, replacement] of replacements) value = value.replace(pattern, replacement);
    if (value !== node.data) node.data = value;
  }
}

export function VisiblePunctuationSanitizer() {
  useEffect(() => {
    sanitize(document.body);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => sanitize(node));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
