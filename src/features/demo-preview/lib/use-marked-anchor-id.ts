import { useRouterState } from "@tanstack/react-router";
import * as React from "react";

/**
 * How long a Demo stays marked after a link sends a visitor to it. Long enough
 * to find the card among ten near-identical ones, short enough that the mark
 * reads as an arrival rather than a selected state.
 */
const markDuration = 2500;

/**
 * The Demo the current fragment points at, for as long as it stays marked.
 *
 * Scrolling is the router's own hash behaviour, not ours; this only decides
 * what to mark once the visitor is there. It runs in an effect, so the server
 * — which never sees a fragment — and the first client render agree.
 */
export function useMarkedAnchorId(): string | undefined {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [markedAnchorId, setMarkedAnchorId] = React.useState<string>();

  React.useEffect(() => {
    if (hash === "") {
      setMarkedAnchorId(undefined);
      return;
    }

    setMarkedAnchorId(hash);
    const timeout = window.setTimeout(() => setMarkedAnchorId(undefined), markDuration);

    return () => window.clearTimeout(timeout);
  }, [hash]);

  return markedAnchorId;
}
