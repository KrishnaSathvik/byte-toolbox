import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Search, Zap, Shield, Clock } from 'lucide-react';

const tools = [
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    icon: '{}',
    description: 'Format, validate and minify JSON data with syntax highlighting',
    category: 'Data Processing',
    keywords: ['json', 'format', 'validate', 'prettify', 'minify']
  },
  {
    name: 'Base64 Encoder',
    path: '/base64',
    icon: '⚡',
    description: 'Encode and decode Base64 strings with Unicode support',
    category: 'Encoding',
    keywords: ['base64', 'encode', 'decode', 'unicode', 'file']
  },
  {
    name: 'Hash Generator',
    path: '/hash',
    icon: '#',
    description: 'Generate SHA-256, SHA-512, MD5 and SHA-1 hashes',
    category: 'Security',
    keywords: ['hash', 'sha256', 'md5', 'checksum', 'security']
  },
  {
    name: 'UUID Generator',
    path: '/uuid',
    icon: '🔑',
    description: 'Generate unique identifiers in bulk with custom options',
    category: 'Utilities',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generate']
  },
  {
    name: 'Regex Tester',
    path: '/regex',
    icon: '.*',
    description: 'Test regular expressions with real-time matching',
    category: 'Text Processing',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'test']
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp',
    icon: '⏰',
    description: 'Convert Unix timestamps to human readable dates',
    category: 'Date & Time',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert']
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'All processing happens instantly in your browser with no server round-trips'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device - complete privacy and security'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Always Available',
    description: 'Works offline once loaded - no internet required for processing'
  }
];

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-app-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="gradient-text">Developer Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Free, fast, and secure online tools for developers. Process data instantly in your browser 
            with professional-grade editors and zero server dependencies.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground mb-16">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>6 Professional Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>100% Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>No Registration</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.path} tool={tool} />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-foreground mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try searching for something else or{' '}
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline"
              >
                clear your search
              </button>
            </p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">
            Why Choose DevToolbox?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nav-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              Built with ❤️ for developers. All tools run locally in your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
  return (
    <Link 
      to={tool.path}
      className="group block p-6 bg-card hover:bg-card/80 border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl mb-2">{tool.icon}</div>
        <div className="px-2 py-1 bg-secondary/50 text-xs text-secondary-foreground rounded-md">
          {tool.category}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {tool.description}
      </p>
      
      <div className="mt-4 flex items-center text-primary text-sm font-medium">
        Try it now 
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
};