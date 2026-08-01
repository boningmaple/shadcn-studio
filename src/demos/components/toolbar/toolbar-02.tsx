import {
  BoldIcon,
  ItalicIcon,
  Redo2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import {
  ButtonGroup,
  ToggleButtonGroup,
} from "@/components/button-group/button-group";
import {
  IconButton,
  ToggleIconButton,
} from "@/components/icon-button/icon-button";
import {
  Toolbar,
  ToolbarDivider,
  ToolbarGroup,
} from "@/components/toolbar/toolbar";

export default function ToolbarDemo() {
  return (
    <Toolbar
      aria-label="Formatting toolbar"
      className="max-w-xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      density="compact"
    >
      <ToolbarGroup>
        <ButtonGroup aria-label="History actions" spacing="compact">
          <IconButton aria-label="Undo" size="xs" variant="standard">
            <Undo2Icon />
          </IconButton>
          <IconButton aria-label="Redo" size="xs" variant="standard">
            <Redo2Icon />
          </IconButton>
        </ButtonGroup>
      </ToolbarGroup>
      <ToolbarDivider />
      <ToolbarGroup>
        <ToggleButtonGroup
          aria-label="Text style"
          defaultSelectedKeys={["bold"]}
          selectionMode="multiple"
          spacing="compact"
        >
          <ToggleIconButton id="bold" size="xs" variant="standard">
            <BoldIcon />
          </ToggleIconButton>
          <ToggleIconButton id="italic" size="xs" variant="standard">
            <ItalicIcon />
          </ToggleIconButton>
          <ToggleIconButton id="underline" size="xs" variant="standard">
            <UnderlineIcon />
          </ToggleIconButton>
        </ToggleButtonGroup>
      </ToolbarGroup>
    </Toolbar>
  );
}
