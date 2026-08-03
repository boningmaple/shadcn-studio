import { LayoutGridIcon, ListIcon, Rows3Icon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3Menu,
  M3MenuItem,
  M3MenuTrigger,
} from "@/material-3-ui/components/m3-menu/m3-menu";

export default function M3MenuDemo() {
  return (
    <M3MenuTrigger>
      <M3Button variant="outlined">View mode</M3Button>
      <M3Menu
        defaultSelectedKeys={["grid"]}
        selectionMode="single"
        shouldCloseOnSelect={false}
      >
        <M3MenuItem id="list" icon={<ListIcon />}>
          List
        </M3MenuItem>
        <M3MenuItem id="grid" icon={<LayoutGridIcon />}>
          Grid
        </M3MenuItem>
        <M3MenuItem id="rows" icon={<Rows3Icon />}>
          Rows
        </M3MenuItem>
      </M3Menu>
    </M3MenuTrigger>
  );
}
