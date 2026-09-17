import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SISTER_SITES } from '@/lib/sisterSites';

const footerLinkClass =
  'text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50';

export const Footer = () => {
  return (
    <footer className="bg-nav-background border-t border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-3 sm:gap-4 lg:gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link to="/about" className={footerLinkClass}>
                About
              </Link>
              <Link to="/blog" className={footerLinkClass}>
                Guides
              </Link>
              <Link to="/faq" className={footerLinkClass}>
                FAQ
              </Link>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link to="/comparisons" className={footerLinkClass}>
                Compare
              </Link>
              <Link to="/privacy" className={footerLinkClass}>
                Privacy
              </Link>
              <Link to="/terms" className={footerLinkClass}>
                Terms
              </Link>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">
              Built for developers. All tools run locally in your browser.
            </div>
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ByteToolBox. All rights reserved.
            </div>
          </div>
        </div>

        <nav
          aria-label="Related sites"
          className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-center sm:text-left shrink-0">
            Also check
          </p>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
            {SISTER_SITES.map((site) => (
              <li key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground hover:bg-secondary hover:border-primary/30 transition-colors"
                >
                  <span className="font-medium">{site.name}</span>
                  <span className="text-muted-foreground hidden sm:inline">· {site.shortLabel}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
