import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/preview/$")({
  staticData: { ariaLabel: "Preview not found" },
  loader: () => {
    throw notFound();
  },
});
