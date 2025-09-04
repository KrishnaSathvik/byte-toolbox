# Documentation Website Setup

This project is now configured with TypeDoc to generate a beautiful documentation website from JSDoc comments.

## What's Included

- **TypeDoc**: Documentation generator for TypeScript projects
- **Custom Theme**: Dark theme with professional styling
- **Component Coverage**: All key components documented with JSDoc
- **Interactive Navigation**: Sidebar navigation with categories and search
- **Responsive Design**: Mobile-friendly documentation layout

## Configuration Files

- `typedoc.json` - TypeDoc configuration and entry points
- `typedoc-custom.css` - Custom styling for dark theme
- `COMPONENT-DOCUMENTATION.md` - Documentation strategy overview

## Documented Components

- **Tool Components**: JsonFormatter, HashGenerator, UuidGenerator, RegexTester, TimestampConverter, Base64Encoder
- **Core Infrastructure**: ToolLayout, Navigation
- **Theme Management**: ThemeProvider, ThemeToggle
- **UI Components**: Monaco Editor and other custom components

## Generating Documentation

You'll need to add these scripts to your `package.json`:

```json
{
  "scripts": {
    "docs:build": "typedoc",
    "docs:serve": "typedoc --watch --serve",
    "docs:clean": "rm -rf docs"
  }
}
```

Then run:
- `npm run docs:build` - Generate static documentation website
- `npm run docs:serve` - Generate and serve with live reload (for development)
- `npm run docs:clean` - Clean generated docs

## Viewing Documentation

After running `npm run docs:build`:

1. **Open `docs/index.html`** in your browser
2. **Or serve it locally:**
   ```bash
   # Using Python (if installed)
   cd docs && python -m http.server 8000
   
   # Using Node.js serve package
   npx serve docs
   
   # Using VS Code Live Server extension
   # Right-click docs/index.html -> "Open with Live Server"
   ```

## Deployment Options

### GitHub Pages
1. Push the `docs` folder to your repo
2. Go to repo Settings > Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/docs` folder

### Netlify
1. Drag the `docs` folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repo and set build command to `npm run docs:build`

### Vercel
1. Connect your repo to Vercel
2. Set build command: `npm run docs:build`
3. Set output directory: `docs`

## Features

✅ **Professional Documentation** with:
- All JSDoc comments rendered as HTML
- Interactive navigation sidebar with categories
- Search functionality across all components
- Component hierarchy and relationships
- Usage examples and code snippets
- Dark theme matching your app design
- Mobile responsive layout

✅ **Developer Experience**:
- Type information for all props and methods
- Inheritance chains and interfaces
- Cross-referenced links between components
- Source code links to GitHub
- Module organization by categories

## Customization

You can modify `typedoc.json` to:
- **Change theme**: Set `"theme": "minimal"` or install custom themes
- **Add more files**: Add to `entryPoints` array
- **Custom branding**: Add logo with `"logo": "./logo.png"`
- **Plugin support**: Add TypeDoc plugins for extra features
- **Categories**: Modify `categoryOrder` for custom organization

## Documentation Categories

Your documentation is organized into:

- **📖 Tool Components**: All developer utility tools
- **🏗️ Core Infrastructure**: Layout and navigation components  
- **🎨 Theme Management**: Theme provider and toggle components
- **🔧 UI Components**: Reusable UI elements
- **📝 API Reference**: Detailed technical documentation

## Writing Documentation

For new components, follow JSDoc best practices:

```tsx
/**
 * A reusable button component with multiple variants
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 * 
 * @param props - The component props
 * @param props.variant - Button style variant
 * @param props.size - Button size
 * @param props.children - Button content
 */
export const Button = ({ variant, size, children }: ButtonProps) => {
  // Component implementation
}
```

This creates a professional documentation site perfect for team members, contributors, and your portfolio! 🚀