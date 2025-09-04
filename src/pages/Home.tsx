import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Search, Zap, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    icon: '{}',
    description: 'Format, validate and minify JSON with professional syntax highlighting',
    category: 'Data Processing',
    keywords: ['json', 'format', 'validate', 'prettify', 'minify'],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Base64 Encoder',
    path: '/base64',
    icon: '⚡',
    description: 'Encode and decode Base64 strings with Unicode support and file handling',
    category: 'Encoding',
    keywords: ['base64', 'encode', 'decode', 'unicode', 'file'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Hash Generator',
    path: '/hash',
    icon: '#',
    description: 'Generate SHA-256, SHA-512, MD5 and SHA-1 hashes securely',
    category: 'Security',
    keywords: ['hash', 'sha256', 'md5', 'checksum', 'security'],
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'UUID Generator',
    path: '/uuid',
    icon: '🔑',
    description: 'Generate unique identifiers in bulk with customizable options',
    category: 'Utilities',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generate'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Regex Tester',
    path: '/regex',
    icon: '.*',
    description: 'Test regular expressions with real-time matching and validation',
    category: 'Text Processing',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'test'],
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp',
    icon: '⏰',
    description: 'Convert Unix timestamps to human readable dates and vice versa',
    category: 'Date & Time',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert'],
    color: 'from-violet-500 to-purple-500'
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips - everything runs in your browser',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device - complete privacy and security guaranteed',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Always Available',
    description: 'Works offline once loaded - no internet required for processing tools',
    gradient: 'from-blue-400 to-indigo-500'
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
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8 hover:bg-primary/20 transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Developer Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Developer Tools</span>
            <br />
            <span className="text-4xl md:text-6xl text-foreground/80">Made Simple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional-grade tools that run entirely in your browser. No servers, no tracking, 
            no complexity - just powerful utilities that work instantly and keep your data private.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl"
              asChild
            >
              <Link to="/json-formatter">
                Start with JSON Formatter
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold rounded-xl border-border/50 hover:border-primary/30"
            >
              Browse All Tools
            </Button>
          </div>
          
          {/* Search */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>6 Professional Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Choose Your Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional utilities designed for developers, by developers
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.path} tool={tool} index={index} />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              Try searching for something else or explore all our tools
            </p>
            <Button 
              onClick={() => setSearchQuery('')}
              className="btn-primary"
            >
              Clear Search
            </Button>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-card/30 to-card/10 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Choose DevToolbox?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with modern web technologies for the best possible developer experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-8 glass-card rounded-2xl hover-lift">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
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
      <footer className="bg-nav-background/50 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="text-lg font-semibold">DevToolbox</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Built with ❤️ for developers. All tools run locally in your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>Made with React & TypeScript</span>
              <span>•</span>
              <span>Powered by Monaco Editor</span>
              <span>•</span>
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ToolCard = ({ tool, index }: { tool: typeof tools[0]; index: number }) => {
  return (
    <Link 
      to={tool.path}
      className="group block p-6 glass-card rounded-2xl hover-lift transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
          <div className={`relative w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
            {tool.icon}
          </div>
        </div>
        <div className="px-3 py-1 bg-secondary/50 text-xs text-secondary-foreground rounded-full font-medium">
          {tool.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-foreground group-hover:gradient-text transition-all">
          {tool.name}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
        
        <div className="flex items-center text-primary font-medium pt-2">
          <span>Try it now</span>
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};