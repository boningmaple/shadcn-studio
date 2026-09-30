import type { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  LoaderCircleIcon,
  SearchXIcon,
  TriangleAlertIcon,
  WifiOffIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogClose } from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchFetchError, type SearchAnswer } from "@/features/search/api/search-client";
import { searchContract, type SearchHit } from "@/features/search/api/search.contract";
import { useSearchQuery } from "@/features/search/hooks/use-search-query";
import type { QuickLink } from "@/features/search/types/quick-links";
import { useIsOnline } from "@/shared/hooks/use-is-online";

type SelectHandler = (href: string) => void;
const queryErrorId = "search-query-error";
const queryErrorMessage = "Search must be 200 characters or fewer.";

type SearchDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  quickLinks: readonly QuickLink[];
};

export function SearchDialog(props: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const parsedQuery = searchContract.query.safeParse({ q: query });
  const searchTerm = parsedQuery.success ? parsedQuery.data.q : query.trim();
  const isOnline = useIsOnline();
  const searchQueryResult = useSearchQuery(searchTerm, isOnline, parsedQuery.success);
  const serverRejectedQueryLength =
    searchQueryResult.error instanceof SearchFetchError &&
    searchQueryResult.error.code === "search_query_too_long";
  const isQueryInvalid = !parsedQuery.success || serverRejectedQueryLength;
  const navigate = useNavigate();

  const goTo = (href: string) => {
    const [pathname = "/", hash] = href.split("#");

    // Hit hrefs are the app's own route paths, but they arrive over the wire
    // as plain strings, which the router's typed `to` cannot know.
    void navigate({ hash, to: pathname as never });
    props.setIsOpen(false);
  };

  return (
    <CommandDialog
      description="Find a Registry item, Collection page, or app page and go straight to it."
      open={props.isOpen}
      title="Search"
      className="top-0 h-full w-full max-w-full rounded-none! sm:top-1/4 sm:h-fit sm:max-w-xl sm:rounded-xl!"
      onOpenChange={props.setIsOpen}
    >
      <Command
        // ADR-0007: Orama has already matched, scored and ordered these Hits.
        // `Autocomplete` would otherwise apply a plain substring filter and
        // discard exactly the typo-tolerant Hits Orama was adopted to provide.
        filter={() => true}
        inputValue={query}
        onInputChange={setQuery}
      >
        <div>
          <div className="flex items-center">
            <div className="relative min-w-0 flex-1">
              <CommandInput
                aria-describedby={isQueryInvalid ? queryErrorId : undefined}
                aria-invalid={isQueryInvalid || undefined}
                placeholder="Search"
                className="pr-8"
              />
              {searchQueryResult.isFetching ? (
                <LoaderCircleIcon
                  aria-hidden
                  className="pointer-events-none absolute top-3 right-3 size-4 animate-spin text-muted-foreground"
                />
              ) : null}
            </div>
            <DialogClose aria-label="Close search" size="icon" className="mt-1 mr-1 ml-1">
              <XIcon aria-hidden />
            </DialogClose>
          </div>
          {isQueryInvalid ? (
            <p id={queryErrorId} role="alert" className="px-2 pt-1 text-sm text-destructive">
              {queryErrorMessage}
            </p>
          ) : null}
        </div>

        <output className="sr-only">
          {announcementFor(searchTerm, isOnline, isQueryInvalid, searchQueryResult)}
        </output>

        <SearchQueryResultList
          isOnline={isOnline}
          isQueryInvalid={isQueryInvalid}
          quickLinks={props.quickLinks}
          query={searchTerm}
          searchQueryResult={searchQueryResult}
          onSelect={goTo}
        />
      </Command>
    </CommandDialog>
  );
}

type SearchBodyProps = {
  isOnline: boolean;
  isQueryInvalid: boolean;
  quickLinks: readonly QuickLink[];
  query: string;
  searchQueryResult: UseQueryResult<SearchAnswer, Error>;
  onSelect: SelectHandler;
};

/**
 * The order of these branches is the design. Nothing typed wins over
 * everything, since Quick links need no network and no answer; having no
 * connection wins over a failure, and both win over the Hits still held
 * underneath them — but neither wins over an answer to the query on screen,
 * which may well be cached from before the connection went.
 */
function SearchQueryResultList({
  isOnline,
  isQueryInvalid,
  quickLinks,
  query,
  searchQueryResult,
  onSelect,
}: SearchBodyProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = async () => {
    setIsRetrying(true);

    try {
      await searchQueryResult.refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  if (query === "") {
    return <QuickLinkList links={quickLinks} onSelect={onSelect} />;
  }

  if (isQueryInvalid) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Query too long</EmptyTitle>
          <EmptyDescription>Shorten the query to search VibeUI.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const answer = searchQueryResult.data;
  // The answer carries the query it answered, which is what tells a real answer
  // from the previous query's Hits held under a fetch.
  const answersThisQuery = answer?.query === query;

  // Ahead of the failure, so that retrying from here says the same thing it did
  // before the press: a failed attempt with no connection is still no network.
  if (!answersThisQuery && !isOnline) {
    return (
      <Unreachable
        description="VibeUI search needs a connection."
        icon={WifiOffIcon}
        isRetrying={searchQueryResult.isFetching}
        title="No network"
        onRetry={() => void retry()}
      />
    );
  }

  // `keepPreviousData` reports the retry of a failed query as a success, so the
  // click is latched: without it the alert would drop back to the previous
  // query's Hits for the length of the retry, as though it had already worked.
  // The latch ends when the retry settles, so the previous query's Hits cannot
  // flash while that request is in flight.
  if (searchQueryResult.isError || (isRetrying && !answersThisQuery)) {
    return (
      <Unreachable
        description="That may well be a blip. Try it again."
        icon={TriangleAlertIcon}
        isRetrying={searchQueryResult.isFetching}
        title="The search could not be reached."
        onRetry={() => void retry()}
      />
    );
  }

  // The first search of the page load, with no answer of any kind to hold. The
  // Quick links stay up rather than the body collapsing to the input and
  // springing back when the answer lands; the spinner says what is happening.
  if (answer === undefined) {
    return <QuickLinkList links={quickLinks} onSelect={onSelect} />;
  }

  // Held across the next query the same way Hits are, rather than blanking out
  // and coming back on every keystroke past a query that found nothing. Naming
  // `answer.query` rather than what is typed is what makes that safe: the
  // message says which query it is about, so holding it claims nothing about
  // the one still in flight.
  if (answer.hits.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>No results for “{answer.query}”.</EmptyTitle>
          <EmptyDescription>Try a different word or check the spelling.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return <HitList hits={answer.hits} onSelect={onSelect} />;
}

function Unreachable({
  description,
  icon: Icon,
  isRetrying,
  onRetry,
  title,
}: {
  description: string;
  icon: LucideIcon;
  isRetrying: boolean;
  onRetry: () => void;
  title: string;
}) {
  return (
    <Empty role="alert">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button isDisabled={isRetrying} variant="outline" onPress={onRetry}>
          {"Try again"}
        </Button>
      </EmptyContent>
    </Empty>
  );
}

function QuickLinkList({
  links,
  onSelect,
}: {
  links: readonly QuickLink[];
  onSelect: SelectHandler;
}) {
  const linksWithIds = links.map((link) => ({ ...link, id: link.to }));

  return (
    <CommandList
      aria-label="Quick links"
      className="mt-2"
      onAction={(key) => onSelect(String(key))}
    >
      <CommandGroup heading="Go to" items={linksWithIds}>
        {(link: QuickLink & { id: string }) => (
          <CommandItem id={link.id} textValue={link.label} className="gap-3">
            {link.icon === undefined ? null : <link.icon />}
            <span className="truncate">{link.label}</span>
          </CommandItem>
        )}
      </CommandGroup>
    </CommandList>
  );
}

type HitListProps = {
  hits: SearchHit[];
  onSelect: SelectHandler;
};

function HitList(props: HitListProps) {
  return (
    <CommandList
      aria-label="Search results"
      items={props.hits.map((hit) => ({ ...hit, id: hit.href }))}
      className="mt-2 px-1 h-[calc(100vh-40px-4px-8px)] max-h-none sm:max-h-72"
      onAction={(key) => props.onSelect(String(key))}
    >
      {(hit) => (
        <CommandItem
          id={hit.id}
          aria-label={hit.title}
          textValue={hit.title}
          className="gap-4 [&>svg]:hidden"
        >
          <span className="min-w-0 flex-1 truncate">{hit.title}</span>
          <span className="shrink-0 text-right text-xs whitespace-nowrap capitalize text-muted-foreground">
            {hit.kind.replace("-", " ")}
          </span>
        </CommandItem>
      )}
    </CommandList>
  );
}

/**
 * What the palette is doing, for anyone not watching it. The spinner is
 * `aria-hidden`, so this is the only account of it there is.
 */
function announcementFor(
  query: string,
  isOnline: boolean,
  isQueryInvalid: boolean,
  searchQueryResult: UseQueryResult<SearchAnswer, Error>,
): string {
  if (isQueryInvalid) {
    return queryErrorMessage;
  }

  if (searchQueryResult.isFetching) {
    return "Searching";
  }

  if (searchQueryResult.isError) {
    return "The search could not be reached";
  }

  if (query === "") {
    return "";
  }

  const answer = searchQueryResult.data;

  if (answer?.query !== query) {
    return isOnline ? "" : "No network";
  }

  const count = `${answer.hits.length} ${answer.hits.length === 1 ? "result" : "results"}`;

  return `${count} for ${answer.query}`;
}
