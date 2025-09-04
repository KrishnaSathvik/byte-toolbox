import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Search, Zap, Shield, Clock } from 'lucide-react';

const tools = [
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    description: 'Format, validate and minify JSON data with syntax highlighting',
    keywords: ['json', 'format', 'validate', 'prettify', 'minify']
  },
  {
    name: 'Base64 Encoder',
    path: '/base64',
    description: 'Encode and decode Base64 strings with Unicode support and file handling',
    keywords: ['base64', 'encode', 'decode', 'unicode', 'file']
  },
  {
    name: 'Hash Generator',
    path: '/hash',
    description: 'Generate SHA-256, SHA-512, MD5 and SHA-1 hashes securely',
    keywords: ['hash', 'sha256', 'md5', 'checksum', 'security']
  },
  {
    name: 'UUID Generator',
    path: '/uuid',
    description: 'Generate unique identifiers in bulk with customizable options',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generate']
  },
  {
    name: 'Regex Tester',
    path: '/regex',
    description: 'Test regular expressions with real-time matching and validation',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'test']
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp',
    description: 'Convert Unix timestamps to human readable dates and vice versa',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert']
  }
];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Always Available',
    description: 'Works offline once loaded'
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Developer Tools</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professional developer tools that run entirely in your browser. 
          Fast, secure, and always available.
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>
      </section>
      
      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="bg-card/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Why DevToolbox?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nav-background border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            Built for developers. All tools run locally in your browser.
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
      className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
    >
      <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4">
        {tool.description}
      </p>
      
      <div className="text-primary text-sm font-medium">
        Try it now →
      </div>
    </Link>
  );
};