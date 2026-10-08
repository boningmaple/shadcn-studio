import type { KeyboardEvent, RefObject } from "react";

import type { RegionResult } from "./election-data";

export type ElectionResultCardProps = {
  result: RegionResult;
  compact?: boolean;
  dense?: boolean;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  onClose?: () => void;
  onCloseKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

function compactCandidateName(name: string) {
  return name === "Luiz Inácio Lula da Silva" ? "Lula" : name;
}

export function ElectionResultCard({ closeButtonRef, ...props }: ElectionResultCardProps) {
  return (
    <div
      className={
        props.compact
          ? "rounded-lg border border-black/10 bg-white p-4 text-neutral-800"
          : props.dense
            ? "rounded-lg border border-black/10 bg-white p-2.5 text-neutral-800 shadow-lg"
            : "rounded-md border border-black/10 bg-white p-5 text-neutral-800 shadow-xl"
      }
    >
      <p
        className={
          props.dense
            ? "text-base font-semibold tracking-tight"
            : "text-2xl font-medium tracking-tight"
        }
      >
        {props.result.name}
      </p>
      <p
        style={{
          color: props.result.leadColor,
        }}
        className={props.dense ? "mt-1 text-xs font-semibold" : "mt-2 text-base font-bold"}
      >
        {props.result.leadLabel}
      </p>
      <p
        className={
          props.dense ? "mt-0.5 text-[11px] text-neutral-500" : "mt-1 text-sm text-neutral-500"
        }
      >
        {props.dense && props.result.leader
          ? `${compactCandidateName(props.result.leader.name)} +${props.result.leadPercentPoints.toFixed(2)} pts`
          : props.result.leadPointsLabel}
      </p>
      <dl className={props.dense ? "mt-3 space-y-2" : "mt-4 space-y-3"}>
        {props.result.displayResults.map((row) => (
          <div
            key={row.candidateId}
            className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 ${props.dense ? "text-xs" : "text-sm"}`}
          >
            <dt title={row.name} className="flex min-w-0 items-center gap-1.5">
              <span
                aria-hidden="true"
                style={{ background: row.palette.primary }}
                className={
                  props.dense ? "size-2 shrink-0 rounded-full" : "size-2.5 shrink-0 rounded-full"
                }
              />
              <span className="truncate">
                {props.dense ? compactCandidateName(row.name) : row.name}
              </span>
            </dt>
            <dd className="font-bold tabular-nums">{row.percentLabel}</dd>
            <dd
              className={`col-span-2 mt-0.5 pl-3.5 font-normal text-neutral-500 tabular-nums ${props.dense ? "text-[10px]" : "text-xs"}`}
            >
              {row.votesLabel} votes
            </dd>
          </div>
        ))}
      </dl>
      {props.onClose && (
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={`Close ${props.result.name} results`}
          className={`min-h-10 w-full rounded-md border-t text-neutral-600 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 motion-reduce:transition-none ${props.dense ? "mt-2 text-xs" : "mt-3 text-sm"}`}
          onClick={props.onClose}
          onKeyDown={props.onCloseKeyDown}
        >
          Close
        </button>
      )}
    </div>
  );
}
