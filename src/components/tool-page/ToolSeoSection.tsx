import { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ToolSeoSectionProps {
  children: ReactNode;
  title?: string;
}

export const ToolSeoSection = ({
  children,
  title = 'Learn more about this tool',
}: ToolSeoSectionProps) => (
  <section className="border-t border-border px-4 sm:px-6 py-4" aria-label={title}>
    <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">{title}</p>
    <Accordion
      type="multiple"
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      {children}
    </Accordion>
  </section>
);

interface ToolSeoPanelProps {
  value: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const ToolSeoPanel = ({ value, title, icon, children }: ToolSeoPanelProps) => (
  <AccordionItem value={value} className="border-b border-border last:border-b-0 px-4">
    <AccordionTrigger className="hover:no-underline py-4 gap-3 [&>svg]:text-muted-foreground">
      <span className="flex items-center gap-3 flex-1 text-left min-w-0">
        <span className="inline-flex shrink-0 text-primary">{icon}</span>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </span>
    </AccordionTrigger>
    <AccordionContent className="text-muted-foreground pb-5 pt-0">{children}</AccordionContent>
  </AccordionItem>
);
