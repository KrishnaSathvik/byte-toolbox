import { ToolLayout } from '@/components/ToolLayout';
import { CheckCircle, XCircle, Star, Zap, Shield, DollarSign, Users, Code2 } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Tool Comparisons page
 * 
 * This page compares ByteToolBox with other popular developer tool websites.
 * Helps users understand the advantages of choosing ByteToolBox.
 */
export const Comparisons = () => {
  useSEO({
    title: 'ByteToolBox vs Other Developer Tools | Feature Comparison & Reviews',
    description: 'Compare ByteToolBox with other popular developer tool websites. See why developers choose ByteToolBox for privacy, speed, and comprehensive tool coverage.',
    keywords: 'developer tools comparison, JSON formatter comparison, Base64 encoder comparison, hash generator comparison, tool reviews, developer utilities comparison',
    canonical: 'https://www.bytetoolbox.com/comparisons',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'ByteToolBox vs Other Developer Tools',
      'description': 'Comprehensive comparison of ByteToolBox with other popular developer tool websites.',
      'url': 'https://www.bytetoolbox.com/comparisons',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'ByteToolBox',
        'url': 'https://www.bytetoolbox.com'
      },
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const competitors = [
    {
      name: 'JSONFormatter.org',
      url: 'https://jsonformatter.org',
      description: 'Popular JSON formatter with multiple tools',
      features: {
        json: true,
        base64: true,
        hash: false,
        uuid: false,
        regex: true,
        timestamp: false
      },
      pros: ['Well-established', 'Multiple tools', 'Good UI'],
      cons: ['Limited tool selection', 'No privacy focus', 'Ads everywhere'],
      rating: 3.5
    },
    {
      name: 'Base64Encode.org',
      url: 'https://base64encode.org',
      description: 'Simple Base64 encoder/decoder',
      features: {
        json: false,
        base64: true,
        hash: false,
        uuid: false,
        regex: false,
        timestamp: false
      },
      pros: ['Simple interface', 'Fast encoding'],
      cons: ['Single tool only', 'No privacy features', 'Basic functionality'],
      rating: 3.0
    },
    {
      name: 'Regex101.com',
      url: 'https://regex101.com',
      description: 'Advanced regex tester and debugger',
      features: {
        json: false,
        base64: false,
        hash: false,
        uuid: false,
        regex: true,
        timestamp: false
      },
      pros: ['Excellent regex features', 'Multiple languages', 'Detailed explanations'],
      cons: ['Single tool only', 'Complex interface', 'No privacy focus'],
      rating: 4.0
    },
    {
      name: 'UUIDGenerator.net',
      url: 'https://uuidgenerator.net',
      description: 'UUID generator with multiple versions',
      features: {
        json: false,
        base64: false,
        hash: false,
        uuid: true,
        regex: false,
        timestamp: false
      },
      pros: ['Multiple UUID versions', 'Bulk generation'],
      cons: ['Single tool only', 'No privacy features', 'Basic interface'],
      rating: 3.5
    },
    {
      name: 'EpochConverter.com',
      url: 'https://epochconverter.com',
      description: 'Timestamp converter and calculator',
      features: {
        json: false,
        base64: false,
        hash: false,
        uuid: false,
        regex: false,
        timestamp: true
      },
      pros: ['Comprehensive timestamp features', 'Multiple formats'],
      cons: ['Single tool only', 'No privacy focus', 'Outdated design'],
      rating: 3.5
    }
  ];

  const byteToolboxFeatures = {
    json: true,
    base64: true,
    hash: true,
    uuid: true,
    regex: true,
    timestamp: true
  };

  const comparisonFeatures = [
    {
      name: 'Privacy & Security',
      description: 'All processing happens locally in your browser',
      byteToolbox: '✅ Complete privacy',
      competitors: '❌ Data sent to servers'
    },
    {
      name: 'Tool Selection',
      description: 'Comprehensive collection of developer tools',
      byteToolbox: '✅ 6 essential tools',
      competitors: '❌ Limited selection'
    },
    {
      name: 'Performance',
      description: 'Fast, responsive tools with modern technology',
      byteToolbox: '✅ Lightning fast',
      competitors: '❌ Varies by site'
    },
    {
      name: 'User Experience',
      description: 'Consistent, modern interface across all tools',
      byteToolbox: '✅ Unified design',
      competitors: '❌ Inconsistent UI'
    },
    {
      name: 'File Support',
      description: 'Upload and process files directly',
      byteToolbox: '✅ Full file support',
      competitors: '❌ Limited file support'
    },
    {
      name: 'Mobile Friendly',
      description: 'Works perfectly on all devices',
      byteToolbox: '✅ Fully responsive',
      competitors: '❌ Varies by site'
    },
    {
      name: 'Offline Support',
      description: 'Works without internet connection',
      byteToolbox: '✅ Works offline',
      competitors: '❌ Requires internet'
    },
    {
      name: 'No Registration',
      description: 'Use all tools without creating an account',
      byteToolbox: '✅ No account needed',
      competitors: '❌ Some require registration'
    }
  ];

  return (
    <ToolLayout
      title="ByteToolBox vs Competitors"
      description="Compare ByteToolBox with other popular developer tool websites. See why ByteToolBox is the best choice for privacy-focused, comprehensive developer tools."
    >
      <div className="p-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the key advantages that make ByteToolBox the preferred choice for
            developers who value privacy, performance, and comprehensive functionality.
          </p>
        </div>

        {/* Key Advantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">All processing happens locally in your browser. Your data never leaves your device.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Code2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">6 Essential Tools</h3>
              <p className="text-sm text-muted-foreground">Complete collection of developer tools in one place. No need to visit multiple sites.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Built with modern technology for maximum performance and responsiveness.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-info mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No Registration</h3>
              <p className="text-sm text-muted-foreground">Use all tools immediately without creating an account or providing personal information.</p>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Feature Comparison</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                                      <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-left p-4 font-semibold text-foreground">ByteToolBox</th>
                      <th className="text-left p-4 font-semibold text-foreground">Competitors</th>
                    </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="p-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </td>
                                              <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-lg font-bold">✓</span>
                            <span className="text-success font-semibold">{feature.byteToolbox.replace('✅ ', '')}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 text-lg font-bold">✗</span>
                            <span className="text-muted-foreground">{feature.competitors.replace('❌ ', '')}</span>
                          </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Competitor Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Competitor Analysis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{competitor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{competitor.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{competitor.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Available Tools:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(competitor.features).map(([tool, available]) => (
                      <span
                        key={tool}
                        className={`px-2 py-1 rounded text-xs ${
                          available
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tool.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Pros:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Cons:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-danger" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Visit {competitor.name} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose ByteToolbox */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Choose ByteToolBox?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">The Complete Solution</h3>
              <p className="text-muted-foreground mb-4">
                Instead of visiting multiple websites for different tools, ByteToolBox provides 
                everything you need in one place. All tools share the same interface, making 
                your workflow more efficient and consistent.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No need to remember multiple URLs</li>
                <li>Consistent user experience across all tools</li>
                <li>Single source of truth for developer tools</li>
                <li>Regular updates and new features</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Privacy & Security</h3>
              <p className="text-muted-foreground mb-4">
                Unlike other tools that send your data to their servers, ByteToolBox processes 
                everything locally in your browser. This means your sensitive data never leaves 
                your device, ensuring maximum privacy and security.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No account creation required</li>
                <li>Aggregate analytics only — tool input stays on your device</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Experience the Difference?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try ByteToolBox today and see why thousands of developers choose us for their 
              daily development needs. Fast, secure, and privacy-focused tools that just work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Try ByteToolBox Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <Users className="w-4 h-4" />
                Learn More About Us
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Contact us at <a href="mailto:bytetoolbox@gmail.com" className="text-primary hover:underline">bytetoolbox@gmail.com</a><br />
              Visit us at <a href="https://www.bytetoolbox.com" className="text-primary hover:underline">www.bytetoolbox.com</a>
            </p>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
};
