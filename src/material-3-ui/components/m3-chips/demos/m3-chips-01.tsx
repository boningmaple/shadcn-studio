import * as React from "react";
import { CalendarIcon, Clock3Icon, MapPinIcon } from "lucide-react";

import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";

export default function M3ChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose an assist chip to perform an action.",
  );

  return (
    <div className="grid w-full gap-5">
      <M3ChipGroup aria-label="Outlined assist actions" variant="assist">
        <M3ChipList className="justify-center">
          <M3Chip
            id="add-event"
            icon={<CalendarIcon />}
            onAction={() => setMessage("Event added to your calendar.")}
          >
            Add event
          </M3Chip>
          <M3Chip
            id="directions"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Directions opened.")}
          >
            Directions
          </M3Chip>
        </M3ChipList>
      </M3ChipGroup>

      <M3ChipGroup
        aria-label="Elevated assist actions"
        surface="elevated"
        variant="assist"
      >
        <M3ChipList className="justify-center">
          <M3Chip
            id="remind-me"
            icon={<Clock3Icon />}
            onAction={() => setMessage("Reminder created.")}
          >
            Remind me
          </M3Chip>
          <M3Chip
            id="nearby"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Nearby places opened.")}
          >
            Nearby
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
