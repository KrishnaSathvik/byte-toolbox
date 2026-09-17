import { HelpCircle } from 'lucide-react';
import { ToolSeoPanel } from '@/components/tool-page/ToolSeoSection';
import type { FaqItem } from '@/lib/structuredData';

interface ToolFaqPanelProps {
  faqs: FaqItem[];
}

export const ToolFaqPanel = ({ faqs }: ToolFaqPanelProps) => {
  if (!faqs.length) {
    return null;
  }

  return (
    <ToolSeoPanel value="faq" title="Common questions" icon={<HelpCircle className="w-4 h-4" />}>
      <dl className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-semibold text-foreground">{faq.question}</dt>
            <dd className="text-sm mt-1">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </ToolSeoPanel>
  );
};
