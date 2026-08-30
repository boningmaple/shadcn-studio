import { createFileRoute } from "@tanstack/react-router";

import { handleSearchRequest } from "@/features/search/server/search-handler.server";

export const Route = createFileRoute("/api/search")({
  staticData: { ariaLabel: "Search Api" },
  server: {
    handlers: {
      GET: ({ request }) => handleSearchRequest(request),
    },
  },
});
