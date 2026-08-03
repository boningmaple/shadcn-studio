import {
  BoldIcon,
  ItalicIcon,
  Redo2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import {
  M3ButtonGroup,
  M3ToggleButtonGroup,
} from "@/material-3-ui/components/m3-button-group/m3-button-group";
import {
  M3IconButton,
  M3ToggleIconButton,
} from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Toolbar,
  M3ToolbarDivider,
  M3ToolbarGroup,
} from "@/material-3-ui/components/m3-toolbar/m3-toolbar";

export default function M3ToolbarDemo() {
  return (
    <M3Toolbar
      aria-label="Formatting toolbar"
      className="max-w-xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      density="compact"
    >
      <M3ToolbarGroup>
        <M3ButtonGroup aria-label="History actions" spacing="compact">
          <M3IconButton aria-label="Undo" size="xs" variant="standard">
            <Undo2Icon />
          </M3IconButton>
          <M3IconButton aria-label="Redo" size="xs" variant="standard">
            <Redo2Icon />
          </M3IconButton>
        </M3ButtonGroup>
      </M3ToolbarGroup>
      <M3ToolbarDivider />
      <M3ToolbarGroup>
        <M3ToggleButtonGroup
          aria-label="Text style"
          defaultSelectedKeys={["bold"]}
          selectionMode="multiple"
          spacing="compact"
        >
          <M3ToggleIconButton id="bold" size="xs" variant="standard">
            <BoldIcon />
          </M3ToggleIconButton>
          <M3ToggleIconButton id="italic" size="xs" variant="standard">
            <ItalicIcon />
          </M3ToggleIconButton>
          <M3ToggleIconButton id="underline" size="xs" variant="standard">
            <UnderlineIcon />
          </M3ToggleIconButton>
        </M3ToggleButtonGroup>
      </M3ToolbarGroup>
    </M3Toolbar>
  );
}
