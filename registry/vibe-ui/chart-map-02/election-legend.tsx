import type { MapLegend } from "./map-model";

export type ElectionLegendProps = { data: MapLegend };

export function ElectionLegend(props: ElectionLegendProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{props.data.name}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {props.data.bands.map((band) => (
          <li key={band.label} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              style={{ background: band.color }}
              className="size-3 shrink-0"
            />
            {band.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
