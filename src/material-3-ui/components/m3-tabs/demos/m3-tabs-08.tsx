import {
  M3Tab,
  M3TabList,
  M3TabPanel,
  M3TabPanels,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

export default function M3TabsDemo() {
  return (
    <M3Tabs className="max-w-2xl" defaultSelectedKey="overview">
      <M3TabList aria-label="Account sections">
        <M3Tab id="overview">Overview</M3Tab>
        <M3Tab id="analytics" isDisabled>
          Analytics
        </M3Tab>
        <M3Tab id="settings">Settings</M3Tab>
      </M3TabList>
      <M3TabPanels>
        <M3TabPanel id="overview">View your account overview.</M3TabPanel>
        <M3TabPanel id="analytics">Review account analytics.</M3TabPanel>
        <M3TabPanel id="settings">Manage account settings.</M3TabPanel>
      </M3TabPanels>
    </M3Tabs>
  );
}
