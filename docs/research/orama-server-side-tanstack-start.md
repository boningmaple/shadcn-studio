# Server-side Orama JS with TanStack Start

| Field         | Value                                      |
| ------------- | ------------------------------------------ |
| Document type | Research Note                              |
| Verified      | 2026-08-11                                 |
| Question      | Can Orama JS serve search from the server? |

## Answer

Yes. Open-source `@orama/orama` can run inside a TanStack Start server route or
server function. The browser can send each query to the app server and receive
serialized search results. Orama Cloud is not required.

The proposed choice is therefore not binary. There are three architectures:

| Architecture           | Index and query location           | Query network dependency             | Orama account |
| ---------------------- | ---------------------------------- | ------------------------------------ | ------------- |
| Browser-local Orama JS | Browser memory                     | No, after assets/index are available | No            |
| Self-hosted Orama JS   | TanStack Start server/edge process | Yes, browser to app server           | No            |
| Orama Cloud            | Orama's hosted service             | Yes, browser/server to Orama Cloud   | Yes           |

Orama describes Orama JS as a search engine for the browser, server, or edge and
says a JavaScript runtime is its only requirement. Thus, “Orama JS builds the
index in the browser” is too narrow: it is an embeddable engine whose runtime is
an application decision. [Orama JS introduction](https://docs.orama.com/docs/orama-js)

Orama Cloud is a separate hosted integration. Its client is configured with a
Cloud project ID and API key. [Orama Cloud client setup](https://docs.orama.com/docs/cloud/ui-library/introduction)

## Fumadocs comparison

The server-mediated architecture is Fumadocs-like, but the engine needs a
current-version caveat:

- Historical Fumadocs v14 built-in search used Orama behind a generated `GET`
  route. Its `fetch` client sent HTTP requests to that search server, while its
  `static` client downloaded the search map and queried locally.
  [Fumadocs v14 Orama search](https://v14.fumadocs.dev/docs/headless/search/orama)
- Current Fumadocs has switched its default built-in engine to **ZBSearch**. It
  retains the same architectural choice: the default fetch client calls a
  server API, while static mode sends the database to the browser.
  [Current Fumadocs built-in search](https://www.fumadocs.dev/docs/headless/search/orama)
- Orama Cloud remains a separate Fumadocs integration that uploads records to a
  Cloud data source and searches with a project ID and public read-only key.
  [Fumadocs Orama Cloud integration](https://www.fumadocs.dev/docs/headless/search/orama-cloud)

Therefore, “like Fumadocs” accurately describes the browser-to-search-server
request flow, but it is no longer accurate to say current Fumadocs' default
engine is Orama.

## TanStack Start shape

TanStack Start provides two valid boundaries:

- A **server route** such as `/api/search` is the closest match to Fumadocs. A
  `createFileRoute()` route can define `server.handlers.GET` or `POST` and
  return `Response.json(...)`.
  [TanStack Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes)
- A **server function** created with `createServerFn()` is suitable when only
  this TanStack Start app calls search. Client calls become same-origin RPC
  requests; inputs should be validated and results must be serializable.
  [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)

Keep Orama creation, snapshot loading, and querying in a `.server.ts` module.
TanStack Start code and route loaders are isomorphic by default, so placing the
engine directly in a loader does not guarantee it stays out of the browser
bundle. [TanStack Start execution model](https://tanstack.com/start/latest/docs/framework/react/guide/execution-model)

Build or restore the index once per process/isolate and reuse it for requests,
instead of rebuilding it for every keystroke. Orama's persistence plugin can
serialize and restore an index; its filesystem helpers specifically require a
Node-compatible server runtime. [Orama data persistence](https://docs.orama.com/docs/orama-js/plugins/plugin-data-persistence)

For serverless or edge deployment, process memory is not durable: each isolate
may restore its own index after a cold start. At this corpus size, that is likely
manageable, but it should be measured in the intended deployment runtime.

## Requirement consequence and recommendation

Self-hosting removes the third-party search dependency, but it does **not**
remove the network dependency: offline users cannot query a TanStack Start
server. Browser-local Orama is the option that can preserve offline search.

Also, [`NFR-TS-005`](../feature-theme-switch/requirement.md) is explicitly a
requirement for reading, writing, and applying the **theme preference**. It does
not by itself establish an approved product-wide requirement that search work
offline. Search needs its own offline requirement if that behavior is intended.

Recommended ADR wording:

> Use open-source Orama JS. Prefer browser-local execution if offline search is
> required. If search must be server-mediated, run the same Orama JS index
> behind a TanStack Start server route or server function; Orama Cloud is not
> required. Server-mediated search intentionally gives up offline behavior.

For roughly 226 small records, Orama Cloud is unlikely to be justified on scale
alone. Do not record an unmeasured serialized-index estimate as fact; measure
the generated artifact and cold-start cost before setting a size threshold.
