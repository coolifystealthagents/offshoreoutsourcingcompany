'use client';

import type { ReactNode } from 'react';
import { ArticleSidebar } from './article-sidebar';

export function EditorialArticleFrame({ children }: { children: ReactNode }) {
  return <div data-editorial-frame="true"><ArticleSidebar />{children}</div>;
}
