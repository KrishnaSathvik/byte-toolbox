import { ToolLayout } from '@/components/ToolLayout';
import { useState } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Code2, Shield, Zap, Database, Search, Key, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Blog page with developer tips and tutorials
 * 
 * This page provides valuable content for developers and helps with SEO.
 * Includes articles about using ByteToolbox tools and general development tips.
 */
export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  useSEO({
    title: 'Developer Blog - ByteToolBox | Tips, Tutorials & Development Guides',
    description: 'Discover developer tips, tutorials, and guides for using ByteToolBox tools effectively. Learn about JSON formatting, Base64 encoding, hash generation, and more development techniques.',
    keywords: 'developer blog, programming tips, development tutorials, JSON guide, Base64 tutorial, hash generation, developer tools, coding tips, web development',
    canonical: 'https://www.bytetoolbox.com/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'ByteToolBox Developer Blog',
      'description': 'Developer tips, tutorials, and guides for using ByteToolBox tools effectively.',
      'url': 'https://www.bytetoolbox.com/blog',
      'publisher': {
        '@type': 'Organization',
        'name': 'ByteToolBox',
        'url': 'https://www.bytetoolbox.com'
      },
      'inLanguage': 'en-US',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const categories = [
    { id: 'all', name: 'All Posts', icon: Code2 },
    { id: 'tools', name: 'Tool Tips', icon: Code2 },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'data', name: 'Data Processing', icon: Database },
    { id: 'regex', name: 'Regex', icon: Search },
    { id: 'uuid', name: 'UUIDs', icon: Key }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential JSON Best Practices for API Development',
      excerpt: 'Learn the most important JSON practices that will make your APIs more reliable, secure, and maintainable.',
      content: `JSON is the backbone of modern API development, but many developers unknowingly make common mistakes that can lead to security vulnerabilities, performance issues, and maintenance nightmares. In this comprehensive guide, we'll cover the essential best practices that every developer should know when working with JSON in APIs.

## 1. Always Validate Input Data

Never trust JSON data from external sources. Always validate incoming JSON against a schema before processing:

\`\`\`javascript
// Using Joi for validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120)
});

const { error, value } = schema.validate(jsonData);
if (error) {
  throw new Error(\`Invalid JSON: \$\{error.message\}\`);
}
\`\`\`

## 2. Use Consistent Naming Conventions

Stick to camelCase for JavaScript/Node.js APIs or snake_case for Python/Ruby APIs. Consistency improves readability and reduces confusion:

\`\`\`json
{
  "userId": 123,
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

## 3. Handle Null Values Explicitly

Be explicit about null values and avoid undefined properties:

\`\`\`json
{
  "name": "John Doe",
  "middleName": null,
  "nickname": null
}
\`\`\`

## 4. Use Proper HTTP Status Codes

Return appropriate status codes with your JSON responses:

\`\`\`javascript
// Success
res.status(200).json({ data: userData });

// Created
res.status(201).json({ data: newUser, message: "User created successfully" });

// Error
res.status(400).json({ error: "Invalid input data" });
\`\`\`

## 5. Implement Proper Error Handling

Structure error responses consistently:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\`

## 6. Use Pagination for Large Datasets

Implement pagination to avoid overwhelming clients:

\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
\`\`\`

## 7. Sanitize Data Before Serialization

Remove sensitive information before sending JSON responses:

\`\`\`javascript
const sanitizeUser = (user) => {
  const { password, ssn, ...safeUser } = user;
  return safeUser;
};
\`\`\`

## 8. Use Content-Type Headers Correctly

Always set the correct Content-Type header:

\`\`\`javascript
res.setHeader('Content-Type', 'application/json');
\`\`\`

## 9. Implement Rate Limiting

Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
\`\`\`

## 10. Use JSON Schema for Documentation

Document your API structure with JSON Schema:

\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "email"]
}
\`\`\`

By following these practices, you'll create more robust, secure, and maintainable APIs that provide a better experience for both developers and end users. Remember, good JSON practices are not just about syntax—they're about building reliable systems that scale.`,
      category: 'tools',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '8 min read',
      tags: ['JSON', 'API', 'Best Practices', 'Development'],
      featured: true
    },
    {
      id: 2,
      title: 'Why MD5 and SHA-1 Are No Longer Secure for Password Hashing',
      excerpt: 'Understanding the security implications of using deprecated hash algorithms and what to use instead.',
      content: `Hash algorithms are fundamental to web security, but not all hashes are created equal. MD5 and SHA-1, once industry standards, are now considered cryptographically broken and should never be used for password hashing or any security-critical applications.

## The Problem with MD5

MD5 (Message Digest Algorithm 5) was designed in 1991 and was widely used for cryptographic purposes. However, it has several critical vulnerabilities:

### Collision Vulnerabilities
MD5 is vulnerable to collision attacks, where two different inputs produce the same hash:

\`\`\`bash
# Example of MD5 collision (simplified)
Input 1: "Hello World"
MD5: 5d41402abc4b2a76b9719d911017c592

Input 2: "Different input" 
MD5: 5d41402abc4b2a76b9719d911017c592  # Same hash!
\`\`\`

### Speed and Brute Force
MD5 is extremely fast, making it vulnerable to brute force attacks:

\`\`\`javascript
// MD5 can hash millions of passwords per second
const crypto = require('crypto');
const start = Date.now();
for (let i = 0; i < 1000000; i++) {
  crypto.createHash('md5').update('password' + i).digest('hex');
}
console.log(\`Time: \$\{Date.now() - start\}ms\`); // Very fast!
\`\`\`

## The Problem with SHA-1

SHA-1 (Secure Hash Algorithm 1) was designed in 1995 and was considered secure until 2005 when theoretical attacks were discovered. In 2017, Google demonstrated a practical collision attack.

### Practical Collision Attack
Google's SHAttered attack showed that SHA-1 collisions can be generated in practice:

\`\`\`bash
# Two different PDF files with identical SHA-1 hashes
File 1: shattered-1.pdf
SHA-1: 38762cf7f55934b34d179ae6a4c80cadccbb7f0a

File 2: shattered-2.pdf  
SHA-1: 38762cf7f55934b34d179ae6a4c80cadccbb7f0a  # Same hash!
\`\`\`

## Why These Algorithms Are Dangerous

### 1. Rainbow Table Attacks
Fast hash algorithms are vulnerable to rainbow table attacks:

\`\`\`javascript
// Rainbow tables can precompute hashes for common passwords
const commonPasswords = ['password', '123456', 'admin', 'qwerty'];
const rainbowTable = {};

commonPasswords.forEach(pwd => {
  rainbowTable[crypto.createHash('md5').update(pwd).digest('hex')] = pwd;
});

// Instant password recovery
function crackPassword(hash) {
  return rainbowTable[hash] || 'Not found in rainbow table';
}
\`\`\`

### 2. GPU Acceleration
Modern GPUs can perform billions of hash operations per second:

\`\`\`python
# Using hashcat for GPU-accelerated cracking
# hashcat -m 0 -a 3 hashes.txt ?a?a?a?a?a?a?a?a
# This can crack 8-character passwords in minutes
\`\`\`

## What to Use Instead

### 1. bcrypt (Recommended)
bcrypt is specifically designed for password hashing and includes a cost factor:

\`\`\`javascript
const bcrypt = require('bcrypt');

// Hash a password
const saltRounds = 12;
const hashedPassword = await bcrypt.hash('myPassword', saltRounds);

// Verify a password
const isValid = await bcrypt.compare('myPassword', hashedPassword);
\`\`\`

### 2. Argon2 (Winner of Password Hashing Competition)
Argon2 is the recommended algorithm by security experts:

\`\`\`javascript
const argon2 = require('argon2');

// Hash a password
const hashedPassword = await argon2.hash('myPassword', {
  type: argon2.argon2id,
  memoryCost: 2 ** 16, // 64 MB
  timeCost: 3,          // 3 iterations
  parallelism: 1
});

// Verify a password
const isValid = await argon2.verify(hashedPassword, 'myPassword');
\`\`\`

### 3. scrypt
scrypt is designed to be memory-hard and resistant to hardware attacks:

\`\`\`javascript
const scrypt = require('scrypt');

const hashedPassword = scrypt.hashSync('myPassword', {
  N: 16384,  // CPU/memory cost
  r: 8,      // block size
  p: 1       // parallelization
});
\`\`\`

## Migration Strategy

If you're currently using MD5 or SHA-1, here's how to migrate:

### 1. Immediate Steps
- Stop using MD5/SHA-1 for new passwords
- Implement proper password hashing (bcrypt/Argon2)
- Add password strength requirements

### 2. Gradual Migration
\`\`\`javascript
async function verifyPassword(password, hash) {
  // Check if it's an old MD5/SHA-1 hash
  if (hash.length === 32) { // MD5
    const oldHash = crypto.createHash('md5').update(password).digest('hex');
    if (oldHash === hash) {
      // Rehash with bcrypt and update database
      const newHash = await bcrypt.hash(password, 12);
      await updateUserPassword(userId, newHash);
      return true;
    }
  }
  
  // Verify with new bcrypt hash
  return await bcrypt.compare(password, hash);
}
\`\`\`

### 3. Force Password Reset
For high-security applications, consider forcing users to reset passwords:

\`\`\`javascript
// Mark old hashes for forced reset
const needsReset = hash.length === 32 || hash.length === 40; // MD5 or SHA-1
if (needsReset) {
  return { error: 'Password must be reset for security reasons' };
}
\`\`\`

## Best Practices

1. **Use a high cost factor**: bcrypt with cost 12+ (takes ~250ms)
2. **Add salt**: All modern algorithms include salt automatically
3. **Use unique salts**: Each password should have a unique salt
4. **Implement rate limiting**: Prevent brute force attacks
5. **Monitor for breaches**: Check if passwords appear in known breaches

## Conclusion

MD5 and SHA-1 are cryptographically broken and should never be used for password hashing. The security of your application depends on using proper password hashing algorithms like bcrypt, Argon2, or scrypt. The small performance cost of these algorithms is insignificant compared to the security benefits they provide.

Remember: security is not about making attacks impossible, but about making them impractical. Modern password hashing algorithms achieve this by being intentionally slow and memory-intensive, making brute force attacks economically unfeasible.`,
      category: 'security',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '10 min read',
      tags: ['Security', 'Hashing', 'MD5', 'SHA-1', 'Passwords'],
      featured: true
    },
    {
      id: 3,
      title: 'Mastering Regular Expressions: A Developer\'s Guide',
      excerpt: 'From basic patterns to advanced techniques, learn how to write efficient and maintainable regular expressions.',
      content: `Regular expressions are powerful tools for text processing, but they can be intimidating. This comprehensive guide will take you from regex novice to expert, covering everything from basic patterns to advanced techniques that will make you a more effective developer.

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
- [Regex101](https://regex101.com/) - Test and debug regex patterns
- [Regexr](https://regexr.com/) - Interactive regex learning tool
- [RegExr](https://regexr.com/) - Another excellent regex testing tool

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

The key to mastering regex is practice. Start with common patterns like email validation and phone numbers, then move on to more complex text processing tasks. With time and practice, you'll be able to write efficient, maintainable regular expressions that make your code more robust and your development process more efficient.`,
      category: 'regex',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '15 min read',
      tags: ['Regex', 'Text Processing', 'Patterns', 'JavaScript'],
      featured: false
    },
    {
      id: 4,
      title: 'UUID vs Auto-increment: Choosing the Right Primary Key',
      excerpt: 'When to use UUIDs versus auto-incrementing integers for database primary keys in different scenarios.',
      content: `Choosing the right primary key strategy is crucial for database design and can significantly impact your application's performance, scalability, and maintainability. This comprehensive guide explores the pros and cons of UUIDs versus auto-incrementing integers, helping you make informed decisions for different scenarios.

## Understanding the Options

### Auto-incrementing Integers
Auto-incrementing integers are sequential numbers automatically generated by the database:

\`\`\`sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
\`\`\`

### UUIDs (Universally Unique Identifiers)
UUIDs are 128-bit identifiers that are globally unique across space and time:

\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(100)
);
\`\`\`

## Auto-incrementing Integers: Pros and Cons

### Advantages

#### 1. Performance
- **Faster queries**: Integer comparisons are faster than string comparisons
- **Smaller storage**: 4-8 bytes vs 16 bytes for UUIDs
- **Better indexing**: B-tree indexes work more efficiently with sequential integers
- **Faster joins**: Integer joins are typically faster than string joins

\`\`\`sql
-- Integer primary key - very fast
SELECT * FROM users WHERE id = 12345;

-- Integer foreign key - efficient
SELECT u.*, p.* 
FROM users u 
JOIN posts p ON u.id = p.user_id;
\`\`\`

#### 2. Human-readable
- Easy to reference in URLs: \`/users/12345\`
- Simple to debug and troubleshoot
- Intuitive ordering (newer records have higher IDs)

#### 3. Database optimization
- Most databases are optimized for integer primary keys
- Better query plan optimization
- More efficient storage and caching

### Disadvantages

#### 1. Scalability issues
- **Single point of failure**: One database generates all IDs
- **Replication lag**: Master-slave setups can cause ID conflicts
- **Sharding complexity**: Difficult to distribute across multiple databases

\`\`\`javascript
// Problem: Multiple servers generating IDs
// Server 1: generates ID 1001
// Server 2: generates ID 1001 (conflict!)
\`\`\`

#### 2. Information leakage
- Exposes business metrics (user count, order count)
- Predictable patterns can be exploited
- Security concerns in public APIs

\`\`\`javascript
// Bad: Exposes business data
// /api/users/1000000 - reveals you have 1M users
// /api/orders/50000 - reveals order volume
\`\`\`

#### 3. Merge conflicts
- Difficult to merge data from different systems
- ID conflicts when consolidating databases

## UUIDs: Pros and Cons

### Advantages

#### 1. Global uniqueness
- No conflicts across distributed systems
- Safe for data replication and merging
- Perfect for microservices architecture

\`\`\`javascript
// UUIDs are globally unique
const uuid1 = '550e8400-e29b-41d4-a716-446655440000';
const uuid2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
// No chance of collision, even across different systems
\`\`\`

#### 2. Privacy and security
- No sequential patterns to exploit
- Doesn't reveal business metrics
- Safer for public APIs

\`\`\`javascript
// Good: No information leakage
// /api/users/550e8400-e29b-41d4-a716-446655440000
// /api/orders/6ba7b810-9dad-11d1-80b4-00c04fd430c8
\`\`\`

#### 3. Distributed system friendly
- Can generate IDs without database round-trip
- No coordination needed between servers
- Perfect for offline-first applications

\`\`\`javascript
// Generate UUID on client side
const userId = crypto.randomUUID();
// Safe to use immediately, no database call needed
\`\`\`

### Disadvantages

#### 1. Performance overhead
- **Larger storage**: 16 bytes vs 4-8 bytes
- **Slower comparisons**: String comparison vs integer
- **Index fragmentation**: Random UUIDs cause B-tree index fragmentation

\`\`\`sql
-- UUID comparison is slower
SELECT * FROM users WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- UUID foreign key joins are slower
SELECT u.*, p.* 
FROM users u 
JOIN posts p ON u.id = p.user_id;
\`\`\`

#### 2. Debugging complexity
- Harder to remember and reference
- More complex URL patterns
- Difficult to manually inspect data

#### 3. Index performance
- Random UUIDs cause index fragmentation
- Slower range queries
- More storage overhead for indexes

## UUID Variants and Performance

### UUID Version 1 (Time-based)
\`\`\`javascript
// Contains MAC address and timestamp
// More sequential, better for indexing
const uuid1 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
\`\`\`

### UUID Version 4 (Random)
\`\`\`javascript
// Completely random
// Causes index fragmentation
const uuid4 = '550e8400-e29b-41d4-a716-446655440000';
\`\`\`

### UUID Version 7 (Time-ordered)
\`\`\`javascript
// New standard (RFC 4122)
// Time-ordered, better for indexing
// Combines benefits of both approaches
const uuid7 = '018c4c6c-0000-7000-8000-000000000000';
\`\`\`

## When to Use Each Approach

### Use Auto-incrementing Integers When:

#### 1. Single Database System
\`\`\`javascript
// Monolithic application with single database
const user = await db.users.create({
  name: 'John Doe',
  email: 'john@example.com'
  // id will be auto-generated: 1, 2, 3, ...
});
\`\`\`

#### 2. Performance is Critical
\`\`\`sql
-- High-traffic applications where every millisecond counts
SELECT COUNT(*) FROM orders WHERE user_id = 12345;
-- Integer comparison is fastest
\`\`\`

#### 3. Simple Applications
- Internal tools
- Prototypes and MVPs
- Applications that don't need to scale

### Use UUIDs When:

#### 1. Distributed Systems
\`\`\`javascript
// Microservices architecture
const orderService = {
  createOrder: async (data) => {
    const orderId = crypto.randomUUID(); // Generate on service
    return await db.orders.create({ id: orderId, ...data });
  }
};
\`\`\`

#### 2. Data Replication and Merging
\`\`\`javascript
// Multiple databases that need to be merged
const mergeUsers = (db1Users, db2Users) => {
  // No ID conflicts with UUIDs
  return [...db1Users, ...db2Users];
};
\`\`\`

#### 3. Public APIs
\`\`\`javascript
// REST API with UUIDs
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id; // UUID, no information leakage
  // ...
});
\`\`\`

#### 4. Offline-First Applications
\`\`\`javascript
// Mobile app that works offline
const createOfflinePost = (data) => {
  const postId = crypto.randomUUID(); // Generate offline
  return { id: postId, ...data, synced: false };
};
\`\`\`

## Hybrid Approaches

### 1. Composite Keys
\`\`\`sql
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  PRIMARY KEY (id),
  INDEX idx_uuid (uuid)
);
\`\`\`

### 2. Internal vs External IDs
\`\`\`javascript
// Internal: Use integers for performance
const user = await db.users.findById(12345);

// External: Use UUIDs for APIs
app.get('/api/users/:uuid', (req, res) => {
  const user = await db.users.findByUuid(req.params.uuid);
  res.json(user);
});
\`\`\`

### 3. Sharded Auto-increment
\`\`\`javascript
// Use different ranges for different shards
// Shard 1: IDs 1-1000000
// Shard 2: IDs 1000001-2000000
// Shard 3: IDs 2000001-3000000
\`\`\`

## Performance Optimization Tips

### For Auto-incrementing Integers:
\`\`\`sql
-- Use appropriate integer types
TINYINT    -- 1 byte, 0-255
SMALLINT   -- 2 bytes, -32,768 to 32,767
INT        -- 4 bytes, -2B to 2B
BIGINT     -- 8 bytes, -9Q to 9Q

-- Choose the smallest type that fits your needs
\`\`\`

### For UUIDs:
\`\`\`sql
-- Use UUID v7 for better performance
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- or use time-ordered UUIDs
  id UUID PRIMARY KEY DEFAULT uuid_generate_v7()
);

-- Consider using ULID as alternative
-- Shorter than UUID, time-ordered, URL-safe
\`\`\`

## Migration Strategies

### From Auto-increment to UUID:
\`\`\`sql
-- 1. Add UUID column
ALTER TABLE users ADD COLUMN uuid UUID DEFAULT gen_random_uuid();

-- 2. Populate UUIDs for existing records
UPDATE users SET uuid = gen_random_uuid() WHERE uuid IS NULL;

-- 3. Make UUID unique
ALTER TABLE users ADD CONSTRAINT users_uuid_unique UNIQUE (uuid);

-- 4. Update foreign key references
ALTER TABLE posts ADD COLUMN user_uuid UUID;
UPDATE posts SET user_uuid = u.uuid 
FROM users u WHERE posts.user_id = u.id;

-- 5. Switch primary key (careful!)
-- This is complex and requires downtime
\`\`\`

## Best Practices

1. **Choose based on your architecture**: Monoliths favor integers, microservices favor UUIDs
2. **Consider future scaling**: Will you need to shard or replicate?
3. **Profile your specific use case**: Test with your actual data and queries
4. **Use hybrid approaches when appropriate**: Internal integers, external UUIDs
5. **Document your decision**: Explain why you chose your approach
6. **Plan for migration**: Design with future changes in mind

## Conclusion

The choice between UUIDs and auto-incrementing integers depends on your specific requirements:

- **Use auto-incrementing integers** for single-database applications where performance is critical
- **Use UUIDs** for distributed systems, public APIs, and applications that need to scale horizontally
- **Consider hybrid approaches** for the best of both worlds

Remember that this decision affects your entire application architecture, so choose carefully and consider your long-term scaling needs. The performance difference is often negligible for most applications, but the architectural benefits of UUIDs in distributed systems can be significant.`,
      category: 'uuid',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '12 min read',
      tags: ['UUID', 'Database', 'Primary Keys', 'Performance'],
      featured: false
    },
    {
      id: 5,
      title: 'Base64 Encoding: When and Why to Use It',
      excerpt: 'Understanding Base64 encoding, its use cases, and best practices for web development.',
      content: `Base64 encoding is a fundamental technique in web development, but many developers don't fully understand when and why to use it. This comprehensive guide covers everything you need to know about Base64 encoding, from basic concepts to advanced use cases and best practices.

## What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent any binary data, making it safe for transmission over text-based protocols.

### The Base64 Character Set
\`\`\`
A-Z (26 characters): A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a-z (26 characters): a b c d e f g h i j k l m n o p q r s t u v w x y z
0-9 (10 characters): 0 1 2 3 4 5 6 7 8 9
+ / (2 characters): + /
Padding: = (used when input length is not divisible by 3)
\`\`\`

## How Base64 Works

### Encoding Process
1. Take input data (binary or text)
2. Convert to binary representation
3. Group into 6-bit chunks
4. Map each 6-bit chunk to Base64 character
5. Add padding if necessary

\`\`\`javascript
// Example: Encoding "Hello"
const text = "Hello";
const binary = text.split('').map(char => 
  char.charCodeAt(0).toString(2).padStart(8, '0')
).join('');

console.log(binary); // 0100100001100101011011000110110001101111

// Group into 6-bit chunks
// 010010 000110 010101 101100 011011 000110 111100
// 18     6      21     44     27     6      60

// Map to Base64 characters
// 18 -> S, 6 -> G, 21 -> V, 44 -> s, 27 -> b, 6 -> G, 60 -> 8
// Result: "SGVsbG8="
\`\`\`

### Decoding Process
1. Remove padding characters
2. Convert Base64 characters back to 6-bit binary
3. Group into 8-bit chunks
4. Convert back to original data

\`\`\`javascript
// Example: Decoding "SGVsbG8="
const base64 = "SGVsbG8=";
const binary = base64.replace(/[^A-Za-z0-9+/]/g, '')
  .split('')
  .map(char => {
    const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.indexOf(char);
    return index.toString(2).padStart(6, '0');
  }).join('');

// Group into 8-bit chunks and convert to characters
const result = binary.match(/.{8}/g)
  .map(chunk => String.fromCharCode(parseInt(chunk, 2)))
  .join('');

console.log(result); // "Hello"
\`\`\`

## Common Use Cases

### 1. Data URLs (Data URIs)
Embed small files directly in HTML/CSS:

\`\`\`html
<!-- Embed a small image -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" alt="Red dot">

<!-- Embed CSS with base64 font -->
<style>
@font-face {
  font-family: 'CustomFont';
  src: url('data:font/woff2;base64,d09GMgABAAAAAA...') format('woff2');
}
</style>
\`\`\`

### 2. Email Attachments
MIME email attachments use Base64 encoding:

\`\`\`javascript
// Email with Base64 attachment
const email = {
  to: 'user@example.com',
  subject: 'Document attached',
  body: 'Please find the document attached.',
  attachments: [{
    filename: 'document.pdf',
    content: 'JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDMgMCBSCi9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9SZXNvdXJjZXMgPDwKL0ZvbnQgPDwKL0YxIDIgMCBSCj4+Cj4+Ci9Db250ZW50cyA0IDAgUgo+PgplbmRvYmoK...',
    encoding: 'base64'
  }]
};
\`\`\`

### 3. HTTP Basic Authentication
Encode username:password for HTTP Basic Auth:

\`\`\`javascript
const username = 'user';
const password = 'pass123';
const credentials = btoa(\`\$\{username\}:\$\{password\}\`);

fetch('/api/data', {
  headers: {
    'Authorization': \`Basic \$\{credentials\}\`
  }
});
\`\`\`

### 4. JSON Web Tokens (JWTs)
JWTs use Base64URL encoding (variant of Base64):

\`\`\`javascript
// JWT structure: header.payload.signature
const header = { alg: 'HS256', typ: 'JWT' };
const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 };

const encodedHeader = btoa(JSON.stringify(header)).replace(/[+/=]/g, (char) => {
  if (char === '+') return '-';
  if (char === '/') return '_';
  if (char === '=') return '';
});

const encodedPayload = btoa(JSON.stringify(payload)).replace(/[+/=]/g, (char) => {
  if (char === '+') return '-';
  if (char === '/') return '_';
  if (char === '=') return '';
});

const jwt = \`\$\{encodedHeader\}.\$\{encodedPayload\}.signature\`;
\`\`\`

### 5. Binary Data in JSON
Store binary data in JSON APIs:

\`\`\`javascript
// Store image data in JSON
const imageData = {
  id: 'img001',
  filename: 'profile.jpg',
  mimeType: 'image/jpeg',
  data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  size: 1024
};
\`\`\`

## When to Use Base64

### ✅ Good Use Cases

#### 1. Small Binary Files
\`\`\`javascript
// Good: Small icons, logos, or simple images
const smallIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOFMzLjU4IDE2IDggMTZTMTYgMTIuNDIgMTYgOFMxMi40MiAwIDggMFoiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+';
\`\`\`

#### 2. Configuration Data
\`\`\`javascript
// Good: Small configuration objects
const config = {
  theme: 'dark',
  settings: btoa(JSON.stringify({
    autoSave: true,
    notifications: false,
    language: 'en'
  }))
};
\`\`\`

#### 3. API Responses with Binary Data
\`\`\`javascript
// Good: When you need to include binary data in JSON
const response = {
  success: true,
  file: {
    name: 'document.pdf',
    type: 'application/pdf',
    content: base64EncodedPdf
  }
};
\`\`\`

### ❌ Avoid Base64 For

#### 1. Large Files
\`\`\`javascript
// BAD: Large files increase size by ~33%
const largeFile = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAA...'; // Very long string

// GOOD: Use file upload or CDN
const fileUrl = 'https://cdn.example.com/videos/large-video.mp4';
\`\`\`

#### 2. Sensitive Data
\`\`\`javascript
// BAD: Base64 is NOT encryption
const password = btoa('mySecretPassword'); // Still readable!

// GOOD: Use proper encryption
const encryptedPassword = await encrypt('mySecretPassword', secretKey);
\`\`\`

#### 3. Performance-Critical Applications
\`\`\`javascript
// BAD: Base64 encoding/decoding adds overhead
for (let i = 0; i < 10000; i++) {
  const encoded = btoa(largeDataString); // Slow!
}

// GOOD: Use binary formats when possible
const buffer = Buffer.from(largeDataString, 'utf8');
\`\`\`

## Base64 Variants

### Standard Base64
\`\`\`javascript
const standard = btoa('Hello World'); // "SGVsbG8gV29ybGQ="
\`\`\`

### Base64URL (URL-safe)
\`\`\`javascript
// Replace + with -, / with _, remove padding
const base64url = btoa('Hello World')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, ''); // "SGVsbG8gV29ybGQ"
\`\`\`

### MIME Base64
\`\`\`javascript
// With line breaks every 76 characters
const mime = btoa('Hello World'.repeat(10))
  .replace(/.{76}/g, '$&\\n'); // Adds line breaks
\`\`\`

## Performance Considerations

### Size Overhead
Base64 increases data size by approximately 33%:

\`\`\`javascript
const original = 'Hello World'; // 11 bytes
const encoded = btoa(original); // "SGVsbG8gV29ybGQ=" (15 bytes)
const overhead = (encoded.length - original.length) / original.length; // ~36%
\`\`\`

### Encoding/Decoding Performance
\`\`\`javascript
// Measure encoding performance
const data = 'Hello World'.repeat(1000);
const start = performance.now();
const encoded = btoa(data);
const end = performance.now();
console.log(\`Encoding took \$\{end - start\}ms\`);

// Measure decoding performance
const start2 = performance.now();
const decoded = atob(encoded);
const end2 = performance.now();
console.log(\`Decoding took \$\{end2 - start2\}ms\`);
\`\`\`

## Best Practices

### 1. Use Appropriate Methods
\`\`\`javascript
// Browser environment
const encoded = btoa('Hello World');
const decoded = atob(encoded);

// Node.js environment
const encoded = Buffer.from('Hello World').toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');
\`\`\`

### 2. Handle Errors Gracefully
\`\`\`javascript
function safeBase64Decode(str) {
  try {
    return atob(str);
  } catch (error) {
    console.error('Invalid Base64 string:', error);
    return null;
  }
}
\`\`\`

### 3. Validate Base64 Strings
\`\`\`javascript
function isValidBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

console.log(isValidBase64('SGVsbG8gV29ybGQ=')); // true
console.log(isValidBase64('Invalid Base64!')); // false
\`\`\`

### 4. Use Streaming for Large Data
\`\`\`javascript
// For large files, use streaming
const fs = require('fs');
const { Transform } = require('stream');

const base64Encode = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString('base64'));
    callback();
  }
});

fs.createReadStream('large-file.bin')
  .pipe(base64Encode)
  .pipe(fs.createWriteStream('encoded.txt'));
\`\`\`

## Common Pitfalls

### 1. Confusing Encoding with Encryption
\`\`\`javascript
// WRONG: Base64 is not secure
const password = btoa('secret123');
console.log(atob(password)); // 'secret123' - easily readable!

// CORRECT: Use proper encryption
const crypto = require('crypto');
const encrypted = crypto.createCipher('aes192', 'key').update('secret123', 'utf8', 'hex');
\`\`\`

### 2. Not Handling Padding
\`\`\`javascript
// WRONG: Removing padding before decoding
const encoded = 'SGVsbG8gV29ybGQ='; // Has padding
const decoded = atob(encoded.replace(/=/g, '')); // Error!

// CORRECT: Keep padding for decoding
const decoded = atob(encoded); // Works correctly
\`\`\`

### 3. Unicode Issues
\`\`\`javascript
// WRONG: Direct encoding of Unicode strings
const unicode = 'Hello 世界';
const encoded = btoa(unicode); // Error!

// CORRECT: Encode to UTF-8 first
const encoded = btoa(unescape(encodeURIComponent(unicode)));
const decoded = decodeURIComponent(escape(atob(encoded)));
\`\`\`

## Conclusion

Base64 encoding is a powerful tool for handling binary data in text-based systems, but it should be used judiciously. Remember:

- **Use it for**: Small files, data URLs, email attachments, and when you need to embed binary data in JSON
- **Avoid it for**: Large files, sensitive data, and performance-critical applications
- **Always consider**: The 33% size overhead and encoding/decoding performance cost
- **Remember**: Base64 is encoding, not encryption - never use it for security

By understanding when and how to use Base64 encoding effectively, you can build more robust and efficient web applications that handle binary data gracefully.`,
      category: 'data',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '8 min read',
      tags: ['Base64', 'Encoding', 'Web Development', 'Data Transfer'],
      featured: false
    },
    {
      id: 6,
      title: 'Optimizing JSON Performance in Large Applications',
      excerpt: 'Tips and techniques for handling large JSON datasets efficiently in web applications.',
      content: `As applications grow, JSON performance becomes critical. Large datasets, frequent parsing, and complex serialization can significantly impact your application's performance. This comprehensive guide covers techniques for optimizing JSON parsing, serialization, and handling large datasets efficiently.

## Understanding JSON Performance Bottlenecks

### Common Performance Issues
1. **Large payload sizes** - Slow network transfer and memory usage
2. **Frequent parsing/serialization** - CPU-intensive operations
3. **Deep object traversal** - Inefficient data access patterns
4. **Memory allocation** - Garbage collection pressure
5. **Synchronous processing** - Blocking the main thread

### Performance Metrics to Monitor
\`\`\`javascript
// Measure JSON parsing performance
const measureJsonPerformance = (data, iterations = 1000) => {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    JSON.parse(JSON.stringify(data));
  }
  
  const end = performance.now();
  return {
    totalTime: end - start,
    averageTime: (end - start) / iterations,
    operationsPerSecond: (iterations / (end - start)) * 1000
  };
};

const largeData = { /* large object */ };
const metrics = measureJsonPerformance(largeData);
console.log(\`Average parse time: \$\{metrics.averageTime\}ms\`);
\`\`\`

## Optimization Techniques

### 1. Lazy Loading and Pagination

#### Implement Pagination
\`\`\`javascript
// Instead of loading all data at once
const loadAllUsers = async () => {
  const response = await fetch('/api/users');
  return response.json(); // Could be 10MB+ of data
};

// Use pagination
const loadUsersPaginated = async (page = 1, limit = 100) => {
  const response = await fetch(\`/api/users?page=\$\{page\}&limit=\$\{limit\}\`);
  return response.json(); // Only 100 records
};

// Implement infinite scrolling
class UserList {
  constructor() {
    this.users = [];
    this.page = 1;
    this.loading = false;
  }
  
  async loadMore() {
    if (this.loading) return;
    
    this.loading = true;
    const newUsers = await loadUsersPaginated(this.page, 100);
    this.users.push(...newUsers);
    this.page++;
    this.loading = false;
  }
}
\`\`\`

### 2. Efficient Data Structures

#### Use Maps for Fast Lookups
\`\`\`javascript
// Instead of array.find() for frequent lookups
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  // ... 10000 more users
];

// BAD: O(n) lookup
const findUserById = (id) => users.find(user => user.id === id);

// GOOD: O(1) lookup with Map
const userMap = new Map(users.map(user => [user.id, user]));
const findUserByIdFast = (id) => userMap.get(id);
\`\`\`

### 3. Caching and Memoization

#### Implement Smart Caching
\`\`\`javascript
class JSONCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) { // 5 minutes
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  set(key, data) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}

const cache = new JSONCache();
const data = cache.parseAndCache(jsonString, 'users-data');
\`\`\`

### 4. Web Workers for Heavy Processing

#### Offload JSON Processing
\`\`\`javascript
// main.js
const worker = new Worker('json-processor.js');

worker.postMessage({
  type: 'PROCESS_JSON',
  data: largeJsonData
});

worker.onmessage = (event) => {
  const { type, result } = event.data;
  if (type === 'PROCESSING_COMPLETE') {
    console.log('Processing complete:', result);
  }
};
\`\`\`

## Best Practices Summary

1. **Pagination**: Never load all data at once
2. **Caching**: Cache parsed JSON and expensive operations
3. **Streaming**: Process large JSON in chunks
4. **Data Structure**: Use efficient data structures (Maps, normalized data)
5. **Web Workers**: Offload heavy processing
6. **Compression**: Use gzip/brotli for network transfer
7. **Binary Formats**: Consider MessagePack for smaller payloads
8. **Database Optimization**: Use views and optimized queries
9. **Monitoring**: Track performance metrics
10. **Lazy Loading**: Load data only when needed

## Conclusion

JSON performance optimization is crucial for large applications. By implementing pagination, caching, streaming, and efficient data structures, you can significantly improve your application's performance. Remember to monitor performance metrics and choose the right optimization technique for your specific use case.`,
      category: 'performance',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '8 min read',
      tags: ['JSON', 'Performance', 'Optimization', 'Large Data'],
      featured: false
    },
    {
      id: 7,
      title: 'Timestamp Management in Distributed Systems',
      excerpt: 'Best practices for handling timestamps across different timezones and distributed systems.',
      content: `Managing timestamps in distributed systems is more complex than it seems. This comprehensive guide covers timezone handling, clock synchronization, timestamp formats, and best practices for building robust distributed applications.

## The Challenges of Timestamp Management

### Common Problems
1. **Clock Skew**: Different servers have slightly different times
2. **Timezone Confusion**: Users in different timezones see different times
3. **Leap Seconds**: Occasional adjustments to UTC
4. **Network Delays**: Timestamps arrive out of order
5. **Data Migration**: Moving data between systems with different time handling

### Real-World Impact
\`\`\`javascript
// Problem: Clock skew causing data inconsistencies
const server1Time = new Date('2024-01-15T10:30:00Z'); // Server 1
const server2Time = new Date('2024-01-15T10:30:05Z'); // Server 2 (5 seconds ahead)

// User action happens at 10:30:02
// Server 1 records: 10:30:00 (before action)
// Server 2 records: 10:30:05 (after action)
// Data appears out of order!
\`\`\`

## Timestamp Formats and Standards

### ISO 8601 (Recommended)
\`\`\`javascript
// ISO 8601 format with timezone
const iso8601 = '2024-01-15T10:30:00Z'; // UTC
const iso8601WithTz = '2024-01-15T10:30:00+05:00'; // With timezone offset

// JavaScript Date parsing
const date = new Date('2024-01-15T10:30:00Z');
console.log(date.toISOString()); // Always outputs UTC
\`\`\`

### Unix Timestamps
\`\`\`javascript
// Unix timestamp (seconds since epoch)
const unixTimestamp = Math.floor(Date.now() / 1000); // 1705312200

// Convert to Date
const date = new Date(unixTimestamp * 1000);

// Convert to ISO string
const isoString = date.toISOString();
\`\`\`

## Timezone Handling

### Store Everything in UTC
\`\`\`javascript
// ALWAYS store timestamps in UTC
const userAction = {
  id: 'action-123',
  timestamp: new Date().toISOString(), // UTC
  userId: 'user-456',
  action: 'login'
};

// Convert to user's timezone for display
const displayTime = (utcTimestamp, userTimezone) => {
  const date = new Date(utcTimestamp);
  return date.toLocaleString('en-US', {
    timeZone: userTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

console.log(displayTime('2024-01-15T10:30:00Z', 'America/New_York'));
// Output: 01/15/2024, 05:30:00 AM
\`\`\`

## Clock Synchronization

### NTP (Network Time Protocol)
\`\`\`javascript
// Check if system time is synchronized
const checkTimeSync = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
    const data = await response.json();
    const serverTime = new Date(data.utc_datetime);
    const localTime = new Date();
    const diff = Math.abs(serverTime - localTime);
    
    return {
      synchronized: diff < 5000, // Within 5 seconds
      difference: diff,
      serverTime: serverTime.toISOString(),
      localTime: localTime.toISOString()
    };
  } catch (error) {
    console.error('Time sync check failed:', error);
    return { synchronized: false, error };
  }
};
\`\`\`

## Best Practices Summary

1. **Always store in UTC**: Convert to user's timezone only for display
2. **Use ISO 8601 format**: Standardized, unambiguous timestamp format
3. **Handle timezone preferences**: Store and respect user's timezone
4. **Implement clock synchronization**: Use NTP or logical clocks
5. **Validate timestamps**: Check for reasonable ranges and formats
6. **Index timestamp columns**: For efficient range queries
7. **Consider partitioning**: For large time-series data
8. **Handle edge cases**: Leap seconds, DST transitions, clock skew
9. **Test thoroughly**: Especially timezone and DST logic
10. **Document timezone handling**: Make it clear how timestamps are handled

## Conclusion

Timestamp management in distributed systems requires careful consideration of timezones, clock synchronization, and edge cases. By following these best practices and using appropriate tools and techniques, you can build robust systems that handle time correctly across different environments and user preferences.`,
      category: 'data',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '9 min read',
      tags: ['Timestamps', 'Distributed Systems', 'Timezones', 'Synchronization'],
      featured: false
    },
    {
      id: 8,
      title: 'Building Privacy-First Developer Tools',
      excerpt: 'How we built ByteToolbox with privacy as a core principle and why it matters for developers.',
      content: `Privacy should be a fundamental consideration when building developer tools. This article explains our approach to privacy-first development and why it matters for developers, users, and the broader tech ecosystem.

## Why Privacy Matters in Developer Tools

### The Current State of Privacy
In today's digital landscape, privacy violations are unfortunately common:
- **Data harvesting**: Tools collecting more data than necessary
- **Third-party tracking**: Analytics and advertising tracking users
- **Data breaches**: Sensitive information exposed through poor security
- **Surveillance capitalism**: Business models built on user data exploitation

### Why Developer Tools Are Different
Developer tools handle sensitive information:
- **Source code**: Intellectual property and business logic
- **API keys**: Access credentials and authentication tokens
- **Configuration data**: System settings and sensitive parameters
- **User data**: Information processed through the tools

## Our Privacy-First Principles

### 1. Data Minimization
\`\`\`javascript
// BAD: Collecting unnecessary data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  screenResolution: '1920x1080',
  timezone: 'America/New_York',
  language: 'en-US',
  referrer: 'https://google.com',
  sessionId: 'abc123',
  deviceFingerprint: 'xyz789'
};

// GOOD: Only collect what's necessary
const minimalData = {
  tool: 'json-formatter',
  timestamp: new Date().toISOString()
  // No personal information collected
};
\`\`\`

### 2. Client-Side Processing
\`\`\`javascript
// All processing happens in the browser
class PrivacyFirstTool {
  constructor() {
    this.data = null;
    this.processedData = null;
  }
  
  process(input) {
    // Process data locally, never send to server
    this.data = input;
    this.processedData = this.performTransformation(input);
    return this.processedData;
  }
  
  performTransformation(data) {
    // All transformations happen client-side
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
  
  // No server communication needed
  save() {
    // Save to localStorage or download as file
    localStorage.setItem('tool-data', JSON.stringify(this.processedData));
  }
}
\`\`\`

### 3. No Data Collection
\`\`\`javascript
// Privacy-first analytics (if needed)
class PrivacyAnalytics {
  constructor() {
    this.anonymousMetrics = {
      toolUsage: new Map(),
      errorCount: 0,
      sessionStart: Date.now()
    };
  }
  
  trackToolUsage(toolName) {
    // Only track tool usage, no personal data
    const count = this.anonymousMetrics.toolUsage.get(toolName) || 0;
    this.anonymousMetrics.toolUsage.set(toolName, count + 1);
  }
  
  trackError(error) {
    // Track error types, not user data
    this.anonymousMetrics.errorCount++;
    console.error('Tool error:', error.message);
  }
  
  // Send only anonymous, aggregated data
  sendMetrics() {
    const data = {
      toolUsage: Object.fromEntries(this.anonymousMetrics.toolUsage),
      errorCount: this.anonymousMetrics.errorCount,
      sessionDuration: Date.now() - this.anonymousMetrics.sessionStart
    };
    
    // Send to privacy-respecting analytics service
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}
\`\`\`

## Benefits of Privacy-First Development

### 1. User Trust
- **Transparency**: Users know exactly what happens to their data
- **Control**: Users have full control over their information
- **Security**: Reduced risk of data breaches and misuse

### 2. Legal Compliance
- **GDPR**: Easier compliance with privacy regulations
- **CCPA**: California Consumer Privacy Act compliance
- **PIPEDA**: Personal Information Protection and Electronic Documents Act

### 3. Competitive Advantage
- **Differentiation**: Stand out from competitors who collect data
- **User Preference**: Many users prefer privacy-focused tools
- **Future-Proofing**: Ready for stricter privacy regulations

## Conclusion

Building privacy-first developer tools is not just about compliance—it's about respecting users and building trust. By implementing client-side processing, data minimization, and transparent practices, we can create tools that are both powerful and privacy-respecting.

The key principles are:
1. **Process data locally** whenever possible
2. **Minimize data collection** to only what's necessary
3. **Be transparent** about data handling practices
4. **Give users control** over their data
5. **Design for privacy** from the ground up

Privacy-first development is not a limitation—it's an opportunity to build better, more trustworthy tools that users can rely on with confidence.`,
      category: 'security',
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '6 min read',
      tags: ['Privacy', 'Developer Tools', 'Security', 'Ethics'],
      featured: false
    },
    {
      id: 9,
      title: 'Modern JavaScript: ES6+ Features Every Developer Should Know',
      excerpt: 'Essential modern JavaScript features that will make you a more productive and efficient developer.',
      content: `JavaScript has evolved dramatically since ES6 (ES2015), introducing powerful features that have transformed how we write code. This comprehensive guide covers the most important modern JavaScript features that every developer should master to write cleaner, more maintainable, and more efficient code.

## 1. Arrow Functions

Arrow functions provide a concise syntax for writing function expressions and have lexical \`this\` binding:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const square = x => x * x;

// With no parameters
const greet = () => 'Hello World!';

// Returning object literal (need parentheses)
const createUser = (name, email) => ({ name, email });
\`\`\`

### When to Use Arrow Functions
- **Array methods**: \`map\`, \`filter\`, \`reduce\`
- **Event handlers**: When you want to preserve \`this\` context
- **Short, simple functions**: One-liners and simple transformations

## 2. Destructuring Assignment

Destructuring allows you to extract values from arrays or properties from objects into distinct variables:

\`\`\`javascript
// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary, tertiary] = colors;
console.log(primary); // 'red'

// Object destructuring
const user = { name: 'John', age: 30, email: 'john@example.com' };
const { name, age, email } = user;
console.log(name); // 'John'

// With default values
const { name, age = 25, city = 'Unknown' } = user;

// Renaming variables
const { name: fullName, age: userAge } = user;

// Nested destructuring
const user = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};
const { address: { city } } = user;
\`\`\`

## 3. Template Literals

Template literals provide an elegant way to work with strings and embed expressions:

\`\`\`javascript
const name = 'John';
const age = 30;

// Traditional string concatenation
const message = 'Hello, ' + name + '! You are ' + age + ' years old.';

// Template literal
const message = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const html = \`
  <div class="user-card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
}

const name = 'John';
const age = 30;
const highlighted = highlight\`Hello \${name}, you are \${age} years old!\`;
\`\`\`

## 4. Spread and Rest Operators

The spread operator (\`...\`) allows you to expand iterables, while the rest operator collects remaining elements:

\`\`\`javascript
// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Spread operator with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10

// Rest with destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // [3, 4, 5]
\`\`\`

## 5. Promises and Async/Await

Modern JavaScript provides elegant ways to handle asynchronous operations:

\`\`\`javascript
// Traditional Promise
function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(response => response.json())
    .then(data => data.user)
    .catch(error => console.error('Error:', error));
}

// Async/await
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Multiple async operations
async function fetchUserData(userId) {
  const [user, posts, comments] = await Promise.all([
    fetchUser(userId),
    fetchUserPosts(userId),
    fetchUserComments(userId)
  ]);
  
  return { user, posts, comments };
}
\`\`\`

## 6. Classes and Modules

ES6 introduced class syntax and module system:

\`\`\`javascript
// Class definition
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Getter
  get displayName() {
    return \`\${this.name} (\${this.email})\`;
  }
  
  // Method
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  // Static method
  static createAdmin(name, email) {
    const user = new User(name, email);
    user.isAdmin = true;
    return user;
  }
}

// Inheritance
class Admin extends User {
  constructor(name, email, permissions) {
    super(name, email);
    this.permissions = permissions;
  }
  
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

// Modules
// user.js
export class User { /* ... */ }
export const DEFAULT_ROLE = 'user';

// main.js
import { User, DEFAULT_ROLE } from './user.js';
import * as utils from './utils.js';
\`\`\`

## 7. Map, Set, and WeakMap/WeakSet

New data structures for better performance and functionality:

\`\`\`javascript
// Map - key-value pairs with any type of key
const userMap = new Map();
userMap.set('user1', { name: 'John', age: 30 });
userMap.set(123, 'Numeric key');
userMap.set(true, 'Boolean key');

// Set - unique values
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log(uniqueNumbers); // Set {1, 2, 3, 4, 5}

// WeakMap - keys are weakly referenced
const privateData = new WeakMap();
class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}
\`\`\`

## 8. Array Methods

Powerful array methods for functional programming:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);

// filter - select elements based on condition
const evens = numbers.filter(n => n % 2 === 0);

// reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);

// find - find first matching element
const firstEven = numbers.find(n => n % 2 === 0);

// some - check if any element matches
const hasEven = numbers.some(n => n % 2 === 0);

// every - check if all elements match
const allPositive = numbers.every(n => n > 0);

// flat - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = nested.flat(2); // [1, 2, 3, 4, 5, 6]

// flatMap - map and flatten in one step
const words = ['hello world', 'javascript is awesome'];
const allWords = words.flatMap(phrase => phrase.split(' '));
\`\`\`

## 9. Optional Chaining and Nullish Coalescing

Safe property access and default values:

\`\`\`javascript
const user = {
  name: 'John',
  address: {
    city: 'New York'
  }
};

// Optional chaining
const city = user.address?.city; // 'New York'
const country = user.address?.country; // undefined (no error)

// Nullish coalescing
const displayName = user.name ?? 'Anonymous'; // 'John'
const age = user.age ?? 0; // 0

// Combined
const userCountry = user.address?.country ?? 'Unknown';
\`\`\`

## 10. Generators and Iterators

Advanced control flow with generators:

\`\`\`javascript
// Generator function
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// Infinite generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
\`\`\`

## Best Practices

### 1. Use Modern Features Consistently
- Prefer arrow functions for short, simple functions
- Use destructuring for cleaner variable assignment
- Leverage template literals for string interpolation

### 2. Handle Asynchronous Code Properly
- Use async/await for cleaner async code
- Always handle errors with try/catch
- Use Promise.all for parallel operations

### 3. Choose the Right Data Structure
- Use Map for key-value pairs with non-string keys
- Use Set for unique value collections
- Use WeakMap for private data in classes

### 4. Write Functional Code
- Use array methods instead of loops when possible
- Prefer immutable operations
- Avoid side effects in pure functions

## Conclusion

Modern JavaScript features have transformed the language, making it more expressive, efficient, and maintainable. By mastering these ES6+ features, you'll write cleaner code, solve problems more elegantly, and become a more effective JavaScript developer.

The key is to understand when and how to use each feature appropriately. Start with the basics like arrow functions and destructuring, then gradually incorporate more advanced features like generators and modules as your projects require them.`,
      author: 'ByteToolbox Team',
      date: '2025-09-04',
      readTime: '12 min read',
      tags: ['JavaScript', 'ES6', 'Modern Development', 'Programming'],
      featured: true
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              Developer Blog & Tips
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from our collection of developer tips, tutorials, and best practices. Covering JSON, security, performance, and more to help you become a better developer.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-secondary'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{selectedPost.tags[0]}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <h1 className="text-3xl font-bold text-foreground mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div 
                    className="whitespace-pre-wrap text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedPost.content
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code class="text-sm">$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>')
                        .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-medium mt-4 mb-2 text-foreground">$1</h4>')
                        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
                        .replace(/<p class="mb-4"><\/p>/g, '')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
