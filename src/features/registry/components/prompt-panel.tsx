import { CopyButton } from "@/shared/components/copy-button";

type PromptPanelProps = {
  prompt: string;
};

export function PromptPanel(props: PromptPanelProps) {
  return (
    <div className="min-w-0 rounded-lg border bg-background">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2">
        <span className="text-sm font-medium">Design prompt</span>
        <CopyButton
          aria-label="Copy prompt"
          content={props.prompt}
          errorMessage="Could not copy prompt."
          successMessage="Copied prompt."
        />
      </div>
      <div className="whitespace-pre-wrap wrap-anywhere p-4 text-sm leading-relaxed">
        {props.prompt}
      </div>
    </div>
  );
}
