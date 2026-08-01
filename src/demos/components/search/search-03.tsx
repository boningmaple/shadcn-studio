import {
  FileTextIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import { SearchView, SearchViewItem } from "@/components/search/search";

export default function SearchDemo() {
  return (
    <SearchView
      dialogLabel="Search documentation"
      placeholder="Search docs"
      triggerLabel="Search docs"
    >
      <SearchViewItem
        id="color-tokens"
        headline="Color tokens"
        start={<PaletteIcon />}
        supportingText="Core roles, state layers, and dark theme values."
        textValue="Color tokens"
      />
      <SearchViewItem
        id="component-guides"
        headline="Component guides"
        start={<FileTextIcon />}
        supportingText="Implementation notes for reusable Material patterns."
        textValue="Component guides"
      />
      <SearchViewItem
        id="settings"
        headline="Search settings"
        start={<SettingsIcon />}
        textValue="Search settings"
      />
      <SearchViewItem
        id="recent"
        headline="Recent searches"
        start={<SearchIcon />}
        supportingText="Queries from this workspace."
        textValue="Recent searches"
      />
    </SearchView>
  );
}
