export const content = `**UUID v4** identifiers are random 128-bit values formatted as \`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\`. They are a practical choice when you need opaque, globally unique IDs without a central allocator — API request IDs, public resource IDs, test fixtures, and database primary keys in distributed systems.

The ByteToolBox [UUID Generator](/uuid) creates **UUID v4 only** (random). It does not generate UUID v7 or other versions.

## What is UUID v4?

UUID v4 fills most bits with cryptographically strong random data. The **version nibble** is \`4\`; the **variant** bits follow the RFC 4122 rules.

\`\`\`text
550e8400-e29b-41d4-a716-446655440000
         ^    ^
         |    variant nibble (8, 9, a, or b in hex)
         version 4
\`\`\`

In browsers, ByteToolBox uses \`crypto.getRandomValues()\` for randomness — the same primitive you should prefer over \`Math.random()\` for identifiers.

## When UUID v4 is useful

| Use case | Why v4 fits |
|----------|-------------|
| **API request / correlation IDs** | Opaque, no sequential leakage, safe to log |
| **Public resource IDs** | Harder to enumerate than \`/users/42\` |
| **Test data and fixtures** | Generate bulk IDs without collisions in practice |
| **Database keys (distributed)** | No single ID server required |
| **Client-generated IDs** | Mobile/offline clients can create IDs before sync |

UUID v4 is weaker when you need **time-ordered** inserts for index locality — see UUID v7 below.

## UUID v4 vs sequential IDs

| | UUID v4 | Auto-increment integer |
|---|---------|------------------------|
| Uniqueness scope | Global (practically) | Per table / database |
| Enumeration risk | Low (opaque) | High (\`/users/1\`, \`/users/2\`) |
| Index locality | Random → more index fragmentation | Sequential → friendly to B-trees |
| Storage size | 16 bytes (or 36 chars as string) | Often 4–8 bytes |
| Coordination | None required | Requires central sequence |

Read [UUID vs Auto-Increment Primary Keys](/blog/uuid-vs-auto-increment-primary-keys) for a deeper schema comparison.

## API request IDs, public IDs, test data, and database keys

### API request IDs

Attach a UUID v4 to each inbound request for log correlation:

\`\`\`http
X-Request-Id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
\`\`\`

Log the same value in workers and downstream calls. Avoid exposing internal sequential IDs in public error messages.

### Public IDs

Expose UUIDs in URLs instead of sequential keys:

\`\`\`text
GET /api/invoices/7c9e6679-7425-40de-944b-e07fc1f90ae7
\`\`\`

Clients cannot scrape \`/invoices/1\`, \`/invoices/2\` trivially. You still need authorization — obscurity is not security.

### Test data

Generate batches for load tests:

1. Open [UUID Generator](/uuid)
2. Set quantity (e.g. 100)
3. Copy or download the list
4. Seed fixtures or CSV imports

### Database primary keys

UUID v4 works as a primary key when you accept:

- Larger keys than \`BIGINT\`
- Random insert patterns (plan indexes accordingly — clustered PKs on UUID v4 can fragment)
- String UUID columns vs binary \`UUID\` / \`BYTEA\` storage tradeoffs

Some teams use UUID v4 as primary key but time-ordered **secondary** indexes for listing queries.

## Collision risk explained simply

UUID v4 has 122 random bits (after version/variant). Collision probability is astronomically low for application-scale generation — you will run out of infrastructure problems long before collisions become realistic.

For pedantic completeness: the birthday paradox applies in theory at huge scale, but v4 is standard for billions of IDs across industry systems.

**Do not** reuse UUIDs from untrusted external input without validation — parse format and enforce uniqueness constraints in the database anyway.

## How to use ByteToolBox UUID Generator

1. Open [UUID Generator](/uuid)
2. Choose quantity (1–1000)
3. Toggle **uppercase** or **remove hyphens** if your stack expects a specific format
4. **Generate**, then copy one ID or download the full list

Generation is local — IDs are not sent to a server.

\`\`\`text
Example output (v4):
f47ac10b-58cc-4372-a567-0e02b2c3d479
\`\`\`

## Common UUID mistakes

| Mistake | Better approach |
|---------|-----------------|
| Using \`Math.random()\` for security-sensitive IDs | Use \`crypto.randomUUID()\` or ByteToolBox |
| Storing UUID strings when DB has native UUID type | Store binary/native UUID — smaller indexes |
| Assuming UUID in URL implies authorization | Always check permissions server-side |
| Expecting v7 time-ordering from this tool | ByteToolBox generates **v4 only**; use a v7 library if you need sortable IDs |
| Omitting uniqueness constraint "because UUID" | Still add PRIMARY KEY / UNIQUE in schema |

### UUID v4 vs UUID v7 (not supported in this tool)

**UUID v7** embeds a Unix timestamp in the high bits, giving roughly time-ordered values — better for database insert locality. ByteToolBox does **not** generate v7 today. If you need ordered IDs, evaluate v7 libraries server-side or consider ULID/Snowflake patterns.

## Related tools

- [UUID Generator](/uuid) — bulk v4 generation with formatting options
- [JSON Formatter](/json-formatter) — validate API payloads that include UUID fields

## Try UUID Generator

Generate UUID v4 values for your next API schema or fixture file with the [UUID Generator](/uuid).
`;
