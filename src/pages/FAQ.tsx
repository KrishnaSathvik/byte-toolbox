import { ToolLayout } from '@/components/ToolLayout';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Zap, Code2, Users } from 'lucide-react';

/**
 * FAQ page for ByteToolbox
 * 
 * This page answers common questions about ByteToolbox.
 * Important for SEO and user support.
 */
export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "text-blue-500",
      items: [
        {
          question: "What is ByteToolbox?",
          answer: "ByteToolbox is a collection of free, privacy-focused developer tools that run entirely in your browser. It includes JSON formatter, Base64 encoder, hash generator, UUID generator, regex tester, and timestamp converter. All data processing happens locally on your device."
        },
        {
          question: "Is ByteToolbox really free?",
          answer: "Yes, ByteToolbox is completely free to use. There are no hidden costs, subscription fees, or premium tiers. All tools are available to everyone at no charge."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account creation is required. You can use all ByteToolbox tools immediately without signing up or providing any personal information."
        },
        {
          question: "What browsers are supported?",
          answer: "ByteToolbox works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your preferred browser for the best experience."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-green-500",
      items: [
        {
          question: "Is my data safe with ByteToolbox?",
          answer: "Absolutely! All data processing happens locally in your browser. Your data never leaves your device and is never sent to our servers. This ensures maximum privacy and security."
        },
        {
          question: "Do you store any of my data?",
          answer: "No, we don't store any of your data. Everything is processed locally in your browser, and we have no access to your files, text, or any other information you process with our tools."
        },
        {
          question: "Do you use cookies?",
          answer: "We only use essential cookies for functionality (like remembering your theme preference) and analytics (to understand how our tools are used). We don't use tracking cookies or collect personal information."
        },
        {
          question: "Can I use ByteToolbox offline?",
          answer: "Yes! Once you load ByteToolbox in your browser, you can use it offline. All tools work without an internet connection after the initial page load."
        }
      ]
    },
    {
      title: "Performance & Features",
      icon: Zap,
      color: "text-yellow-500",
      items: [
        {
          question: "How fast are the tools?",
          answer: "ByteToolbox tools are extremely fast because they run locally in your browser. There's no network latency, and processing happens instantly as you type or upload files."
        },
        {
          question: "What file sizes are supported?",
          answer: "File size limits depend on your browser's memory capacity. For most tools, you can process files up to 10MB without issues. Larger files may require more memory but are generally supported."
        },
        {
          question: "Can I process multiple files at once?",
          answer: "Yes, many of our tools support batch processing. For example, the UUID generator can create multiple UUIDs at once, and the hash generator can process multiple files simultaneously."
        },
        {
          question: "Are there keyboard shortcuts?",
          answer: "Yes! ByteToolbox includes keyboard shortcuts for common actions. Press Ctrl/Cmd + K to open the command palette, and many tools have their own shortcuts for quick access."
        }
      ]
    },
    {
      title: "Technical Details",
      icon: Code2,
      color: "text-purple-500",
      items: [
        {
          question: "What technologies does ByteToolbox use?",
          answer: "ByteToolbox is built with React 18, TypeScript, Vite, and Tailwind CSS. We use Monaco Editor for code editing, and all tools are optimized for performance and user experience."
        },
        {
          question: "Is ByteToolbox open source?",
          answer: "Yes! ByteToolbox is completely open source and available under the MIT License. You can view, modify, and contribute to the codebase on GitHub."
        },
        {
          question: "Can I contribute to ByteToolbox?",
          answer: "Absolutely! We welcome contributions from the community. You can report bugs, suggest features, or submit pull requests on our GitHub repository."
        },
        {
          question: "How accurate are the tools?",
          answer: "Our tools are highly accurate and use industry-standard algorithms. However, we recommend verifying critical results independently, especially for cryptographic operations."
        }
      ]
    },
    {
      title: "Troubleshooting",
      icon: Users,
      color: "text-red-500",
      items: [
        {
          question: "Why is a tool not working?",
          answer: "Try refreshing the page and clearing your browser cache. If the problem persists, check that you're using a supported browser and that JavaScript is enabled. You can also report the issue on GitHub."
        },
        {
          question: "The page is loading slowly. What should I do?",
          answer: "Slow loading is usually due to a poor internet connection or browser issues. Try refreshing the page, clearing your browser cache, or using a different browser. ByteToolbox should load quickly on most connections."
        },
        {
          question: "Can I use ByteToolbox on mobile devices?",
          answer: "Yes! ByteToolbox is fully responsive and works on mobile devices. However, some features may be limited on smaller screens, and we recommend using a desktop browser for the best experience."
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer: "You can report bugs or suggest features by opening an issue on our GitHub repository. Please provide as much detail as possible, including your browser version and steps to reproduce any issues."
        }
      ]
    }
  ];

  return (
    <ToolLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about ByteToolbox. Learn about privacy, features, performance, and how to get the most out of our developer tools."
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">FAQ</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about ByteToolbox
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-border rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/KrishnaSathvik/byte-toolbox/issues" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              Ask on GitHub
            </a>
            <a 
              href="/about" 
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <Users className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
