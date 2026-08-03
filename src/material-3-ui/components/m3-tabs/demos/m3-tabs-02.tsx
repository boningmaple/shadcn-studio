import {
  M3Tab,
  M3TabList,
  M3TabPanel,
  M3TabPanels,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

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

export default function M3TabsDemo() {
  return (
    <M3Tabs
      className="max-w-2xl"
      defaultSelectedKey="overview"
      variant="secondary"
    >
      <M3TabList aria-label="Project details" items={sections}>
        {(section) => <M3Tab>{section.label}</M3Tab>}
      </M3TabList>
      <M3TabPanels items={sections}>
        {(section) => <M3TabPanel>{section.content}</M3TabPanel>}
      </M3TabPanels>
    </M3Tabs>
  );
}
