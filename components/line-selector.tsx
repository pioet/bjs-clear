"use client";

import { MetroLine } from "@/lib/metro-data";
import { cn } from "@/lib/utils";

interface LineSelectorProps {
  lines: MetroLine[];
  selectedLineId: string;
  onSelectLine: (lineId: string) => void;
}

export function LineSelector({
  lines,
  selectedLineId,
  onSelectLine,
}: LineSelectorProps) {
  return (
    <div className="w-28 flex-shrink-0 overflow-y-auto border-r border-border bg-background">
      {lines.map((line) => (
        <button
          key={line.id}
          onClick={() => onSelectLine(line.id)}
          className={cn(
            "w-full px-3 py-4 text-left text-sm font-medium transition-colors border-l-4",
            "active:bg-muted/70",
            selectedLineId === line.id
              ? "bg-muted border-l-primary text-primary"
              : "border-l-transparent text-muted-foreground hover:bg-muted/50"
          )}
          style={{
            borderLeftColor:
              selectedLineId === line.id ? line.color : "transparent",
            color: selectedLineId === line.id ? line.color : undefined,
          }}
        >
          {line.name}
        </button>
      ))}
    </div>
  );
}
