import { Grid2X2Icon, ListIcon, Rows3Icon } from "lucide-react";

import {
  SegmentedButton,
  SegmentedButtonGroup,
} from "@/components/segmented-button/segmented-button";

export default function SegmentedButtonDemo() {
  return (
    <SegmentedButtonGroup
      aria-label="View density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <SegmentedButton icon={<ListIcon />} id="list">
        List
      </SegmentedButton>
      <SegmentedButton icon={<Grid2X2Icon />} id="grid">
        Grid
      </SegmentedButton>
      <SegmentedButton icon={<Rows3Icon />} id="rows">
        Rows
      </SegmentedButton>
    </SegmentedButtonGroup>
  );
}
