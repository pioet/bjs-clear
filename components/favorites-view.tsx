"use client";

import { Star, Trash2 } from "lucide-react";
import { metroLines, type FavoriteStation } from "@/lib/metro-data";

interface FavoritesViewProps {
  favorites: FavoriteStation[];
  onRemoveFavorite: (lineId: string, stationName: string) => void;
  onStationClick: (lineId: string, stationName: string) => void;
}

export function FavoritesView({
  favorites,
  onRemoveFavorite,
  onStationClick,
}: FavoritesViewProps) {
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
        {favorites.map((favorite) => {
          const line = metroLines.find((l) => l.id === favorite.lineId);
          if (!line) return null;

          return (
            <div
              key={`${favorite.lineId}-${favorite.stationName}`}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-colors min-h-[44px]"
            >
              <div
                className="flex items-center gap-3 flex-1"
                onClick={() =>
                  onStationClick(favorite.lineId, favorite.stationName)
                }
              >
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-medium">{favorite.stationName}</p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded text-white"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.name}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(favorite.lineId, favorite.stationName);
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
