import { M3Checkbox } from "@/material-3-ui/components/m3-checkbox/m3-checkbox";
import { M3List, M3ListItem } from "@/material-3-ui/components/m3-list/m3-list";

export default function M3ListDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]">
      <M3List
        aria-label="Launch checklist"
        defaultSelectedKeys={["copy", "payments"]}
        selectionMode="multiple"
      >
        <M3ListItem
          id="copy"
          headline="Approve launch copy"
          start={
            <M3Checkbox aria-label="Select launch copy" slot="selection" />
          }
          supportingText="Hero headline, app store notes, and email preview."
          textValue="Approve launch copy"
        />
        <M3ListItem
          id="payments"
          headline="Confirm payments"
          start={<M3Checkbox aria-label="Select payments" slot="selection" />}
          supportingText="Gateway keys and refund rules are ready."
          textValue="Confirm payments"
        />
        <M3ListItem
          id="analytics"
          headline="Attach analytics"
          start={<M3Checkbox aria-label="Select analytics" slot="selection" />}
          supportingText="Events are mapped, but dashboards still need labels."
          textValue="Attach analytics"
        />
        <M3ListItem
          id="handoff"
          headline="Send support handoff"
          isDisabled
          start={
            <M3Checkbox aria-label="Select support handoff" slot="selection" />
          }
          supportingText="Locked until the final incident contact is assigned."
          textValue="Send support handoff"
        />
      </M3List>
    </div>
  );
}
