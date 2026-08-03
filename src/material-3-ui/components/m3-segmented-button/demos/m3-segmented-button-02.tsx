import { Grid2X2Icon, ListIcon, Rows3Icon } from "lucide-react";

import {
  M3SegmentedButton,
  M3SegmentedButtonGroup,
} from "@/material-3-ui/components/m3-segmented-button/m3-segmented-button";

export default function M3SegmentedButtonDemo() {
  return (
    <M3SegmentedButtonGroup
      aria-label="View density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <M3SegmentedButton icon={<ListIcon />} id="list">
        List
      </M3SegmentedButton>
      <M3SegmentedButton icon={<Grid2X2Icon />} id="grid">
        Grid
      </M3SegmentedButton>
      <M3SegmentedButton icon={<Rows3Icon />} id="rows">
        Rows
      </M3SegmentedButton>
    </M3SegmentedButtonGroup>
  );
}
