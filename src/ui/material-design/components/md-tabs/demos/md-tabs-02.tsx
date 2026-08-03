import {
  MDTab,
  MDTabList,
  MDTabPanel,
  MDTabPanels,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

const sections = [
  {
    id: "overview",
    label: "Overview",
    content: "View a summary of the project.",
  },
  {
    id: "activity",
    label: "Activity",
    content: "Review the latest project activity.",
  },
  {
    id: "favorites",
    label: "Favorites",
    content: "Open your favorite project items.",
  },
];

export default function MDTabsDemo() {
  return (
    <MDTabs
      className="max-w-2xl"
      defaultSelectedKey="overview"
      variant="secondary"
    >
      <MDTabList aria-label="Project details" items={sections}>
        {(section) => <MDTab>{section.label}</MDTab>}
      </MDTabList>
      <MDTabPanels items={sections}>
        {(section) => <MDTabPanel>{section.content}</MDTabPanel>}
      </MDTabPanels>
    </MDTabs>
  );
}
