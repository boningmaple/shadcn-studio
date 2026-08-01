import {
  CalendarDaysIcon,
  MailIcon,
  MapPinIcon,
  MessagesSquareIcon,
} from "lucide-react";

import { SearchView, SearchViewItem } from "@/components/search/search";

export default function SearchDemo() {
  return (
    <SearchView
      dialogLabel="Search workspace"
      placeholder="Search workspace"
      placement="fullscreen"
      triggerLabel="Open full-screen search"
    >
      <SearchViewItem
        id="messages"
        headline="Messages"
        start={<MessagesSquareIcon />}
        supportingText="Search direct messages, channels, and saved threads."
        textValue="Messages"
      />
      <SearchViewItem
        id="mail"
        headline="Mail"
        start={<MailIcon />}
        supportingText="Find newsletters, receipts, and client updates."
        textValue="Mail"
      />
      <SearchViewItem
        id="calendar"
        headline="Calendar"
        start={<CalendarDaysIcon />}
        supportingText="Look up upcoming meetings and travel holds."
        textValue="Calendar"
      />
      <SearchViewItem
        id="places"
        headline="Places"
        start={<MapPinIcon />}
        supportingText="Search saved offices, venues, and local notes."
        textValue="Places"
      />
    </SearchView>
  );
}
