import { Badge, BadgeAnchor } from "@/components/badge/badge";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/components/tabs/tabs";

export default function BadgeDemo() {
  return (
    <Tabs
      className="max-w-2xl"
      defaultSelectedKey="updates"
      variant="secondary"
    >
      <TabList aria-label="Project activity">
        <Tab aria-label="Updates, 3 new items" id="updates">
          <BadgeAnchor className="pe-3">
            Updates
            <Badge aria-hidden="true">3</Badge>
          </BadgeAnchor>
        </Tab>
        <Tab aria-label="Reviews, new notification" id="reviews">
          <BadgeAnchor className="pe-1.5">
            Reviews
            <Badge aria-hidden="true" />
          </BadgeAnchor>
        </Tab>
        <Tab id="history">History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="updates">Three project updates need attention.</TabPanel>
        <TabPanel id="reviews">A new review is ready.</TabPanel>
        <TabPanel id="history">Browse previous project activity.</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
