import { lineDetailData } from "./json-loader";

export interface CarriageInfo {
  carNumber: number;
  facilities: string[];
}

export interface DirectionInfo {
  terminal: string;
  doorSide: string;
  carriages: CarriageInfo[];
}

export interface StationDetail {
  lineId: string;
  stationName: string;
  directions: DirectionInfo[];
}

function convertDoorsToCarriages(doors: Record<string, string[]>): CarriageInfo[] {
  return Object.entries(doors)
    .map(([doorNumber, facilities]) => ({
      carNumber: parseInt(doorNumber, 10),
      facilities,
    }))
    .sort((a, b) => a.carNumber - b.carNumber);
}

export function getStationDetail(
  lineId: string,
  stationName: string,
  terminals: [string, string]
): StationDetail {
  const lineName = Object.keys(lineDetailData).find(
    (name) => name === `${lineId}号线` || name === lineId || (lineId === "10" && name === "10号线")
  );

  if (!lineName) {
    return {
      lineId,
      stationName,
      directions: [
        {
          terminal: terminals[0],
          doorSide: "左门下车",
          carriages: [
            { carNumber: 3, facilities: ["楼梯", "A出口"] },
            { carNumber: 22, facilities: ["无障碍升降平台", "B出口"] },
          ],
        },
        {
          terminal: terminals[1],
          doorSide: "左门下车",
          carriages: [
            { carNumber: 2, facilities: ["楼梯", "B出口"] },
            { carNumber: 21, facilities: ["无障碍升降平台", "A出口"] },
          ],
        },
      ],
    };
  }

  const lineData = lineDetailData[lineName];
  const stationData = lineData.stations.find((s) => s.name === stationName);

  if (!stationData) {
    return {
      lineId,
      stationName,
      directions: [
        {
          terminal: terminals[0],
          doorSide: "左门下车",
          carriages: [
            { carNumber: 3, facilities: ["楼梯", "A出口"] },
            { carNumber: 22, facilities: ["无障碍升降平台", "B出口"] },
          ],
        },
        {
          terminal: terminals[1],
          doorSide: "左门下车",
          carriages: [
            { carNumber: 2, facilities: ["楼梯", "B出口"] },
            { carNumber: 21, facilities: ["无障碍升降平台", "A出口"] },
          ],
        },
      ],
    };
  }

  const forwardDoorSide = stationData.up?.side === "left" ? "左门下车" : "右门下车";
  const backwardDoorSide = stationData.down?.side === "left" ? "左门下车" : "右门下车";

  return {
    lineId,
    stationName,
    directions: [
      {
        terminal: lineData.directions[0] || terminals[0],
        doorSide: forwardDoorSide,
        carriages: stationData.up?.doors ? convertDoorsToCarriages(stationData.up.doors) : [],
      },
      {
        terminal: lineData.directions[1] || terminals[1],
        doorSide: backwardDoorSide,
        carriages: stationData.down?.doors ? convertDoorsToCarriages(stationData.down.doors) : [],
      },
    ],
  };
}