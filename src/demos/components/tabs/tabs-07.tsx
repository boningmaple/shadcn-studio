import { CompassIcon, LuggageIcon, PlaneIcon } from "lucide-react";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

export default function TabsDemo() {
  return (
    <Tabs className="max-w-2xl" defaultSelectedKey="flights">
      <TabList aria-label="Travel categories with icons">
        <Tab id="flights">
          <PlaneIcon />
          Flights
        </Tab>
        <Tab id="trips">
          <LuggageIcon />
          Trips
        </Tab>
        <Tab id="explore">
          <CompassIcon />
          Explore
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="flights">Find and manage upcoming flights.</TabPanel>
        <TabPanel id="trips">Review your saved travel plans.</TabPanel>
        <TabPanel id="explore">
          Discover destinations for your next trip.
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
