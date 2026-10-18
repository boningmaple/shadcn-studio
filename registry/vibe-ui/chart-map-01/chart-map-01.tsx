"use client";

import { createChartScene, defineChart, type SceneArea, type SceneNode } from "@tanstack/charts";
import { geoShape } from "@tanstack/charts/geo";
import { geoEqualEarth } from "d3-geo";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { useId, useState } from "react";
// SVG paths provide the map's individually focusable country buttons.
/* eslint-disable jsx-a11y/prefer-tag-over-role */

import { countries } from "./population-data";
import world from "./world.json";

const bands = [
  {
    limit: 1_000_000,
    label: "< 1m",
    color: "fill-teal-100 dark:fill-teal-950",
    swatch: "bg-teal-100 dark:bg-teal-950",
  },
  {
    limit: 5_000_000,
    label: "1–5m",
    color: "fill-teal-200 dark:fill-teal-900",
    swatch: "bg-teal-200 dark:bg-teal-900",
  },
  {
    limit: 10_000_000,
    label: "5–10m",
    color: "fill-teal-300 dark:fill-teal-800",
    swatch: "bg-teal-300 dark:bg-teal-800",
  },
  {
    limit: 50_000_000,
    label: "10–50m",
    color: "fill-teal-400 dark:fill-teal-600",
    swatch: "bg-teal-400 dark:bg-teal-600",
  },
  {
    limit: 100_000_000,
    label: "50–100m",
    color: "fill-teal-600 dark:fill-teal-400",
    swatch: "bg-teal-600 dark:bg-teal-400",
  },
  {
    limit: 1_000_000_000,
    label: "100m–1bn",
    color: "fill-teal-800 dark:fill-teal-200",
    swatch: "bg-teal-800 dark:bg-teal-200",
  },
  {
    limit: Infinity,
    label: "≥ 1bn",
    color: "fill-teal-950 dark:fill-teal-50",
    swatch: "bg-teal-950 dark:bg-teal-50",
  },
];
const countryOptions = Object.entries(countries).sort((a, b) => a[1].name.localeCompare(b[1].name));
const numberFormat = new Intl.NumberFormat("en-US");

function sceneAreas(nodes: readonly SceneNode[]): SceneArea[] {
  return nodes.flatMap((node) =>
    node.kind === "group" ? sceneAreas(node.children) : node.kind === "area" ? [node] : [],
  );
}

const boundaries = world as FeatureCollection<Polygon | MultiPolygon, { name: string }>;
const features = boundaries.features
  .filter((feature) => String(feature.id) !== "010")
  .map((feature, index) => ({
    ...feature,
    properties: { ...feature.properties, mapKey: `${feature.id}-${index}` },
  }));
const definition = defineChart({
  marks: [
    geoShape(features, {
      key: (feature) => feature.properties.mapKey,
      projection: { type: geoEqualEarth, fit: "data", inset: 8 },
    }),
  ],
  scales: { x: null, y: null },
  margin: 0,
});
// Prepare geometry once, independently of hover and selection, just as in the Brazil map.
const mapScene = createChartScene(definition, { width: 900, height: 450 });
const areasByKey = new Map(sceneAreas(mapScene.nodes).map((area) => [area.key, area]));
const countryPaths = mapScene.points.map((point) => {
  const path = areasByKey.get(point.key)?.path;
  if (!path) throw new Error(`Missing projected boundary for ${point.datum.id}`);
  return { key: point.key, code: String(point.datum.id), name: point.datum.properties.name, path };
});

export default function ChartMap01() {
  const id = useId();
  const [selected, setSelected] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const active = countries[hovered ?? selected];

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm"
    >
      <div className="px-5 pt-6 sm:px-8 sm:pt-8">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Population <span className="mx-2 text-border">/</span> 2024
        </p>
        <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          A world of people
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          The number of people living in each country. Explore the map to see how population is
          distributed around the world.
        </p>
        <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" aria-atomic="true" className="min-h-14">
            <p className="text-sm text-muted-foreground">{active?.name ?? "Explore a country"}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {active
                ? active.population === null
                  ? "No data"
                  : numberFormat.format(active.population)
                : "Hover, tap, or select"}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {active?.population != null ? "people" : ""}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1.5 sm:w-56">
            <label htmlFor={`${id}-country`} className="text-xs font-medium text-muted-foreground">
              Country or territory
            </label>
            <select
              id={`${id}-country`}
              value={selected}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onChange={(event) => {
                setSelected(event.target.value);
                setHovered(null);
              }}
            >
              <option value="">Select a country</option>
              {countryOptions.map(([code, country]) => (
                <option key={code} value={code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="px-2 py-4 sm:px-6">
        <svg
          aria-label="World population in 2024. Focus a country to read its population, or use the country selector."
          role="group"
          viewBox="0 0 900 450"
          className="h-auto w-full"
        >
          {countryPaths.map(({ key, code, name, path }) => {
            const country = countries[code];
            const population = country?.population ?? null;
            const color =
              population === null
                ? "fill-zinc-200 dark:fill-zinc-800"
                : bands.find((band) => population < band.limit)?.color;
            return (
              <path
                key={key}
                aria-label={`${country?.name ?? name}: ${population === null ? "No data" : `${numberFormat.format(population)} people`}`}
                aria-pressed={selected === code}
                role="button"
                tabIndex={0}
                d={path}
                className={`${color} cursor-pointer stroke-background stroke-[0.5] outline-none transition-colors hover:stroke-foreground hover:stroke-[1.5] focus-visible:stroke-foreground focus-visible:stroke-[2] ${(hovered ?? selected) === code ? "stroke-foreground stroke-[1.5]" : ""}`}
                onMouseEnter={() => setHovered(code)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(code)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(code)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(code);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>
      <div className="px-5 pb-6 sm:px-8">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Population · people</p>
        <ul aria-label="Population color legend" className="flex flex-wrap gap-x-4 gap-y-3">
          {bands.map((band) => (
            <li
              key={band.label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span className={`h-3 w-5 rounded-sm border border-foreground/10 ${band.swatch}`} />
              {band.label}
            </li>
          ))}
          <li className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-3 w-5 rounded-sm border border-foreground/10 bg-zinc-200 dark:bg-zinc-800" />
            No data
          </li>
        </ul>
        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground sm:flex-row">
          <p>
            Source:{" "}
            <a
              href="https://data.worldbank.org/indicator/SP.POP.TOTL"
              className="underline underline-offset-4 hover:text-foreground"
            >
              World Bank
            </a>{" "}
            · 2024 population estimates
          </p>
          <p>
            Boundaries:{" "}
            <a
              href="https://www.naturalearthdata.com/"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Natural Earth
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
