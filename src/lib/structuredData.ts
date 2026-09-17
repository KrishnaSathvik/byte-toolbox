import { SITE_NAME, SITE_URL } from '@/lib/seoConstants';

export type JsonLd = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_DESCRIPTION =
  'ByteToolBox provides free, privacy-first browser-based developer tools. Tools run locally in the user\'s browser and include JSON formatting, Base64 encoding and decoding, hashing, UUID generation, regex testing, and timestamp conversion.';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    description: SITE_DESCRIPTION,
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
  };
}

export function webApplicationSchema({
  name,
  description,
  path,
  featureList,
}: {
  name: string;
  description: string;
  path: string;
  featureList: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    featureList,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const listItem: JsonLd = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.path) {
        listItem.item = `${SITE_URL}${item.path === '/' ? '/' : item.path}`;
      }
      return listItem;
    }),
  };
}

export function faqPageSchema(faqs: FaqItem[]): JsonLd | null {
  if (!faqs.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function toolPageStructuredData({
  name,
  description,
  path,
  featureList,
  breadcrumbs,
  faqs = [],
}: {
  name: string;
  description: string;
  path: string;
  featureList: string[];
  breadcrumbs: BreadcrumbItem[];
  faqs?: FaqItem[];
}): JsonLd[] {
  return [
    webApplicationSchema({ name, description, path, featureList }),
    breadcrumbListSchema(breadcrumbs),
    faqPageSchema(faqs),
  ].filter((schema): schema is JsonLd => schema !== null);
}
