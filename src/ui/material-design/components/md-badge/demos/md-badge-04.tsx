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
  return (
    <MDTabs
      className="max-w-2xl"
      defaultSelectedKey="updates"
      variant="secondary"
    >
      <MDTabList aria-label="Project activity">
        <MDTab aria-label="Updates, 3 new items" id="updates">
          <MDBadgeAnchor className="pe-3">
            Updates
            <MDBadge aria-hidden="true">3</MDBadge>
          </MDBadgeAnchor>
        </MDTab>
        <MDTab aria-label="Reviews, new notification" id="reviews">
          <MDBadgeAnchor className="pe-1.5">
            Reviews
            <MDBadge aria-hidden="true" />
          </MDBadgeAnchor>
        </MDTab>
        <MDTab id="history">History</MDTab>
      </MDTabList>
      <MDTabPanels>
        <MDTabPanel id="updates">
          Three project updates need attention.
        </MDTabPanel>
        <MDTabPanel id="reviews">A new review is ready.</MDTabPanel>
        <MDTabPanel id="history">Browse previous project activity.</MDTabPanel>
      </MDTabPanels>
    </MDTabs>
  );
}
