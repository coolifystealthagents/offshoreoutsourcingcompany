'use client';

import type { ReactNode } from 'react';
import { ArticleSidebar } from './article-sidebar';
import styles from './article-sidebar.module.css';

export function EditorialArticleFrame({ children }: { children: ReactNode }) {
  return <div className={styles.frame} data-editorial-frame="true"><ArticleSidebar />{children}</div>;
}
