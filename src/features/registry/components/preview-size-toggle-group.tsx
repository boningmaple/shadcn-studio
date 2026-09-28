import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { PreviewSize } from "../hooks/use-preview-size";

type PreviewSizeToggleGroupProps = {
  selectedPreviewSize: PreviewSize | null;
  onPreviewSizeSelect: (size: PreviewSize) => void;
};

export function PreviewSizeToggleGroup(props: PreviewSizeToggleGroupProps) {
  return (
    <ToggleGroup
      aria-label="Preview size"
      selectedKeys={props.selectedPreviewSize ? [props.selectedPreviewSize] : []}
      selectionMode="single"
      disallowEmptySelection
      spacing={1}
      className="hidden lg:flex border p-0.75 transition-none *:data-[slot=toggle-group-item]:px-0 *:data-[slot=toggle-group-item]:[&_svg]:size-4! *:data-[slot=toggle-group-item]:transition-none"
      onSelectionChange={(keys) => {
        const [size] = keys;
        if (size) props.onPreviewSizeSelect(size as PreviewSize);
      }}
    >
      <ToggleGroupItem id={"phone" satisfies PreviewSize} aria-label="Phone preview" size="sm">
        <SmartphoneIcon />
      </ToggleGroupItem>
      <ToggleGroupItem id={"tablet" satisfies PreviewSize} aria-label="Tablet preview" size="sm">
        <TabletIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        id={"desktop" satisfies PreviewSize}
        aria-label="Full-width preview"
        size="sm"
      >
        <MonitorIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
