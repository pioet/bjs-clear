"use client";

import { useState, useEffect, useMemo } from "react";
import { metroLines, type FavoriteStation } from "@/lib/metro-data";
import { LineSelector } from "@/components/line-selector";
import { StationList } from "@/components/station-list";
import { SearchBar } from "@/components/search-bar";
import { BottomNav } from "@/components/bottom-nav";
import { FavoritesView } from "@/components/favorites-view";
import { AboutView } from "@/components/about-view";
import { SearchResults } from "@/components/search-results";
import { StationDetail } from "@/components/station-detail";
import { Train, ChevronLeft } from "lucide-react";

export default function MetroApp() {
  const [selectedLineId, setSelectedLineId] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "favorites" | "about">(
    "home"
  );
  const [favorites, setFavorites] = useState<FavoriteStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<{
    lineId: string;
    stationIndex: number;
  } | null>(null);

  // 从 localStorage 加载收藏
  useEffect(() => {
    const saved = localStorage.getItem("metro-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // 保存收藏到 localStorage
  useEffect(() => {
    localStorage.setItem("metro-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const selectedLine = useMemo(
    () => metroLines.find((line) => line.id === selectedLineId) || metroLines[0],
    [selectedLineId]
  );

  const toggleFavorite = (lineId: string, stationName: string) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.lineId === lineId && f.stationName === stationName
      );
      if (exists) {
        return prev.filter(
          (f) => !(f.lineId === lineId && f.stationName === stationName)
        );
      }
      return [...prev, { lineId, stationName }];
    });
  };

  const handleSelectStation = (lineId: string, stationName: string) => {
    const line = metroLines.find((l) => l.id === lineId);
    if (line) {
      const stationIndex = line.stations.findIndex((s) => s.name === stationName);
      if (stationIndex !== -1) {
        setSelectedStation({ lineId, stationIndex });
      }
    }
    setSelectedLineId(lineId);
    setSearchQuery("");
    setActiveTab("home");
  };

  const handleStationClick = (stationIndex: number) => {
    setSelectedStation({ lineId: selectedLineId, stationIndex });
  };

  const handleFavoriteStationClick = (lineId: string, stationName: string) => {
    setSelectedStation({ lineId, stationIndex: 0 });
    const line = metroLines.find((l) => l.id === lineId);
    if (line) {
      const stationIndex = line.stations.findIndex((s) => s.name === stationName);
      if (stationIndex !== -1) {
        setSelectedStation({ lineId, stationIndex });
        setSelectedLineId(lineId);
        setActiveTab("home");
      }
    }
  };

  const handleBackFromDetail = () => {
    setSelectedStation(null);
  };

  const isSearching = searchQuery.length > 0 && activeTab === "home";

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto border-x border-border">
      {/* 顶部标题栏 */}
      <header className="flex items-center px-4 py-4 bg-primary text-primary-foreground relative">
        {selectedStation && (
          <button
            onClick={handleBackFromDetail}
            className="absolute left-2 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center justify-center gap-2 w-full">
          <Train className="h-6 w-6" />
          <h1 className="text-xl font-bold">京铁门儿清</h1>
        </div>
      </header>

      {/* 搜索栏 */}
      {activeTab === "home" && !selectedStation && (
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      )}

      {/* 主内容区 */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === "home" && !isSearching && !selectedStation && (
          <>
            {/* 线路选择器 */}
            <LineSelector
              lines={metroLines}
              selectedLineId={selectedLineId}
              onSelectLine={setSelectedLineId}
            />

            {/* 站点列表 */}
            <StationList
              line={selectedLine}
              favoriteStations={favorites}
              onToggleFavorite={toggleFavorite}
              onStationClick={handleStationClick}
            />
          </>
        )}

        {activeTab === "home" && !isSearching && selectedStation && (
          <StationDetail
            lineId={selectedStation.lineId}
            stationIndex={selectedStation.stationIndex}
            isFavorite={favorites.some(
              (f) =>
                f.lineId === selectedStation.lineId &&
                f.stationName ===
                  metroLines
                    .find((l) => l.id === selectedStation.lineId)
                    ?.stations[selectedStation.stationIndex]?.name
            )}
            onToggleFavorite={() => {
              const stationName = metroLines
                .find((l) => l.id === selectedStation.lineId)
                ?.stations[selectedStation.stationIndex]?.name;
              if (stationName) {
                toggleFavorite(selectedStation.lineId, stationName);
              }
            }}
            onBack={handleBackFromDetail}
            onNavigate={(index) =>
              setSelectedStation({ ...selectedStation, stationIndex: index })
            }
          />
        )}

        {activeTab === "home" && isSearching && (
          <SearchResults
            query={searchQuery}
            onSelectStation={handleSelectStation}
          />
        )}

        {activeTab === "favorites" && (
          <FavoritesView
            favorites={favorites}
            onRemoveFavorite={(lineId, stationName) =>
              setFavorites((prev) =>
                prev.filter(
                  (f) => !(f.lineId === lineId && f.stationName === stationName)
                )
              )
            }
            onStationClick={handleFavoriteStationClick}
          />
        )}

        {activeTab === "about" && <AboutView />}
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
