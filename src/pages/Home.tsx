import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Shield, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

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

  useSEO({
    title: 'ByteToolBox - Free Online Developer Tools | JSON, Base64, Hash, UUID',
    description: 'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
    keywords: 'developer tools, JSON formatter, Base64 encoder, hash generator, UUID generator, regex tester, timestamp converter, online tools, free tools, web development, programming utilities, privacy-focused',
    canonical: 'https://www.bytetoolbox.com/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'ByteToolBox - Professional Developer Tools',
      'description': 'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
      'url': 'https://www.bytetoolbox.com',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'creator': {
        '@type': 'Organization',
        'name': 'ByteToolBox',
        'url': 'https://www.bytetoolbox.com'
      },
      'featureList': [
        'JSON Formatter and Validator',
        'Base64 Encoder and Decoder', 
        'Hash Generator (MD5, SHA-1, SHA-256, SHA-512)',
        'UUID Generator (v1, v4, v7)',
        'Regular Expression Tester',
        'Timestamp Converter'
      ],
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '1.0.0',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full width */}
      <section className="w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            <span className="gradient-text">Developer Tools</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Professional developer tools that run entirely in your browser. 
            Fast, secure, and always available.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8 lg:mb-12">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Grid - Full width */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>
        
          {filteredTools.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No tools found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
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
        </div>
      </section>

      {/* Features - Full width */}
      <section className="w-full bg-card/20 border-y border-border">
        <div className="px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center mb-6 sm:mb-8 lg:mb-12">
              Why ByteToolBox?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg text-primary mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
  return (
    <Link 
      to={tool.path}
      className="group block p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors touch-target"
    >
      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4 leading-relaxed">
        {tool.description}
      </p>
      
      <div className="text-primary text-xs sm:text-sm font-medium">
        Try it now →
      </div>
    </Link>
  );
};