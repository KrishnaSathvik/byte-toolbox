import { describe, expect, it } from 'vitest';
import {
  breadcrumbListSchema,
  faqPageSchema,
  organizationSchema,
  toolPageStructuredData,
  webApplicationSchema,
  websiteSchema,
} from '../structuredData';
import { TOOL_FAQS, getToolFaqs } from '../toolFaqs';

describe('structuredData', () => {
  it('describes the publisher and website', () => {
    expect(organizationSchema()['@type']).toBe('Organization');
    expect(websiteSchema()['@type']).toBe('WebSite');
  });

  it('builds WebApplication schema for a tool page', () => {
    const schema = webApplicationSchema({
      name: 'JSON Formatter',
      description: 'Format JSON locally.',
      path: '/json-formatter',
      featureList: ['Validate'],
    });

    expect(schema['@type']).toBe('WebApplication');
    expect(schema.url).toBe('https://www.bytetoolbox.com/json-formatter');
    expect(schema.applicationCategory).toBe('DeveloperApplication');
  });

  it('omits item from the current breadcrumb', () => {
    const schema = breadcrumbListSchema([
      { name: 'Home', path: '/' },
      { name: 'JSON Formatter' },
    ]);
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    expect(items[0].item).toBe('https://www.bytetoolbox.com/');
    expect(items[1].item).toBeUndefined();
  });

  it('returns null FAQ schema when there are no questions', () => {
    expect(faqPageSchema([])).toBeNull();
  });

  it('includes WebApplication, breadcrumbs, and FAQ schema for tool pages', () => {
    const faqs = getToolFaqs('/json-formatter');
    const schemas = toolPageStructuredData({
      name: 'JSON Formatter',
      description: 'Format JSON locally.',
      path: '/json-formatter',
      featureList: ['Validate'],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'JSON Formatter' },
      ],
      faqs,
    });

    expect(schemas.map((schema) => schema['@type'])).toEqual([
      'WebApplication',
      'BreadcrumbList',
      'FAQPage',
    ]);
  });
});

describe('toolFaqs', () => {
  it('covers every tool route with extractable questions', () => {
    const routes = ['/json-formatter', '/base64', '/hash', '/uuid', '/regex', '/timestamp'];

    for (const route of routes) {
      expect(TOOL_FAQS[route].length).toBeGreaterThanOrEqual(4);
      expect(TOOL_FAQS[route].every((faq) => faq.question.endsWith('?'))).toBe(true);
    }
  });
});
