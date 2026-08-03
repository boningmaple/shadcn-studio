import * as React from "react";
import { ImageIcon, MapPinIcon, WifiIcon } from "lucide-react";
import type { Selection } from "react-aria-components";

import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";

export default function MDChipsDemo() {
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
        <MDChipGroup
          aria-label="Amenities"
          onSelectionChange={setAmenities}
          selectedKeys={amenities}
          variant="filter"
        >
          <MDChipList className="justify-center">
            <MDChip id="wifi" icon={<WifiIcon />}>
              Wi-Fi
            </MDChip>
            <MDChip id="parking" icon={<MapPinIcon />}>
              Parking
            </MDChip>
            <MDChip id="photos" icon={<ImageIcon />}>
              Photos
            </MDChip>
          </MDChipList>
        </MDChipGroup>
      </div>

      <div className="grid gap-2">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Single selection
        </p>
        <MDChipGroup
          aria-label="Sort results"
          onSelectionChange={setSortOrder}
          selectedKeys={sortOrder}
          selectionMode="single"
          surface="elevated"
          variant="filter"
        >
          <MDChipList className="justify-center">
            <MDChip id="popular">Popular</MDChip>
            <MDChip id="recent">Recent</MDChip>
            <MDChip id="nearby">Nearby</MDChip>
          </MDChipList>
        </MDChipGroup>
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
