import { Checkbox } from "@/components/checkbox/checkbox";
import { List, ListItem } from "@/components/list/list";

export default function ListDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]">
      <List
        aria-label="Launch checklist"
        defaultSelectedKeys={["copy", "payments"]}
        selectionMode="multiple"
      >
        <ListItem
          id="copy"
          headline="Approve launch copy"
          start={<Checkbox aria-label="Select launch copy" slot="selection" />}
          supportingText="Hero headline, app store notes, and email preview."
          textValue="Approve launch copy"
        />
        <ListItem
          id="payments"
          headline="Confirm payments"
          start={<Checkbox aria-label="Select payments" slot="selection" />}
          supportingText="Gateway keys and refund rules are ready."
          textValue="Confirm payments"
        />
        <ListItem
          id="analytics"
          headline="Attach analytics"
          start={<Checkbox aria-label="Select analytics" slot="selection" />}
          supportingText="Events are mapped, but dashboards still need labels."
          textValue="Attach analytics"
        />
        <ListItem
          id="handoff"
          headline="Send support handoff"
          isDisabled
          start={
            <Checkbox aria-label="Select support handoff" slot="selection" />
          }
          supportingText="Locked until the final incident contact is assigned."
          textValue="Send support handoff"
        />
      </List>
    </div>
  );
}
