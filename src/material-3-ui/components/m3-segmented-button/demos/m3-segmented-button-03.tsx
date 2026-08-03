import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import {
  M3SegmentedButton,
  M3SegmentedButtonGroup,
} from "@/material-3-ui/components/m3-segmented-button/m3-segmented-button";

export default function M3SegmentedButtonDemo() {
  return (
    <M3SegmentedButtonGroup
      aria-label="Text styles"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
    >
      <M3SegmentedButton
        aria-label="Bold"
        icon={<BoldIcon />}
        id="bold"
        showSelectedIcon={false}
      >
        <span className="sr-only">Bold</span>
      </M3SegmentedButton>
      <M3SegmentedButton
        aria-label="Italic"
        icon={<ItalicIcon />}
        id="italic"
        showSelectedIcon={false}
      >
        <span className="sr-only">Italic</span>
      </M3SegmentedButton>
      <M3SegmentedButton
        aria-label="Underline"
        icon={<UnderlineIcon />}
        id="underline"
        showSelectedIcon={false}
      >
        <span className="sr-only">Underline</span>
      </M3SegmentedButton>
    </M3SegmentedButtonGroup>
  );
}
