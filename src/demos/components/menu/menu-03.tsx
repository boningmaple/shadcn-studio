import { LayoutGridIcon, ListIcon, Rows3Icon } from "lucide-react";

import { Button } from "@/components/button/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/menu/menu";

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="outlined">View mode</Button>
      <Menu
        defaultSelectedKeys={["grid"]}
        selectionMode="single"
        shouldCloseOnSelect={false}
      >
        <MenuItem id="list" icon={<ListIcon />}>
          List
        </MenuItem>
        <MenuItem id="grid" icon={<LayoutGridIcon />}>
          Grid
        </MenuItem>
        <MenuItem id="rows" icon={<Rows3Icon />}>
          Rows
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
