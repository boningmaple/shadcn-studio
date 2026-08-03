import {
  MDTab,
  MDTabList,
  MDTabPanel,
  MDTabPanels,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

export default function MDTabsDemo() {
  return (
    <div className="grid w-full gap-8 xl:grid-cols-2">
      <MDTabs
        className="min-h-64"
        defaultSelectedKey="profile"
        orientation="vertical"
      >
        <MDTabList aria-label="Vertical profile sections">
          <MDTab id="profile">Profile</MDTab>
          <MDTab id="security">Security</MDTab>
          <MDTab id="billing">Billing</MDTab>
        </MDTabList>
        <MDTabPanels>
          <MDTabPanel id="profile">Update your profile information.</MDTabPanel>
          <MDTabPanel id="security">
            Review sign-in and security settings.
          </MDTabPanel>
          <MDTabPanel id="billing">
            Manage billing details and invoices.
          </MDTabPanel>
        </MDTabPanels>
      </MDTabs>

      <MDTabs
        className="min-h-64"
        defaultSelectedKey="overview"
        orientation="vertical"
        variant="secondary"
      >
        <MDTabList aria-label="Vertical project sections">
          <MDTab id="overview">Overview</MDTab>
          <MDTab id="activity">Activity</MDTab>
          <MDTab id="files">Files</MDTab>
        </MDTabList>
        <MDTabPanels>
          <MDTabPanel id="overview">View the project overview.</MDTabPanel>
          <MDTabPanel id="activity">Review recent project activity.</MDTabPanel>
          <MDTabPanel id="files">
            Browse files shared with the project.
          </MDTabPanel>
        </MDTabPanels>
      </MDTabs>
    </div>
  );
}
