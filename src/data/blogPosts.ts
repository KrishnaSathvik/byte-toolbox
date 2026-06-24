import { content as content_json_best_practices_api_development } from './blog/json-best-practices-api-development';
import { content as content_md5_sha1_password_hashing_security } from './blog/md5-sha1-password-hashing-security';
import { content as content_mastering_regular_expressions_guide } from './blog/mastering-regular-expressions-guide';
import { content as content_uuid_vs_auto_increment_primary_keys } from './blog/uuid-vs-auto-increment-primary-keys';
import { content as content_base64_encoding_when_and_why } from './blog/base64-encoding-when-and-why';
import { content as content_json_performance_large_applications } from './blog/json-performance-large-applications';
import { content as content_timestamp_management_distributed_systems } from './blog/timestamp-management-distributed-systems';
import { content as content_privacy_first_developer_tools } from './blog/privacy-first-developer-tools';
import { content as content_modern_javascript_es6_features } from './blog/modern-javascript-es6-features';
import { content as content_unix_timestamp_cheat_sheet } from './blog/unix-timestamp-to-date-developer-cheat-sheet';
import { content as content_find_and_fix_invalid_json } from './blog/find-and-fix-invalid-json-examples';
import { content as content_sha256_vs_sha512 } from './blog/sha-256-vs-sha-512-which-hash-should-you-use';
import { content as content_base64url_jwt_api_encoding_rules } from './blog/base64url-jwt-api-encoding-rules';
import { content as content_verify_file_integrity_sha256 } from './blog/verify-file-integrity-sha-256-checksum';
import { content as content_generate_uuid_v4_api_database_keys } from './blog/generate-uuid-v4-api-database-keys';
import { content as content_regex_flags_javascript_developer_reference } from './blog/regex-flags-javascript-developer-reference';
import { content as content_iso_8601_dates_json_api_formatting } from './blog/iso-8601-dates-json-api-formatting';
import { content as content_base64_unicode_utf8_encoding_pitfalls } from './blog/base64-unicode-utf8-encoding-pitfalls';

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogRelatedTool {
  route: string;
  label: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  updated?: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  quickAnswer?: string;
  keyTakeaways?: string[];
  relatedToolRoute?: string;
  relatedTools?: BlogRelatedTool[];
  relatedPosts?: string[];
  faqs?: BlogFaq[];
}

export const blogCategories = [
  { id: 'all', name: 'All Posts' },
  { id: 'tools', name: 'Tool Tips' },
  { id: 'security', name: 'Security' },
  { id: 'performance', name: 'Performance' },
  { id: 'data', name: 'Data Processing' },
  { id: 'regex', name: 'Regex' },
  { id: 'uuid', name: 'UUIDs' },
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: 10,
    slug: 'unix-timestamp-to-date-developer-cheat-sheet',
    title: 'Unix Timestamp to Date and Back: A Developer Cheat Sheet',
    excerpt:
      'Convert Unix timestamps to dates and back, handle seconds vs milliseconds, UTC, time zones, and common API mistakes.',
    metaTitle: 'Unix Timestamp to Date Guide | Convert Epoch Time Online',
    metaDescription:
      'Learn how to convert Unix timestamps to dates, dates to timestamps, seconds vs milliseconds, UTC, time zones, and common API mistakes.',
    category: 'data',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    readTime: '10 min read',
    tags: ['Timestamps', 'Unix', 'UTC', 'API'],
    featured: true,
    relatedToolRoute: '/timestamp',
    relatedTools: [
      { route: '/timestamp', label: 'Timestamp Converter' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: ['timestamp-management-distributed-systems', 'iso-8601-dates-json-api-formatting'],
    quickAnswer:
      'A Unix timestamp is the number of seconds (or milliseconds) since 1970-01-01 00:00:00 UTC. Convert to a date with new Date(seconds * 1000) in JavaScript when the value is in seconds, or new Date(milliseconds) when it is in ms. Always store and exchange UTC; convert to local time only for display.',
    keyTakeaways: [
      '10-digit values are usually seconds; 13-digit values are usually milliseconds.',
      'Unix time is always UTC — time zones apply only when formatting for users.',
      'Document whether your API uses seconds or milliseconds to prevent off-by-1000 bugs.',
      'Use the Timestamp Converter to verify conversions without writing scripts.',
    ],
    faqs: [
      {
        question: 'What is a Unix timestamp?',
        answer:
          'A Unix timestamp counts time from the Unix epoch (1970-01-01 00:00:00 UTC), usually as whole seconds or milliseconds.',
      },
      {
        question: 'Is Unix time in seconds or milliseconds?',
        answer:
          'Both appear in the wild. JavaScript Date.now() uses milliseconds; many Linux and API fields use seconds. Check digit count and your API docs.',
      },
      {
        question: 'How do I convert a timestamp to a date?',
        answer:
          'In JavaScript: new Date(seconds * 1000) for second-based values, or new Date(milliseconds) for ms. Use the Timestamp Converter for interactive checks.',
      },
      {
        question: 'Why does my timestamp show the wrong time zone?',
        answer:
          'Timestamps are UTC instants. If the hour looks wrong, you may be displaying UTC as local (or vice versa), or confusing seconds with milliseconds.',
      },
      {
        question: 'Should APIs store UTC?',
        answer:
          'Yes. Store UTC (Unix seconds or ISO 8601 with Z) and convert to the user time zone only in the presentation layer.',
      },
      {
        question: 'What is epoch time?',
        answer:
          'Epoch time is another name for Unix time — elapsed time since 1970-01-01 00:00:00 UTC.',
      },
    ],
    content: content_unix_timestamp_cheat_sheet,
  },
  {
    id: 11,
    slug: 'find-and-fix-invalid-json-examples',
    title: 'How to Find and Fix Invalid JSON With Real Error Examples',
    excerpt:
      'Fix invalid JSON with real examples: trailing commas, missing quotes, bad escaping, comments, and mismatched brackets.',
    metaTitle: 'Fix Invalid JSON | Common JSON Errors and Examples',
    metaDescription:
      'Learn how to find and fix invalid JSON, including trailing commas, missing quotes, bad escaping, comments, and nested object mistakes.',
    category: 'tools',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    readTime: '9 min read',
    tags: ['JSON', 'Validation', 'Debugging', 'API'],
    featured: true,
    relatedToolRoute: '/json-formatter',
    relatedTools: [
      { route: '/json-formatter', label: 'JSON Formatter' },
      { route: '/base64', label: 'Base64 Encoder' },
    ],
    relatedPosts: ['json-best-practices-api-development', 'json-performance-large-applications'],
    quickAnswer:
      'JSON must use double-quoted keys and strings, no trailing commas, and no comments. Paste your text into the JSON Formatter, read the parse error location, fix that issue, and validate again until the payload parses.',
    keyTakeaways: [
      'Trailing commas and unquoted keys are the most common JSON syntax errors in API payloads.',
      'JSON is not JavaScript — undefined, comments, and single-quoted strings are invalid.',
      'Fix the first reported parse error, then re-validate; one typo often causes multiple error messages.',
      'ByteToolBox validates JSON locally in your browser without uploading your data.',
    ],
    faqs: [
      {
        question: 'Why is my JSON invalid?',
        answer:
          'Usually syntax: trailing commas, unquoted keys, single quotes, invalid escapes, comments, or mismatched brackets. The JSON Formatter shows where parsing fails.',
      },
      {
        question: 'Are trailing commas allowed in JSON?',
        answer: 'No. Unlike JavaScript, JSON forbids a comma after the last element in objects and arrays.',
      },
      {
        question: 'Can JSON have comments?',
        answer:
          'No. Remove // and /* */ comments or use JSONC-aware editors for config, then export strict JSON for APIs.',
      },
      {
        question: 'What is the difference between JSON and JavaScript objects?',
        answer:
          'JSON is a text format with stricter rules: double quotes only, no functions, no undefined, no trailing commas.',
      },
      {
        question: 'How do I validate JSON online?',
        answer:
          'Use the ByteToolBox JSON Formatter — paste, validate, and format in your browser without uploading payloads.',
      },
      {
        question: 'Is my JSON uploaded anywhere?',
        answer:
          'No. ByteToolBox processes JSON locally in your browser for formatting and validation.',
      },
    ],
    content: content_find_and_fix_invalid_json,
  },
  {
    id: 12,
    slug: 'sha-256-vs-sha-512-which-hash-should-you-use',
    title: 'SHA-256 vs SHA-512: Which Hash Should You Use?',
    excerpt:
      'Compare SHA-256 and SHA-512 for checksums and integrity, how they differ from MD5 and SHA-1, and when each algorithm fits.',
    metaTitle: 'SHA-256 vs SHA-512 | Hash Algorithm Comparison',
    metaDescription:
      'Learn the difference between SHA-256 and SHA-512, when to use each hash, how they compare with MD5 and SHA-1, and common checksum mistakes.',
    category: 'security',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    readTime: '11 min read',
    tags: ['SHA-256', 'SHA-512', 'Hashing', 'Checksums'],
    featured: true,
    relatedToolRoute: '/hash',
    relatedTools: [
      { route: '/hash', label: 'Hash Generator' },
      { route: '/base64', label: 'Base64 Encoder' },
    ],
    relatedPosts: ['md5-sha1-password-hashing-security', 'verify-file-integrity-sha-256-checksum'],
    quickAnswer:
      'Use SHA-256 for most file checksums, release artifacts, and interoperability. Use SHA-512 when policy requires a longer digest or on 64-bit systems optimized for it. Neither SHA-256 nor SHA-512 is safe for password storage — use Argon2 or bcrypt instead. MD5 and SHA-1 are legacy only.',
    keyTakeaways: [
      'SHA-256 (64 hex chars) is the default choice for modern integrity checks.',
      'SHA-512 produces a longer digest; it is not automatically better for every workload.',
      'MD5 and SHA-1 must not be used for passwords or new security-sensitive integrity guarantees.',
      'Hashing is one-way; encryption requires a key and is reversible.',
    ],
    faqs: [
      {
        question: 'What is the difference between SHA-256 and SHA-512?',
        answer:
          'Both are SHA-2 family algorithms. SHA-256 outputs 256 bits (64 hex characters); SHA-512 outputs 512 bits (128 hex characters).',
      },
      {
        question: 'Is SHA-512 always better than SHA-256?',
        answer:
          'No. SHA-512 has a longer digest but SHA-256 is more widely expected in tooling and specs. Choose based on policy and interoperability.',
      },
      {
        question: 'Is MD5 still safe?',
        answer:
          'Not for security-sensitive integrity or passwords. Collision attacks against MD5 are practical. Use SHA-256+ for new checksums.',
      },
      {
        question: 'Is hashing the same as encryption?',
        answer:
          'No. Hashing is one-way fingerprinting. Encryption is reversible with a secret key.',
      },
      {
        question: 'Can hashes be reversed?',
        answer:
          'Not in practice for strong hashes. Attackers guess inputs or use rainbow tables for weak password hashing — another reason to use Argon2/bcrypt for passwords.',
      },
      {
        question: 'Should I use a plain hash for passwords?',
        answer:
          'No. Use adaptive password hashes (Argon2id, bcrypt, scrypt) with per-user salts. Plain SHA-256 is too fast and unsalted for passwords.',
      },
    ],
    content: content_sha256_vs_sha512,
  },
  {
    id: 13,
    slug: 'base64url-jwt-api-encoding-rules',
    title: 'Base64URL in JWTs and APIs: Encoding Rules Developers Miss',
    excerpt:
      'Learn how Base64URL differs from Base64, why JWTs use it, how padding works, and common API encoding mistakes.',
    metaTitle: 'Base64URL in JWTs and APIs | Encoding Rules Guide',
    metaDescription:
      'Learn how Base64URL differs from Base64, why JWTs use it, how padding works, and common API encoding mistakes developers run into.',
    category: 'tools',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '12 min read',
    tags: ['Base64URL', 'JWT', 'API', 'Encoding'],
    featured: true,
    relatedToolRoute: '/base64',
    relatedTools: [
      { route: '/base64', label: 'Base64 Encoder & Decoder' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: [
      'base64-encoding-when-and-why',
      'find-and-fix-invalid-json-examples',
      'base64-unicode-utf8-encoding-pitfalls',
    ],
    quickAnswer:
      'Base64URL is a URL-safe variant of Base64 used in JWT header and payload segments: it replaces + with - and / with _, and often omits padding. Encoding is not encryption — anyone can decode JWT payloads. Always verify signatures and claims; decoding alone does not authenticate a token.',
    keyTakeaways: [
      'JWTs use Base64URL so tokens survive URLs, headers, and cookies without extra escaping.',
      'Base64URL and standard Base64 represent the same bytes but use different character sets and padding rules.',
      'Decoding a JWT payload is not the same as verifying its signature or trusting its claims.',
      'Use the Base64 tool locally to debug encoding; use a JWT library for signature verification in production.',
    ],
    faqs: [
      {
        question: 'What is Base64URL?',
        answer:
          'Base64URL is a URL-safe Base64 variant (RFC 4648) that uses - and _ instead of + and /, often without = padding in JWTs.',
      },
      {
        question: 'Is Base64URL the same as Base64?',
        answer:
          'No. They encode the same binary data but use different output characters and padding conventions. JWT decoders must handle URL-safe alphabet and optional padding.',
      },
      {
        question: 'Why do JWTs use Base64URL?',
        answer:
          'Tokens travel in HTTP headers, URLs, and cookies. Base64URL avoids characters that need escaping in those contexts.',
      },
      {
        question: 'Does Base64URL encrypt data?',
        answer:
          'No. Base64 and Base64URL are encoding schemes — they are reversible without a secret key. Never treat encoded JWT payloads as confidential.',
      },
      {
        question: 'What does padding mean in Base64?',
        answer:
          'Padding = characters mark incomplete 3-byte groups at the end of input. JWTs often omit padding; decoders must infer it.',
      },
      {
        question: 'Can I decode JWT payloads without verifying the signature?',
        answer:
          'You can decode for inspection, but unverified payloads must not drive authorization decisions. Always verify signatures and validate exp, aud, and issuer claims.',
      },
    ],
    content: content_base64url_jwt_api_encoding_rules,
  },
  {
    id: 14,
    slug: 'verify-file-integrity-sha-256-checksum',
    title: 'How to Verify File Integrity with SHA-256 Checksums',
    excerpt:
      'Learn how SHA-256 checksums verify file integrity, how to compare hashes safely, and mistakes to avoid with downloads and releases.',
    metaTitle: 'Verify File Integrity with SHA-256 | Checksum Guide',
    metaDescription:
      'Learn how SHA-256 checksums help verify file integrity, compare hashes safely, and avoid common mistakes with file downloads and releases.',
    category: 'security',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '11 min read',
    tags: ['SHA-256', 'Checksums', 'File Integrity', 'Security'],
    featured: true,
    relatedToolRoute: '/hash',
    relatedTools: [
      { route: '/hash', label: 'Hash Generator' },
      { route: '/base64', label: 'Base64 Encoder' },
    ],
    relatedPosts: [
      'sha-256-vs-sha-512-which-hash-should-you-use',
      'md5-sha1-password-hashing-security',
      'base64-encoding-when-and-why',
    ],
    quickAnswer:
      'Compute SHA-256 over the exact file bytes, compare the 64-character hex digest to the published checksum, and treat a match as proof the file is byte-identical — not proof it is malware-free. Use the Hash Generator to hash files locally; use Argon2 or bcrypt for passwords, not SHA-256.',
    keyTakeaways: [
      'SHA-256 checksums detect accidental corruption and wrong artifacts; they do not scan for malware.',
      'Compare digests case-insensitively and trim whitespace when copying hex from manifests.',
      'Integrity (checksum match) is not the same as authenticity (cryptographic signature).',
      'Prefer SHA-256 for new releases; use MD5 only for legacy compatibility checks.',
    ],
    faqs: [
      {
        question: 'What is a SHA-256 checksum?',
        answer:
          'A SHA-256 checksum is a 256-bit digest (64 hex characters) produced by hashing file contents. Same bytes produce the same digest.',
      },
      {
        question: 'How do I verify file integrity?',
        answer:
          'Hash the downloaded file with SHA-256 and compare to the publisher checksum. Match means byte-identical files.',
      },
      {
        question: 'Is a checksum the same as encryption?',
        answer:
          'No. Checksums are one-way fingerprints for integrity. Encryption protects confidentiality and is reversible with a key.',
      },
      {
        question: 'Is MD5 still safe for checksums?',
        answer:
          'MD5 is legacy only. Collision attacks exist — use SHA-256 for new integrity checks; MD5 only when verifying old artifacts.',
      },
      {
        question: 'Can a checksum prove a file is safe?',
        answer:
          'No. A checksum only proves the file matches a known digest. Malware can be hashed too. Combine HTTPS, signatures, and supply-chain practices.',
      },
      {
        question: 'Should I use checksums for passwords?',
        answer:
          'No. Use adaptive password hashing (Argon2id, bcrypt, scrypt) with per-user salts. Plain SHA-256 is too fast and unsalted for passwords.',
      },
    ],
    content: content_verify_file_integrity_sha256,
  },
  {
    id: 15,
    slug: 'generate-uuid-v4-api-database-keys',
    title: 'Generating UUID v4 for APIs and Database Keys',
    excerpt:
      'Learn when to use UUID v4 for APIs, database keys, test data, and distributed systems, plus tradeoffs vs sequential IDs.',
    metaTitle: 'Generate UUID v4 for APIs and Database Keys | ByteToolBox',
    metaDescription:
      'Learn when to use UUID v4 for APIs, database keys, test data, and distributed systems, plus tradeoffs compared with sequential IDs.',
    category: 'uuid',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '10 min read',
    tags: ['UUID', 'UUID v4', 'API', 'Database'],
    featured: true,
    relatedToolRoute: '/uuid',
    relatedTools: [
      { route: '/uuid', label: 'UUID Generator' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: [
      'uuid-vs-auto-increment-primary-keys',
      'find-and-fix-invalid-json-examples',
      'json-best-practices-api-development',
    ],
    quickAnswer:
      'UUID v4 provides random, opaque 128-bit identifiers ideal for API request IDs, public resource IDs, and distributed database keys without a central allocator. ByteToolBox generates UUID v4 only — not v7. Expect larger keys and less index locality than sequential integers; collision risk is negligible at application scale.',
    keyTakeaways: [
      'UUID v4 is random and opaque — good for public IDs and correlation without enumeration.',
      'Sequential integers are smaller and index-friendly; UUID v4 trades that for global uniqueness without coordination.',
      'ByteToolBox UUID Generator creates v4 only; use other libraries if you need time-ordered UUID v7.',
      'Always enforce PRIMARY KEY / UNIQUE constraints — UUIDs from external input must still be validated.',
    ],
    faqs: [
      {
        question: 'What is UUID v4?',
        answer:
          'UUID v4 is a random 128-bit identifier (RFC 4122) with version nibble 4. Most bits are cryptographically random.',
      },
      {
        question: 'When should I use UUID v4?',
        answer:
          'Use v4 for API request IDs, public resource identifiers, client-generated keys, and distributed systems without a single ID server.',
      },
      {
        question: 'Can UUID v4 collide?',
        answer:
          'Theoretically yes, practically no at application scale. Still use database uniqueness constraints.',
      },
      {
        question: 'Is UUID v4 good for database primary keys?',
        answer:
          'Yes, with tradeoffs: larger keys and random insert patterns vs sequential IDs. Consider native UUID column types and indexing strategy.',
      },
      {
        question: 'What is the difference between UUID v4 and UUID v7?',
        answer:
          'v4 is random; v7 embeds a timestamp for roughly time-ordered values and better index locality. ByteToolBox generates v4 only.',
      },
      {
        question: 'Can I generate UUIDs in bulk?',
        answer:
          'Yes. The UUID Generator supports 1–1000 IDs per run with copy and download options, processed locally in your browser.',
      },
    ],
    content: content_generate_uuid_v4_api_database_keys,
  },
  {
    id: 16,
    slug: 'regex-flags-javascript-developer-reference',
    title: 'Regex Flags in JavaScript: g, i, m, s, u, y Explained',
    excerpt:
      'Learn what JavaScript regex flags do, when to combine g/i/m/s/u, and common mistakes that break multiline and Unicode matching.',
    metaTitle: 'JavaScript Regex Flags Guide | g, i, m, s, u, y',
    metaDescription:
      'Learn JavaScript regex flags with practical examples, flag combinations, and debugging tips using the Regex Tester.',
    category: 'regex',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '10 min read',
    tags: ['Regex', 'JavaScript', 'Flags', 'Debugging'],
    featured: true,
    relatedToolRoute: '/regex',
    relatedTools: [
      { route: '/regex', label: 'Regex Tester' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: ['mastering-regular-expressions-guide', 'find-and-fix-invalid-json-examples'],
    quickAnswer:
      'Regex flags change matching behavior: g finds all matches, i ignores case, m treats lines separately for anchors, s lets dot match newlines, u enables Unicode properties, y matches only at lastIndex.',
    keyTakeaways: [
      'Missing g is the most common reason replace only changes the first match.',
      'Use m for log lines and s when dot must cross newlines.',
      'Always add u when matching emoji or non-Latin scripts.',
      'Reset lastIndex when reusing global regex objects.',
    ],
    faqs: [
      {
        question: 'What does the g flag do in JavaScript regex?',
        answer: 'g finds all matches instead of stopping after the first.',
      },
      {
        question: 'When should I use the m flag?',
        answer: 'Use m when ^ and $ should match line boundaries.',
      },
      {
        question: 'What is the s (dotall) flag?',
        answer: 's lets dot match newline characters.',
      },
      {
        question: 'Why do I need the u flag for emoji?',
        answer: 'u enables correct Unicode and surrogate-pair handling.',
      },
      {
        question: 'Why does my global regex alternate true/false in a loop?',
        answer: 'Global regexes advance lastIndex — reset it between tests.',
      },
      {
        question: 'How do I test regex flags quickly?',
        answer: 'Use the ByteToolBox Regex Tester locally in your browser.',
      },
    ],
    content: content_regex_flags_javascript_developer_reference,
  },
  {
    id: 17,
    slug: 'iso-8601-dates-json-api-formatting',
    title: 'ISO 8601 Dates in JSON APIs: Formatting Rules That Prevent Bugs',
    excerpt:
      'Use ISO 8601 correctly in JSON APIs: UTC vs offsets, fractional seconds, date-only pitfalls, and Unix timestamp interoperability.',
    metaTitle: 'ISO 8601 Dates in JSON APIs | Formatting Guide',
    metaDescription:
      'Learn ISO 8601 date formatting for JSON APIs, UTC rules, timezone offsets, and common timestamp bugs.',
    category: 'data',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '9 min read',
    tags: ['ISO 8601', 'Timestamps', 'JSON', 'API'],
    featured: true,
    relatedToolRoute: '/timestamp',
    relatedTools: [
      { route: '/timestamp', label: 'Timestamp Converter' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: [
      'unix-timestamp-to-date-developer-cheat-sheet',
      'timestamp-management-distributed-systems',
      'json-best-practices-api-development',
    ],
    quickAnswer:
      'Use ISO 8601 instants with explicit UTC (Z) or numeric offsets. Store UTC, convert to local time only for display, and document seconds vs milliseconds for Unix fields.',
    keyTakeaways: [
      'Always include Z or a numeric offset on datetime strings in JSON.',
      'Date-only values are calendar dates, not UTC instants.',
      'Pick one fractional-second precision per API field.',
      'Use the Timestamp Converter to debug production log values.',
    ],
    faqs: [
      {
        question: 'What is the correct ISO 8601 format for JSON APIs?',
        answer: 'Use YYYY-MM-DDTHH:mm:ss.sssZ for UTC or include an explicit offset.',
      },
      {
        question: 'Should APIs use ISO 8601 or Unix timestamps?',
        answer: 'Both work — document units and which field is canonical.',
      },
      {
        question: 'Why do my API dates show the wrong day?',
        answer: 'Often missing offsets or date-only strings parsed as UTC midnight.',
      },
      {
        question: 'Is Z the same as +00:00?',
        answer: 'Yes for UTC — both mean zero offset.',
      },
      {
        question: 'How do I debug a bad timestamp from logs?',
        answer: 'Paste the value into the Timestamp Converter.',
      },
      {
        question: 'Should I store local time in the database?',
        answer: 'Store UTC; localize only in the UI.',
      },
    ],
    content: content_iso_8601_dates_json_api_formatting,
  },
  {
    id: 18,
    slug: 'base64-unicode-utf8-encoding-pitfalls',
    title: 'Base64 and Unicode: UTF-8 Encoding Pitfalls Developers Hit',
    excerpt:
      'Fix Base64 Unicode bugs: encode UTF-8 bytes, avoid btoa pitfalls, and verify emoji round-trips in APIs.',
    metaTitle: 'Base64 Unicode UTF-8 Guide | Encoding Pitfalls',
    metaDescription:
      'Learn Base64 Unicode pitfalls, UTF-8 encoding, btoa limits, emoji round-trips, and API mistakes.',
    category: 'data',
    author: 'ByteToolbox Team',
    date: '2026-06-24',
    updated: '2026-06-24',
    readTime: '9 min read',
    tags: ['Base64', 'Unicode', 'UTF-8', 'Encoding'],
    featured: true,
    relatedToolRoute: '/base64',
    relatedTools: [
      { route: '/base64', label: 'Base64 Encoder & Decoder' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: [
      'base64-encoding-when-and-why',
      'base64url-jwt-api-encoding-rules',
      'find-and-fix-invalid-json-examples',
    ],
    quickAnswer:
      'Base64 encodes bytes. Convert Unicode text to UTF-8 bytes before encoding. Base64 is encoding, not encryption.',
    keyTakeaways: [
      'btoa only accepts Latin-1 — use TextEncoder for Unicode.',
      'Emoji fails when UTF-8 steps are skipped.',
      'Document utf-8 in API schemas for Base64 fields.',
      'Test round-trips with the Base64 tool first.',
    ],
    faqs: [
      {
        question: 'Why does btoa fail on Unicode text?',
        answer: 'btoa expects Latin-1 — encode UTF-8 bytes first.',
      },
      {
        question: 'Does Base64 encrypt Unicode strings?',
        answer: 'No. Base64 is reversible encoding without a secret key.',
      },
      {
        question: 'How do I Base64 encode emoji correctly?',
        answer: 'Convert to UTF-8 bytes, then Base64 encode those bytes.',
      },
      {
        question: 'What causes mojibake after Base64 decode?',
        answer: 'Charset mismatch — often Latin-1 instead of UTF-8.',
      },
      {
        question: 'Is Base64URL different for Unicode?',
        answer: 'Same UTF-8 bytes first — only alphabet and padding differ.',
      },
      {
        question: 'How can I test Base64 Unicode locally?',
        answer: 'Use the ByteToolBox Base64 Encoder in your browser.',
      },
    ],
    content: content_base64_unicode_utf8_encoding_pitfalls,
  },
  {
    id: 1,
    slug: 'json-best-practices-api-development',
    title: '10 Essential JSON Best Practices for API Development',
    excerpt:
      'Learn the most important JSON practices that will make your APIs more reliable, secure, and maintainable.',
    metaTitle: 'JSON API Best Practices | Validate and Format JSON',
    metaDescription:
      'Essential JSON practices for APIs: validation, naming, errors, pagination, and schema documentation with practical examples.',
    category: 'tools',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '8 min read',
    tags: ['JSON', 'API', 'Best Practices', 'Development'],
    featured: true,
    relatedToolRoute: '/json-formatter',
    relatedTools: [
      { route: '/json-formatter', label: 'JSON Formatter' },
      { route: '/base64', label: 'Base64 Encoder' },
    ],
    relatedPosts: ['find-and-fix-invalid-json-examples', 'json-performance-large-applications'],
    quickAnswer:
      'Reliable JSON APIs validate every payload, use consistent naming, return explicit errors with proper HTTP status codes, paginate large lists, and document schemas. Validate locally with the JSON Formatter before shipping payloads.',
    keyTakeaways: [
      'Never trust client JSON — validate against a schema on every write.',
      'Use consistent camelCase or snake_case and stick to one convention.',
      'Return machine-readable errors with stable field names and HTTP status codes.',
      'Document contracts with JSON Schema and test fixtures in CI.',
    ],
    faqs: [
      {
        question: 'Should APIs accept trailing commas in JSON?',
        answer: 'No. Strict JSON parsers reject trailing commas. Validate payloads before production.',
      },
      {
        question: 'How do I test JSON API responses quickly?',
        answer: 'Paste responses into the JSON Formatter to validate structure and catch syntax issues.',
      },
      {
        question: 'What HTTP status code for invalid JSON?',
        answer: 'Use 400 Bad Request with a clear parse or validation error message.',
      },
      {
        question: 'Should null and missing fields mean the same thing?',
        answer: 'Define explicitly in your API contract — they often carry different semantics.',
      },
    ],
    content: content_json_best_practices_api_development,
  },
  {
    id: 2,
    slug: 'md5-sha1-password-hashing-security',
    title: 'Why MD5 and SHA-1 Are No Longer Secure for Password Hashing',
    excerpt:
      'Understanding the security implications of using deprecated hash algorithms and what to use instead.',
    metaTitle: 'MD5 and SHA-1 Password Hashing Risks | Use Argon2 or bcrypt',
    metaDescription:
      'Why MD5 and SHA-1 are unsafe for passwords, what collision and brute-force risks mean, and which algorithms to use instead.',
    category: 'security',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '10 min read',
    tags: ['Security', 'Hashing', 'MD5', 'SHA-1', 'Passwords'],
    featured: true,
    relatedToolRoute: '/hash',
    relatedTools: [
      { route: '/hash', label: 'Hash Generator' },
    ],
    relatedPosts: ['sha-256-vs-sha-512-which-hash-should-you-use'],
    quickAnswer:
      'MD5 and SHA-1 are broken or deprecated for password storage because collisions and GPU cracking are practical. Use Argon2id or bcrypt with per-user salts. The Hash Generator can compare legacy digests for migration debugging — not for storing new passwords.',
    keyTakeaways: [
      'MD5 collisions can be generated — never use MD5 for passwords.',
      'SHA-1 collision attacks are practical — treat SHA-1 like MD5 for security use cases.',
      'Fast hashes (MD5, SHA-256) without salts are vulnerable to brute force and rainbow tables.',
      'Use adaptive password hashing: Argon2id or bcrypt with an appropriate cost factor.',
    ],
    faqs: [
      {
        question: 'Can I use SHA-256 for passwords?',
        answer:
          'Not alone. SHA-256 is too fast and needs salting and stretching. Use Argon2, bcrypt, or scrypt designed for passwords.',
      },
      {
        question: 'Is MD5 OK for file checksums?',
        answer:
          'For new integrity guarantees, prefer SHA-256. MD5 is legacy-only and collision-prone.',
      },
      {
        question: 'When is the Hash Generator appropriate?',
        answer:
          'For checksums, comparing artifact digests, and debugging legacy hashes — not for generating password stores.',
      },
      {
        question: 'How do I migrate off MD5 password hashes?',
        answer:
          'Verify legacy hash on login, rehash with Argon2/bcrypt, and replace stored value. Never double-hash MD5 with SHA-256.',
      },
    ],
    content: content_md5_sha1_password_hashing_security,
  },
  {
    id: 3,
    slug: 'mastering-regular-expressions-guide',
    title: "Mastering Regular Expressions: A Developer's Guide",
    excerpt:
      'From basic patterns to advanced techniques, learn how to write efficient and maintainable regular expressions.',
    metaTitle: 'Regular Expressions Guide | Test Regex Patterns Online',
    metaDescription:
      'Learn regex syntax, common patterns, performance tips, and debugging workflows for developers.',
    category: 'regex',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '15 min read',
    tags: ['Regex', 'Text Processing', 'Patterns', 'JavaScript'],
    featured: false,
    relatedToolRoute: '/regex',
    relatedTools: [
      { route: '/regex', label: 'Regex Tester' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: ['find-and-fix-invalid-json-examples', 'regex-flags-javascript-developer-reference'],
    quickAnswer:
      'Regular expressions match text patterns using literals, character classes, quantifiers, and anchors. Test patterns interactively with the Regex Tester, start simple, and prefer readable patterns with comments (x flag) for complex rules.',
    keyTakeaways: [
      'Anchor patterns (^ $) when validating full strings, not substrings.',
      'Prefer non-greedy quantifiers (*?, +?) when capturing delimited text.',
      'Test edge cases: empty strings, unicode, and newline modes (m, s flags).',
      'Use the Regex Tester for quick iteration before embedding patterns in code.',
    ],
    faqs: [
      {
        question: 'How do I test a regex without deploying code?',
        answer: 'Use the ByteToolBox Regex Tester with your pattern, flags, and sample text.',
      },
      {
        question: 'What is the difference between .* and .*?',
        answer: '.* is greedy (matches as much as possible); .*? is lazy (matches as little as possible).',
      },
      {
        question: 'Should I parse HTML with regex?',
        answer: 'Generally no — use an HTML parser. Regex suits tokens, logs, and constrained formats.',
      },
      {
        question: 'Which flags should I use in JavaScript?',
        answer: 'Common flags: i (case insensitive), g (global), m (multiline), s (dotall). Test combinations in the Regex Tester.',
      },
    ],
    content: content_mastering_regular_expressions_guide,
  },
  {
    id: 4,
    slug: 'uuid-vs-auto-increment-primary-keys',
    title: 'UUID vs Auto-increment: Choosing the Right Primary Key',
    excerpt:
      'When to use UUIDs versus auto-incrementing integers for database primary keys in different scenarios.',
    metaTitle: 'UUID vs Auto-increment Primary Keys | Database Design Guide',
    metaDescription:
      'Compare UUIDs and auto-increment integers for database primary keys, performance, and distributed systems.',
    category: 'uuid',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '12 min read',
    tags: ['UUID', 'Database', 'Primary Keys', 'Performance'],
    featured: false,
    relatedToolRoute: '/uuid',
    relatedTools: [
      { route: '/uuid', label: 'UUID Generator' },
      { route: '/hash', label: 'Hash Generator' },
    ],
    relatedPosts: ['generate-uuid-v4-api-database-keys'],
    quickAnswer:
      'Use auto-increment integers for single-database, performance-critical relational schemas. Use UUIDs (often v4) when generating IDs across services, offline clients, or public APIs. ByteToolBox generates UUID v4 in bulk for tests and prototypes.',
    keyTakeaways: [
      'Auto-increment IDs are smaller and faster for B-tree indexes in a single database.',
      'UUIDs avoid coordination and ID guessing across distributed writers.',
      'Random UUID v4 can fragment indexes — consider time-ordered IDs for very high insert rates.',
      'Generate test UUIDs with the UUID Generator without hitting your database sequence.',
    ],
    faqs: [
      {
        question: 'Does ByteToolBox generate UUID v1 or v4?',
        answer: 'The UUID Generator creates UUID v4 (random) identifiers, suitable for most application IDs.',
      },
      {
        question: 'Are UUIDs always better than integers?',
        answer: 'No. Integers win on size and index locality; UUIDs win on distributed generation and opacity.',
      },
      {
        question: 'Can I expose auto-increment IDs in public APIs?',
        answer: 'You can, but they leak volume and are easy to enumerate — UUIDs are often preferred externally.',
      },
      {
        question: 'How do I bulk-generate UUIDs for seed data?',
        answer: 'Use the UUID Generator to create batches, copy, or download for fixtures and load tests.',
      },
    ],
    content: content_uuid_vs_auto_increment_primary_keys,
  },
  {
    id: 5,
    slug: 'base64-encoding-when-and-why',
    title: 'Base64 Encoding: When and Why to Use It',
    excerpt:
      'Understanding Base64 encoding, its use cases, and best practices for web development.',
    metaTitle: 'Base64 Encoding Guide | When and Why to Use Base64',
    metaDescription:
      'Learn Base64 encoding, how it works, common web use cases, pitfalls, and best practices with examples.',
    category: 'data',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '8 min read',
    tags: ['Base64', 'Encoding', 'Web Development', 'Data Transfer'],
    featured: false,
    relatedToolRoute: '/base64',
    relatedTools: [
      { route: '/base64', label: 'Base64 Encoder & Decoder' },
      { route: '/hash', label: 'Hash Generator' },
    ],
    relatedPosts: ['sha-256-vs-sha-512-which-hash-should-you-use', 'base64url-jwt-api-encoding-rules', 'base64-unicode-utf8-encoding-pitfalls'],
    quickAnswer:
      'Base64 encodes binary data into ASCII-safe text for JSON, email, and data URLs. It is encoding, not encryption. Use the Base64 Encoder to encode or decode strings and files locally in your browser.',
    keyTakeaways: [
      'Base64 expands size by roughly 33% — not a compression format.',
      'Use Base64URL (RFC 4648) for JWTs and URL-safe tokens — not standard Base64 with + and /.',
      'Encoding is reversible by anyone — do not treat Base64 as secrecy.',
      'Test round-trip encode/decode with the Base64 tool before shipping integrations.',
    ],
    faqs: [
      {
        question: 'Is Base64 encryption?',
        answer: 'No. Base64 is encoding. Anyone can decode it without a secret key.',
      },
      {
        question: 'When should I use Base64 in APIs?',
        answer: 'When transporting binary in JSON or text protocols — images, certificates, small blobs.',
      },
      {
        question: 'Does Base64 handle Unicode?',
        answer: 'Encode UTF-8 bytes, not raw UTF-16 code units. The Base64 tool handles Unicode text correctly.',
      },
      {
        question: 'What is the difference between Base64 and Base64URL?',
        answer: 'Base64URL replaces +/ with -_ and often omits padding — required for JWT segments.',
      },
    ],
    content: content_base64_encoding_when_and_why,
  },
  {
    id: 6,
    slug: 'json-performance-large-applications',
    title: 'Optimizing JSON Performance in Large Applications',
    excerpt:
      'Tips and techniques for handling large JSON datasets efficiently in web applications.',
    metaTitle: 'JSON Performance Optimization | Large Payload Guide',
    metaDescription:
      'Optimize JSON parsing and serialization for large applications: pagination, streaming, memory, and validation workflows.',
    category: 'performance',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '8 min read',
    tags: ['JSON', 'Performance', 'Optimization', 'Large Data'],
    featured: false,
    relatedToolRoute: '/json-formatter',
    relatedTools: [
      { route: '/json-formatter', label: 'JSON Formatter' },
      { route: '/base64', label: 'Base64 Encoder' },
    ],
    relatedPosts: ['json-best-practices-api-development', 'find-and-fix-invalid-json-examples'],
    quickAnswer:
      'For large JSON: paginate API responses, avoid repeated parse/stringify loops, stream when possible, and validate payloads with the JSON Formatter before processing in production pipelines.',
    keyTakeaways: [
      'Measure parse time — JSON.parse on megabyte payloads blocks the main thread.',
      'Pagination and field selection reduce payload size more than faster parsers alone.',
      'Validate structure early with the JSON Formatter to catch bad data before expensive processing.',
      'Consider binary formats only when JSON size truly limits scale.',
    ],
    faqs: [
      {
        question: 'How do I validate large JSON without uploading it?',
        answer: 'ByteToolBox JSON Formatter processes locally in your browser — data is not sent to a server.',
      },
      {
        question: 'Does minifying JSON improve parse performance?',
        answer: 'Smaller strings parse slightly faster, but architectural changes (pagination, fewer fields) matter more.',
      },
      {
        question: 'When should I avoid JSON entirely?',
        answer: 'When payloads are huge, highly numeric, or latency-critical — consider CSV, Protobuf, or Arrow for those cases.',
      },
      {
        question: 'How do I debug slow JSON in the browser?',
        answer: 'Use performance.now() around JSON.parse and profile with DevTools; validate samples in the JSON Formatter first.',
      },
    ],
    content: content_json_performance_large_applications,
  },
  {
    id: 7,
    slug: 'timestamp-management-distributed-systems',
    title: 'Timestamp Management in Distributed Systems',
    excerpt:
      'Best practices for handling timestamps across different timezones and distributed systems.',
    metaTitle: 'Timestamp Management in Distributed Systems | UTC Best Practices',
    metaDescription:
      'Handle clock skew, UTC storage, ISO 8601, and timezone pitfalls in distributed applications.',
    category: 'data',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '9 min read',
    tags: ['Timestamps', 'Distributed Systems', 'Timezones', 'Synchronization'],
    featured: false,
    relatedToolRoute: '/timestamp',
    relatedTools: [
      { route: '/timestamp', label: 'Timestamp Converter' },
      { route: '/json-formatter', label: 'JSON Formatter' },
    ],
    relatedPosts: [
      'unix-timestamp-to-date-developer-cheat-sheet',
      'json-best-practices-api-development',
    ],
    quickAnswer:
      'Store UTC everywhere, synchronize clocks (NTP), document seconds vs milliseconds, and convert to local time only in the UI. For day-to-day conversion debugging, use the Timestamp Converter alongside these distributed-system patterns.',
    keyTakeaways: [
      'Clock skew causes out-of-order events — never trust unsynchronized client clocks for ordering.',
      'ISO 8601 with explicit offsets removes ambiguity in logs and APIs.',
      'Use logical clocks or server timestamps when wall-clock sync is unreliable.',
      'Pair this guide with the Unix timestamp cheat sheet for practical conversions.',
    ],
    faqs: [
      {
        question: 'Should microservices share a time zone?',
        answer: 'Internally use UTC everywhere; localize only for user-facing displays.',
      },
      {
        question: 'How do I debug a timestamp that looks wrong?',
        answer: 'Check seconds vs milliseconds first, then time zone.display. Use the Timestamp Converter to verify.',
      },
      {
        question: 'What format should logs use?',
        answer: 'ISO 8601 UTC (Z) or Unix ms with documented precision — be consistent per field.',
      },
      {
        question: 'Does NTP eliminate all ordering issues?',
        answer: 'It reduces skew but not network delay. Use server-side ordering keys for critical workflows.',
      },
    ],
    content: content_timestamp_management_distributed_systems,
  },
  {
    id: 8,
    slug: 'privacy-first-developer-tools',
    title: 'Building Privacy-First Developer Tools',
    excerpt:
      'How we built ByteToolbox with privacy as a core principle and why it matters for developers.',
    metaTitle: 'Privacy-First Developer Tools | ByteToolBox Approach',
    metaDescription:
      'Why privacy matters in developer tools, how ByteToolBox processes data locally, and principles for building trustworthy utilities.',
    category: 'security',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '6 min read',
    tags: ['Privacy', 'Developer Tools', 'Security', 'Ethics'],
    featured: false,
    relatedToolRoute: '/json-formatter',
    relatedTools: [
      { route: '/json-formatter', label: 'JSON Formatter' },
      { route: '/hash', label: 'Hash Generator' },
    ],
    relatedPosts: ['find-and-fix-invalid-json-examples', 'verify-file-integrity-sha-256-checksum'],
    quickAnswer:
      'ByteToolBox tools run in your browser — JSON, hashes, Base64, UUIDs, regex, and timestamps are processed locally without uploading your input to our servers for tool operations.',
    keyTakeaways: [
      'Developer tools often handle secrets, tokens, and production payloads — minimize data collection.',
      'Client-side processing removes an entire class of server-side data exposure for tool input.',
      'Privacy-first does not mean zero analytics — be transparent about what is measured.',
      'Prefer local validation with the JSON Formatter and Hash Generator before pasting data into unknown services.',
    ],
    faqs: [
      {
        question: 'Does ByteToolBox upload my JSON or files?',
        answer: 'No. Tool processing happens locally in your browser for formatting, hashing, encoding, and conversion.',
      },
      {
        question: 'Why do privacy-first developer tools matter?',
        answer: 'Developers paste API keys, configs, and customer data into tools — server-side processing creates unnecessary risk.',
      },
      {
        question: 'Is local-only processing less capable?',
        answer: 'For most developer utilities, modern browsers are fast enough — with better privacy guarantees.',
      },
      {
        question: 'What should I avoid pasting into any online tool?',
        answer: 'Production credentials, live JWTs, and unredacted PII — even with local processing, treat inputs as sensitive.',
      },
    ],
    content: content_privacy_first_developer_tools,
  },
  {
    id: 9,
    slug: 'modern-javascript-es6-features',
    title: 'Modern JavaScript: ES6+ Features Every Developer Should Know',
    excerpt:
      'Essential modern JavaScript features that will make you a more productive and efficient developer.',
    metaTitle: 'Modern JavaScript ES6+ Features | Developer Reference',
    metaDescription:
      'A reference of ES6+ JavaScript features including arrow functions, destructuring, modules, and async patterns.',
    category: 'tools',
    author: 'ByteToolbox Team',
    date: '2025-09-04',
    updated: '2026-06-24',
    readTime: '12 min read',
    tags: ['JavaScript', 'ES6', 'Modern Development', 'Programming'],
    featured: false,
    relatedToolRoute: '/json-formatter',
    relatedTools: [
      { route: '/json-formatter', label: 'JSON Formatter' },
      { route: '/regex', label: 'Regex Tester' },
    ],
    relatedPosts: ['json-best-practices-api-development', 'regex-flags-javascript-developer-reference'],
    quickAnswer:
      'ES6+ added let/const, arrow functions, classes, modules, promises, and destructuring — fundamentals for modern web development. For JSON and regex workflows, pair language features with the JSON Formatter and Regex Tester.',
    keyTakeaways: [
      'Prefer const by default; use let when reassignment is required.',
      'Async/await simplifies promise chains but still requires error handling.',
      'Modules improve structure — avoid global scope pollution.',
      'Use ByteToolBox tools to validate JSON and regex independent of language syntax.',
    ],
    faqs: [
      {
        question: 'Is this guide required to use ByteToolBox?',
        answer: 'No. ByteToolBox tools are self-contained — this post is general JavaScript reference material.',
      },
      {
        question: 'Where can I validate JSON while learning JavaScript?',
        answer: 'Use the JSON Formatter to format and validate JSON payloads in your browser.',
      },
      {
        question: 'Does ByteToolBox support modern browsers?',
        answer: 'Yes. Tools target evergreen browsers with standard Web APIs.',
      },
    ],
    content: content_modern_javascript_es6_features,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
