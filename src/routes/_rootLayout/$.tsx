import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_rootLayout/$")({
  staticData: { ariaLabel: "Page not found" },
  loader: () => {
    throw notFound();
  },
});
