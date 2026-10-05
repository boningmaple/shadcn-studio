import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

const copiedStateDuration = 1_500;

type CopyButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  content: string;
  errorMessage?: string;
  icon?: React.ReactNode;
  label?: string;
  successMessage?: string;
};

type CopyState = {
  content: string;
  status: "copied" | "copying" | "idle";
};

export function CopyButton(props: CopyButtonProps) {
  const { content, errorMessage, icon, label, successMessage, ...buttonProps } = props;
  const [copyState, setCopyState] = useState<CopyState>({ content, status: "idle" });
  const copyStatus = copyState.content === content ? copyState.status : "idle";
  const copied = copyStatus === "copied";
  const copyAttemptRef = useRef(0);
  const copyResetRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      copyAttemptRef.current += 1;
      if (copyResetRef.current !== undefined) clearTimeout(copyResetRef.current);
    };
  }, [content]);

  const copy = async () => {
    const copyAttempt = copyAttemptRef.current;
    setCopyState({ content, status: "copying" });

    try {
      await navigator.clipboard.writeText(content);
      if (copyAttempt !== copyAttemptRef.current) return;

      setCopyState({ content, status: "copied" });
      copyResetRef.current = setTimeout(
        () => setCopyState({ content, status: "idle" }),
        copiedStateDuration,
      );
    } catch {
      if (copyAttempt !== copyAttemptRef.current) return;

      setCopyState({ content, status: "idle" });
      toast.error(errorMessage ?? "Could not copy current content.");
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        aria-label={props["aria-label"] ?? "Copy current content"}
        isDisabled={props.isDisabled || copyStatus !== "idle"}
        variant={props.variant ?? "ghost"}
        size={props.size ?? "icon"}
        className={cn("disabled:opacity-100", props.className)}
        onPress={copy}
      >
        {copied ? (
          <CheckIcon className="text-green-600 dark:text-green-400" />
        ) : (
          (icon ?? <CopyIcon />)
        )}
        {label && <span className="min-w-0 truncate">{label}</span>}
      </Button>
      <output aria-live="polite" className="sr-only">
        {copied ? (successMessage ?? "Copied current content.") : ""}
      </output>
    </>
  );
}
