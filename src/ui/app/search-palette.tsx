import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";

import type { Hit } from "@/search/hits";
import { useSearch, type SearchResults } from "@/ui/app/use-search";
import { Button } from "@/ui/shadcn/react-aria/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/ui/shadcn/react-aria/command";
import { Kbd, KbdGroup } from "@/ui/shadcn/react-aria/kbd";
import { cn } from "@/lib/utils";

export const searchDialogTitle = "Search";
export const searchTriggerLabel = "Search";
const searchPlaceholder = "Search Components and Demos";

type SearchPaletteProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SearchPalette({ isOpen, onOpenChange }: SearchPaletteProps) {
  return (
    <CommandDialog
      className="top-1/4 w-full sm:max-w-xl"
      description="Find a Component or a Demo and go straight to it."
      onOpenChange={onOpenChange}
      open={isOpen}
      title={searchDialogTitle}
    >
      {/* Mounted only while open, so the idle list is fetched on each visit
          rather than kept warm behind a closed dialog. */}
      <SearchPaletteBody onDone={() => onOpenChange(false)} />
    </CommandDialog>
  );
}

function SearchPaletteBody({ onDone }: { onDone: () => void }) {
  const [query, setQuery] = React.useState("");
  const { results, retry } = useSearch(query);
  const navigate = useNavigate();

  const goTo = (href: string) => {
    const [pathname = "/", hash] = href.split("#");

    // Hit hrefs are the app's own route paths, but they arrive over the wire
    // as plain strings, which the router's typed `to` cannot know.
    void navigate({ hash, to: pathname as never });
    onDone();
  };

  return (
    <Command
      // ADR-0002: Orama has already matched, scored and ordered these Hits.
      // `Autocomplete` would otherwise apply a plain substring filter and
      // discard exactly the typo-tolerant Hits Orama was adopted to provide.
      filter={() => true}
      inputValue={query}
      onInputChange={setQuery}
    >
      <div className="relative">
        <CommandInput placeholder={searchPlaceholder} />
        {results.status === "loading" ? (
          <LoaderCircleIcon
            aria-hidden
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
          />
        ) : null}
      </div>

      <div className="sr-only" role="status">
        {announcementFor(results)}
      </div>

      <SearchPaletteResults onRetry={retry} onSelect={goTo} results={results} />
    </Command>
  );
}

type SearchPaletteResultsProps = {
  onRetry: () => void;
  onSelect: (href: string) => void;
  results: SearchResults;
};

function SearchPaletteResults({
  onRetry,
  onSelect,
  results,
}: SearchPaletteResultsProps) {
  if (results.status === "failed") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center"
        role="alert"
      >
        <p className="text-sm text-muted-foreground">
          The search could not be reached.
        </p>
        <Button onPress={onRetry} variant="outline">
          Try again
        </Button>
      </div>
    );
  }

  // Never blanked while loading: the previous Hits stay until new ones land.
  if (results.status === "ready" && results.hits.length === 0) {
    return <CommandEmpty>No results for “{results.query}”</CommandEmpty>;
  }

  return (
    <CommandList
      aria-label="Search results"
      className="mt-1"
      items={results.hits.map((hit) => ({ ...hit, id: hit.href }))}
      onAction={(key) => onSelect(String(key))}
    >
      {(hit) => (
        <CommandItem
          // Named rather than left to its content, so a Demo Hit reads as
          // belonging to its Component instead of as two loose phrases.
          aria-label={labelFor(hit)}
          className="gap-3"
          id={hit.id}
          textValue={labelFor(hit)}
        >
          <span className="truncate">{hit.demoName ?? hit.componentName}</span>
          {hit.demoName === undefined ? null : (
            <CommandShortcut className="tracking-normal">
              {hit.componentName}
            </CommandShortcut>
          )}
        </CommandItem>
      )}
    </CommandList>
  );
}

/** What a Hit is called, to assistive technology and to type-ahead. */
function labelFor(hit: Hit): string {
  return hit.demoName === undefined
    ? hit.componentName
    : `${hit.demoName}, in ${hit.componentName}`;
}

function announcementFor({ hits, query, status }: SearchResults): string {
  if (status === "loading") {
    return "Searching";
  }

  if (status === "failed") {
    return "The search could not be reached";
  }

  const count = `${hits.length} ${hits.length === 1 ? "result" : "results"}`;

  return query === "" ? count : `${count} for ${query}`;
}

/**
 * The header's search control: a button that looks like a field.
 *
 * It used to be a real text input that discarded every keystroke — announced
 * to a screen reader as an editable field that accepts input it throws away.
 */
export function SearchFieldTrigger({
  className,
  onPress,
}: {
  className?: string;
  onPress: () => void;
}) {
  return (
    <Button
      aria-label={searchTriggerLabel}
      className={cn(
        "w-96 justify-start gap-3 rounded-full px-3 font-normal text-muted-foreground",
        className,
      )}
      onPress={onPress}
      size="lg"
      variant="outline"
    >
      <SearchIcon />
      <span className="flex-1 text-left text-base">{searchTriggerLabel}</span>
      <SearchShortcutHint />
    </Button>
  );
}

/**
 * The modifier this visitor's keyboard actually has.
 *
 * Server-rendered as the macOS symbol and corrected after mount, since the
 * platform is not knowable while rendering on the server.
 */
function SearchShortcutHint() {
  const [modifier, setModifier] = React.useState("⌘");

  React.useEffect(() => {
    setModifier(isApplePlatform() ? "⌘" : "Ctrl");
  }, []);

  return (
    <KbdGroup aria-hidden>
      <Kbd>{modifier}</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}

function isApplePlatform(): boolean {
  return /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Opens the palette on ⌘K, or Ctrl+K away from macOS.
 *
 * Both modifiers are accepted everywhere rather than gated on the platform:
 * the hint tells a visitor which one their keyboard has, and honouring the
 * other costs nothing while the palette is closed.
 */
export function useSearchShortcut(onOpen: () => void) {
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") {
        return;
      }

      if (!event.metaKey && !event.ctrlKey) {
        return;
      }

      event.preventDefault();
      onOpen();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
