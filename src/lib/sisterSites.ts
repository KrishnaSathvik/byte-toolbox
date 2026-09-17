export interface SisterSite {
  name: string;
  url: string;
  blurb: string;
  shortLabel: string;
}

export const SISTER_SITES: SisterSite[] = [
  {
    name: 'TextCraft',
    url: 'https://www.textcraft.dev/',
    blurb: 'Fast browser tools for counting, cleaning, converting, comparing, and organizing text.',
    shortLabel: 'Text processing',
  },
  {
    name: 'SecureTools',
    url: 'https://www.securetools.dev/',
    blurb: 'Browser-based security tools for passwords, encryption, 2FA, random data, and privacy.',
    shortLabel: 'Security & privacy',
  },
];
