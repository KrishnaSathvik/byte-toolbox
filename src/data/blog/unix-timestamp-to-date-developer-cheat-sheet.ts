export const content = `## What is a Unix timestamp?

A **Unix timestamp** (also called **epoch time**) counts the number of time units since **1970-01-01 00:00:00 UTC** — the Unix epoch. In most APIs and databases you will see either:

- **Seconds** — \`1705312200\` (10 digits, common in Linux, PostgreSQL, many REST APIs)
- **Milliseconds** — \`1705312200000\` (13 digits, common in JavaScript \`Date.now()\`)

Always confirm which unit a system uses before converting. A value that looks like a valid seconds timestamp can decode to a nonsense date if it was actually milliseconds (or vice versa).

## Seconds vs milliseconds

| Unit | Example | Typical sources |
|------|---------|-----------------|
| Seconds | \`1705312200\` | Unix CLI, Python \`time.time()\`, many backend APIs |
| Milliseconds | \`1705312200000\` | JavaScript \`Date.now()\`, some mobile SDKs, Elasticsearch |

\`\`\`javascript
const seconds = 1705312200;
const fromSeconds = new Date(seconds * 1000);

const millis = 1705312200000;
const fromMillis = new Date(millis);

console.log(fromSeconds.toISOString()); // 2024-01-15T10:30:00.000Z
console.log(fromMillis.toISOString()); // same instant when units match
\`\`\`

**Rule of thumb:** 10 digits → seconds; 13 digits → milliseconds.

## How to convert Unix timestamp to date

### JavaScript

\`\`\`javascript
function timestampToDate(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error('Invalid timestamp');

  // Auto-detect seconds vs milliseconds
  const ms = n < 1e12 ? n * 1000 : n;
  return new Date(ms);
}

timestampToDate(1705312200).toISOString();
// "2024-01-15T10:30:00.000Z"
\`\`\`

### Python

\`\`\`python
from datetime import datetime, timezone

ts_seconds = 1705312200
dt = datetime.fromtimestamp(ts_seconds, tz=timezone.utc)
print(dt.isoformat())  # 2024-01-15T10:30:00+00:00
\`\`\`

Use the [Timestamp Converter](/timestamp) to verify conversions interactively without writing code.

## How to convert date to Unix timestamp

### JavaScript

\`\`\`javascript
const date = new Date('2024-01-15T10:30:00Z');
const seconds = Math.floor(date.getTime() / 1000);
const millis = date.getTime();

console.log(seconds); // 1705312200
console.log(millis);  // 1705312200000
\`\`\`

### ISO string to timestamp (API payload)

\`\`\`javascript
const apiPayload = {
  event: 'user_signup',
  occurred_at: Math.floor(new Date('2024-01-15T10:30:00Z').getTime() / 1000),
};
\`\`\`

## UTC vs local time

Unix timestamps are **always UTC-based**. They do not store a time zone. When you display a timestamp:

- **Store and transmit in UTC** (ISO 8601 with \`Z\` or explicit offset)
- **Convert to local time only in the UI** for the user's locale

\`\`\`javascript
const d = new Date(1705312200 * 1000);

// UTC (safe for logs and APIs)
console.log(d.toISOString());

// User's local timezone (display only)
console.log(d.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
\`\`\`

## JavaScript examples

### Current Unix time

\`\`\`javascript
const nowSeconds = Math.floor(Date.now() / 1000);
const nowMillis = Date.now();
\`\`\`

### Parse API response safely

\`\`\`javascript
function parseApiTimestamp(field) {
  if (typeof field === 'string' && field.includes('T')) {
    return new Date(field); // ISO 8601 string
  }
  const n = Number(field);
  return new Date(n < 1e12 ? n * 1000 : n);
}
\`\`\`

### Compare two events

\`\`\`javascript
const a = 1705312200;
const b = 1705312300;
const diffSeconds = b - a; // 100 seconds between events
\`\`\`

## API and log examples

### REST API JSON

\`\`\`json
{
  "order_id": "ord_123",
  "created_at": 1705312200,
  "updated_at": "2024-01-15T10:35:00Z"
}
\`\`\`

**Best practice:** Pick one format per field and document it. Mixing raw Unix seconds and ISO strings in the same API confuses clients.

### Log line parsing

\`\`\`text
2024-01-15T10:30:00.123Z INFO request_id=abc duration_ms=42
\`\`\`

If your log aggregator stores \`@timestamp\` as epoch millis, grep for the wrong unit and events appear hours or years off.

### Database query (PostgreSQL)

\`\`\`sql
SELECT to_timestamp(1705312200) AT TIME ZONE 'UTC';
-- 2024-01-15 10:30:00
\`\`\`

## Common timestamp mistakes

1. **Treating milliseconds as seconds** — dates in 1970 or far future
2. **Using local time in APIs** — daylight saving bugs and ambiguous instants
3. **Storing display strings without timezone** — \`"01/15/2024 10:30"\` is ambiguous
4. **Comparing strings instead of instants** — sort order breaks
5. **Ignoring leap seconds** — rare but relevant for financial/telemetry systems
6. **Using \`new Date("2024-01-15")\`** — parsed as UTC midnight in ES5, local in some engines; prefer ISO with \`Z\`

## Best practices for APIs and distributed systems

1. **Store UTC** — Unix seconds or ISO 8601 with offset
2. **Document the unit** — seconds vs milliseconds in OpenAPI/schema
3. **Use ISO 8601 in JSON** when human readability matters; use integers when sorting/range queries dominate
4. **Never rely on client clock** for ordering — use server-generated timestamps
5. **Include time zone in user preferences** — convert at display time only
6. **Validate ranges** — reject timestamps before epoch or unreasonably far in the future

For deeper distributed-systems patterns (clock skew, NTP, logical clocks), see [Timestamp Management in Distributed Systems](/blog/timestamp-management-distributed-systems).`;
