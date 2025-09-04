# Testing Setup

This project is now configured with Vitest for testing React components and utilities.

## What's Included

- **Vitest**: Fast unit testing framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **jsdom**: DOM environment for testing

## Configuration Files

- `vitest.config.ts` - Vitest configuration
- `src/test/setup.ts` - Test setup and mocks

## Example Tests

- `src/components/__tests__/Navigation.test.tsx` - Navigation component tests
- `src/components/tools/__tests__/UuidGenerator.test.tsx` - UUID generator tests
- `src/lib/__tests__/utils.test.ts` - Utility function tests

## Running Tests

You'll need to add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

Then run:
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run with Vitest UI (requires `@vitest/ui`)

## Writing Tests

Tests are located in `__tests__` folders next to the components they test. Use the pattern:

```tsx
import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'
import { YourComponent } from '../YourComponent'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Mocks

Common mocks are set up in `src/test/setup.ts`:
- `matchMedia` for responsive components
- `localStorage` for storage operations
- Import `vi` from vitest for creating custom mocks