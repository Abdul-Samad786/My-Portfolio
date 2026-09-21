/**
 * Older API records sometimes store markdown with literal "\n" sequences
 * instead of real newlines, which breaks block-level markdown parsing.
 */
export function normalizeMarkdownContent(content: string | null | undefined): string {
  if (!content) return '';

  const hasRealNewlines = content.includes('\n');
  const hasLiteralNewlines = content.includes('\\n');

  if (hasRealNewlines || !hasLiteralNewlines) {
    return content;
  }

  return content
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}
