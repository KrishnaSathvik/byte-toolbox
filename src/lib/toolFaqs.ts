import type { FaqItem } from '@/lib/structuredData';

export const TOOL_FAQS: Record<string, FaqItem[]> = {
  '/json-formatter': [
    {
      question: 'What is a JSON formatter?',
      answer:
        'A JSON formatter pretty-prints JSON with consistent indentation so nested objects and arrays are readable. ByteToolBox also validates syntax and can minify JSON for compact payloads.',
    },
    {
      question: 'How do I format JSON?',
      answer:
        'Paste JSON into the editor and choose format (pretty print) or minify. The result stays in your browser so you can copy or download it.',
    },
    {
      question: 'How do I validate JSON?',
      answer:
        'Use Validate on the JSON Formatter page. Invalid JSON returns a parse error with a position hint so you can fix trailing commas, quotes, or mismatched brackets.',
    },
    {
      question: 'Does ByteToolBox upload my JSON?',
      answer:
        'No. Formatting, validation, and minification run locally in your browser. Tool input is not uploaded to ByteToolBox servers.',
    },
    {
      question: 'Can I format large JSON files?',
      answer:
        'Yes. The formatter handles payloads up to 10MB locally. Very large files may be slower because all parsing happens on your device.',
    },
    {
      question: 'Why is my JSON invalid?',
      answer:
        'The most common errors are trailing commas, single-quoted strings, unquoted keys, comments, and mismatched brackets. JSON is stricter than JavaScript object literals.',
    },
  ],
  '/base64': [
    {
      question: 'What is Base64 encoding?',
      answer:
        'Base64 represents binary data as ASCII using A–Z, a–z, 0–9, +, / and optional = padding. It is encoding, not encryption — anyone can decode it.',
    },
    {
      question: 'How do I encode or decode Base64?',
      answer:
        'Paste text or upload a file, then encode to Base64 or decode Base64 back to text. URL-safe Base64 (Base64URL) is available for JWTs and query strings.',
    },
    {
      question: 'Does ByteToolBox upload my Base64 data?',
      answer:
        'No. Encoding and decoding run locally in your browser. Input is not sent to ByteToolBox servers.',
    },
    {
      question: 'What is the difference between Base64 and Base64URL?',
      answer:
        'Base64URL replaces + with - and / with _ so the value is safe in URLs and JWTs. Padding = characters are often omitted in JWT payloads.',
    },
    {
      question: 'Does this tool support Unicode?',
      answer:
        'Yes. Text is encoded as UTF-8 before Base64 conversion, so characters such as emoji and non-Latin scripts round-trip correctly.',
    },
  ],
  '/hash': [
    {
      question: 'What is a hash generator?',
      answer:
        'A hash generator computes a fixed-length digest of text or a file. Matching checksums indicate the same bytes; a different digest means the content changed.',
    },
    {
      question: 'Which hash should I use?',
      answer:
        'Use SHA-256 or SHA-512 for new checksums. MD5 and SHA-1 are provided for legacy compatibility and should not be used as proof of authenticity.',
    },
    {
      question: 'Does ByteToolBox upload files I hash?',
      answer:
        'No. Hashes are computed locally in your browser. File contents are not uploaded to ByteToolBox servers.',
    },
    {
      question: 'Can I use this for password storage?',
      answer:
        'No. Plain SHA-256, SHA-512, MD5, and SHA-1 are not password-hashing algorithms. Store passwords with Argon2, bcrypt, or scrypt.',
    },
    {
      question: 'Can I hash files?',
      answer:
        'Yes. Upload a file up to 10MB and generate MD5, SHA-1, SHA-256, or SHA-512 checksums for integrity checks and release verification.',
    },
  ],
  '/uuid': [
    {
      question: 'What is a UUID v4?',
      answer:
        'UUID v4 is a 128-bit identifier generated from random data, typically shown as 8-4-4-4-12 hexadecimal groups. The version nibble is 4.',
    },
    {
      question: 'How do I generate UUIDs?',
      answer:
        'Set the quantity (1–1000), choose uppercase or hyphen formatting, then generate. Copy one UUID or download the full list.',
    },
    {
      question: 'Are these UUIDs generated on a server?',
      answer:
        'No. UUID v4 values are generated locally with crypto.getRandomValues(). Nothing is sent to ByteToolBox to create them.',
    },
    {
      question: 'Should I use UUIDs as database primary keys?',
      answer:
        'UUID v4 keys are globally unique and work well in distributed systems. Sequential integers are smaller and faster to index; choose based on your data model.',
    },
    {
      question: 'Can I generate UUIDs in bulk?',
      answer:
        'Yes. Generate up to 1000 UUID v4 values at once for test data, request IDs, and fixtures.',
    },
  ],
  '/regex': [
    {
      question: 'What is a regex tester?',
      answer:
        'A regex tester lets you try a regular expression against sample text and inspect matches, capture groups, and flag behavior before using the pattern in code.',
    },
    {
      question: 'Which regex flavor does ByteToolBox use?',
      answer:
        'The tester uses JavaScript regular expressions, including flags g, i, m, s, u, and y. Syntax matches what you would use in a browser or Node.js.',
    },
    {
      question: 'Does my test text leave the browser?',
      answer:
        'No. Pattern matching runs locally. Sample text and patterns are not uploaded to ByteToolBox servers.',
    },
    {
      question: 'Why is my regex invalid?',
      answer:
        'Unescaped special characters, unmatched parentheses, or incomplete character classes cause JavaScript to throw a syntax error. The tester reports those errors as you type.',
    },
    {
      question: 'How do regex flags work?',
      answer:
        'g finds all matches, i ignores case, m makes ^ and $ match line boundaries, s lets . match newlines, u enables Unicode mode, and y is sticky matching.',
    },
  ],
  '/timestamp': [
    {
      question: 'What is a Unix timestamp?',
      answer:
        'A Unix timestamp is the number of seconds (or milliseconds) since 1970-01-01T00:00:00Z. It is timezone-independent until you format it for display.',
    },
    {
      question: 'How do I convert a timestamp to a date?',
      answer:
        'Paste a Unix timestamp, ISO-8601 string, or use the current time. The converter shows UTC and local representations you can copy.',
    },
    {
      question: 'Does ByteToolBox upload timestamps I convert?',
      answer:
        'No. Conversion runs locally in your browser. Values are not sent to ByteToolBox servers.',
    },
    {
      question: 'Seconds or milliseconds?',
      answer:
        'Values around 10 digits are usually seconds; 13 digits are usually milliseconds. Mixing them shifts dates by orders of magnitude — check the magnitude before converting.',
    },
    {
      question: 'Does this support ISO-8601 and timezones?',
      answer:
        'Yes. You can convert between Unix time, ISO-8601, and human-readable dates, including UTC and timezone-aware display.',
    },
  ],
};

export function getToolFaqs(route: string): FaqItem[] {
  return TOOL_FAQS[route] ?? [];
}
