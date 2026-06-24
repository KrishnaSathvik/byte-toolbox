export const content = `If you have ever pasted a JWT into jwt.io and wondered why the middle segment uses \`-\` and \`_\` instead of \`+\` and \`/\`, you are looking at **Base64URL** — a URL-safe variant of Base64. It is **encoding**, not encryption. Anyone can decode the header and payload; verifying the signature is a separate step.

Use the [Base64 Encoder & Decoder](/base64) to encode, decode, and compare standard Base64 output locally in your browser.

## What is Base64URL?

**Base64URL** (also called Base64 URL-safe) is a variant defined in [RFC 4648](https://www.rfc-editor.org/rfc/rfc4648#section-5). It maps binary data to ASCII using the same 64-character alphabet as Base64, but substitutes:

| Standard Base64 | Base64URL |
|-----------------|-----------|
| \`+\` | \`-\` |
| \`/\` | \`_\` |
| Padding \`=\` | Often omitted in JWTs |

The goal is to produce strings that survive URLs, query strings, and path segments without extra escaping.

## Base64 vs Base64URL

Both represent the same underlying bytes. The difference is **which characters appear in the output** and **how padding is handled**.

\`\`\`text
Payload bytes: {"alg":"HS256","typ":"JWT"}
Standard Base64:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Base64URL (JWT):   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   (same here — no +/ in this example)

Payload with +/ bytes would differ between encodings.
\`\`\`

**Common mistake:** feeding a JWT segment into a strict standard Base64 decoder without converting \`-\` → \`+\` and \`_\` → \`/\`, and restoring padding.

## Why JWTs use Base64URL

A JWT has three dot-separated parts:

\`\`\`text
header.payload.signature
\`\`\`

Each of the first two parts is JSON bytes encoded with Base64URL (typically **without padding**). The signature is also Base64URL-encoded binary output from the signing algorithm.

JWTs travel in:

- \`Authorization: Bearer ...\` headers
- URL query parameters (\`?token=...\`)
- Cookies and redirect URLs

Standard Base64 \`+\` and \`/\` are awkward in URLs and some cookie parsers. Base64URL avoids that friction.

## Padding and URL-safe characters

Base64 encodes 3 bytes into 4 characters. When input length is not a multiple of 3, \`=\` padding marks how many bytes were implied.

| Remaining bytes | Padding |
|-----------------|---------|
| 0 | none |
| 1 | \`==\` |
| 2 | \`=\` |

JWT libraries often **strip padding** from encoded segments. Decoders must accept unpadded input and infer the correct padding length.

\`\`\`javascript
// Restore padding before decoding (conceptual helper)
function padBase64Url(segment) {
  const pad = segment.length % 4;
  if (pad === 2) return segment + '==';
  if (pad === 3) return segment + '=';
  return segment;
}
\`\`\`

## How JWT header and payload encoding works

1. Build JSON for header (e.g. \`{"alg":"HS256","typ":"JWT"}\`)
2. UTF-8 encode the JSON string to bytes
3. Base64URL-encode bytes (no padding in many implementations)
4. Repeat for payload JSON (claims like \`sub\`, \`exp\`, \`iat\`)
5. Sign \`base64url(header) + "." + base64url(payload)\` with the secret or private key
6. Base64URL-encode the signature bytes

**Decoding the payload shows claims — it does not prove they are trustworthy.** An attacker can craft a JWT with any payload and sign it with *their* key. Your app must verify the signature with the expected issuer key and validate \`exp\`, \`aud\`, and other claims.

## Browser and Node.js examples

### Decode a JWT payload segment (inspection only)

\`\`\`javascript
function base64UrlToUtf8(segment) {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = padBase64Url(base64);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// Example segment (header) — DO NOT trust decoded content without signature verification
const headerJson = base64UrlToUtf8('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
console.log(headerJson); // {"alg":"HS256","typ":"JWT"}
\`\`\`

### Node.js (Buffer)

\`\`\`javascript
function decodeBase64Url(segment) {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  return Buffer.from(base64 + pad, 'base64');
}

const payload = JSON.parse(decodeBase64Url('eyJ...').toString('utf8'));
\`\`\`

For production JWT handling, use a maintained library (\`jose\`, \`jsonwebtoken\`, framework middleware) that verifies signatures — do not ship hand-rolled crypto.

## Common Base64URL mistakes

| Mistake | Why it breaks |
|---------|----------------|
| Treating JWT payload decode as authentication | Anyone can decode; only verified signatures matter |
| Using standard Base64 decoder on JWT segments | \`-\`/\`_\` and missing padding confuse strict parsers |
| Assuming Base64URL hides secrets | Encoding is reversible — never put secrets in JWT payloads |
| Confusing encoding with encryption | No key is required to decode; encryption needs a key |
| Ignoring \`exp\` / \`nbf\` after decode | Valid structure ≠ valid session |
| Copy-pasting tokens into public tools | Tokens may be logged; use local tools like ByteToolBox |

## How to use ByteToolBox Base64 tool safely

1. Open the [Base64 Encoder & Decoder](/base64)
2. Paste **individual JWT segments** (not full secrets) for encoding experiments
3. Compare standard Base64 vs URL-safe output when debugging library mismatches
4. **Never paste production bearer tokens** into third-party websites — ByteToolBox runs locally, but treat tokens as credentials regardless

For full JWT workflows, decode for debugging only after redacting tokens, then verify signatures in your application code.

See also: [Base64 Encoding: When and Why Developers Use It](/blog/base64-encoding-when-and-why) for general encoding use cases.

## Related tools

- [Base64 Encoder & Decoder](/base64) — encode/decode text and files locally
- [JSON Formatter](/json-formatter) — pretty-print decoded JWT header/payload JSON

## Try Base64 Encoder/Decoder

Open the [Base64 tool](/base64) to test round-trips and inspect how padding and character sets affect output — without uploading data to a server.
`;
