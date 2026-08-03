import { Grid2X2Icon, Rows3Icon, Table2Icon } from "lucide-react";

import { M3ToggleButtonGroup } from "@/material-3-ui/components/m3-button-group/m3-button-group";
import { M3ToggleButton } from "@/material-3-ui/components/m3-toggle-button/m3-toggle-button";

export default function M3ButtonGroupDemo() {
  return (
    <M3ToggleButtonGroup
      aria-label="Layout density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <M3ToggleButton id="grid" size="sm" variant="filled">
        <Grid2X2Icon />
        Grid
      </M3ToggleButton>
      <M3ToggleButton id="rows" size="sm" variant="filled">
        <Rows3Icon />
        Rows
      </M3ToggleButton>
      <M3ToggleButton id="table" size="sm" variant="filled">
        <Table2Icon />
        Table
      </M3ToggleButton>
    </M3ToggleButtonGroup>
  );
}
