import { Grid2X2Icon, Rows3Icon, Table2Icon } from "lucide-react";

import { ToggleButtonGroup } from "@/components/button-group/button-group";
import { ToggleButton } from "@/components/toggle-button/toggle-button";

export default function ButtonGroupDemo() {
  return (
    <ToggleButtonGroup
      aria-label="Layout density"
      defaultSelectedKeys={["grid"]}
      selectionMode="single"
    >
      <ToggleButton id="grid" size="sm" variant="filled">
        <Grid2X2Icon />
        Grid
      </ToggleButton>
      <ToggleButton id="rows" size="sm" variant="filled">
        <Rows3Icon />
        Rows
      </ToggleButton>
      <ToggleButton id="table" size="sm" variant="filled">
        <Table2Icon />
        Table
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
