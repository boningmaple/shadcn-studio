import * as React from "react";
import { LightbulbIcon, SearchIcon, SparklesIcon } from "lucide-react";

import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";

export default function MDChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose a suggestion to continue.",
  );

  return (
    <div className="grid w-full gap-5">
      <MDChipGroup aria-label="Outlined suggestions" variant="suggestion">
        <MDChipList className="justify-center">
          <MDChip
            id="weekend-plans"
            icon={<LightbulbIcon />}
            onAction={() => setMessage("Weekend plans suggested.")}
          >
            Weekend plans
          </MDChip>
          <MDChip
            id="nearby-events"
            icon={<SearchIcon />}
            onAction={() => setMessage("Nearby events searched.")}
          >
            Nearby events
          </MDChip>
        </MDChipList>
      </MDChipGroup>

      <MDChipGroup
        aria-label="Elevated suggestions"
        surface="elevated"
        variant="suggestion"
      >
        <MDChipList className="justify-center">
          <MDChip
            id="surprise-me"
            icon={<SparklesIcon />}
            onAction={() => setMessage("A surprise suggestion was generated.")}
          >
            Surprise me
          </MDChip>
          <MDChip
            id="popular-now"
            onAction={() => setMessage("Popular ideas opened.")}
          >
            Popular now
          </MDChip>
        </MDChipList>
      </MDChipGroup>

      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        {message}
      </p>
    </div>
  );
}
