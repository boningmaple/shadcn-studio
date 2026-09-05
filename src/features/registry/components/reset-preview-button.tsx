import { RotateCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  resetPreview: () => void;
};

export default function ResetPreviewButton(props: Props) {
  return (
    <Button
      aria-label="Reset preview"
      variant="outline"
      size="icon"
      className="transition-none"
      onPress={props.resetPreview}
    >
      <RotateCwIcon />
    </Button>
  );
}
