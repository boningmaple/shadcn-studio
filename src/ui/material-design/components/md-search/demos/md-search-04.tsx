import {
  CalendarDaysIcon,
  MailIcon,
  MapPinIcon,
  MessagesSquareIcon,
} from "lucide-react";

import {
  MDSearchView,
  MDSearchViewItem,
} from "@/ui/material-design/components/md-search/md-search";

export default function MDSearchDemo() {
  return (
    <MDSearchView
      dialogLabel="Search workspace"
      placeholder="Search workspace"
      placement="fullscreen"
      triggerLabel="Open full-screen search"
    >
      <MDSearchViewItem
        id="messages"
        headline="Messages"
        start={<MessagesSquareIcon />}
        supportingText="Search direct messages, channels, and saved threads."
        textValue="Messages"
      />
      <MDSearchViewItem
        id="mail"
        headline="Mail"
        start={<MailIcon />}
        supportingText="Find newsletters, receipts, and client updates."
        textValue="Mail"
      />
      <MDSearchViewItem
        id="calendar"
        headline="Calendar"
        start={<CalendarDaysIcon />}
        supportingText="Look up upcoming meetings and travel holds."
        textValue="Calendar"
      />
      <MDSearchViewItem
        id="places"
        headline="Places"
        start={<MapPinIcon />}
        supportingText="Search saved offices, venues, and local notes."
        textValue="Places"
      />
    </MDSearchView>
  );
}
