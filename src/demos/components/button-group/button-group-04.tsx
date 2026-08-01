import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { ToggleButtonGroup } from "@/components/button-group/button-group";
import { ToggleIconButton } from "@/components/icon-button/icon-button";

export default function ButtonGroupDemo() {
  return (
    <ToggleButtonGroup
      aria-label="Text emphasis"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
      spacing="compact"
    >
      <ToggleIconButton
        aria-label="Bold"
        id="bold"
        shape="square"
        variant="outlined"
      >
        <BoldIcon />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Italic"
        id="italic"
        shape="square"
        variant="outlined"
      >
        <ItalicIcon />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Underline"
        id="underline"
        shape="square"
        variant="outlined"
      >
        <UnderlineIcon />
      </ToggleIconButton>
    </ToggleButtonGroup>
  );
}
