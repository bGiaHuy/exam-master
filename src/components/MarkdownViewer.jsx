import React, { useMemo } from 'react';
import { marked } from 'marked';
import katex from 'katex';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true
});

export default function MarkdownViewer({ content = '' }) {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    try {
      // 1. Preserve custom HTML diagram cards from being mangled by marked indented code rules
      const preservedBlocks = [];

      // A. Match delimited diagram blocks
      let processed = content.replace(/<!--\s*RELATION_DIAGRAM_START\s*-->([\s\S]*?)<!--\s*RELATION_DIAGRAM_END\s*-->/gi, (match, inner) => {
        const idx = preservedBlocks.length;
        preservedBlocks.push(inner.trim());
        return `\n\n%%PRESERVED_DIAGRAM_${idx}%%\n\n`;
      });

      // B. Match standalone diagram cards
      processed = processed.replace(/<div class="relation-diagram-card"[\s\S]*?<\/div>\s*<\/div>/gi, (match) => {
        const idx = preservedBlocks.length;
        preservedBlocks.push(match.trim());
        return `\n\n%%PRESERVED_DIAGRAM_${idx}%%\n\n`;
      });

      // 2. Preserve and render LaTeX Math with KaTeX BEFORE marked.parse
      // This prevents marked from converting underscores into <em>, escaping < into &lt;, or breaking brackets
      const preservedMath = [];

      const renderMath = (formulaStr, isBlock = true) => {
        const clean = formulaStr.trim()
          .replace(/\\ AND\\ /g, '\\ \\mathbf{AND}\\ ')
          .replace(/\\ OR\\ /g, '\\ \\mathbf{OR}\\ ')
          .replace(/\\ NOT\\ /g, '\\ \\mathbf{NOT}\\ ');

        try {
          const rendered = katex.renderToString(clean, { displayMode: isBlock, throwOnError: false });
          return isBlock 
            ? `<div class="math-display-block">${rendered}</div>` 
            : `<span class="math-inline">${rendered}</span>`;
        } catch (e) {
          return `<span class="katex-error">${formulaStr}</span>`;
        }
      };

      // A. Block Math with double dollar: $$ ... $$
      processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, inner) => {
        const idx = preservedMath.length;
        preservedMath.push(renderMath(inner, true));
        return `\n\n%%PRESERVED_MATH_${idx}%%\n\n`;
      });

      // B. Multiline single dollar: $\n ... \n$
      processed = processed.replace(/(^|\n)\$\s*\n([\s\S]*?)\n\s*\$($|\n)/g, (match, before, inner, after) => {
        const idx = preservedMath.length;
        preservedMath.push(renderMath(inner, true));
        return `${before}\n\n%%PRESERVED_MATH_${idx}%%\n\n${after}`;
      });

      // C. Inline Math: $...$ (ignoring currency like $500,000 or $400)
      processed = processed.replace(/(^|[^\\])\$([^\$\n]+?)\$/g, (match, prefix, inner) => {
        const trimmed = inner.trim();
        // Skip currency
        if (/^\d[\d,.]*$/.test(trimmed)) {
          return match;
        }

        const idx = preservedMath.length;
        const isBlock = trimmed.length > 35;
        preservedMath.push(renderMath(trimmed, isBlock));
        return isBlock 
          ? `${prefix}\n\n%%PRESERVED_MATH_${idx}%%\n\n`
          : `${prefix}%%PRESERVED_MATH_${idx}%%`;
      });

      // 3. Parse Markdown into HTML
      let html = marked.parse(processed);

      // 4. Restore preserved diagram blocks
      preservedBlocks.forEach((rawBlock, idx) => {
        html = html.replace(`<p>%%PRESERVED_DIAGRAM_${idx}%%</p>`, rawBlock);
        html = html.replace(`%%PRESERVED_DIAGRAM_${idx}%%`, rawBlock);
      });

      // 5. Restore preserved math blocks
      preservedMath.forEach((mathHtml, idx) => {
        html = html.replace(`<p>%%PRESERVED_MATH_${idx}%%</p>`, mathHtml);
        html = html.replace(`%%PRESERVED_MATH_${idx}%%`, mathHtml);
      });

      // 6. Enhance blockquotes into rich callout cards with icons & gradients
      html = html.replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, (match, inner) => {
        if (inner.includes('🎯') || inner.includes('Thông điệp cốt lõi')) {
          return `<div class="callout callout-target">${inner}</div>`;
        }
        if (inner.includes('💡') || inner.includes('Ví dụ')) {
          return `<div class="callout callout-example">${inner}</div>`;
        }
        if (inner.includes('⚠️') || inner.includes('Lưu ý')) {
          return `<div class="callout callout-warning">${inner}</div>`;
        }
        return `<div class="callout callout-general">${inner}</div>`;
      });

      return html;
    } catch (e) {
      console.error("Markdown parse error:", e);
      return content;
    }
  }, [content]);

  return (
    <div 
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
