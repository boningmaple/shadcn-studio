import {
  MDTab,
  MDTabList,
  MDTabPanel,
  MDTabPanels,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

export default function MDTabsDemo() {
  return (
    <MDTabs className="max-w-2xl" defaultSelectedKey="overview">
      <MDTabList aria-label="Account sections">
        <MDTab id="overview">Overview</MDTab>
        <MDTab id="analytics" isDisabled>
          Analytics
        </MDTab>
        <MDTab id="settings">Settings</MDTab>
      </MDTabList>
      <MDTabPanels>
        <MDTabPanel id="overview">View your account overview.</MDTabPanel>
        <MDTabPanel id="analytics">Review account analytics.</MDTabPanel>
        <MDTabPanel id="settings">Manage account settings.</MDTabPanel>
      </MDTabPanels>
    </MDTabs>
  );
}
