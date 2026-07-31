import * as React from "react";
import { ImageIcon, MapPinIcon, WifiIcon } from "lucide-react";
import type { Selection } from "react-aria-components";

import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";

export default function ChipsDemo() {
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
        <ChipGroup
          aria-label="Amenities"
          onSelectionChange={setAmenities}
          selectedKeys={amenities}
          variant="filter"
        >
          <ChipList className="justify-center">
            <Chip id="wifi" icon={<WifiIcon />}>
              Wi-Fi
            </Chip>
            <Chip id="parking" icon={<MapPinIcon />}>
              Parking
            </Chip>
            <Chip id="photos" icon={<ImageIcon />}>
              Photos
            </Chip>
          </ChipList>
        </ChipGroup>
      </div>

      <div className="grid gap-2">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Single selection
        </p>
        <ChipGroup
          aria-label="Sort results"
          onSelectionChange={setSortOrder}
          selectedKeys={sortOrder}
          selectionMode="single"
          surface="elevated"
          variant="filter"
        >
          <ChipList className="justify-center">
            <Chip id="popular">Popular</Chip>
            <Chip id="recent">Recent</Chip>
            <Chip id="nearby">Nearby</Chip>
          </ChipList>
        </ChipGroup>
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
