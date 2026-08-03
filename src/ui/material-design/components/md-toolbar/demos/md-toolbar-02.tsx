import {
  BoldIcon,
  ItalicIcon,
  Redo2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import {
  MDButtonGroup,
  MDToggleButtonGroup,
} from "@/ui/material-design/components/md-button-group/md-button-group";
import {
  MDIconButton,
  MDToggleIconButton,
} from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDToolbar,
  MDToolbarDivider,
  MDToolbarGroup,
} from "@/ui/material-design/components/md-toolbar/md-toolbar";

export default function MDToolbarDemo() {
  return (
    <MDToolbar
      aria-label="Formatting toolbar"
      className="max-w-xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      density="compact"
    >
      <MDToolbarGroup>
        <MDButtonGroup aria-label="History actions" spacing="compact">
          <MDIconButton aria-label="Undo" size="xs" variant="standard">
            <Undo2Icon />
          </MDIconButton>
          <MDIconButton aria-label="Redo" size="xs" variant="standard">
            <Redo2Icon />
          </MDIconButton>
        </MDButtonGroup>
      </MDToolbarGroup>
      <MDToolbarDivider />
      <MDToolbarGroup>
        <MDToggleButtonGroup
          aria-label="Text style"
          defaultSelectedKeys={["bold"]}
          selectionMode="multiple"
          spacing="compact"
        >
          <MDToggleIconButton id="bold" size="xs" variant="standard">
            <BoldIcon />
          </MDToggleIconButton>
          <MDToggleIconButton id="italic" size="xs" variant="standard">
            <ItalicIcon />
          </MDToggleIconButton>
          <MDToggleIconButton id="underline" size="xs" variant="standard">
            <UnderlineIcon />
          </MDToggleIconButton>
        </MDToggleButtonGroup>
      </MDToolbarGroup>
    </MDToolbar>
  );
}
