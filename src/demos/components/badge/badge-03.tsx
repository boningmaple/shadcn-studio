"use client";

import * as React from "react";
import { HomeIcon, MailIcon, SettingsIcon } from "lucide-react";

import { Badge, BadgeAnchor } from "@/components/badge/badge";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

export default function BadgeDemo() {
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
      <Tabs defaultSelectedKey="home" onSelectionChange={selectDestination}>
        <TabList aria-label="App destinations">
          <Tab id="home">
            <HomeIcon />
            Home
          </Tab>
          <Tab
            aria-label={
              unreadCount > 0
                ? `Messages, ${unreadCount} unread`
                : "Messages, no unread messages"
            }
            id="messages"
          >
            <BadgeAnchor>
              <MailIcon />
              {unreadCount > 0 ? (
                <Badge aria-hidden="true">{unreadCount}</Badge>
              ) : null}
            </BadgeAnchor>
            Messages
          </Tab>
          <Tab id="settings">
            <SettingsIcon />
            Settings
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="home">Review your latest account activity.</TabPanel>
          <TabPanel id="messages">Your messages are up to date.</TabPanel>
          <TabPanel id="settings">Manage notification preferences.</TabPanel>
        </TabPanels>
      </Tabs>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
