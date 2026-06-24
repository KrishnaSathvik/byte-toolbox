import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { BlogCodeBlock } from '@/components/blog/BlogCodeBlock';

interface BlogMarkdownProps {
  content: string;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 scroll-mt-20 border-b border-border pb-2 text-xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[0.9375rem] leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 space-y-2.5 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:text-[0.9375rem] [&>li]:leading-7 [&>li]:text-muted-foreground [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:font-mono [&>li]:before:text-primary [&>li]:before:content-['›']">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2.5 pl-6 text-[0.9375rem] leading-7 text-muted-foreground marker:text-primary marker:font-medium">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
  hr: () => <hr className="my-10 border-border" />,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-primary/40 bg-card/50 py-1 pl-4 pr-2 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return (
        <Link to={href} className="font-medium text-primary underline-offset-2 hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline-offset-2 hover:underline"
      >
        {children}
      </a>
    );
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const text = String(children).replace(/\n$/, '');
    const isBlock = Boolean(match) || text.includes('\n');

    if (isBlock) {
      return <BlogCodeBlock language={match?.[1]}>{children}</BlogCodeBlock>;
    }

    return (
      <code
        className="rounded border border-border bg-editor-background px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="blog-table-wrap">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="border border-border bg-secondary/60 px-4 py-2.5 text-left text-sm font-medium text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2.5 text-left align-top text-sm text-muted-foreground">
      {children}
    </td>
  ),
};

export const BlogMarkdown = ({ content }: BlogMarkdownProps) => (
  <div className="blog-prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  </div>
);
