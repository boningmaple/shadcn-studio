import { LayoutGridIcon, ListIcon, Rows3Icon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDMenu,
  MDMenuItem,
  MDMenuTrigger,
} from "@/ui/material-design/components/md-menu/md-menu";

export default function MDMenuDemo() {
  return (
    <MDMenuTrigger>
      <MDButton variant="outlined">View mode</MDButton>
      <MDMenu
        defaultSelectedKeys={["grid"]}
        selectionMode="single"
        shouldCloseOnSelect={false}
      >
        <MDMenuItem id="list" icon={<ListIcon />}>
          List
        </MDMenuItem>
        <MDMenuItem id="grid" icon={<LayoutGridIcon />}>
          Grid
        </MDMenuItem>
        <MDMenuItem id="rows" icon={<Rows3Icon />}>
          Rows
        </MDMenuItem>
      </MDMenu>
    </MDMenuTrigger>
  );
}
