import { lineColors } from "./json-loader";

export function getLineColor(lineName: string): string {
  const cleanName = lineName.replace(/\[.*?\]/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '');
  return lineColors[cleanName] || lineColors["default"] || "#666666";
}

export { lineColors };