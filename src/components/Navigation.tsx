import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Code2, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  { name: 'JSON', path: '/json-formatter', icon: '{}', full: 'JSON Formatter' },
  { name: 'Base64', path: '/base64', icon: '⚡', full: 'Base64 Encoder' },
  { name: 'Hash', path: '/hash', icon: '#', full: 'Hash Generator' },
  { name: 'UUID', path: '/uuid', icon: '🔑', full: 'UUID Generator' },
  { name: 'Regex', path: '/regex', icon: '.*', full: 'Regex Tester' },
  { name: 'Time', path: '/timestamp', icon: '⏰', full: 'Timestamp Converter' }
];

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
      <nav className="bg-nav-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold gradient-text">DevToolbox</span>
                <span className="text-xs text-muted-foreground -mt-1">Professional Tools</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === tool.path
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{tool.icon}</span>
                    {tool.name}
                  </span>
                  {location.pathname === tool.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl opacity-20"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
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
            <div className="lg:hidden py-4 border-t border-border/50">
              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === tool.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <span className="text-xl">{tool.icon}</span>
                    <span className="text-center">{tool.name}</span>
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
            <div className="w-[90vw] max-w-lg glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-border/50">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <input
                  type="text"
                  placeholder="Search developer tools..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded-md">ESC</kbd>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <span className="text-lg">{tool.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{tool.full}</div>
                        <div className="text-sm text-muted-foreground">
                          Professional {tool.name.toLowerCase()} tool
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No tools found for "{searchQuery}"</p>
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