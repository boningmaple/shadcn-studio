import { Grid2X2Icon, Rows3Icon, Table2Icon } from "lucide-react";

import { MDToggleButtonGroup } from "@/ui/material-design/components/md-button-group/md-button-group";
import { MDToggleButton } from "@/ui/material-design/components/md-toggle-button/md-toggle-button";

export default function MDButtonGroupDemo() {
  return (
    <MDToggleButtonGroup
      aria-label="Layout density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <MDToggleButton id="grid" size="sm" variant="filled">
        <Grid2X2Icon />
        Grid
      </MDToggleButton>
      <MDToggleButton id="rows" size="sm" variant="filled">
        <Rows3Icon />
        Rows
      </MDToggleButton>
      <MDToggleButton id="table" size="sm" variant="filled">
        <Table2Icon />
        Table
      </MDToggleButton>
    </MDToggleButtonGroup>
  );
}
