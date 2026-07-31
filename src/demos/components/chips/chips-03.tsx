import * as React from "react";
import { LightbulbIcon, SearchIcon, SparklesIcon } from "lucide-react";

import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";

export default function ChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose a suggestion to continue.",
  );

  return (
    <div className="grid w-full gap-5">
      <ChipGroup aria-label="Outlined suggestions" variant="suggestion">
        <ChipList className="justify-center">
          <Chip
            id="weekend-plans"
            icon={<LightbulbIcon />}
            onAction={() => setMessage("Weekend plans suggested.")}
          >
            Weekend plans
          </Chip>
          <Chip
            id="nearby-events"
            icon={<SearchIcon />}
            onAction={() => setMessage("Nearby events searched.")}
          >
            Nearby events
          </Chip>
        </ChipList>
      </ChipGroup>

      <ChipGroup
        aria-label="Elevated suggestions"
        surface="elevated"
        variant="suggestion"
      >
        <ChipList className="justify-center">
          <Chip
            id="surprise-me"
            icon={<SparklesIcon />}
            onAction={() => setMessage("A surprise suggestion was generated.")}
          >
            Surprise me
          </Chip>
          <Chip
            id="popular-now"
            onAction={() => setMessage("Popular ideas opened.")}
          >
            Popular now
          </Chip>
        </ChipList>
      </ChipGroup>

      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        {message}
      </p>
    </div>
  );
}
