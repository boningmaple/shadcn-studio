import * as React from "react";
import { ImageIcon, MapPinIcon, WifiIcon } from "lucide-react";
import type { Selection } from "react-aria-components";

import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";

export default function M3ChipsDemo() {
  const [amenities, setAmenities] = React.useState<Selection>(
    new Set(["wifi", "parking"]),
  );
  const [sortOrder, setSortOrder] = React.useState<Selection>(
    new Set(["popular"]),
  );

  return (
    <div className="grid w-full gap-6">
      <div className="grid gap-2">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Multiple selection
        </p>
        <M3ChipGroup
          aria-label="Amenities"
          onSelectionChange={setAmenities}
          selectedKeys={amenities}
          variant="filter"
        >
          <M3ChipList className="justify-center">
            <M3Chip id="wifi" icon={<WifiIcon />}>
              Wi-Fi
            </M3Chip>
            <M3Chip id="parking" icon={<MapPinIcon />}>
              Parking
            </M3Chip>
            <M3Chip id="photos" icon={<ImageIcon />}>
              Photos
            </M3Chip>
          </M3ChipList>
        </M3ChipGroup>
      </div>

      <div className="grid gap-2">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Single selection
        </p>
        <M3ChipGroup
          aria-label="Sort results"
          onSelectionChange={setSortOrder}
          selectedKeys={sortOrder}
          selectionMode="single"
          surface="elevated"
          variant="filter"
        >
          <M3ChipList className="justify-center">
            <M3Chip id="popular">Popular</M3Chip>
            <M3Chip id="recent">Recent</M3Chip>
            <M3Chip id="nearby">Nearby</M3Chip>
          </M3ChipList>
        </M3ChipGroup>
      </div>

      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        Amenities: {formatSelection(amenities)}. Sort:{" "}
        {formatSelection(sortOrder)}.
      </p>
    </div>
  );
}

function formatSelection(selection: Selection) {
  return selection === "all" ? "all" : [...selection].join(", ") || "none";
}
