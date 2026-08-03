"use client";

import * as React from "react";
import { HomeIcon, MailIcon, SettingsIcon } from "lucide-react";

import {
  MDBadge,
  MDBadgeAnchor,
} from "@/ui/material-design/components/md-badge/md-badge";
import {
  MDTab,
  MDTabList,
  MDTabPanel,
  MDTabPanels,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

export default function MDBadgeDemo() {
  const [unreadCount, setUnreadCount] = React.useState(3);
  const [announcement, setAnnouncement] = React.useState("");

  function selectDestination(key: React.Key) {
    if (key === "messages" && unreadCount > 0) {
      setUnreadCount(0);
      setAnnouncement("Messages marked as read.");
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <MDTabs defaultSelectedKey="home" onSelectionChange={selectDestination}>
        <MDTabList aria-label="App destinations">
          <MDTab id="home">
            <HomeIcon />
            Home
          </MDTab>
          <MDTab
            aria-label={
              unreadCount > 0
                ? `Messages, ${unreadCount} unread`
                : "Messages, no unread messages"
            }
            id="messages"
          >
            <MDBadgeAnchor>
              <MailIcon />
              {unreadCount > 0 ? (
                <MDBadge aria-hidden="true">{unreadCount}</MDBadge>
              ) : null}
            </MDBadgeAnchor>
            Messages
          </MDTab>
          <MDTab id="settings">
            <SettingsIcon />
            Settings
          </MDTab>
        </MDTabList>
        <MDTabPanels>
          <MDTabPanel id="home">
            Review your latest account activity.
          </MDTabPanel>
          <MDTabPanel id="messages">Your messages are up to date.</MDTabPanel>
          <MDTabPanel id="settings">
            Manage notification preferences.
          </MDTabPanel>
        </MDTabPanels>
      </MDTabs>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
