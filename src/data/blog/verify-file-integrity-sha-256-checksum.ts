export const content = `Release pages, package mirrors, and CI logs often publish a **SHA-256 checksum** next to a download link. Comparing your local file hash to the published value confirms the bytes match — useful for catching truncated downloads, corrupted transfers, or wrong artifacts. It does **not** prove the file is malware-free, and it is **not** a substitute for password hashing.

Use the [Hash Generator](/hash) to compute SHA-256 digests for text and files in your browser.

## What is a checksum?

A **checksum** (in this context) is a fixed-size digest produced by a hash function over file contents. If even one byte changes, the digest should change unpredictably.

\`\`\`text
file.bin  →  SHA-256  →  a3f2e1... (64 hex characters)
\`\`\`

Checksums answer: **"Did this file change?"** They do not answer: **"Who published this file?"** or **"Is this file safe to run?"**

## Why SHA-256 is commonly used for file integrity

SHA-256 is part of the SHA-2 family and is widely supported:

- \`sha256sum\` on Linux and macOS
- Git object IDs (with additional git formatting)
- Container image layer digests
- npm package integrity fields
- GitHub/GitLab release asset checksums

It produces a **256-bit (64 hex character)** digest — compact enough for manifests, strong enough for accidental corruption detection.

## How file integrity verification works

1. Publisher computes SHA-256 over the **exact release bytes**
2. Publisher publishes the hex digest alongside the download
3. You download the file over HTTPS (transport security)
4. You compute SHA-256 locally on the saved file
5. You compare your digest to the published value **character for character** (hex is case-insensitive)

If they match, the file you have is **byte-identical** to what was hashed — assuming the published checksum itself was trustworthy.

### Integrity vs authenticity

| Concept | What it proves |
|---------|----------------|
| **Integrity (checksum)** | File matches a known digest |
| **Authenticity (signatures)** | File was signed by a holder of a private key |

A checksum on a compromised website could be swapped along with the file. For high-assurance distribution, combine HTTPS, signed releases (GPG, Sigstore, npm provenance), and checksums.

## Example: compare a downloaded file checksum

**Published manifest:**

\`\`\`text
release-v2.4.1.tar.gz
SHA-256: 8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac8b3298f762301d
\`\`\`

**Terminal (Linux/macOS):**

\`\`\`bash
sha256sum release-v2.4.1.tar.gz
# Compare output to manifest (ignore case)
\`\`\`

**Windows PowerShell:**

\`\`\`powershell
Get-FileHash release-v2.4.1.tar.gz -Algorithm SHA256
\`\`\`

**Browser workflow:**

1. Download \`release-v2.4.1.tar.gz\`
2. Open [Hash Generator](/hash)
3. Upload the file (or drag-and-drop)
4. Select **SHA-256**
5. Compare the 64-character hex output to the manifest

## How to use ByteToolBox Hash Generator

1. Go to [Hash Generator](/hash)
2. Choose **text** for small strings or **file upload** for binaries/archives
3. Select **SHA-256** (default recommendation for new checksums)
4. Copy the digest into your ticket, CI log, or comparison notes

Hashing runs **locally** — file bytes are not uploaded to ByteToolBox servers.

## SHA-256 vs MD5 for checksums

| Algorithm | Status for new checksums | Notes |
|-----------|--------------------------|-------|
| **SHA-256** | Recommended | Expected by modern tooling |
| **MD5** | Legacy only | Collision attacks exist — do not use for security-sensitive integrity |
| **SHA-1** | Deprecated | Similar legacy status |

MD5 may still appear on older mirrors. You can compare MD5 in the [Hash Generator](/hash) when **verifying legacy artifacts**, but publish SHA-256 for new releases.

Read [SHA-256 vs SHA-512: Which Hash Should You Use?](/blog/sha-256-vs-sha-512-which-hash-should-you-use) for algorithm choice details.

## What checksums can and cannot prove

**Can:**

- Detect accidental corruption (bad download, disk error, wrong file copied)
- Confirm two copies are identical
- Support reproducible build comparisons

**Cannot:**

- Guarantee a file is free of malware
- Replace code signing or package signature verification
- Secure passwords (use Argon2, bcrypt, or scrypt instead)
- Prove publisher identity without a trusted signing chain

## Common verification mistakes

| Mistake | Fix |
|---------|-----|
| Comparing hashes of different file versions | Hash the exact published filename and version |
| Extra whitespace in copied hex | Trim spaces and newlines before compare |
| Hashing before download completes | Wait for download to finish; verify file size |
| Using MD5 for new security-sensitive releases | Publish SHA-256 |
| Assuming match means "safe to execute" | Treat checksum as integrity only |
| Using SHA-256 for password storage | Use adaptive password hashes with salts |

## Related tools

- [Hash Generator](/hash) — SHA-256, SHA-512, and legacy algorithms for comparison
- [Base64 Encoder](/base64) — encode manifest snippets for tickets or JSON payloads

## Try Hash Generator

Compute a SHA-256 digest now with the [Hash Generator](/hash) — paste release metadata or upload a file to verify integrity before deploy.
`;
