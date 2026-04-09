"use client";

import { Home, Star, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "home" | "favorites" | "about";
  onTabChange: (tab: "home" | "favorites" | "about") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "首页", icon: Home },
    { id: "favorites" as const, label: "收藏", icon: Star },
    { id: "about" as const, label: "关于", icon: Info },
  ];

  return (
    <nav className="flex items-center justify-around border-t border-border bg-background py-2 px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-1 transition-colors",
              "active:bg-muted/50",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon
              className={cn("h-6 w-6", isActive && "fill-primary/20")}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
