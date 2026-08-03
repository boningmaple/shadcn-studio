import {
  CalendarDaysIcon,
  MailIcon,
  MapPinIcon,
  MessagesSquareIcon,
} from "lucide-react";

import {
  M3SearchView,
  M3SearchViewItem,
} from "@/material-3-ui/components/m3-search/m3-search";

export default function M3SearchDemo() {
  return (
    <M3SearchView
      dialogLabel="Search workspace"
      placeholder="Search workspace"
      placement="fullscreen"
      triggerLabel="Open full-screen search"
    >
      <M3SearchViewItem
        id="messages"
        headline="Messages"
        start={<MessagesSquareIcon />}
        supportingText="Search direct messages, channels, and saved threads."
        textValue="Messages"
      />
      <M3SearchViewItem
        id="mail"
        headline="Mail"
        start={<MailIcon />}
        supportingText="Find newsletters, receipts, and client updates."
        textValue="Mail"
      />
      <M3SearchViewItem
        id="calendar"
        headline="Calendar"
        start={<CalendarDaysIcon />}
        supportingText="Look up upcoming meetings and travel holds."
        textValue="Calendar"
      />
      <M3SearchViewItem
        id="places"
        headline="Places"
        start={<MapPinIcon />}
        supportingText="Search saved offices, venues, and local notes."
        textValue="Places"
      />
    </M3SearchView>
  );
}
