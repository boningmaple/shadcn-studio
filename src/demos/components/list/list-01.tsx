import {
  CalendarDaysIcon,
  Clock3Icon,
  MapPinIcon,
  PlaneIcon,
} from "lucide-react";

import { List, ListItem } from "@/components/list/list";

export default function ListDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]">
      <List aria-label="Travel itinerary">
        <ListItem
          headline="Boarding opens"
          start={<PlaneIcon />}
          textValue="Boarding opens"
          trailingSupportingText="7:10"
        />
        <ListItem
          headline="Gate change"
          start={<MapPinIcon />}
          supportingText="Flight 482 now departs from gate C18."
          textValue="Gate change"
          trailingSupportingText="7:24"
        />
        <ListItem
          headline="Calendar hold"
          overline="Tomorrow"
          start={<CalendarDaysIcon />}
          supportingText="Hotel check-in and welcome dinner are on your shared calendar."
          textValue="Calendar hold"
          trailingSupportingText="6 PM"
        />
        <ListItem
          headline="Wake-up call"
          start={<Clock3Icon />}
          supportingText="Set for 5:45 AM in your destination time zone."
          textValue="Wake-up call"
        />
      </List>
    </div>
  );
}
