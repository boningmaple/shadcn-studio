import type { Feature, FeatureCollection, MultiPolygon, Point, Polygon } from "geojson";

import boundaries from "./brazil-states.json";

export type StateResult = {
  id: string;
  code: string;
  name: string;
  coordinates: [number, number];
  bluePercent: number;
  redPercent: number;
  validVotes: number;
  leadVotes: number;
  leadPoints: number;
  leader: "blue" | "red";
};

// Illustrative data only; these are not official election results.
const rows: [string, string, string, number, number, number, number][] = [
  ["11", "RO", "Rondônia", -63.4, -10.9, 64, 850000],
  ["12", "AC", "Acre", -70.1, -9.3, 68, 420000],
  ["13", "AM", "Amazonas", -64.4, -4.4, 47, 2100000],
  ["14", "RR", "Roraima", -61.3, 2.1, 66, 290000],
  ["15", "PA", "Pará", -52.5, -3.5, 43, 4500000],
  ["16", "AP", "Amapá", -51.8, 1.5, 46, 400000],
  ["17", "TO", "Tocantins", -48.3, -9.5, 51, 860000],
  ["21", "MA", "Maranhão", -45.4, -5.0, 29, 3700000],
  ["22", "PI", "Piauí", -42.9, -7.1, 25, 1900000],
  ["23", "CE", "Ceará", -39.5, -5.2, 27, 5200000],
  ["24", "RN", "Rio Grande do Norte", -36.6, -5.6, 34, 1900000],
  ["25", "PB", "Paraíba", -36.5, -7.2, 33, 2200000],
  ["26", "PE", "Pernambuco", -38.1, -8.5, 33, 5400000],
  ["27", "AL", "Alagoas", -36.6, -9.6, 38, 1700000],
  ["28", "SE", "Sergipe", -37.4, -10.7, 32, 1250000],
  ["29", "BA", "Bahia", -41.7, -12.6, 27, 8200000],
  ["31", "MG", "Minas Gerais", -44.2, -18.5, 48, 12100000],
  ["32", "ES", "Espírito Santo", -40.6, -19.6, 57, 2300000],
  ["33", "RJ", "Rio de Janeiro", -42.6, -22.2, 55, 9400000],
  ["35", "SP", "São Paulo", -48.1, -22.2, 56, 25100000],
  ["41", "PR", "Paraná", -51.6, -24.6, 61, 6500000],
  ["42", "SC", "Santa Catarina", -50.5, -27.4, 68, 4400000],
  ["43", "RS", "Rio Grande do Sul", -53.3, -30.0, 55, 6600000],
  ["50", "MS", "Mato Grosso do Sul", -54.6, -20.3, 58, 1500000],
  ["51", "MT", "Mato Grosso", -56.2, -13.3, 64, 1900000],
  ["52", "GO", "Goiás", -49.6, -16.0, 58, 3900000],
  ["53", "DF", "Distrito Federal", -47.9, -15.8, 57, 1700000],
];

export const results: StateResult[] = rows.map(
  ([id, code, name, longitude, latitude, bluePercent, validVotes]) => {
    const redPercent = 100 - bluePercent;
    return {
      id,
      code,
      name,
      coordinates: [longitude, latitude],
      bluePercent,
      redPercent,
      validVotes,
      leadVotes: Math.round((validVotes * Math.abs(bluePercent - redPercent)) / 100),
      leadPoints: Math.abs(bluePercent - redPercent),
      leader: bluePercent > redPercent ? "blue" : "red",
    };
  },
);

// IBGE minimum-quality UF geometry. Rings are reversed for D3's spherical winding convention.
export const brazil = boundaries as FeatureCollection<Polygon | MultiPolygon, { codarea: string }>;
export const resultById = new Map(results.map((result) => [result.id, result]));
export const stateFeatures: Feature<Polygon | MultiPolygon, StateResult>[] = brazil.features.map(
  (feature) => {
    const result = resultById.get(feature.properties.codarea);
    if (!result) throw new Error(`Missing state result: ${feature.properties.codarea}`);
    return { ...feature, properties: result };
  },
);
export const bubbleFeatures: Feature<Point, StateResult>[] = [...results]
  .sort((a, b) => b.leadVotes - a.leadVotes)
  .map((result) => ({
    type: "Feature",
    properties: result,
    geometry: { type: "Point", coordinates: result.coordinates },
  }));

export const colors = { blue: "#1683b6", red: "#e22b49" };
export const maximumLead = Math.max(...results.map((result) => result.leadVotes));
export const bubbleRadius = (lead: number) => 45 * Math.sqrt(lead / maximumLead);
export const numberFormat = new Intl.NumberFormat("en-US");
