import { useEffect } from 'react';
import { OG_IMAGE_PATH, OG_IMAGE_URL, SITE_URL } from '@/lib/seoConstants';

export const PRERENDER_READY_EVENT = 'bytetoolbox-prerender-ready';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => {
      if (key !== 'content') {
        el.setAttribute(key, value);
      }
    });
    document.head.appendChild(el);
  }
  if (attrs.content !== undefined) {
    el.setAttribute('content', attrs.content);
  }
}

function upsertLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = OG_IMAGE_PATH,
  structuredData,
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });

    if (keywords) {
      upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    }

    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robotsContent });

    if (canonical) {
      upsertLink('canonical', canonical);
    }

    const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteOgImage });
    if (canonical) {
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    }

    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteOgImage });

    document.querySelectorAll('script[data-seo-ld]').forEach((script) => script.remove());

    const schemas = structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-ld', index === 0 ? 'true' : String(index));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    document.dispatchEvent(new Event(PRERENDER_READY_EVENT));
  }, [title, description, keywords, canonical, ogImage, structuredData, noindex]);
};

export { OG_IMAGE_URL, SITE_URL };
