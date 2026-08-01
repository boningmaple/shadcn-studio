import { MoreVerticalIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <IconButton aria-label="Narrow more options" size="md" width="narrow">
        <MoreVerticalIcon />
      </IconButton>
      <IconButton aria-label="More options" size="md" width="default">
        <MoreVerticalIcon />
      </IconButton>
      <IconButton aria-label="Wide more options" size="md" width="wide">
        <MoreVerticalIcon />
      </IconButton>
    </div>
  );
}
