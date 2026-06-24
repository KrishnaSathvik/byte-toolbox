export const content = `Invalid JSON breaks builds, API clients, and config deploys. The fastest workflow is: paste into the [JSON Formatter](/json-formatter), read the line/column error, fix the syntax issue, and validate again — all locally in your browser.

## What makes JSON invalid?

JSON (RFC 8259) is stricter than JavaScript object literals. Common violations:

| Problem | Invalid example | Why it fails |
|---------|-----------------|--------------|
| Trailing comma | \`{"a": 1,}\` | No trailing commas after last property |
| Unquoted keys | \`{name: "x"}\` | Keys must be double-quoted strings |
| Single quotes | \`{'a': 1}\` | Strings must use \`"\` |
| Comments | \`// note\\n{"a":1}\` | JSON has no comment syntax |
| Trailing decimal | \`{"n": 1.}\` | Malformed number |
| Mismatched brackets | \`{"a": [1,2}}\` | \`[\` closed with \`}\` |

## How to use ByteToolBox JSON Formatter to find errors

1. Open the [JSON Formatter](/json-formatter)
2. Paste your payload into the editor
3. Click **Validate** (or format) — the tool reports parse errors with position hints
4. Fix one issue at a time; a single missing quote often causes cascading errors
5. **Format** once valid to confirm structure and indentation

ByteToolBox processes JSON in your browser — your payload is not uploaded to a server for formatting.

## Example 1: trailing commas

**Invalid:**

\`\`\`json
{
  "users": [
    {"id": 1, "name": "Ada"},
    {"id": 2, "name": "Lin"},
  ]
}
\`\`\`

**Fixed:**

\`\`\`json
{
  "users": [
    {"id": 1, "name": "Ada"},
    {"id": 2, "name": "Lin"}
  ]
}
\`\`\`

Remove the comma after the last array element and the last object property.

## Example 2: missing quotes around keys

**Invalid:**

\`\`\`json
{
  userId: 42,
  active: true
}
\`\`\`

**Fixed:**

\`\`\`json
{
  "userId": 42,
  "active": true
}
\`\`\`

## Example 3: bad string escaping

**Invalid:**

\`\`\`json
{
  "path": "C:\\Users\\dev\\config.json"
}
\`\`\`

In JSON, backslashes must be escaped: \`\\\\\`.

**Fixed:**

\`\`\`json
{
  "path": "C:\\\\Users\\\\dev\\\\config.json"
}
\`\`\`

**Invalid newline in string:**

\`\`\`json
{
  "message": "line one
line two"
}
\`\`\`

**Fixed** (use \\n or split fields):

\`\`\`json
{
  "message": "line one\\nline two"
}
\`\`\`

## Example 4: comments inside JSON

**Invalid** (JSONC / editor-style):

\`\`\`json
{
  // production API URL
  "baseUrl": "https://api.example.com"
}
\`\`\`

JSON parsers reject \`//\` and \`/* */\`. Strip comments or use a JSONC-aware tool for config files, then export strict JSON for APIs.

**Fixed:**

\`\`\`json
{
  "baseUrl": "https://api.example.com"
}
\`\`\`

## Example 5: mismatched brackets

**Invalid:**

\`\`\`json
{
  "items": [
    {"sku": "A1", "qty": 3}
  }
}
\`\`\`

The \`items\` array opened with \`[\` but closed with \`}\`.

**Fixed:**

\`\`\`json
{
  "items": [
    {"sku": "A1", "qty": 3}
  ]
}
\`\`\`

**Tip:** In the formatter, collapse brackets mentally or use format-after-fix to visualize nesting.

## Format vs validate vs minify

| Action | Purpose |
|--------|---------|
| **Validate** | Confirm parseable JSON; surface first syntax error |
| **Format / beautify** | Add indentation for readability after valid parse |
| **Minify** | Remove whitespace for smaller wire size |

Always **validate before minify**. Minifying invalid text does not produce valid JSON.

## Common JSON debugging mistakes

1. **Assuming JSON.parse errors mean bad data** — sometimes it's a BOM or smart quotes from copy/paste
2. **Using eval or JS object syntax** — \`undefined\`, functions, and \`NaN\` are not JSON
3. **Fixing multiple errors at once** — fix the first reported error, re-validate
4. **Ignoring encoding** — UTF-8 with BOM can break the first token
5. **Shipping config with comments** — runtime JSON.parse will fail in production

## Best practices for API payloads

1. Validate JSON in CI with \`JSON.parse\` or schema tools
2. Use [JSON Schema](/blog/json-best-practices-api-development) for contracts
3. Reject unknown fields explicitly in strict APIs
4. Log the **raw body** (redacted) when parse fails — not just "invalid JSON"
5. Return \`400\` with a clear error message and optional \`position\` if your parser provides it

See also [JSON Best Practices for API Development](/blog/json-best-practices-api-development) and [Optimizing JSON Performance](/blog/json-performance-large-applications).`;
