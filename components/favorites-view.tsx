"use client";

import { Star, Trash2 } from "lucide-react";
import { metroLines } from "@/lib/metro-data";

interface FavoritesViewProps {
  favorites: string[];
  onRemoveFavorite: (stationName: string) => void;
  onStationClick: (stationName: string) => void;
}

export function FavoritesView({
  favorites,
  onRemoveFavorite,
  onStationClick,
}: FavoritesViewProps) {
  // 获取站点所属的线路信息
  const getStationLines = (stationName: string) => {
    const lines: { name: string; color: string }[] = [];
    metroLines.forEach((line) => {
      if (line.stations.some((s) => s.name === stationName)) {
        lines.push({ name: line.name, color: line.color });
      }
    });
    return lines;
  };

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
        <Star className="h-16 w-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">暂无收藏</p>
        <p className="text-sm mt-2 text-center">
          点击站点名称即可添加到收藏
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4">我的收藏</h2>
      <div className="space-y-3">
        {favorites.map((stationName) => {
          const lines = getStationLines(stationName);

          return (
            <div
              key={stationName}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-colors min-h-[44px]"
            >
              <div 
                className="flex items-center gap-3 flex-1"
                onClick={() => onStationClick(stationName)}
              >
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-medium">{stationName}</p>
                  <div className="flex gap-1 mt-1">
                    {lines.map((line) => (
                      <span
                        key={line.name}
                        className="text-xs px-1.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: line.color }}
                      >
                        {line.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(stationName);
                }}
                className="p-2 hover:bg-destructive/10 active:bg-destructive/20 rounded-full transition-colors"
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
