export const content = `JSON is the backbone of modern API development, but many developers unknowingly make common mistakes that can lead to security vulnerabilities, performance issues, and maintenance nightmares. Validate payloads with the [JSON Formatter](/json-formatter) before you ship.

In this guide, we'll cover the essential best practices that every developer should know when working with JSON in APIs.

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

By following these practices, you'll create more robust, secure, and maintainable APIs that provide a better experience for both developers and end users. Remember, good JSON practices are not just about syntax—they're about building reliable systems that scale.`;
