import { CompassIcon, LuggageIcon, PlaneIcon } from "lucide-react";

import {
  MDTab,
  MDTabList,
  MDTabPanel,
  MDTabPanels,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

export default function MDTabsDemo() {
  return (
    <MDTabs className="max-w-2xl" defaultSelectedKey="flights">
      <MDTabList aria-label="Travel categories with icons">
        <MDTab id="flights">
          <PlaneIcon />
          Flights
        </MDTab>
        <MDTab id="trips">
          <LuggageIcon />
          Trips
        </MDTab>
        <MDTab id="explore">
          <CompassIcon />
          Explore
        </MDTab>
      </MDTabList>
      <MDTabPanels>
        <MDTabPanel id="flights">Find and manage upcoming flights.</MDTabPanel>
        <MDTabPanel id="trips">Review your saved travel plans.</MDTabPanel>
        <MDTabPanel id="explore">
          Discover destinations for your next trip.
        </MDTabPanel>
      </MDTabPanels>
    </MDTabs>
  );
}
