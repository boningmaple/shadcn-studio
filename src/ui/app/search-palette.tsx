import { useNavigate } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import type { Hit } from "@/search/hits";
import { useSearch, type SearchState } from "@/ui/app/use-search";
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

export const searchTriggerLabel = "Search";
export const searchDialogTitle = "Search";

/**
 * The way into search, and the palette it opens.
 *
 * An icon button at every width, widening into a field-like button once there
 * is room to spell the shortcut out.
 */
export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useSearchShortcut(setIsOpen);

  return (
    <div>
      <Button
        aria-label={searchTriggerLabel}
        className="lg:hidden"
        onPress={() => setIsOpen(true)}
        size="icon-sm"
        variant="outline"
      >
        <SearchIcon />
      </Button>
      <Button
        className="hidden w-60 rounded-full text-muted-foreground lg:inline-flex"
        onPress={() => setIsOpen(true)}
        variant="outline"
      >
        <SearchIcon />
        <span className="flex-1 text-left">{searchTriggerLabel}</span>
        <SearchShortcutHint />
      </Button>

      <CommandDialog
        className="top-0 h-full w-full max-w-full sm:top-1/4 sm:h-fit sm:max-w-xl"
        description="Find a Component or a Demo and go straight to it."
        onOpenChange={setIsOpen}
        open={isOpen}
        title={searchDialogTitle}
      >
        <SearchModal onDone={() => setIsOpen(false)} />
      </CommandDialog>
    </div>
  );
}

function SearchModal({ onDone }: { onDone: () => void }) {
  const [query, setQuery] = useState("");
  const { retry, search } = useSearch(query);
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
        <CommandInput placeholder={searchTriggerLabel} />
        {search.status === "loading" ? (
          <LoaderCircleIcon
            aria-hidden
            className="absolute top-3 right-3 size-4 animate-spin text-muted-foreground"
          />
        ) : null}
      </div>

      <div className="sr-only" role="status">
        {announcementFor(search)}
      </div>

      <SearchList onRetry={retry} onSelect={goTo} search={search} />
    </Command>
  );
}

type SearchListProps = {
  onRetry: () => void;
  onSelect: (href: string) => void;
  search: SearchState;
};

function SearchList({ onRetry, onSelect, search }: SearchListProps) {
  if (search.status === "failed") {
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
  if (search.status === "ready" && search.hits.length === 0) {
    return <CommandEmpty>No results for “{search.query}”</CommandEmpty>;
  }

  return (
    <CommandList
      aria-label="Search results"
      className="mt-2 h-[calc(100vh-40px-4px-8px)] max-h-none sm:max-h-72"
      items={search.hits.map((hit) => ({ ...hit, id: hit.href }))}
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

function announcementFor({ hits, query, status }: SearchState): string {
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
 * Whichever user agent is at hand: the request's on the server, the browser's
 * on the client. Read this way so the platform is known while rendering, and
 * the shortcut hint is right in the HTML rather than corrected after mount.
 */
const getUserAgent = createIsomorphicFn()
  .server(() => getRequestHeader("user-agent") ?? "")
  .client(() => navigator.userAgent);

function isApplePlatform(): boolean {
  return /mac|iphone|ipad|ipod/i.test(getUserAgent());
}

/** The modifier this visitor's keyboard actually has. */
function SearchShortcutHint() {
  return (
    <KbdGroup aria-hidden>
      <Kbd>{isApplePlatform() ? "⌘" : "Ctrl"}</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}

function useSearchShortcut(setIsOpen: (isOpen: boolean) => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(false);
      } else if (
        event.key.toLowerCase() === "k" &&
        (isApplePlatform() ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [setIsOpen]);
}
