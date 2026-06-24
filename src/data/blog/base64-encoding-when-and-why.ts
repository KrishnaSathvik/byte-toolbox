export const content = `Base64 encoding is a fundamental technique in web development, but many developers don't fully understand when and why to use it. Use the [Base64 Encoder & Decoder](/base64) to encode, decode, and verify round-trips locally in your browser.

This guide covers everything you need to know about Base64 encoding, from basic concepts to advanced use cases and best practices.

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

By understanding when and how to use Base64 encoding effectively, you can build more robust and efficient web applications that handle binary data gracefully.`;
