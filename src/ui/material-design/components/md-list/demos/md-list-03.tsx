import { MDCheckbox } from "@/ui/material-design/components/md-checkbox/md-checkbox";
import {
  MDList,
  MDListItem,
} from "@/ui/material-design/components/md-list/md-list";

export default function MDListDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]">
      <MDList
        aria-label="Launch checklist"
        defaultSelectedKeys={["copy", "payments"]}
        selectionMode="multiple"
      >
        <MDListItem
          id="copy"
          headline="Approve launch copy"
          start={
            <MDCheckbox aria-label="Select launch copy" slot="selection" />
          }
          supportingText="Hero headline, app store notes, and email preview."
          textValue="Approve launch copy"
        />
        <MDListItem
          id="payments"
          headline="Confirm payments"
          start={<MDCheckbox aria-label="Select payments" slot="selection" />}
          supportingText="Gateway keys and refund rules are ready."
          textValue="Confirm payments"
        />
        <MDListItem
          id="analytics"
          headline="Attach analytics"
          start={<MDCheckbox aria-label="Select analytics" slot="selection" />}
          supportingText="Events are mapped, but dashboards still need labels."
          textValue="Attach analytics"
        />
        <MDListItem
          id="handoff"
          headline="Send support handoff"
          isDisabled
          start={
            <MDCheckbox aria-label="Select support handoff" slot="selection" />
          }
          supportingText="Locked until the final incident contact is assigned."
          textValue="Send support handoff"
        />
      </MDList>
    </div>
  );
}
