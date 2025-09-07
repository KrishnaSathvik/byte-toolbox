import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Example data for tool demonstrations
 */
interface Example {
  name: string;
  input: string;
}

/**
 * Breadcrumb item interface
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Props for the ToolLayout component
 */
interface ToolLayoutProps {
  /** The main content/UI of the tool - typically the tool's input/output interface */
  children: ReactNode;
  /** Optional title for the tool */
  title?: string;
  /** Optional description for the tool */
  description?: string;
  /** Optional examples for the tool */
  examples?: Example[];
  /** Optional callback when an example is selected */
  onFillExample?: (example: Example) => void;
  /** Optional breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * ToolLayout - A reusable wrapper component for developer tools
 * 
 * Provides a consistent layout structure for all tools in the ByteToolBox application.
 * Includes main content area with proper spacing and responsive design.
 * 
 * @example
 * ```tsx
 * <ToolLayout>
 *   <YourToolContent />
 * </ToolLayout>
 * ```
 * 
 * @param props - The component props
 * @returns JSX element containing the tool page layout
 */
export const ToolLayout = ({ 
  children, 
  title, 
  description, 
  examples, 
  onFillExample,
  breadcrumbs 
}: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Tool Content - Responsive width with better desktop sizing */}
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-4xl xl:max-w-5xl mx-auto">
          <div className="mx-1 sm:mx-0">
            {/* Breadcrumb Navigation */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="p-4 sm:p-6 border-b border-border">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          {item.href ? (
                            <BreadcrumbLink asChild>
                              <Link to={item.href}>{item.label}</Link>
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            )}

            {/* Tool Header */}
            {(title || description) && (
              <div className="p-4 sm:p-6 border-b border-border">
                <div className="text-center">
                  {title && (
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-2 sm:mb-3">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}


            {/* Tool Content */}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};