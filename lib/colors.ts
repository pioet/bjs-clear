import { lineColors } from "./json-loader";

export function getLineColor(lineName: string): string {
  return lineColors[lineName] || lineColors["default"] || "#666666";
}

export { lineColors };