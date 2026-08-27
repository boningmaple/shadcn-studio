import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { DemoCodePanel } from "@/features/demo-preview/components/demo-code-panel";
import { getComponent } from "@/features/search/data/registry";

/**
 * The three states one Demo's source can be in, exercised through the panel's
 * own interface. Both placements — the card's dialog and the large preview's
 * code tab — render this and nothing else, so what holds here holds for both.
 */
const button = getComponent("button");
const demo = button.demos[0];

/** One pending code request, answered when a test decides to. */
type PendingRequest = {
  fail: () => void;
  resolveWith: (payload: unknown) => void;
  url: string;
};

let requests: PendingRequest[] = [];
let clipboard: string[] = [];

const source = {
  code: "export default function Demo() {}",
  html: '<pre class="shiki"><code>export default function Demo() {}</code></pre>',
};

beforeEach(() => {
  requests = [];
  clipboard = [];

  vi.stubGlobal("fetch", (input: string) => {
    return new Promise<Response>((resolve) => {
      const respond = (body: string, status: number) =>
        resolve(
          new Response(body, {
            headers: { "content-type": "application/json" },
            status,
          }),
        );

      requests.push({
        fail: () => respond("", 500),
        resolveWith: (payload) => respond(JSON.stringify(payload), 200),
        url: String(input),
      });
    });
  });

  vi.spyOn(navigator.clipboard, "writeText").mockImplementation((text) => {
    clipboard.push(text);
    return Promise.resolve();
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const renderPanel = () =>
  render(<DemoCodePanel component={button} demo={demo} title="Manual Code" />);

const copyButton = () => page.getByRole("button", { name: /^Cop/ });

describe("DemoCodePanel", () => {
  it("asks for the Demo's own code artifact when it mounts", async () => {
    await renderPanel();

    await expect.poll(() => requests.length).toBe(1);
    expect(requests[0]!.url).toContain("generated/md-button-01.json");
  });

  it("says it is loading until the code lands", async () => {
    await renderPanel();

    await expect.element(page.getByRole("status")).toHaveTextContent("Loading code");
  });

  it("shows the highlighted source once it arrives", async () => {
    await renderPanel();

    await expect.poll(() => requests.length).toBe(1);
    requests[0]!.resolveWith(source);

    await expect.element(page.getByText("export default function Demo() {}")).toBeInTheDocument();
  });

  it("offers a retry rather than retrying behind the visitor's back", async () => {
    await renderPanel();

    await expect.poll(() => requests.length).toBe(1);
    requests[0]!.fail();

    await expect.element(page.getByRole("alert")).toBeInTheDocument();

    // The defect this guards: a failure that re-arms the load on its own asks
    // forever. One failure must stay at one request until the visitor says so.
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(requests).toHaveLength(1);

    await userEvent.click(page.getByRole("button", { name: "Try again" }));

    await expect.poll(() => requests.length).toBe(2);
    requests[1]!.resolveWith(source);

    await expect.element(page.getByText("export default function Demo() {}")).toBeInTheDocument();
  });

  it("rejects a payload that is not the shape it expects", async () => {
    await renderPanel();

    await expect.poll(() => requests.length).toBe(1);
    requests[0]!.resolveWith({ code: 42 });

    await expect.element(page.getByRole("alert")).toBeInTheDocument();
  });

  it("offers no copy control until there is code to copy", async () => {
    await renderPanel();

    await expect.element(page.getByRole("status")).toBeInTheDocument();
    await expect.element(copyButton()).not.toBeInTheDocument();
  });

  it("copies the source, and confirms it did", async () => {
    await renderPanel();

    await expect.poll(() => requests.length).toBe(1);
    requests[0]!.resolveWith(source);
    await expect.element(copyButton()).toBeInTheDocument();

    await userEvent.click(copyButton());

    expect(clipboard).toEqual([source.code]);
    // The confirmation is the accessible name, so it reaches a screen reader
    // rather than only the icon.
    await expect.element(page.getByRole("button", { name: "Code copied" })).toBeInTheDocument();
  });
});
