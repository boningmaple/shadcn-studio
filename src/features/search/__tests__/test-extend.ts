import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { it as baseIt } from "vite-plus/test";

import { searchContract, type SearchHit } from "../api/search.contract";

export const mockedRegistryItemHit = (title: string): SearchHit => ({
  description: `A ${title.toLowerCase()} Registry item.`,
  href: `/mock-${title.toLowerCase()}`,
  id: `registry-item:${title.toLowerCase()}`,
  kind: "registry-item",
  name: title.toLowerCase(),
  score: 1,
  title,
});

export const mockedSearchHitsByQuery: Record<string, SearchHit[]> = {
  c: [
    mockedRegistryItemHit("Card"),
    mockedRegistryItemHit("Calendar"),
    mockedRegistryItemHit("Combobox"),
  ],
  ca: [
    mockedRegistryItemHit("Card"),
    mockedRegistryItemHit("Calendar"),
    mockedRegistryItemHit("Carousel"),
  ],
  car: [mockedRegistryItemHit("Card"), mockedRegistryItemHit("Carousel")],
  card: [mockedRegistryItemHit("Card")],
};

const searchHandler = http.get(searchContract.path, ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  return HttpResponse.json(mockedSearchHitsByQuery[query] ?? []);
});

const worker = setupWorker(searchHandler);

let workerStart: Awaited<ReturnType<typeof worker.start>>;
export const it = baseIt.extend("worker", { auto: true }, async ({ task }, { onCleanup }) => {
  void task;
  workerStart ??= await worker.start({ quiet: true });
  onCleanup(() => worker.resetHandlers());
  return worker;
});
