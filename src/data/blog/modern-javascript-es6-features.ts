export const content = `JavaScript has evolved dramatically since ES6 (ES2015), introducing powerful features that have transformed how we write code. This comprehensive guide covers the most important modern JavaScript features that every developer should master to write cleaner, more maintainable, and more efficient code.

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

The key is to understand when and how to use each feature appropriately. Start with the basics like arrow functions and destructuring, then gradually incorporate more advanced features like generators and modules as your projects require them.`;
