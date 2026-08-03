import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import {
  MDSegmentedButton,
  MDSegmentedButtonGroup,
} from "@/ui/material-design/components/md-segmented-button/md-segmented-button";

export default function MDSegmentedButtonDemo() {
  return (
    <MDSegmentedButtonGroup
      aria-label="Text styles"
      defaultSelectedKeys={["bold", "italic"]}
      selectionMode="multiple"
    >
      <MDSegmentedButton
        aria-label="Bold"
        icon={<BoldIcon />}
        id="bold"
        showSelectedIcon={false}
      >
        <span className="sr-only">Bold</span>
      </MDSegmentedButton>
      <MDSegmentedButton
        aria-label="Italic"
        icon={<ItalicIcon />}
        id="italic"
        showSelectedIcon={false}
      >
        <span className="sr-only">Italic</span>
      </MDSegmentedButton>
      <MDSegmentedButton
        aria-label="Underline"
        icon={<UnderlineIcon />}
        id="underline"
        showSelectedIcon={false}
      >
        <span className="sr-only">Underline</span>
      </MDSegmentedButton>
    </MDSegmentedButtonGroup>
  );
}
