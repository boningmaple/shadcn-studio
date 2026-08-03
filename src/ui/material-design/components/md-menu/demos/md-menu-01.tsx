import { CopyIcon, FilePenLineIcon, ScissorsIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDMenu,
  MDMenuItem,
  MDMenuTrigger,
} from "@/ui/material-design/components/md-menu/md-menu";

export default function MDMenuDemo() {
  return (
    <MDMenuTrigger>
      <MDButton variant="tonal">Edit</MDButton>
      <MDMenu>
        <MDMenuItem icon={<ScissorsIcon />} shortcut="⌘X">
          Cut
        </MDMenuItem>
        <MDMenuItem icon={<CopyIcon />} shortcut="⌘C">
          Copy
        </MDMenuItem>
        <MDMenuItem icon={<FilePenLineIcon />} shortcut="⌘V">
          Paste
        </MDMenuItem>
      </MDMenu>
    </MDMenuTrigger>
  );
}
