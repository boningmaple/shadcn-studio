import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

export default function TabsDemo() {
  return (
    <div className="grid w-full gap-8 xl:grid-cols-2">
      <Tabs
        className="min-h-64"
        defaultSelectedKey="profile"
        orientation="vertical"
      >
        <TabList aria-label="Vertical profile sections">
          <Tab id="profile">Profile</Tab>
          <Tab id="security">Security</Tab>
          <Tab id="billing">Billing</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="profile">Update your profile information.</TabPanel>
          <TabPanel id="security">
            Review sign-in and security settings.
          </TabPanel>
          <TabPanel id="billing">Manage billing details and invoices.</TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs
        className="min-h-64"
        defaultSelectedKey="overview"
        orientation="vertical"
        variant="secondary"
      >
        <TabList aria-label="Vertical project sections">
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="files">Files</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="overview">View the project overview.</TabPanel>
          <TabPanel id="activity">Review recent project activity.</TabPanel>
          <TabPanel id="files">Browse files shared with the project.</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
