"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { metroLines, type MetroLine, type Station } from "@/lib/metro-data";
import { getStationDetail, type DirectionInfo } from "@/lib/station-details";
import { getLineColor } from "@/lib/colors";

interface StationDetailProps {
  lineId: string;
  stationIndex: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  onNavigate: (stationIndex: number) => void;
  onTransferLine: (lineId: string, stationIndex: number) => void;
}

export function StationDetail({
  lineId,
  stationIndex,
  isFavorite,
  onToggleFavorite,
  onBack,
  onNavigate,
  onTransferLine,
}: StationDetailProps) {
  const line = metroLines.find((l) => l.id === lineId) || metroLines[0];
  const station = line.stations[stationIndex];
  const stationDetail = getStationDetail(lineId, station.name, line.terminals);

  const prevStation = stationIndex > 0 ? line.stations[stationIndex - 1] : null;
  const nextStation =
    stationIndex < line.stations.length - 1
      ? line.stations[stationIndex + 1]
      : null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* 站点标题 */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          <span
            className="px-2 py-0.5 text-xs font-medium text-white rounded"
            style={{ backgroundColor: line.color }}
          >
            {line.name}
          </span>
          <h2 className="text-xl font-bold">{station.name}</h2>
          <button
            onClick={onToggleFavorite}
            className="p-1 rounded-full hover:bg-muted active:bg-muted/70 transition-colors"
          >
            <Star
              className={`h-5 w-5 ${
                isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        </div>

        {/* 上下站导航 */}
        <div className="flex items-center justify-between mt-3 text-sm">
          {prevStation ? (
            <button
              onClick={() => onNavigate(stationIndex - 1)}
              className="flex items-center gap-1 text-primary hover:underline active:opacity-70"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{prevStation.name}</span>
            </button>
          ) : (
            <div />
          )}
          {nextStation ? (
            <button
              onClick={() => onNavigate(stationIndex + 1)}
              className="flex items-center gap-1 text-primary hover:underline active:opacity-70"
            >
              <span>{nextStation.name}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* 方向信息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {stationDetail.directions.map((direction, idx) => (
          <DirectionCard
            key={idx}
            direction={direction}
            lineColor={line.color}
            stationName={station.name}
            onTransferLine={onTransferLine}
          />
        ))}
      </div>
    </div>
  );
}

// 解析换乘标签（如 "6号线"、"10号线[顺时针(内环)]"）为目标线路上的站点位置；
// 应用内不存在的线路（如 S1线）返回 null，保持普通标签展示
function resolveTransferTarget(
  facility: string,
  stationName: string
): { lineId: string; stationIndex: number } | null {
  const lineName = facility.replace(/\[.*?\]/g, "");
  const targetLine = metroLines.find((l) => l.name === lineName);
  if (!targetLine) return null;
  const stationIndex = targetLine.stations.findIndex(
    (s) => s.name === stationName
  );
  if (stationIndex === -1) return null;
  return { lineId: targetLine.id, stationIndex };
}

function DirectionCard({
  direction,
  lineColor,
  stationName,
  onTransferLine,
}: {
  direction: DirectionInfo;
  lineColor: string;
  stationName: string;
  onTransferLine: (lineId: string, stationIndex: number) => void;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-background">
      {/* 方向标题 */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-4 rounded-full"
            style={{ backgroundColor: lineColor }}
          />
          <span className="font-medium">{direction.terminal}方向</span>
          <span className="text-foreground text-sm">
            ({direction.doorSide})
          </span>
        </div>
      </div>

      {/* 车厢信息 */}
      <div className="p-4 space-y-4">
        {direction.carriages.map((carriage, idx) => (
          <div key={idx} className="flex items-start gap-4">
            {/* 车厢号 */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-foreground">
                {carriage.carNumber}
              </span>
            </div>

            {/* 设施标签 */}
            <div className="flex flex-wrap gap-2">
              {carriage.facilities.map((facility, fIdx) => {
                const isExit = facility.includes("出口");
                const lineColor = getLineColor(facility);
                const isLine = lineColor !== "#666666";
                const transferTarget = resolveTransferTarget(facility, stationName);

                const tagClassName = `px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${
                  isLine
                    ? "text-white font-medium"
                    : isExit
                    ? "bg-background text-foreground font-semibold border-2 border-foreground"
                    : "bg-muted text-foreground border-2 border-border"
                }`;

                // 换乘线路标签：点击跳转到对应线路的该站点详情
                if (transferTarget) {
                  return (
                    <button
                      key={fIdx}
                      onClick={() =>
                        onTransferLine(
                          transferTarget.lineId,
                          transferTarget.stationIndex
                        )
                      }
                      className={`${tagClassName} cursor-pointer active:opacity-70`}
                      style={{ backgroundColor: lineColor }}
                    >
                      {facility}
                    </button>
                  );
                }

                return (
                  <span
                    key={fIdx}
                    className={tagClassName}
                    style={isLine ? { backgroundColor: lineColor } : undefined}
                  >
                    {facility}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
