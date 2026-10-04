import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function Button04() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-64 flex-col items-start gap-4">
      <div className="flex gap-2">
        <Button
          aria-pressed={!collapsed}
          variant="outline"
          size="sm"
          onPress={() => setCollapsed(false)}
        >
          Expand
        </Button>
        <Button
          aria-pressed={collapsed}
          variant="outline"
          size="sm"
          onPress={() => setCollapsed(true)}
        >
          Collapse
        </Button>
      </div>
      <Button
        aria-label="Search"
        data-collapsed={collapsed}
        variant="outline"
        className="group/search h-8 w-full min-w-8 rounded-full gap-2 justify-start data-[collapsed=true]:w-8 px-1.75 transition-[width] duration-200 ease-linear overflow-hidden motion-reduce:transition-none"
      >
        <SearchIcon />
        <span className="min-w-0 flex-1 flex items-center gap-2 group-data-[collapsed=true]/search:opacity-0 transition-opacity duration-200 ease-linear overflow-hidden motion-reduce:transition-none">
          <span className="min-w-0 truncate">Search</span>
          <KbdGroup aria-hidden className="ml-auto shrink-0">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </span>
      </Button>
    </div>
  );
}
