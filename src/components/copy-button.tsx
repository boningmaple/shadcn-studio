import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const copiedStateDuration = 1_500;

type CopyButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  content: string;
  errorMessage?: string;
  successMessage?: string;
};

type CopyState = {
  content: string;
  status: "copied" | "copying" | "idle";
};

export function CopyButton({
  "aria-label": ariaLabel = "Copy current content",
  className,
  content,
  errorMessage = "Could not copy current content.",
  isDisabled,
  size = "icon",
  successMessage = "Copied current content.",
  variant = "ghost",
  ...props
}: CopyButtonProps) {
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
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        {...props}
        aria-label={ariaLabel}
        className={cn("disabled:opacity-100", className)}
        isDisabled={isDisabled || copyStatus !== "idle"}
        onPress={copy}
        size={size}
        variant={variant}
      >
        {copied ? <CheckIcon className="text-green-600 dark:text-green-400" /> : <CopyIcon />}
      </Button>
      <output aria-live="polite" className="sr-only">
        {copied ? successMessage : ""}
      </output>
    </>
  );
}
