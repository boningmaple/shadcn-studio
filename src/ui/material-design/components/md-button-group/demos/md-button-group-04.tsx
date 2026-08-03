import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { MDToggleButtonGroup } from "@/ui/material-design/components/md-button-group/md-button-group";
import { MDToggleIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDButtonGroupDemo() {
  return (
    <MDToggleButtonGroup
      aria-label="Text emphasis"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
      spacing="compact"
    >
      <MDToggleIconButton
        aria-label="Bold"
        id="bold"
        shape="square"
        variant="outlined"
      >
        <BoldIcon />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Italic"
        id="italic"
        shape="square"
        variant="outlined"
      >
        <ItalicIcon />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Underline"
        id="underline"
        shape="square"
        variant="outlined"
      >
        <UnderlineIcon />
      </MDToggleIconButton>
    </MDToggleButtonGroup>
  );
}
