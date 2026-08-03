import { Grid2X2Icon, ListIcon, Rows3Icon } from "lucide-react";

import {
  MDSegmentedButton,
  MDSegmentedButtonGroup,
} from "@/ui/material-design/components/md-segmented-button/md-segmented-button";

export default function MDSegmentedButtonDemo() {
  return (
    <MDSegmentedButtonGroup
      aria-label="View density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <MDSegmentedButton icon={<ListIcon />} id="list">
        List
      </MDSegmentedButton>
      <MDSegmentedButton icon={<Grid2X2Icon />} id="grid">
        Grid
      </MDSegmentedButton>
      <MDSegmentedButton icon={<Rows3Icon />} id="rows">
        Rows
      </MDSegmentedButton>
    </MDSegmentedButtonGroup>
  );
}
