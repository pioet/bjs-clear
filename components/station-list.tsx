"use client";

import { MetroLine } from "@/lib/metro-data";
import { cn } from "@/lib/utils";
import { getLineColor } from "@/lib/colors";

interface StationListProps {
  line: MetroLine;
  favoriteStations: string[];
  onToggleFavorite: (stationName: string) => void;
  onStationClick?: (stationIndex: number) => void;
}

export function StationList({
  line,
  favoriteStations,
  onToggleFavorite,
  onStationClick,
}: StationListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* 线路终点显示 */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <span className="text-sm text-muted-foreground">{line.terminals[0]}</span>
        <span className="text-sm text-muted-foreground">{line.terminals[1]}</span>
      </div>

      {/* 站点列表 */}
      <div className="relative py-2">
        {line.stations.map((station, index) => {
          const isFirst = index === 0;
          const isLast = index === line.stations.length - 1;
          const isFavorite = favoriteStations.includes(station.name);
          const isTerminal = isFirst || isLast;

          return (
            <div
              key={station.name}
              className="relative flex items-center py-2 px-4 cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors min-h-[44px]"
              onClick={() => onStationClick?.(index)}
            >
              {/* 站点圆点 */}
              <div
                className={cn(
                  "relative rounded-full flex-shrink-0",
                  isTerminal
                    ? "w-3 h-3" // 端点：小圆点
                    : "w-3 h-3 border-2 bg-background" // 普通站点：空心圆
                )}
                style={{
                  backgroundColor: isTerminal ? line.color : undefined,
                  borderColor: !isTerminal ? line.color : undefined,
                }}
              />

              {/* 站点名称和换乘信息 */}
              <div className="ml-4 flex items-center gap-2 flex-wrap min-h-[28px]">
                <span
                  className={cn(
                    "text-base",
                    isFavorite && "text-yellow-500 font-medium"
                  )}
                >
                  {station.name}
                </span>

                {/* 换乘线路标签 */}
                {station.transfers?.filter((transfer) => transfer !== line.name).map((transfer) => (
                  <span
                    key={transfer}
                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-white rounded"
                    style={{
                      backgroundColor: getLineColor(transfer),
                    }}
                  >
                    {transfer}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
