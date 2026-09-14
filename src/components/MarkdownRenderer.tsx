import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

/**
 * Single source of truth for turning article/blog markdown into HTML.
 *
 * Flow: the API returns raw markdown (see src/api/articles.ts) → this
 * component renders it. No markdown string should be transformed,
 * escaped, or reformatted anywhere else in the app — if a piece of
 * markdown doesn't render the way it should, fix it here (via
 * remark/rehype plugins or the `components` overrides below), not by
 * preprocessing the string before it gets here.
 */

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-white mt-8 mb-6 pb-3 border-b border-white/20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold text-white mt-10 mb-4 pt-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold text-white mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-6 text-slate-300 leading-relaxed text-base">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-300">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (!isBlock) {
      return (
        <code className="px-1.5 py-0.5 bg-slate-700/50 text-teal-300 rounded text-sm font-mono border border-white/10">
          {children}
        </code>
      );
    }
    return (
      <code className={`block p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 ${className}`}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 rounded-lg overflow-hidden border border-white/10 bg-slate-900">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-teal pl-4 my-6 italic text-slate-300 bg-teal/10 py-2 rounded-r">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-slate-300">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-700/50">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-white/10 px-4 py-2 text-left font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-white/10 px-4 py-2 text-slate-300">{children}</td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal hover:text-teal-light underline font-medium"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      className="max-w-full h-auto rounded-lg border border-white/10 my-6"
    />
  ),
  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
  hr: () => <hr className="my-8 border-t border-white/10" />,
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className ?? 'prose prose-slate prose-lg max-w-none'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
