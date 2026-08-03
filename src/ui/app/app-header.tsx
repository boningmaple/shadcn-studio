"use client";

import * as React from "react";
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react";

import { Button } from "@/ui/shadcn/react-aria/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/ui/shadcn/react-aria/input-group";
import { Kbd, KbdGroup } from "@/ui/shadcn/react-aria/kbd";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";

export function AppHeader() {
  const [isDarkIcon, setIsDarkIcon] = React.useState(false);
  const ThemeIcon = isDarkIcon ? MoonIcon : SunIcon;

  return (
    <header className="sticky top-0 z-40 h-14 border-b bg-background/95 backdrop-blur">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4">
        <div className="flex items-center">
          <span className="truncate text-sm font-semibold">VibeUI</span>
        </div>

        <div>
          <SearchField />
        </div>

        <div
          aria-label="App header actions"
          className="flex items-center justify-end gap-2"
        >
          <TooltipTrigger delay={300}>
            <Button
              aria-label="Search"
              className="lg:hidden"
              size="icon-sm"
              variant="outline"
            >
              <SearchIcon />
            </Button>
            <Tooltip>Search</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger delay={300}>
            <Button
              aria-label={
                isDarkIcon ? "Show light mode icon" : "Show dark mode icon"
              }
              onPress={() => setIsDarkIcon((value) => !value)}
              size="icon-sm"
              variant="outline"
            >
              <ThemeIcon />
            </Button>
            <Tooltip>{isDarkIcon ? "Light icon" : "Dark icon"}</Tooltip>
          </TooltipTrigger>
        </div>
      </div>
    </header>
  );
}

function SearchField() {
  return (
    <InputGroup className="hidden h-9 w-96 rounded-full lg:flex">
      <InputGroupInput
        aria-label="Search"
        className="text-base placeholder:text-muted-foreground md:text-base"
        placeholder="Search"
        type="search"
      />
      <InputGroupAddon align="inline-start" className="pl-3">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="pr-3">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </InputGroupAddon>
    </InputGroup>
  );
}
