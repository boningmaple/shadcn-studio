import { MoreVerticalIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3IconButton aria-label="Narrow more options" size="md" width="narrow">
        <MoreVerticalIcon />
      </M3IconButton>
      <M3IconButton aria-label="More options" size="md" width="default">
        <MoreVerticalIcon />
      </M3IconButton>
      <M3IconButton aria-label="Wide more options" size="md" width="wide">
        <MoreVerticalIcon />
      </M3IconButton>
    </div>
  );
}
