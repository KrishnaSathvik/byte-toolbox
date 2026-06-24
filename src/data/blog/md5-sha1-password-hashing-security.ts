export const content = `Hash algorithms are fundamental to web security, but not all hashes are created equal. MD5 and SHA-1, once industry standards, are now considered cryptographically broken and should never be used for password hashing or any security-critical applications. The [Hash Generator](/hash) can help you compare legacy digests during migration — not for storing new passwords.

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

Remember: security is not about making attacks impossible, but about making them impractical. Modern password hashing algorithms achieve this by being intentionally slow and memory-intensive, making brute force attacks economically unfeasible.`;
