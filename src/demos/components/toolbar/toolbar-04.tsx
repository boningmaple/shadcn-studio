import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CropIcon,
} from "lucide-react";

import { Button } from "@/components/button/button";
import { ToggleButtonGroup } from "@/components/button-group/button-group";
import { ToggleIconButton } from "@/components/icon-button/icon-button";
import {
  Toolbar,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarSpacer,
  ToolbarTitle,
} from "@/components/toolbar/toolbar";

export default function ToolbarDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-0 overflow-hidden rounded-[20px] border border-[#cac4d0] bg-[#fffbfe] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <Toolbar
        aria-label="Image editor toolbar"
        className="border-b border-[#cac4d0] dark:border-[#49454f]"
      >
        <ToolbarTitle>Edit image</ToolbarTitle>
        <ToolbarSpacer />
        <ToolbarGroup>
          <Button variant="text">Cancel</Button>
          <Button variant="filled">Apply</Button>
        </ToolbarGroup>
      </Toolbar>
      <div className="grid min-h-64 place-items-center bg-[#f7f2fa] p-6 dark:bg-[#211f26]">
        <div className="h-36 w-56 rounded-[20px] bg-[#e8def8] dark:bg-[#4a4458]" />
      </div>
      <Toolbar aria-label="Object toolbar" density="compact">
        <ToolbarGroup>
          <Button size="xs" variant="tonal">
            <CropIcon />
            Crop
          </Button>
        </ToolbarGroup>
        <ToolbarDivider />
        <ToolbarGroup>
          <ToggleButtonGroup
            aria-label="Alignment"
            defaultSelectedKeys={["left"]}
            selectionMode="single"
            spacing="compact"
          >
            <ToggleIconButton id="left" size="xs" variant="standard">
              <AlignLeftIcon />
            </ToggleIconButton>
            <ToggleIconButton id="center" size="xs" variant="standard">
              <AlignCenterIcon />
            </ToggleIconButton>
            <ToggleIconButton id="right" size="xs" variant="standard">
              <AlignRightIcon />
            </ToggleIconButton>
          </ToggleButtonGroup>
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
}
