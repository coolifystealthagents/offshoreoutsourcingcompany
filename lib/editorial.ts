import type { Metadata } from 'next';

const SITE = 'https://offshoreoutsourcingcompany.com';
const DEFAULT_HERO = '/philippines-operations-team.svg';
const TOPIC_HEROES = [
  { terms: ['access', 'approval', 'permission'], path: '/aug19-heroes/philippines-team-access-approval-matrix.webp' },
  { terms: ['queue', 'capacity', 'workload'], path: '/blog/images/thumbs/philippines-operations-capacity-review.webp' },
  { terms: ['customer', 'support', 'service'], path: '/blog/images/thumbs/philippines-customer-service-team-guide.webp' },
  { terms: ['ecommerce', 'order'], path: '/blog/images/thumbs/philippines-ecommerce-order-exception-controls.webp' },
] as const;

type ArticleMetadataInput = {
  family: 'blog' | 'research';
  slug: string;
  title: string;
  description: string;
  date?: string;
  modifiedDate?: string;
  hero?: string;
};

type ArticleSchemaInput = ArticleMetadataInput & { citations?: readonly string[] };

export function slugifyHeading(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function sanitizeVisibleText(value: string): string {
  return value
    .split(/(https?:\/\/\S+|\S+--\S*|\S*--\S+)/g)
    .map((part) => /^(?:https?:\/\/|\S+--\S*|\S*--\S+)$/.test(part) ? part : part.replace(/[\u2014\u2013]/g, '-').replace(/\s--\s/g, ' - '))
    .join('');
}

export function getEditorialHero(slug: string, title = ''): string {
  const subject = `${slug} ${title}`.toLowerCase();
  return TOPIC_HEROES.find(({ terms }) => terms.some((term) => subject.includes(term)))?.path ?? DEFAULT_HERO;
}

export function buildArticleMetadata(input: ArticleMetadataInput): Metadata {
  const path = `/${input.family}/${input.slug}`;
  const socialImage = `${SITE}/opengraph-image.png`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: path },
    openGraph: {
      title: input.title,
      description: input.description,
      type: 'article',
      url: `${SITE}${path}`,
      publishedTime: input.date,
      modifiedTime: input.modifiedDate,
      images: [{ url: socialImage, alt: `${input.title} | Offshore Outsourcing Company` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [socialImage],
    },
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const path = `/${input.family}/${input.slug}`;
  const hero = input.hero || getEditorialHero(input.slug, input.title);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: `${SITE}${path}`,
    mainEntityOfPage: `${SITE}${path}`,
    image: `${SITE}${hero}`,
    datePublished: input.date,
    dateModified: input.modifiedDate || input.date,
    author: { '@type': 'Organization', name: 'Offshore Outsourcing Company' },
    publisher: { '@type': 'Organization', name: 'Offshore Outsourcing Company', url: SITE },
    ...(input.citations?.length ? { citation: [...input.citations] } : {}),
  };
}
