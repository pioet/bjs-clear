import { lineColors, lineStations, transferData } from "./json-loader";
import type { MetroLine, Station } from "./metro-data";

export const lineOrder = [
  "1号线",
  "2号线",
  "3号线",
  "4号线",
  "5号线",
  "6号线",
  "7号线",
  "8号线",
  "9号线",
  "10号线",
  "11号线",
  "12号线",
  "13号线",
  "14号线",
  "15号线",
  "16号线",
  "17号线",
  "18号线",
  "19号线",
  "昌平线",
  "大兴机场线",
  "房山线",
  "亦庄线",
  "西郊线",
  "燕房线",
  "首都机场线",
];

export function getAllMetroLines(): MetroLine[] {
  return lineOrder
    .filter((name) => lineStations[name])
    .map((name, index) => {
      const stations: Station[] = lineStations[name].map((stationName) => ({
        name: stationName,
        transfers: transferData[stationName] || [],
      }));

      const firstStation = stations[0]?.name;
      const lastStation = stations[stations.length - 1]?.name;

      return {
        id: String(index + 1),
        name,
        color: lineColors[name] || lineColors["default"] || "#666666",
        terminals: [firstStation, lastStation],
        stations,
      };
    });
}

export const metroLines = getAllMetroLines();