import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { M3ToggleButtonGroup } from "@/material-3-ui/components/m3-button-group/m3-button-group";
import { M3ToggleIconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3ButtonGroupDemo() {
  return (
    <M3ToggleButtonGroup
      aria-label="Text emphasis"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
      spacing="compact"
    >
      <M3ToggleIconButton
        aria-label="Bold"
        id="bold"
        shape="square"
        variant="outlined"
      >
        <BoldIcon />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Italic"
        id="italic"
        shape="square"
        variant="outlined"
      >
        <ItalicIcon />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Underline"
        id="underline"
        shape="square"
        variant="outlined"
      >
        <UnderlineIcon />
      </M3ToggleIconButton>
    </M3ToggleButtonGroup>
  );
}
