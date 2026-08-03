import * as React from "react";
import { CalendarIcon, Clock3Icon, MapPinIcon } from "lucide-react";

import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";

export default function MDChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose an assist chip to perform an action.",
  );

  return (
    <div className="grid w-full gap-5">
      <MDChipGroup aria-label="Outlined assist actions" variant="assist">
        <MDChipList className="justify-center">
          <MDChip
            id="add-event"
            icon={<CalendarIcon />}
            onAction={() => setMessage("Event added to your calendar.")}
          >
            Add event
          </MDChip>
          <MDChip
            id="directions"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Directions opened.")}
          >
            Directions
          </MDChip>
        </MDChipList>
      </MDChipGroup>

      <MDChipGroup
        aria-label="Elevated assist actions"
        surface="elevated"
        variant="assist"
      >
        <MDChipList className="justify-center">
          <MDChip
            id="remind-me"
            icon={<Clock3Icon />}
            onAction={() => setMessage("Reminder created.")}
          >
            Remind me
          </MDChip>
          <MDChip
            id="nearby"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Nearby places opened.")}
          >
            Nearby
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
