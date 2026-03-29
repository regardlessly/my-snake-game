"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

interface KaTeXRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeXRenderer({
  latex,
  displayMode = false,
  className,
}: KaTeXRendererProps) {
  const html = katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    trust: true,
  });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface NotesViewerProps {
  html: string;
  className?: string;
}

export function NotesViewer({ html, className }: NotesViewerProps) {
  return (
    <div
      className={`prose prose-invert max-w-none ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
