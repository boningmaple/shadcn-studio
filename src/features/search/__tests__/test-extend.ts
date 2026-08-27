import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { it as baseIt } from "vite-plus/test";

import { searchContract, type SearchHit } from "../api/search.contract";

export const mockedComponentHit = (componentName: string): SearchHit => ({
  componentName,
  href: `/mock-${componentName.toLowerCase()}`,
  kind: "component",
  score: 1,
});

export const mockedSearchHitsByQuery: Record<string, SearchHit[]> = {
  c: [mockedComponentHit("Card"), mockedComponentHit("Calendar"), mockedComponentHit("Combobox")],
  ca: [mockedComponentHit("Card"), mockedComponentHit("Calendar"), mockedComponentHit("Carousel")],
  car: [mockedComponentHit("Card"), mockedComponentHit("Carousel")],
  card: [mockedComponentHit("Card")],
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
