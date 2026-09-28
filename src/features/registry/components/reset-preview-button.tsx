import { RotateCwIcon } from "lucide-react";
import type { RefObject } from "react";

import { Button } from "@/components/ui/button";

import { resetMessage } from "../lib/preview-frame-message";

type ResetPreviewButtonProps = {
  previewFrameRef: RefObject<HTMLIFrameElement | null>;
};

export default function ResetPreviewButton(props: ResetPreviewButtonProps) {
  const resetPreview = () => {
    props.previewFrameRef.current?.contentWindow?.postMessage(resetMessage, location.origin);
  };

  return (
    <Button
      aria-label="Reset preview"
      variant="outline"
      size="icon"
      className="transition-none"
      onPress={resetPreview}
    >
      <RotateCwIcon />
    </Button>
  );
}
