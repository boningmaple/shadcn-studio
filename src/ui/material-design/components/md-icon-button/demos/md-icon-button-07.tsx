import { MoreVerticalIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDIconButton aria-label="Narrow more options" size="md" width="narrow">
        <MoreVerticalIcon />
      </MDIconButton>
      <MDIconButton aria-label="More options" size="md" width="default">
        <MoreVerticalIcon />
      </MDIconButton>
      <MDIconButton aria-label="Wide more options" size="md" width="wide">
        <MoreVerticalIcon />
      </MDIconButton>
    </div>
  );
}
