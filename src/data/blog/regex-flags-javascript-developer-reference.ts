export const content = `Regex **flags** change how a pattern matches — the same pattern with different flags can pass or fail on identical input. Use the [Regex Tester](/regex) to toggle flags and see matches update in real time.

## What regex flags do

Flags are modifiers appended after the closing \`/\` in JavaScript literal syntax, or passed as the second argument to \`new RegExp(pattern, flags)\`.

\`\`\`javascript
/pattern/flags
//     ^^^^^ gimsuvy in JavaScript
\`\`\`

Without the right flags, valid patterns look broken — especially for multiline logs, case-insensitive validation, and Unicode property escapes.

## The g flag (global)

**Global** — find all matches, not just the first.

\`\`\`javascript
const text = 'id-1 id-2 id-3';
text.match(/id-\\d/);      // ['id-1'] — first only
text.match(/id-\\d/g);     // ['id-1', 'id-2', 'id-3']
\`\`\`

**Pitfall:** \`String.prototype.match\` with \`g\` returns an array of matches without capture groups. Use \`matchAll\` when you need groups from every match.

\`\`\`javascript
[...text.matchAll(/id-(\\d)/g)].map((m) => m[1]); // ['1', '2', '3']
\`\`\`

## The i flag (ignore case)

**Case insensitive** matching.

\`\`\`javascript
/ERROR/i.test('error line 42'); // true
\`\`\`

Use for user-facing validation (emails, slugs) where case should not matter. Do **not** rely on \`i\` alone for security filters — normalize input separately when needed.

## The m flag (multiline)

**Multiline** — \`^\` and \`$\` match line boundaries, not only string start/end.

\`\`\`javascript
const log = 'OK first\\nERROR second\\nOK third';
log.match(/^ERROR/m); // matches 'ERROR' at line start
\`\`\`

Essential for parsing stack traces, config files, and linter output line by line.

## The s flag (dotall)

**Dotall** — \`.\` matches newline characters (\\n, \\r).

\`\`\`javascript
const block = 'start\\nmiddle\\nend';
/start.*end/s.test(block); // true — dot crosses newlines
\`\`\`

Without \`s\`, \`.\` stops at the first newline. Combine with \`m\` carefully when anchoring lines vs blocks.

## The u flag (unicode)

**Unicode** — enables \`\\u{...}\` code points and Unicode property escapes \`\\p{...}\`.

\`\`\`javascript
/\\p{Script=Greek}/u.test('δ'); // true
\`\`\`

Required for emoji, combining marks, and non-Latin scripts. Without \`u\`, surrogate pairs and properties behave incorrectly.

## The y flag (sticky)

**Sticky** — match only at \`lastIndex\` (advanced tokenizer use).

\`\`\`javascript
const re = /\\w+/y;
re.lastIndex = 0;
re.exec('abc def'); // ['abc'] — stops at space, lastIndex = 3
\`\`\`

Rare in application code; useful for manual parsers. Misuse causes silent non-matches when \`lastIndex\` is wrong.

## Flag combinations that matter in practice

| Task | Typical flags |
|------|----------------|
| Extract all emails in a blob | \`gi\` |
| Validate entire string is lowercase slug | anchor + \`i\` optional |
| Parse multiline log levels | \`m\` |
| Match JSON-like block across lines | \`s\` (with caution) |
| Match international names | \`u\` |
| Replace all occurrences | \`g\` with \`replaceAll\` or \`g\` + \`replace\` |

\`\`\`javascript
// Validate full string (not substring) — use anchors
/^[a-z0-9-]+$/.test(userSlug);
\`\`\`

## Common flag mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Forgot \`g\` in replace | Only first match replaced | Add \`g\` or use \`replaceAll\` |
| Forgot \`m\` on multiline input | \`^\` only matches file start | Add \`m\` |
| Forgot \`u\` for emoji | Surrogate half-matches | Add \`u\` |
| Greedy \`.*\` without \`s\` | Stops at first newline | Add \`s\` or use [\\s\\S] |
| \`g\` + \`test()\` in a loop | Alternating true/false | Reset \`lastIndex\` or avoid \`g\` with \`test\` |

\`\`\`javascript
const re = /foo/g;
re.test('foo'); // true — lastIndex advanced
re.test('foo'); // false — starts mid-string
re.lastIndex = 0; // reset when reusing global regex
\`\`\`

## How to use ByteToolBox Regex Tester

1. Open [Regex Tester](/regex)
2. Enter pattern and test string
3. Toggle **g**, **i**, **m** (and others your engine supports)
4. Inspect match list, groups, and highlights
5. Copy the working pattern into your codebase

Test edge cases: empty string, Unicode emoji, Windows \\r\\n newlines.

See also: [Mastering Regular Expressions](/blog/mastering-regular-expressions-guide) for pattern syntax depth.

## Related tools

- [Regex Tester](/regex) — live flag toggling and match inspection
- [JSON Formatter](/json-formatter) — validate JSON extracted by regex before parsing

## Try Regex Tester

Debug your next validation regex with flags enabled in the [Regex Tester](/regex).
`;
