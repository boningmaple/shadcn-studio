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
  return (
    <M3Tabs
      className="max-w-2xl"
      defaultSelectedKey="updates"
      variant="secondary"
    >
      <M3TabList aria-label="Project activity">
        <M3Tab aria-label="Updates, 3 new items" id="updates">
          <M3BadgeAnchor className="pe-3">
            Updates
            <M3Badge aria-hidden="true">3</M3Badge>
          </M3BadgeAnchor>
        </M3Tab>
        <M3Tab aria-label="Reviews, new notification" id="reviews">
          <M3BadgeAnchor className="pe-1.5">
            Reviews
            <M3Badge aria-hidden="true" />
          </M3BadgeAnchor>
        </M3Tab>
        <M3Tab id="history">History</M3Tab>
      </M3TabList>
      <M3TabPanels>
        <M3TabPanel id="updates">
          Three project updates need attention.
        </M3TabPanel>
        <M3TabPanel id="reviews">A new review is ready.</M3TabPanel>
        <M3TabPanel id="history">Browse previous project activity.</M3TabPanel>
      </M3TabPanels>
    </M3Tabs>
  );
}
