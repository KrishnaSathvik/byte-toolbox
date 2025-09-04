import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Code2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Available developer tools in the navigation
 */
const tools = [
  { name: 'JSON', path: '/json-formatter', full: 'JSON Formatter' },
  { name: 'Base64', path: '/base64', full: 'Base64 Encoder' },
  { name: 'Hash', path: '/hash', full: 'Hash Generator' },
  { name: 'UUID', path: '/uuid', full: 'UUID Generator' },
  { name: 'Regex', path: '/regex', full: 'Regex Tester' },
  { name: 'Time', path: '/timestamp', full: 'Timestamp Converter' }
];

/**
 * Navigation - The main navigation component for ByteToolbox
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Command palette search (Ctrl/Cmd + K)
 * - Theme toggle (dark/light mode)
 * - Active route highlighting
 * - Tool search functionality
 * - ByteToolbox branding with logo
 * 
 * @example
 * ```tsx
 * // Used in ToolLayout or main app layout
 * <Navigation />
 * 
 * // Automatically handles:
 * // - Route highlighting based on current location
 * // - Mobile responsive behavior
 * // - Keyboard shortcuts (Cmd/Ctrl + K for search)
 * // - Theme switching
 * ```
 * 
 * Keyboard Shortcuts:
 * - `Ctrl/Cmd + K` - Open command palette search
 * - `Escape` - Close search palette
 * 
 * Responsive Behavior:
 * - Desktop: Horizontal navigation with all tools visible
 * - Mobile: Hamburger menu with collapsible tool list
 * - Search: Hidden on small screens, visible on sm+
 * 
 * @returns JSX element containing the complete navigation interface
 */
export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.full.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToolSelect = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-nav-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">ByteToolbox</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === tool.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs">
                  ⌘K
                </kbd>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <div className="space-y-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === tool.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {tool.full}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Command Palette */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[90vw] max-w-lg bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded">ESC</kbd>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    >
                      <div className="font-medium text-foreground">{tool.full}</div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No tools found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};