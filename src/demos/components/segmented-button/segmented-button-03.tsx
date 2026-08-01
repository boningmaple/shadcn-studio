import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import {
  SegmentedButton,
  SegmentedButtonGroup,
} from "@/components/segmented-button/segmented-button";

export default function SegmentedButtonDemo() {
  return (
    <SegmentedButtonGroup
      aria-label="Text styles"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
    >
      <SegmentedButton
        aria-label="Bold"
        icon={<BoldIcon />}
        id="bold"
        showSelectedIcon={false}
      >
        <span className="sr-only">Bold</span>
      </SegmentedButton>
      <SegmentedButton
        aria-label="Italic"
        icon={<ItalicIcon />}
        id="italic"
        showSelectedIcon={false}
      >
        <span className="sr-only">Italic</span>
      </SegmentedButton>
      <SegmentedButton
        aria-label="Underline"
        icon={<UnderlineIcon />}
        id="underline"
        showSelectedIcon={false}
      >
        <span className="sr-only">Underline</span>
      </SegmentedButton>
    </SegmentedButtonGroup>
  );
}
