"use client";

import * as React from "react";
import { HomeIcon, MailIcon, SettingsIcon } from "lucide-react";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";
import {
  M3Tab,
  M3TabList,
  M3TabPanel,
  M3TabPanels,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

export default function M3BadgeDemo() {
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
      <M3Tabs defaultSelectedKey="home" onSelectionChange={selectDestination}>
        <M3TabList aria-label="App destinations">
          <M3Tab id="home">
            <HomeIcon />
            Home
          </M3Tab>
          <M3Tab
            aria-label={
              unreadCount > 0
                ? `Messages, ${unreadCount} unread`
                : "Messages, no unread messages"
            }
            id="messages"
          >
            <M3BadgeAnchor>
              <MailIcon />
              {unreadCount > 0 ? (
                <M3Badge aria-hidden="true">{unreadCount}</M3Badge>
              ) : null}
            </M3BadgeAnchor>
            Messages
          </M3Tab>
          <M3Tab id="settings">
            <SettingsIcon />
            Settings
          </M3Tab>
        </M3TabList>
        <M3TabPanels>
          <M3TabPanel id="home">
            Review your latest account activity.
          </M3TabPanel>
          <M3TabPanel id="messages">Your messages are up to date.</M3TabPanel>
          <M3TabPanel id="settings">
            Manage notification preferences.
          </M3TabPanel>
        </M3TabPanels>
      </M3Tabs>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
