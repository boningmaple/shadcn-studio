import { CompassIcon, LuggageIcon, PlaneIcon } from "lucide-react";

import {
  M3Tab,
  M3TabList,
  M3TabPanel,
  M3TabPanels,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

export default function M3TabsDemo() {
  return (
    <M3Tabs className="max-w-2xl" defaultSelectedKey="flights">
      <M3TabList aria-label="Travel categories with icons">
        <M3Tab id="flights">
          <PlaneIcon />
          Flights
        </M3Tab>
        <M3Tab id="trips">
          <LuggageIcon />
          Trips
        </M3Tab>
        <M3Tab id="explore">
          <CompassIcon />
          Explore
        </M3Tab>
      </M3TabList>
      <M3TabPanels>
        <M3TabPanel id="flights">Find and manage upcoming flights.</M3TabPanel>
        <M3TabPanel id="trips">Review your saved travel plans.</M3TabPanel>
        <M3TabPanel id="explore">
          Discover destinations for your next trip.
        </M3TabPanel>
      </M3TabPanels>
    </M3Tabs>
  );
}
