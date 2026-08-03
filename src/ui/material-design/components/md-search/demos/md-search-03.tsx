import {
  FileTextIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import {
  MDSearchView,
  MDSearchViewItem,
} from "@/ui/material-design/components/md-search/md-search";

export default function MDSearchDemo() {
  return (
    <MDSearchView
      dialogLabel="Search documentation"
      placeholder="Search docs"
      triggerLabel="Search docs"
    >
      <MDSearchViewItem
        id="color-tokens"
        headline="Color tokens"
        start={<PaletteIcon />}
        supportingText="Core roles, state layers, and dark theme values."
        textValue="Color tokens"
      />
      <MDSearchViewItem
        id="component-guides"
        headline="Component guides"
        start={<FileTextIcon />}
        supportingText="Implementation notes for reusable Material patterns."
        textValue="Component guides"
      />
      <MDSearchViewItem
        id="settings"
        headline="Search settings"
        start={<SettingsIcon />}
        textValue="Search settings"
      />
      <MDSearchViewItem
        id="recent"
        headline="Recent searches"
        start={<SearchIcon />}
        supportingText="Queries from this workspace."
        textValue="Recent searches"
      />
    </MDSearchView>
  );
}
