# Breadcrumb Component Usage Guide

The breadcrumb component provides navigation context for users, showing their current location within the site hierarchy.

## Components

### Core Components

- `Breadcrumb` - Main container with proper ARIA labeling
- `BreadcrumbList` - Ordered list container for breadcrumb items
- `BreadcrumbItem` - Individual breadcrumb item wrapper
- `BreadcrumbLink` - Clickable breadcrumb link
- `BreadcrumbPage` - Current page (non-clickable)
- `BreadcrumbSeparator` - Separator between items (default: ChevronRight)
- `BreadcrumbEllipsis` - Ellipsis for truncated paths

## Basic Usage

### Simple Navigation

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/tools">Tools</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>JSON Formatter</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With ToolLayout Integration

```tsx
import { ToolLayout } from '@/components/ToolLayout';

<ToolLayout
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/#tools' },
    { label: 'JSON Formatter' }
  ]}
>
  {/* Your tool content */}
</ToolLayout>
```

## Advanced Usage

### Custom Separator

```tsx
<BreadcrumbSeparator>
  <span className="text-muted-foreground">→</span>
</BreadcrumbSeparator>
```

### With Ellipsis for Long Paths

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/tools">Tools</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### External Links

```tsx
<BreadcrumbItem>
  <BreadcrumbLink href="https://example.com">
    External Link
  </BreadcrumbLink>
</BreadcrumbItem>
```

## Styling

The breadcrumb component uses Tailwind CSS classes and follows your app's design system:

- `text-muted-foreground` - Default text color
- `hover:text-foreground` - Hover state for links
- `font-normal` - Current page styling
- `gap-1.5` - Spacing between items
- `sm:gap-2.5` - Responsive spacing

## Accessibility

- Proper ARIA labeling with `aria-label="breadcrumb"`
- Screen reader support with `aria-current="page"` for current page
- Keyboard navigation support
- Semantic HTML structure with `<nav>` and `<ol>` elements

## Best Practices

1. **Keep it simple** - Don't exceed 5-6 breadcrumb levels
2. **Use ellipsis** - For very deep navigation, use `BreadcrumbEllipsis`
3. **Current page** - Always use `BreadcrumbPage` for the current page
4. **Consistent separators** - Use the same separator throughout your app
5. **Mobile friendly** - The component is responsive by default

## Integration with ToolLayout

The `ToolLayout` component now supports breadcrumbs as an optional prop:

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string; // Optional - if not provided, renders as current page
}
```

This makes it easy to add breadcrumbs to any tool page without duplicating the breadcrumb structure.

## Examples in Your App

Check out these files for real-world usage:

- `src/pages/JsonFormatterPage.tsx` - Shows ToolLayout integration
- `src/components/BreadcrumbExample.tsx` - Comprehensive examples
- `src/components/ToolLayout.tsx` - Breadcrumb integration logic
