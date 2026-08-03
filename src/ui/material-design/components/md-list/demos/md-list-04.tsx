import {
  BellIcon,
  MailIcon,
  MessagesSquareIcon,
  Volume2Icon,
} from "lucide-react";

import { MDDivider } from "@/ui/material-design/components/md-divider/md-divider";
import {
  MDList,
  MDListItem,
  MDListSection,
} from "@/ui/material-design/components/md-list/md-list";
import {
  MDRadioButton,
  MDRadioGroup,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDListDemo() {
  return (
    <MDRadioGroup
      aria-label="Notification routing"
      className="w-full max-w-sm gap-0 overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]"
      defaultValue="mentions"
    >
      <MDList aria-label="Notification priority">
        <MDListSection aria-label="Priority" id="priority" title="Priority">
          <MDListItem
            end={<MDRadioButton aria-label="Mentions only" value="mentions" />}
            headline="Mentions only"
            start={<MessagesSquareIcon />}
            supportingText="Notify when your name or team is tagged."
            textValue="Mentions only"
          />
          <MDListItem
            end={<MDRadioButton aria-label="All conversations" value="all" />}
            headline="All conversations"
            start={<MailIcon />}
            supportingText="Send updates from every subscribed thread."
            textValue="All conversations"
          />
        </MDListSection>
      </MDList>
      <MDDivider />
      <MDList aria-label="Notification delivery">
        <MDListSection aria-label="Delivery" id="delivery" title="Delivery">
          <MDListItem
            end={<MDRadioButton aria-label="Quiet delivery" value="quiet" />}
            headline="Quiet delivery"
            start={<BellIcon />}
            supportingText="Collect updates in the notification center."
            textValue="Quiet delivery"
          />
          <MDListItem
            end={<MDRadioButton aria-label="Sound and banner" value="sound" />}
            headline="Sound and banner"
            start={<Volume2Icon />}
            supportingText="Play a tone and show a banner immediately."
            textValue="Sound and banner"
          />
        </MDListSection>
      </MDList>
    </MDRadioGroup>
  );
}
