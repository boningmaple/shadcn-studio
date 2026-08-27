import {
  searchContract,
  searchRequestUrl,
  type SearchErrorCode,
  type SearchSuccessResponse,
} from "@/features/search/api/search.contract";

/**
 * The answer cached by the palette. `query` is client-owned correlation
 * metadata, not part of the Server Route response.
 */
export type SearchAnswer = {
  hits: SearchSuccessResponse;
  query: string;
};

export type SearchFetchErrorKind =
  | "bad-request"
  | "unexpected-status"
  | "invalid-response"
  | "network";

type SearchFetchErrorOptions = {
  cause?: unknown;
  code?: SearchErrorCode;
  kind: SearchFetchErrorKind;
  status?: number;
};

/** A failure observed by the client adapter, rather than a wire response. */
export class SearchFetchError extends Error {
  readonly code?: SearchErrorCode;
  readonly kind: SearchFetchErrorKind;
  readonly status?: number;

  constructor(message: string, options: SearchFetchErrorOptions) {
    super(message, { cause: options.cause });
    this.name = "SearchFetchError";
    this.code = options.code;
    this.kind = options.kind;
    this.status = options.status;
  }
}

async function responseJson(response: Response, signal: AbortSignal): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }

    throw new SearchFetchError("Search response was not valid JSON", {
      cause: error,
      kind: "invalid-response",
      status: response.status,
    });
  }
}

export async function fetchSearchHits(query: string, signal: AbortSignal): Promise<SearchAnswer> {
  const queryResult = searchContract.query.safeParse({ q: query });

  if (!queryResult.success) {
    throw new SearchFetchError("Search query was invalid", {
      cause: queryResult.error,
      code: "search_query_too_long",
      kind: "bad-request",
    });
  }

  const normalizedQuery = queryResult.data.q;
  let response: Response;

  try {
    response = await fetch(searchRequestUrl(normalizedQuery), {
      method: searchContract.method,
      signal,
    });
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }

    throw new SearchFetchError("Search request failed", {
      cause: error,
      kind: "network",
    });
  }

  if (response.status !== 200 && response.status !== 400) {
    throw new SearchFetchError(`Search failed with undocumented status ${response.status}`, {
      kind: "unexpected-status",
      status: response.status,
    });
  }

  const payload = await responseJson(response, signal);

  if (response.status === 400) {
    const errorResult = searchContract.responses[400].safeParse(payload);

    if (!errorResult.success) {
      throw new SearchFetchError("Search error response had an invalid shape", {
        cause: errorResult.error,
        kind: "invalid-response",
        status: response.status,
      });
    }

    throw new SearchFetchError("Search request was rejected", {
      code: errorResult.data.error,
      kind: "bad-request",
      status: response.status,
    });
  }

  const hitsResult = searchContract.responses[200].safeParse(payload);

  if (!hitsResult.success) {
    throw new SearchFetchError("Search response had an invalid shape", {
      cause: hitsResult.error,
      kind: "invalid-response",
      status: response.status,
    });
  }

  return { hits: hitsResult.data, query: normalizedQuery };
}
