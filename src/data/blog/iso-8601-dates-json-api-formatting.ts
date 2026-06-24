export const content = `API bugs from date strings are painfully common: missing timezone, ambiguous local times, and mixed precision across services. **ISO 8601** is the standard format most JSON APIs should use for instants — and the [Timestamp Converter](/timestamp) helps verify conversions when debugging payloads.

## What ISO 8601 looks like in JSON

Common instant formats:

\`\`\`json
{
  "createdAt": "2026-06-24T14:30:00Z",
  "updatedAt": "2026-06-24T14:30:00.123Z",
  "scheduledFor": "2026-06-24T09:00:00-05:00"
}
\`\`\`

| Part | Meaning |
|------|---------|
| \`T\` | Separates date and time |
| \`Z\` | UTC (Zulu) — zero offset |
| \`-05:00\` | Explicit offset from UTC |
| \`.123\` | Fractional seconds (milliseconds) |

**Avoid** ambiguous local strings without offset: \`"2026-06-24 14:30:00"\` — parsers may assume server local time.

## ISO 8601 vs Unix timestamps in APIs

| | ISO 8601 string | Unix timestamp |
|---|-----------------|----------------|
| Human readable | Yes | No (integer) |
| Timezone explicit | Yes (with Z or offset) | Always UTC instant |
| Sorting as string | Works if same precision + UTC Z | Natural numeric sort |
| JSON size | Larger | Smaller |
| JS parsing | \`new Date(iso)\` | \`new Date(ms)\` — watch seconds vs ms |

Many APIs expose **both** for convenience. Document which field is canonical.

## Rules that prevent bugs

### 1. Store UTC; show local only in UI

\`\`\`javascript
// API response (UTC)
const createdAt = '2026-06-24T18:30:00Z';

// Display in user locale
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Chicago',
}).format(new Date(createdAt));
\`\`\`

### 2. Always include offset or Z

\`\`\`text
Good: 2026-06-24T14:30:00Z
Good: 2026-06-24T14:30:00+00:00
Risky: 2026-06-24T14:30:00        (no zone — parser-dependent)
\`\`\`

### 3. Pick one fractional precision

Mixing \`2026-06-24T14:30:00Z\` and \`2026-06-24T14:30:00.123Z\` in the same API is fine if documented. Comparisons and equality tests break when clients strip milliseconds inconsistently.

### 4. Do not confuse date-only with instant

\`\`\`json
{ "birthDate": "1990-05-15" }
\`\`\`

Date-only values are **calendar dates**, not moments in time. Do not convert them through timezone offsets for "midnight UTC" unless that is an explicit business rule.

### 5. Seconds vs milliseconds in Unix fields

If you also expose \`createdAtUnix\`, state whether it is **seconds** or **milliseconds**. Mixing them is a top-10 API bug.

Use the [Timestamp Converter](/timestamp) to check a suspicious value both ways.

## JavaScript parsing examples

\`\`\`javascript
// ISO instant
const d1 = new Date('2026-06-24T14:30:00Z');

// With offset
const d2 = new Date('2026-06-24T09:30:00-05:00'); // same instant as d1

// Serialize back to ISO (UTC)
d1.toISOString(); // '2026-06-24T14:30:00.000Z'
\`\`\`

\`\`\`javascript
// WRONG: parsing date-only as UTC midnight for all users
new Date('1990-05-15').toISOString(); // previous-day evening in US timezones
\`\`\`

## Common ISO 8601 mistakes in APIs

| Mistake | Consequence |
|---------|-------------|
| Omitting \`Z\` or offset | Off-by-hours bugs across regions |
| Sending local time without offset | Double timezone conversion |
| Using \`MM/DD/YYYY\` in JSON | Locale-dependent, not ISO |
| Storing strings in non-UTC DB columns | DST and migration pain |
| 10-digit Unix in a field documented as ms | Dates in 1970 |

## How to use ByteToolBox Timestamp Converter

1. Open [Timestamp Converter](/timestamp)
2. Paste an ISO 8601 string or Unix value from your API payload
3. Confirm the human-readable instant matches expectations
4. Toggle seconds vs milliseconds when debugging legacy fields

Pair with [Unix Timestamp Cheat Sheet](/blog/unix-timestamp-to-date-developer-cheat-sheet) for epoch conversion details.

## Related tools

- [Timestamp Converter](/timestamp) — ISO ↔ Unix debugging
- [JSON Formatter](/json-formatter) — validate and inspect date fields in API JSON

## Try Timestamp Converter

Paste a confusing API timestamp into the [Timestamp Converter](/timestamp) before you ship the fix.
`;
