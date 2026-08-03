import {
  M3Tab,
  M3TabList,
  M3TabPanel,
  M3TabPanels,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

export default function M3TabsDemo() {
  return (
    <div className="grid w-full gap-8 xl:grid-cols-2">
      <M3Tabs
        className="min-h-64"
        defaultSelectedKey="profile"
        orientation="vertical"
      >
        <M3TabList aria-label="Vertical profile sections">
          <M3Tab id="profile">Profile</M3Tab>
          <M3Tab id="security">Security</M3Tab>
          <M3Tab id="billing">Billing</M3Tab>
        </M3TabList>
        <M3TabPanels>
          <M3TabPanel id="profile">Update your profile information.</M3TabPanel>
          <M3TabPanel id="security">
            Review sign-in and security settings.
          </M3TabPanel>
          <M3TabPanel id="billing">
            Manage billing details and invoices.
          </M3TabPanel>
        </M3TabPanels>
      </M3Tabs>

      <M3Tabs
        className="min-h-64"
        defaultSelectedKey="overview"
        orientation="vertical"
        variant="secondary"
      >
        <M3TabList aria-label="Vertical project sections">
          <M3Tab id="overview">Overview</M3Tab>
          <M3Tab id="activity">Activity</M3Tab>
          <M3Tab id="files">Files</M3Tab>
        </M3TabList>
        <M3TabPanels>
          <M3TabPanel id="overview">View the project overview.</M3TabPanel>
          <M3TabPanel id="activity">Review recent project activity.</M3TabPanel>
          <M3TabPanel id="files">
            Browse files shared with the project.
          </M3TabPanel>
        </M3TabPanels>
      </M3Tabs>
    </div>
  );
}
