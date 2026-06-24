export const content = `Regular expressions are powerful tools for text processing, but they can be intimidating. Test patterns interactively with the [Regex Tester](/regex) as you work through this guide from regex novice to confident practitioner.

## What Are Regular Expressions?

Regular expressions (regex) are patterns used to match character combinations in strings. They're supported in virtually every programming language and are essential for:
- Data validation
- Text parsing and extraction
- Search and replace operations
- Input sanitization
- Log analysis

## Basic Syntax and Metacharacters

### Literal Characters
The simplest regex patterns match literal characters:

\`\`\`javascript
const text = "Hello World";
const pattern = /Hello/;
console.log(pattern.test(text)); // true
\`\`\`

### Character Classes
Match any character from a set:

\`\`\`javascript
// Match any digit
const digitPattern = /[0-9]/;
console.log(digitPattern.test("abc123")); // true

// Match any letter
const letterPattern = /[a-zA-Z]/;
console.log(letterPattern.test("123abc")); // true

// Match vowels
const vowelPattern = /[aeiouAEIOU]/;
console.log(vowelPattern.test("Hello")); // true
\`\`\`

### Quantifiers
Control how many times a pattern can match:

\`\`\`javascript
// * = zero or more
const zeroOrMore = /a*/;
console.log(zeroOrMore.test("")); // true
console.log(zeroOrMore.test("aaa")); // true

// + = one or more
const oneOrMore = /a+/;
console.log(oneOrMore.test("")); // false
console.log(oneOrMore.test("aaa")); // true

// ? = zero or one
const zeroOrOne = /a?/;
console.log(zeroOrOne.test("")); // true
console.log(zeroOrOne.test("a")); // true

// {n} = exactly n times
const exactlyThree = /a{3}/;
console.log(exactlyThree.test("aaa")); // true
console.log(exactlyThree.test("aa")); // false

// {n,m} = between n and m times
const betweenTwoAndFour = /a{2,4}/;
console.log(betweenTwoAndFour.test("aa")); // true
console.log(betweenTwoAndFour.test("aaa")); // true
console.log(betweenTwoAndFour.test("aaaaa")); // false
\`\`\`

## Common Patterns

### Email Validation
\`\`\`javascript
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailPattern.test("user@example.com")); // true
console.log(emailPattern.test("invalid-email")); // false
\`\`\`

### Phone Number
\`\`\`javascript
const phonePattern = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
console.log(phonePattern.test("(555) 123-4567")); // true
console.log(phonePattern.test("555-123-4567")); // true
console.log(phonePattern.test("+1 555 123 4567")); // true
\`\`\`

### URL Validation
\`\`\`javascript
const urlPattern = /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/;
console.log(urlPattern.test("https://www.example.com")); // true
console.log(urlPattern.test("http://example.com/path")); // true
\`\`\`

## Advanced Techniques

### Groups and Capturing
Use parentheses to group patterns and capture matches:

\`\`\`javascript
const text = "John Doe, Jane Smith, Bob Johnson";
const namePattern = /(\\w+)\\s+(\\w+)/g;

let match;
while ((match = namePattern.exec(text)) !== null) {
  console.log(\`First: \$\{match[1]\}, Last: \$\{match[2]\}\`);
}
// Output:
// First: John, Last: Doe
// First: Jane, Last: Smith
// First: Bob, Last: Johnson
\`\`\`

### Non-capturing Groups
Use (?:...) for grouping without capturing:

\`\`\`javascript
const text = "color: red; background: blue;";
const colorPattern = /(?:color|background):\\s*(\\w+)/g;

let match;
while ((match = colorPattern.exec(text)) !== null) {
  console.log(match[1]); // red, blue
}
\`\`\`

### Lookahead and Lookbehind
Match patterns based on what comes before or after:

\`\`\`javascript
// Positive lookahead: match "foo" followed by "bar"
const lookaheadPattern = /foo(?=bar)/;
console.log(lookaheadPattern.test("foobar")); // true
console.log(lookaheadPattern.test("foobaz")); // false

// Negative lookahead: match "foo" not followed by "bar"
const negativeLookahead = /foo(?!bar)/;
console.log(negativeLookahead.test("foobaz")); // true
console.log(negativeLookahead.test("foobar")); // false

// Positive lookbehind: match "bar" preceded by "foo"
const lookbehindPattern = /(?<=foo)bar/;
console.log(lookbehindPattern.test("foobar")); // true
console.log(lookbehindPattern.test("bazbar")); // false
\`\`\`

### Named Groups
Give groups meaningful names:

\`\`\`javascript
const text = "2024-01-15";
const datePattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = text.match(datePattern);

if (match) {
  console.log(\`Year: \$\{match.groups.year\}\`); // 2024
  console.log(\`Month: \$\{match.groups.month\}\`); // 01
  console.log(\`Day: \$\{match.groups.day\}\`); // 15
}
\`\`\`

## Performance Optimization

### Avoid Catastrophic Backtracking
Some patterns can cause exponential time complexity:

\`\`\`javascript
// BAD: Can cause catastrophic backtracking
const badPattern = /(a+)+b/;
console.log(badPattern.test("aaaaaaaaaaaaaaaaaaaaac")); // Very slow!

// GOOD: More specific pattern
const goodPattern = /a+b/;
console.log(goodPattern.test("aaaaaaaaaaaaaaaaaaaaac")); // Fast
\`\`\`

### Use Specific Character Classes
\`\`\`javascript
// BAD: Too broad
const badPattern = /.*@.*\\..*/;

// GOOD: More specific
const goodPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
\`\`\`

### Compile Once, Use Many Times
\`\`\`javascript
// BAD: Compiling regex every time
function validateEmail(email) {
  return /^[^@]+@[^@]+\\.[^@]+$/.test(email);
}

// GOOD: Compile once
const emailRegex = /^[^@]+@[^@]+\\.[^@]+$/;
function validateEmail(email) {
  return emailRegex.test(email);
}
\`\`\`

## Common Use Cases

### 1. Data Extraction
\`\`\`javascript
const logLine = "2024-01-15 10:30:45 [ERROR] Database connection failed";
const logPattern = /(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) \\[(\\w+)\\] (.+)/;
const match = logLine.match(logPattern);

if (match) {
  console.log(\`Timestamp: \$\{match[1]\}\`);
  console.log(\`Level: \$\{match[2]\}\`);
  console.log(\`Message: \$\{match[3]\}\`);
}
\`\`\`

### 2. Text Cleaning
\`\`\`javascript
function cleanText(text) {
  // Remove extra whitespace
  text = text.replace(/\\s+/g, ' ');
  
  // Remove special characters except alphanumeric and spaces
  text = text.replace(/[^a-zA-Z0-9\\s]/g, '');
  
  // Trim whitespace
  return text.trim();
}

console.log(cleanText("  Hello!!!   World???  ")); // "Hello World"
\`\`\`

### 3. Password Validation
\`\`\`javascript
function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumbers = /\\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  
  return {
    minLength: minLength.test(password),
    hasUpperCase: hasUpperCase.test(password),
    hasLowerCase: hasLowerCase.test(password),
    hasNumbers: hasNumbers.test(password),
    hasSpecialChar: hasSpecialChar.test(password),
    isValid: minLength.test(password) && 
             hasUpperCase.test(password) && 
             hasLowerCase.test(password) && 
             hasNumbers.test(password) && 
             hasSpecialChar.test(password)
  };
}
\`\`\`

## Debugging and Testing

### Online Tools
- [ByteToolBox Regex Tester](/regex) - Test and debug patterns locally in your browser
- [Regex101](https://regex101.com/) - Community regex debugger with explanation pane
- [Regexr](https://regexr.com/) - Interactive regex reference

### JavaScript Testing
\`\`\`javascript
function testRegex(pattern, testCases) {
  testCases.forEach(({ input, expected, description }) => {
    const result = pattern.test(input);
    console.log(\`\$\{description\}: \$\{result === expected ? 'PASS' : 'FAIL'\}\`);
  });
}

const emailPattern = /^[^@]+@[^@]+\\.[^@]+$/;
testRegex(emailPattern, [
  { input: "user@example.com", expected: true, description: "Valid email" },
  { input: "invalid-email", expected: false, description: "Invalid email" },
  { input: "@example.com", expected: false, description: "Missing username" }
]);
\`\`\`

## Best Practices

1. **Keep it simple**: Complex regex is hard to maintain
2. **Add comments**: Use the x flag for multiline patterns with comments
3. **Test thoroughly**: Always test edge cases
4. **Consider alternatives**: Sometimes string methods are simpler
5. **Use tools**: Leverage online regex testers and debuggers
6. **Document patterns**: Explain complex patterns in code comments

## Conclusion

Regular expressions are powerful tools that every developer should master. Start with simple patterns and gradually work your way up to more complex ones. Remember that regex is just one tool in your toolkit—sometimes a simple string method might be more appropriate.

The key to mastering regex is practice. Start with common patterns like email validation and phone numbers, then move on to more complex text processing tasks. With time and practice, you'll be able to write efficient, maintainable regular expressions that make your code more robust and your development process more efficient.`;
