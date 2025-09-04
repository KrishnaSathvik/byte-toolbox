import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Wrench, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  { name: 'JSON Formatter', path: '/json-formatter', icon: '{}' },
  { name: 'Base64 Encoder', path: '/base64', icon: '⚡' },
  { name: 'Hash Generator', path: '/hash', icon: '#' },
  { name: 'UUID Generator', path: '/uuid', icon: '🔑' },
  { name: 'Regex Tester', path: '/regex', icon: '.*' },
  { name: 'Timestamp Converter', path: '/timestamp', icon: '⏰' }
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
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToolSelect = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-nav-background border-b border-border sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">DevToolbox</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === tool.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <span className="mr-2">{tool.icon}</span>
                  {tool.name.split(' ')[0]}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 text-muted-foreground"
              >
                <Search className="w-4 h-4" />
                Search tools...
                <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === tool.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span>{tool.icon}</span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Command Palette */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[90vw] max-w-lg bg-card border border-border rounded-lg shadow-xl card-shadow-xl">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search developer tools..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded">ESC</kbd>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool, index) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <div>
                        <div className="font-medium text-foreground">{tool.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Developer tool for {tool.name.toLowerCase()}
                        </div>
                      </div>
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