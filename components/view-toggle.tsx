"use client"

import { Grid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ViewToggleProps {
  viewMode: "list" | "grid"
  setViewMode: (mode: "list" | "grid") => void
}

export function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={(value) => value && setViewMode(value as "list" | "grid")}
    >
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
