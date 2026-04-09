"use client";

import { metroLines } from "@/lib/metro-data";
import { Search } from "lucide-react";

interface SearchResultsProps {
  query: string;
  onSelectStation: (lineId: string, stationName: string) => void;
}

export function SearchResults({ query, onSelectStation }: SearchResultsProps) {
  // 搜索所有匹配的站点
  const results: { stationName: string; lineId: string; lineName: string; lineColor: string }[] = [];

  metroLines.forEach((line) => {
    line.stations.forEach((station) => {
      if (station.name.includes(query)) {
        results.push({
          stationName: station.name,
          lineId: line.id,
          lineName: line.name,
          lineColor: line.color,
        });
      }
    });
  });

  if (results.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
        <Search className="h-16 w-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">未找到相关站点</p>
        <p className="text-sm mt-2">请尝试其他关键词</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <p className="text-sm text-muted-foreground mb-3">
        找到 {results.length} 个相关站点
      </p>
      <div className="space-y-2">
        {results.map((result, index) => (
          <button
            key={`${result.lineId}-${result.stationName}-${index}`}
            onClick={() => onSelectStation(result.lineId, result.stationName)}
            className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 active:bg-muted/70 transition-colors text-left min-h-[48px]"
          >
            <span className="font-medium">{result.stationName}</span>
            <span
              className="text-xs px-2 py-1 rounded text-white"
              style={{ backgroundColor: result.lineColor }}
            >
              {result.lineName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
