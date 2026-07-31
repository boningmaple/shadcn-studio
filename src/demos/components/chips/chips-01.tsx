import * as React from "react";
import { CalendarIcon, Clock3Icon, MapPinIcon } from "lucide-react";

import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";

export default function ChipsDemo() {
  const [message, setMessage] = React.useState(
    "Choose an assist chip to perform an action.",
  );

  return (
    <div className="grid w-full gap-5">
      <ChipGroup aria-label="Outlined assist actions" variant="assist">
        <ChipList className="justify-center">
          <Chip
            id="add-event"
            icon={<CalendarIcon />}
            onAction={() => setMessage("Event added to your calendar.")}
          >
            Add event
          </Chip>
          <Chip
            id="directions"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Directions opened.")}
          >
            Directions
          </Chip>
        </ChipList>
      </ChipGroup>

      <ChipGroup
        aria-label="Elevated assist actions"
        surface="elevated"
        variant="assist"
      >
        <ChipList className="justify-center">
          <Chip
            id="remind-me"
            icon={<Clock3Icon />}
            onAction={() => setMessage("Reminder created.")}
          >
            Remind me
          </Chip>
          <Chip
            id="nearby"
            icon={<MapPinIcon />}
            onAction={() => setMessage("Nearby places opened.")}
          >
            Nearby
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
