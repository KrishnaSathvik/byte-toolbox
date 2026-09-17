import { describe, expect, it } from 'vitest';
import { buildLlmsTxt, buildRobotsTxt } from '../../../scripts/generate-sitemap.mjs';

describe('buildLlmsTxt', () => {
  const llms = buildLlmsTxt();

  it('uses live ByteToolBox tool paths', () => {
    expect(llms).toContain('https://www.bytetoolbox.com/hash');
    expect(llms).toContain('https://www.bytetoolbox.com/uuid');
    expect(llms).toContain('https://www.bytetoolbox.com/regex');
    expect(llms).toContain('https://www.bytetoolbox.com/timestamp');
    expect(llms).not.toContain('/hash-generator');
    expect(llms).not.toContain('/uuid-generator');
    expect(llms).not.toContain('/regex-tester');
    expect(llms).not.toContain('/timestamp-converter');
  });

  it('points guides at /blog instead of /guides', () => {
    expect(llms).toContain('https://www.bytetoolbox.com/blog');
    expect(llms).not.toContain('https://www.bytetoolbox.com/guides');
  });
});

describe('buildRobotsTxt', () => {
  it('keeps a global allow, omits crawl-delay, and splits search from training', () => {
    const robots = buildRobotsTxt({ allowTraining: true });

    expect(robots).toContain('User-agent: *\nAllow: /');
    expect(robots).not.toMatch(/Crawl-delay/i);

    const searchIdx = robots.indexOf('# Search and discovery');
    const trainingIdx = robots.indexOf('# Training');
    expect(searchIdx).toBeGreaterThan(-1);
    expect(trainingIdx).toBeGreaterThan(searchIdx);

    const searchBlock = robots.slice(searchIdx, trainingIdx);
    const trainingBlock = robots.slice(trainingIdx);

    expect(searchBlock).toContain('OAI-SearchBot');
    expect(searchBlock).toContain('Claude-SearchBot');
    expect(searchBlock).toContain('Googlebot');
    expect(searchBlock).not.toContain('GPTBot');
    expect(trainingBlock).toContain('User-agent: GPTBot\nAllow: /');
    expect(trainingBlock).toContain('User-agent: Google-Extended\nAllow: /');
  });

  it('can disallow training crawlers independently', () => {
    const robots = buildRobotsTxt({ allowTraining: false });
    const trainingBlock = robots.slice(robots.indexOf('# Training'));

    expect(robots).toContain('User-agent: OAI-SearchBot\nAllow: /');
    expect(trainingBlock).toContain('User-agent: GPTBot\nDisallow: /');
  });
});
