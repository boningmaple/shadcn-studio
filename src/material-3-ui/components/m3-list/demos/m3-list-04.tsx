import {
  BellIcon,
  MailIcon,
  MessagesSquareIcon,
  Volume2Icon,
} from "lucide-react";

import { M3Divider } from "@/material-3-ui/components/m3-divider/m3-divider";
import {
  M3List,
  M3ListItem,
  M3ListSection,
} from "@/material-3-ui/components/m3-list/m3-list";
import {
  M3RadioButton,
  M3RadioGroup,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3ListDemo() {
  return (
    <M3RadioGroup
      aria-label="Notification routing"
      className="w-full max-w-sm gap-0 overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]"
      defaultValue="mentions"
    >
      <M3List aria-label="Notification priority">
        <M3ListSection aria-label="Priority" id="priority" title="Priority">
          <M3ListItem
            end={<M3RadioButton aria-label="Mentions only" value="mentions" />}
            headline="Mentions only"
            start={<MessagesSquareIcon />}
            supportingText="Notify when your name or team is tagged."
            textValue="Mentions only"
          />
          <M3ListItem
            end={<M3RadioButton aria-label="All conversations" value="all" />}
            headline="All conversations"
            start={<MailIcon />}
            supportingText="Send updates from every subscribed thread."
            textValue="All conversations"
          />
        </M3ListSection>
      </M3List>
      <M3Divider />
      <M3List aria-label="Notification delivery">
        <M3ListSection aria-label="Delivery" id="delivery" title="Delivery">
          <M3ListItem
            end={<M3RadioButton aria-label="Quiet delivery" value="quiet" />}
            headline="Quiet delivery"
            start={<BellIcon />}
            supportingText="Collect updates in the notification center."
            textValue="Quiet delivery"
          />
          <M3ListItem
            end={<M3RadioButton aria-label="Sound and banner" value="sound" />}
            headline="Sound and banner"
            start={<Volume2Icon />}
            supportingText="Play a tone and show a banner immediately."
            textValue="Sound and banner"
          />
        </M3ListSection>
      </M3List>
    </M3RadioGroup>
  );
}
