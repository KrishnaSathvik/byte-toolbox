# 🛠️ ByteToolbox

> **Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 Overview

ByteToolbox is a modern, professional collection of essential developer tools designed to streamline your development workflow. Built with React, TypeScript, and Vite, it provides a fast, responsive, and intuitive interface for common development tasks.

## ✨ Features

### 🔧 **Developer Tools**
- **JSON Formatter** - Format, validate, and minify JSON with syntax highlighting
- **Base64 Encoder/Decoder** - Encode and decode Base64 with file support
- **Hash Generator** - Generate cryptographic hashes (SHA-256, SHA-512, MD5, SHA-1)
- **UUID Generator** - Generate UUIDs in bulk with formatting options
- **Regex Tester** - Test regular expressions with real-time highlighting
- **Timestamp Converter** - Convert between timestamps and human-readable dates

### 🎨 **Modern UI/UX**
- **Dark/Light Theme** - Automatic system theme detection with manual toggle
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Professional Interface** - Clean, modern design with shadcn/ui components
- **Monaco Editor** - VS Code-powered editor for syntax highlighting
- **Command Palette** - Quick navigation with Ctrl/Cmd + K

### 🚀 **Performance & Quality**
- **TypeScript** - Full type safety and excellent developer experience
- **Vite** - Lightning-fast development and build times
- **Component Documentation** - Comprehensive JSDoc documentation
- **Unit Tests** - Full test coverage with Vitest
- **Accessibility** - WCAG compliant with keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Editor**: Monaco Editor (VS Code)
- **Testing**: Vitest, React Testing Library
- **Documentation**: TypeDoc, JSDoc
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/KrishnaSathvik/byte-toolbox.git

# Navigate to the project directory
cd byte-toolbox

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Documentation
npm run docs:build   # Generate HTML documentation
npm run docs:serve   # Serve documentation with live reload
npm run docs:clean   # Clean documentation folder

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── tools/           # Tool components (JSON, Base64, etc.)
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── __tests__/       # Component tests
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── test/                # Test setup and utilities
```

## 🔧 Tool Components

### JSON Formatter
- **Features**: Format, validate, minify JSON
- **Editor**: Monaco Editor with syntax highlighting
- **Validation**: Real-time error detection and reporting
- **Export**: Copy to clipboard and download functionality

### Base64 Encoder/Decoder
- **Features**: Encode/decode Base64 with Unicode support
- **File Support**: Upload files up to 10MB
- **Variants**: Standard and URL-safe Base64
- **Binary Support**: Handle binary files correctly

### Hash Generator
- **Algorithms**: SHA-256, SHA-512, SHA-1, MD5
- **Security**: Visual warnings for deprecated algorithms
- **File Support**: Hash file contents
- **Comparison**: Compare hashes for verification

### UUID Generator
- **Bulk Generation**: Generate 1-1000 UUIDs at once
- **Formatting**: Uppercase, remove hyphens options
- **Export**: Copy individual or all UUIDs
- **Download**: Save as text file

### Regex Tester
- **Real-time Testing**: Live regex matching and highlighting
- **Flags**: All JavaScript regex flags supported
- **Pattern Library**: Common regex patterns included
- **Match Details**: Groups, positions, and match information

### Timestamp Converter
- **Bidirectional**: Convert timestamps ↔ human-readable dates
- **Timezones**: Multiple timezone support
- **Live Updates**: Current time display
- **Relative Time**: Human-readable relative time

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:

- **Form Components**: Button, Input, Textarea, Select, Checkbox, Switch
- **Layout Components**: Card, Separator, ScrollArea, Resizable
- **Navigation**: NavigationMenu, Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlay**: Dialog, Sheet, Popover, Tooltip
- **Data Display**: Table, Badge, Avatar, Calendar

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

**Test Coverage**:
- Component unit tests with React Testing Library
- Router context testing
- Mocked external dependencies
- Accessibility testing

## 📖 Documentation

### Component Documentation
- **JSDoc Comments**: Comprehensive documentation for all components
- **TypeScript Integration**: Full type safety and IntelliSense
- **Usage Examples**: Practical code examples for every component
- **API Reference**: Complete props and methods documentation

### Generate Documentation
```bash
# Generate HTML documentation
npm run docs:build

# Serve documentation locally
npm run docs:serve
```

**Documentation Features**:
- Interactive component browser
- Search functionality
- Code examples with syntax highlighting
- Type definitions and interfaces

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

### Code Standards
- **TypeScript**: All code must be properly typed
- **Testing**: New features require tests
- **Documentation**: Update JSDoc comments for changes
- **Linting**: Code must pass ESLint checks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Lucide](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/KrishnaSathvik/byte-toolbox/issues)
- **Discussions**: [GitHub Discussions](https://github.com/KrishnaSathvik/byte-toolbox/discussions)
- **Email**: [Your Email]

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=KrishnaSathvik/byte-toolbox&type=Date)](https://star-history.com/#KrishnaSathvik/byte-toolbox&Date)

---

**Made with ❤️ by [Your Name]**

[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white)](https://github.com/KrishnaSathvik)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/krishnasathvik/)
