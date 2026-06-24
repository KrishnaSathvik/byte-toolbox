export const content = `Choosing between SHA-256 and SHA-512 is a common question when generating checksums, cache keys, or artifact digests. Use the [Hash Generator](/hash) to compare outputs side by side — processing stays in your browser.

## What is a hash?

A **cryptographic hash function** maps input of any size to a fixed-length **digest**. Good hash functions are:

- **Deterministic** — same input → same digest
- **Fast to compute** (for checksum use cases)
- **Collision-resistant** — hard to find two inputs with the same digest

Hashes are **one-way** for practical purposes: you cannot recover the original input from the digest alone.

## SHA-256 vs SHA-512 at a glance

| | SHA-256 | SHA-512 |
|---|---------|---------|
| Output size | 256 bits (64 hex chars) | 512 bits (128 hex chars) |
| Block size | 512 bits | 1024 bits |
| Typical speed | Faster on 32-bit / general CPUs | Often faster on 64-bit CPUs |
| Common uses | Git objects, TLS, package checksums, blockchain | Linux integrity, some HSM policies, long-term archives |
| Security margin | Strong for checksums | Strong; larger digest |

Both are from the SHA-2 family and are widely trusted for **integrity checking** today. Neither is appropriate for **password storage** on its own.

## When to use SHA-256

Choose SHA-256 when:

- Interoperating with tools that expect 64-character hex digests (Docker layers, npm integrity, many CI caches)
- Digest size matters (indexes, URLs, database keys)
- Specs or regulators name SHA-256 explicitly

\`\`\`bash
# Example: checksum a deploy artifact (conceptual)
sha256sum release-v2.4.1.tar.gz
# a3f2...64 hex chars
\`\`\`

\`\`\`javascript
// Web Crypto API (browser or Node)
const data = new TextEncoder().encode('release manifest v2');
const digest = await crypto.subtle.digest('SHA-256', data);
const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
\`\`\`

Paste the same string into the [Hash Generator](/hash) to verify your implementation matches.

## When to use SHA-512

Choose SHA-512 when:

- Policy or compliance asks for a longer digest
- You want extra margin against future collision research (rare for app-level checksums)
- You're hashing very large files on 64-bit hardware where SHA-512 implementations are optimized

\`\`\`javascript
const digest = await crypto.subtle.digest('SHA-512', data);
// 128 hex characters
\`\`\`

SHA-512 is **not** automatically "more secure" for every workload — for most developer checksum tasks, SHA-256 is the default interoperable choice.

## Where MD5 and SHA-1 fit today

| Algorithm | Password hashing | File checksum | Legacy systems |
|-----------|------------------|---------------|----------------|
| MD5 | **Never** | Discouraged; collision attacks exist | Old npm/cache keys |
| SHA-1 | **Never** | **Deprecated** for security-sensitive integrity | Git (with mitigations), old TLS |
| SHA-256 / SHA-512 | **Never alone** | **Recommended** | Modern systems |

MD5 and SHA-1 are still available in the [Hash Generator](/hash) for **debugging legacy data** — comparing an old MD5 to confirm you have the right file, for example — not for new security designs.

Read [Why MD5 and SHA-1 Are No Longer Secure for Password Hashing](/blog/md5-sha1-password-hashing-security) for password-specific guidance.

## Hashing vs encryption

| | Hashing | Encryption |
|---|---------|------------|
| Reversible? | No (one-way) | Yes (with key) |
| Purpose | Integrity, fingerprinting | Confidentiality |
| Same input | Always same digest (no salt) | Different ciphertext with random IV |

Do not "encrypt" passwords with SHA-256. Use **bcrypt**, **Argon2**, or **scrypt** with per-user salts.

## How to use ByteToolBox Hash Generator

1. Open [Hash Generator](/hash)
2. Enter text or upload a file
3. Select **SHA-256** or **SHA-512** (or compare with MD5/SHA-1 for legacy checks)
4. Copy the digest for your manifest, ticket, or CI log

Processing runs locally — file contents are not sent to a server for hashing.

## Example: generate a SHA-256 checksum

**Input string:**

\`\`\`text
{"version":"1.2.0","build":4512}
\`\`\`

**Workflow:**

1. Hash with SHA-256 in the tool
2. Store digest in \`checksums.txt\` or your release manifest
3. On deploy, re-hash and compare — mismatch means tampering or wrong artifact

\`\`\`javascript
async function verifyManifest(content, expectedSha256) {
  const buf = new TextEncoder().encode(content);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  const hex = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === expectedSha256.toLowerCase();
}
\`\`\`

## Common hashing mistakes

1. **Using MD5 for new integrity guarantees** — use SHA-256 minimum
2. **Using SHA-256 for passwords** — use Argon2/bcrypt
3. **Comparing digests case-sensitively without normalizing** — standardize lowercase hex
4. **Hashing before canonicalization** — JSON key order changes the digest
5. **Assuming hash proves authenticity** — without a secret key, use HMAC or signatures

## Best practices for file integrity and security

**File integrity / release artifacts:**

- Prefer **SHA-256** unless policy requires SHA-512
- Publish digests alongside downloads
- Canonicalize text (UTF-8, normalized line endings) before hashing config

**Passwords / credentials:**

- Never MD5, SHA-1, or plain SHA-256
- Use adaptive algorithms (Argon2id, bcrypt cost 12+)

**API authentication:**

- Use HMAC-SHA256 with a secret key, not a bare hash of the body

For password migration patterns, see the [MD5 and SHA-1 security guide](/blog/md5-sha1-password-hashing-security).`;
