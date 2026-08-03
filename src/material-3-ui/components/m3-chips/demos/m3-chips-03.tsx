import * as React from "react";
import { LightbulbIcon, SearchIcon, SparklesIcon } from "lucide-react";

import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";

export default function M3ChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose a suggestion to continue.",
  );

  return (
    <div className="grid w-full gap-5">
      <M3ChipGroup aria-label="Outlined suggestions" variant="suggestion">
        <M3ChipList className="justify-center">
          <M3Chip
            id="weekend-plans"
            icon={<LightbulbIcon />}
            onAction={() => setMessage("Weekend plans suggested.")}
          >
            Weekend plans
          </M3Chip>
          <M3Chip
            id="nearby-events"
            icon={<SearchIcon />}
            onAction={() => setMessage("Nearby events searched.")}
          >
            Nearby events
          </M3Chip>
        </M3ChipList>
      </M3ChipGroup>

      <M3ChipGroup
        aria-label="Elevated suggestions"
        surface="elevated"
        variant="suggestion"
      >
        <M3ChipList className="justify-center">
          <M3Chip
            id="surprise-me"
            icon={<SparklesIcon />}
            onAction={() => setMessage("A surprise suggestion was generated.")}
          >
            Surprise me
          </M3Chip>
          <M3Chip
            id="popular-now"
            onAction={() => setMessage("Popular ideas opened.")}
          >
            Popular now
          </M3Chip>
        </M3ChipList>
      </M3ChipGroup>

      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        {message}
      </p>
    </div>
  );
}
