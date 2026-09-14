import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ComponentType } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  Loader2,
  Code,
  Zap,
  Brain,
  Cpu,
  Server,
} from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getArticles, getArticleBySlug, type Article } from '../api/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CARD_GRADIENTS = [
  'from-teal to-cyan',
  'from-cyan to-teal',
  'from-sky-500 to-teal',
  'from-teal to-sky-400',
] as const;

const CARD_ICONS: ComponentType<{ className?: string; size?: number }>[] = [
  Code,
  Zap,
  Brain,
  Cpu,
  Server,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

function formatArticleDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(text: string | null | undefined): string {
  const words = (text ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}


export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  const [posts, setPosts] = useState<Article[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    setPostsLoading(true);
    setPostsError(false);
    getArticles()
      .then((articles) => {
        if (articles === null) {
          setPostsError(true);
          setPosts([]);
        } else {
          setPosts(articles);
        }
      })
      .finally(() => setPostsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedSlug) {
      setLoadingPost(true);
      getArticleBySlug(selectedSlug)
        .then((post) => {
          setSelectedPost(post);
          setLoadingPost(false);
        })
        .catch((error) => {
          console.error('Error loading blog post:', error);
          setLoadingPost(false);
        });
    } else {
      setSelectedPost(null);
    }
  }, [selectedSlug]);

  return (
    <section id="blog" ref={ref} className="relative bg-slate-800/30 py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-teal/20 to-cyan/20 rounded-full blur-[120px] opacity-30 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 text-sm font-semibold text-teal bg-gradient-to-r from-teal/10 to-cyan/10 border border-teal/30 rounded-full mb-4 shadow-sm"
          >
            Technical Insights
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white">
            Technical <span className="bg-gradient-to-r from-teal via-cyan to-teal bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Notes on machine learning, AI systems, and Python backend development — from model pipelines to production APIs
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-full mx-auto shadow-lg" />
        </motion.div>

        {postsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : postsError ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Couldn't load articles right now. Please try again later.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No articles published yet — check back soon.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Articles
              </h3>
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(14,165,233,0.7)]" />
                <span>Latest insights</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => {
                const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
                const Icon = CARD_ICONS[index % CARD_ICONS.length];
                const badge = post.badge?.toLowerCase() || '';
                const dateLabel = formatArticleDate(post.published_at || post.created_at);
                const readTime = estimateReadTime(post.content || post.excerpt);
                const displayTags = post.tags.slice(0, 4);

                return (
                  <motion.article
                    key={post.slug}
                    variants={cardVariants}
                    className="group relative flex flex-col bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 border border-teal/25 hover:border-teal/50 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedSlug(post.slug)}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient}`} />
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal/10 rounded-full blur-3xl opacity-40 pointer-events-none" />

                    <div className="relative flex items-center gap-3 mb-5">
                      <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-md ring-1 ring-white/15 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold text-teal bg-teal/10 border border-teal/30 rounded-full">
                        {badge}
                      </span>
                    </div>

                    <h3 className="relative text-xl sm:text-2xl font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-teal group-hover:to-cyan group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="relative text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-teal mb-4 pb-4 border-b border-white/10">
                      {dateLabel && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="opacity-90" />
                          <span className="font-medium">{dateLabel}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="opacity-90" />
                        <span className="font-medium">{readTime}</span>
                      </div>
                    </div>

                    {displayTags.length > 0 && (
                      <div className="relative flex flex-wrap gap-2 mb-5">
                        {displayTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 border border-white/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > displayTags.length && (
                          <span className="px-2.5 py-1 text-xs font-medium text-slate-500">
                            +{post.tags.length - displayTags.length}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="relative mt-auto inline-flex items-center gap-2 text-teal font-semibold text-sm px-4 py-2 rounded-lg border border-teal/40 bg-teal/5 w-fit group-hover:bg-teal/10 group-hover:border-teal/60 transition-colors duration-300">
                      <span>Read Full Article</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {(selectedSlug || selectedPost) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => {
              setSelectedSlug(null);
              setSelectedPost(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {selectedPost && (
                <div className="sticky top-0 bg-slate-800/95 backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-5 flex items-center justify-between z-10">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-xs text-teal">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatArticleDate(selectedPost.published_at || selectedPost.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {estimateReadTime(selectedPost.content || selectedPost.excerpt)}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{selectedPost.title}</h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSlug(null);
                      setSelectedPost(null);
                    }}
                    className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X size={24} className="text-slate-300" />
                  </button>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {loadingPost ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                  </div>
                ) : selectedPost ? (
                  <div className="prose prose-slate prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold text-white mt-8 mb-6 pb-3 border-b border-white/20">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-bold text-white mt-10 mb-4 pt-2">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl font-bold text-white mt-8 mb-3">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-xl font-semibold text-white mt-6 mb-2">
                            {children}
                          </h4>
                        ),
                        p: ({ children }) => (
                          <p className="mb-6 text-slate-300 leading-relaxed text-base">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-300">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-300">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed">{children}</li>
                        ),
                        code: ({ node, children, className }: any) => {
                          const inline = !node || (node as any).tagName !== 'pre';
                          if (inline) {
                            return (
                              <code className="px-1.5 py-0.5 bg-slate-700/50 text-teal-300 rounded text-sm font-mono border border-white/10">
                                {children}
                              </code>
                            );
                          }
                          return (
                            <code className={`block p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 ${className || ''}`}>
                              {children}
                            </code>
                          );
                        },
                        pre: ({ children }) => (
                          <pre className="mb-6 rounded-lg overflow-hidden">
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
                            <table className="min-w-full border-collapse border border-slate-300">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-slate-700/50">{children}</thead>
                        ),
                        th: ({ children }) => (
                          <th className="border border-white/10 px-4 py-2 text-left font-semibold text-white">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-white/10 px-4 py-2 text-slate-300">
                            {children}
                          </td>
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
                        strong: ({ children }) => (
                          <strong className="font-bold text-white">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-slate-300">{children}</em>
                        ),
                        hr: () => (
                          <hr className="my-8 border-t border-white/10" />
                        ),
                      }}
                    >
                      {selectedPost.content}
                    </ReactMarkdown>
                  </div>
                ) : null}
              </div>

              {selectedPost && (
                <div className="sticky bottom-0 bg-gradient-to-t from-slate-800/95 via-slate-800/95 to-transparent backdrop-blur-xl px-6 sm:px-8 py-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 border border-white/10 rounded-lg hover:bg-teal/20 hover:border-teal/30 hover:text-teal transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
