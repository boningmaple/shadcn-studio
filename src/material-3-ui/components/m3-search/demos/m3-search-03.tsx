import {
  FileTextIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import {
  M3SearchView,
  M3SearchViewItem,
} from "@/material-3-ui/components/m3-search/m3-search";

export default function M3SearchDemo() {
  return (
    <M3SearchView
      dialogLabel="Search documentation"
      placeholder="Search docs"
      triggerLabel="Search docs"
    >
      <M3SearchViewItem
        id="color-tokens"
        headline="Color tokens"
        start={<PaletteIcon />}
        supportingText="Core roles, state layers, and dark theme values."
        textValue="Color tokens"
      />
      <M3SearchViewItem
        id="component-guides"
        headline="Component guides"
        start={<FileTextIcon />}
        supportingText="Implementation notes for reusable Material patterns."
        textValue="Component guides"
      />
      <M3SearchViewItem
        id="settings"
        headline="Search settings"
        start={<SettingsIcon />}
        textValue="Search settings"
      />
      <M3SearchViewItem
        id="recent"
        headline="Recent searches"
        start={<SearchIcon />}
        supportingText="Queries from this workspace."
        textValue="Recent searches"
      />
    </M3SearchView>
  );
}
