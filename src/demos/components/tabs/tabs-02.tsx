import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

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

export default function TabsDemo() {
  return (
    <Tabs
      className="max-w-2xl"
      defaultSelectedKey="overview"
      variant="secondary"
    >
      <TabList aria-label="Project details" items={sections}>
        {(section) => <Tab>{section.label}</Tab>}
      </TabList>
      <TabPanels items={sections}>
        {(section) => <TabPanel>{section.content}</TabPanel>}
      </TabPanels>
    </Tabs>
  );
}
