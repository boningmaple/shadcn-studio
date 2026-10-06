import { createFileRoute } from "@tanstack/react-router";

import { BrazilElectionDemo } from "@/features/brazil-election-demo/brazil-election-demo";

export const Route = createFileRoute("/demos/brazil-election")({
  head: () => ({ meta: [{ title: "Brazil election map demo – TanStack Charts" }] }),
  staticData: { ariaLabel: "Brazil election map demo" },
  component: BrazilElectionDemo,
});
