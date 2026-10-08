import type { NationalChartData } from "./election-data";

export type NationalResultsChartProps = { data: NationalChartData };

export function NationalResultsChart(props: NationalResultsChartProps) {
  return (
    <figure className="my-6 text-sm sm:text-base">
      <figcaption className="sr-only">
        National first-round presidential results. More than 50% of valid votes is required to win
        outright. The reporting and final-results swatches are a reference key.
      </figcaption>
      <table className="sr-only">
        <caption>National valid votes</caption>
        <thead>
          <tr>
            <th scope="col">Candidate</th>
            <th scope="col">Share</th>
            <th scope="col">Votes</th>
          </tr>
        </thead>
        <tbody>
          {[...props.data.rows, props.data.other].map((row) => (
            <tr key={row.candidateId}>
              <th scope="row">{row.name}</th>
              <td>{row.percentLabel}</td>
              <td>{row.votesLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        aria-hidden="true"
        className="grid grid-cols-[100px_minmax(0,1fr)_48px_48px] grid-rows-[auto_6rem_auto] gap-x-2 sm:grid-cols-[180px_minmax(0,1fr)_72px_72px] sm:gap-x-4"
      >
        <div />
        <div className="relative h-14 text-xs text-muted-foreground sm:text-sm">
          <span className="absolute bottom-1 left-0 -translate-x-1/2">0%</span>
          <span className="absolute bottom-1 left-1/3 -translate-x-1/2">25%</span>
          <span className="absolute bottom-1 left-2/3 -translate-x-1/2 whitespace-nowrap text-center leading-tight">
            <strong className="text-foreground">50%</strong>
            <br />
            TO WIN
            <span className="block text-foreground">▼</span>
          </span>
          <span className="absolute bottom-1 left-full -translate-x-1/2">75%</span>
        </div>
        <p className="self-end pb-1 text-right text-xs tracking-wide text-muted-foreground sm:text-sm">
          PCT.
        </p>
        <p className="self-end pb-1 text-right text-xs tracking-wide text-muted-foreground sm:text-sm">
          COUNT
        </p>
        <div className="grid h-full grid-rows-2 items-center text-right">
          {props.data.rows.map((row) => (
            <p key={row.candidateId}>{row.name}</p>
          ))}
        </div>
        <svg
          viewBox="0 0 600 96"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={96}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={600}
            y1={0}
            x2={600}
            y2={96}
            stroke="var(--border)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          {props.data.bars.map((bar) => (
            <rect
              key={bar.key}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.fill}
            />
          ))}
          <line
            x1={400}
            y1={0}
            x2={400}
            y2={96}
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="grid h-full grid-rows-2 items-center text-right tabular-nums">
          {props.data.rows.map((row) => (
            <p key={row.candidateId} style={{ color: row.palette.primary }}>
              {row.compactPercentLabel}
            </p>
          ))}
        </div>
        <div className="grid h-24 grid-rows-2 items-center text-right text-muted-foreground tabular-nums">
          {props.data.rows.map((row) => (
            <p key={row.candidateId}>{row.compactVotesLabel}</p>
          ))}
        </div>
        <div className="col-span-4 col-start-1 row-start-3 mt-4 self-start border-t" />
        <div className="col-start-1 row-start-3 self-start flex flex-wrap content-start justify-end gap-x-6 gap-y-3 pt-7 text-right leading-6 sm:col-start-2 sm:justify-start sm:text-left">
          <div className="flex flex-col items-end gap-1 sm:items-start">
            <p className="flex h-6 items-center text-xs tracking-wide text-muted-foreground">
              REPORTING
            </p>
            <div className="flex gap-0.5">
              {props.data.rows.map((row) => (
                <span
                  key={row.candidateId}
                  style={{
                    backgroundColor: row.palette.light,
                    backgroundImage: row.reportingBackground,
                  }}
                  className="size-5 sm:size-7"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 sm:items-start">
            <p className="flex h-6 items-center text-xs tracking-wide text-muted-foreground">
              FINAL RESULTS
            </p>
            <div aria-hidden="true" className="flex gap-0.5">
              {props.data.rows.map((row) => (
                <span
                  key={row.candidateId}
                  style={{ background: row.palette.primary }}
                  className="size-5 sm:size-7"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="col-start-2 row-start-3 self-start justify-self-end translate-x-1/2 pt-7 leading-6 text-muted-foreground">
          Other
        </p>
        <p className="col-start-3 row-start-3 self-start pt-7 text-right leading-6 text-muted-foreground tabular-nums">
          {props.data.other.compactPercentLabel}
        </p>
        <p className="col-start-4 row-start-3 self-start pt-7 text-right leading-6 text-muted-foreground tabular-nums">
          {props.data.other.compactVotesLabel}
        </p>
      </div>
    </figure>
  );
}
