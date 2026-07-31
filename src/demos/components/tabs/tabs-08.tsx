import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

export default function TabsDemo() {
  return (
    <Tabs className="max-w-2xl" defaultSelectedKey="overview">
      <TabList aria-label="Account sections">
        <Tab id="overview">Overview</Tab>
        <Tab id="analytics" isDisabled>
          Analytics
        </Tab>
        <Tab id="settings">Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="overview">View your account overview.</TabPanel>
        <TabPanel id="analytics">Review account analytics.</TabPanel>
        <TabPanel id="settings">Manage account settings.</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
