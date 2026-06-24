export const content = `Base64 transforms **bytes** into ASCII text. Unicode problems appear when encoders and decoders disagree on **which bytes** represent your string — usually UTF-8 vs UTF-16 code units. The [Base64 Encoder & Decoder](/base64) encodes UTF-8 text correctly in the browser; this guide explains the pitfalls that break round-trips in APIs and JWT workflows.

## Encoding is not encryption

Base64 (and Base64URL) are **reversible encodings**. Anyone can decode without a key. Do not use Base64 to hide API keys, passwords, or PII.

For JWT-specific rules (+/ vs -_), see [Base64URL in JWTs and APIs](/blog/base64url-jwt-api-encoding-rules).

## The core rule: encode UTF-8 bytes

Unicode strings must be converted to **UTF-8 bytes** before Base64 encoding.

\`\`\`javascript
// Browser — correct UTF-8 path
const text = 'Hello 世界 🌍';
const bytes = new TextEncoder().encode(text);
const base64 = btoa(String.fromCharCode(...bytes));
\`\`\`

\`\`\`javascript
// Node.js — correct
Buffer.from('Hello 世界 🌍', 'utf8').toString('base64');
\`\`\`

## What goes wrong with btoa/atob

\`btoa()\` expects **Latin-1 (ISO-8859-1) code units**, not arbitrary Unicode.

\`\`\`javascript
btoa('Hello');        // works
btoa('Hello 世界');   // throws InvalidCharacterError in browser
\`\`\`

**Fix:** UTF-8 encode first, then Base64 the bytes (as above), or use the [Base64 tool](/base64) for interactive checks.

## UTF-8 vs UTF-16 confusion

| Approach | Result |
|----------|--------|
| UTF-8 bytes → Base64 | Interoperable (JSON, JWT, most APIs) |
| UTF-16 code units → Base64 | Breaks cross-language decoders |

\`\`\`javascript
// JavaScript pitfall — UTF-16 code units as bytes (WRONG for APIs)
const wrong = btoa(unescape(encodeURIComponent(text))); // legacy pattern — know why it works
// Prefer TextEncoder for clarity
\`\`\`

C#, Java, and Python defaults vary — always document \`utf-8\` in API specs.

## Emoji and multi-byte characters

Emoji like 🌍 are multiple UTF-8 bytes. Encoding a single UTF-16 **surrogate** without the pair corrupts output.

\`\`\`text
🌍 UTF-8 bytes: F0 9F 8C 8D (4 bytes)
Base64 expands all binary — expect ~33% growth
\`\`\`

Test emoji in the [Base64 Encoder](/base64) before assuming your mobile client matches your server.

## Round-trip checklist

1. **Encode:** string → UTF-8 bytes → Base64
2. **Decode:** Base64 → bytes → UTF-8 string
3. Compare original and decoded strings character-for-character
4. Watch for trailing \`=\` padding differences (some APIs strip padding)

\`\`\`javascript
function decodeBase64Utf8(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
\`\`\`

## API and JSON pitfalls

| Pitfall | Symptom |
|---------|---------|
| Server UTF-8, client Latin-1 | Mojibake (\`Ã©\` instead of \`é\`) |
| Line breaks in Base64 fields | Decode failures — strip whitespace |
| URL-safe vs standard alphabet | \`+\`/\`/\` vs \`-\`/\`_\` mismatch |
| Double encoding | Decode once still looks like Base64 |

\`\`\`json
{
  "fileName": "report.pdf",
  "contentBase64": "JVBERi0xLjQK..."
}
\`\`\`

Document charset (\`utf-8\`) in your OpenAPI schema for string fields that are decoded after Base64.

## Common mistakes

- Calling \`btoa\` directly on Unicode text
- Assuming \`atob\` output is a UTF-8 string (it is a binary string)
- Mixing Base64URL decode rules with standard Base64 fields
- Treating encoded blobs as hashed or encrypted
- Logging decoded payloads containing secrets

## How to use ByteToolBox Base64 tool safely

1. Open [Base64 Encoder & Decoder](/base64)
2. Paste Unicode text including emoji and accented characters
3. Encode, then decode — confirm round-trip equality
4. Compare with server output byte-for-byte
5. Do not paste production secrets or live JWTs into any online tool unless you trust the environment — ByteToolBox runs locally, but treat credentials carefully

## Related tools

- [Base64 Encoder & Decoder](/base64) — Unicode-safe encode/decode in browser
- [JSON Formatter](/json-formatter) — inspect JSON that wraps Base64 fields

## Try Base64 Encoder/Decoder

Verify your UTF-8 round-trip with the [Base64 tool](/base64) before debugging production encoding mismatches.
`;
