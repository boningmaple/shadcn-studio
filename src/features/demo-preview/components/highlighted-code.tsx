import { cn } from "@/lib/utils";

/**
 * Shiki's output, injected as-is.
 *
 * The HTML is generated at build time from source files in this repository —
 * it never carries anything a visitor supplied.
 */
export function HighlightedCode({ className, html }: { className?: string; html: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border [&_.shiki]:m-0 [&_.shiki]:overflow-x-auto [&_.shiki]:p-5 [&_.shiki]:font-mono [&_.shiki]:text-[13px] [&_.shiki]:leading-6 [&_.shiki_code]:block [&_.shiki_code]:min-w-max",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
