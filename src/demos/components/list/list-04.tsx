import {
  BellIcon,
  MailIcon,
  MessagesSquareIcon,
  Volume2Icon,
} from "lucide-react";

import { Divider } from "@/components/divider/divider";
import { List, ListItem, ListSection } from "@/components/list/list";
import {
  RadioButton,
  RadioGroup,
} from "@/components/radio-button/radio-button";

export default function ListDemo() {
  return (
    <RadioGroup
      aria-label="Notification routing"
      className="w-full max-w-sm gap-0 overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]"
      defaultValue="mentions"
    >
      <List aria-label="Notification priority">
        <ListSection aria-label="Priority" id="priority" title="Priority">
          <ListItem
            end={<RadioButton aria-label="Mentions only" value="mentions" />}
            headline="Mentions only"
            start={<MessagesSquareIcon />}
            supportingText="Notify when your name or team is tagged."
            textValue="Mentions only"
          />
          <ListItem
            end={<RadioButton aria-label="All conversations" value="all" />}
            headline="All conversations"
            start={<MailIcon />}
            supportingText="Send updates from every subscribed thread."
            textValue="All conversations"
          />
        </ListSection>
      </List>
      <Divider />
      <List aria-label="Notification delivery">
        <ListSection aria-label="Delivery" id="delivery" title="Delivery">
          <ListItem
            end={<RadioButton aria-label="Quiet delivery" value="quiet" />}
            headline="Quiet delivery"
            start={<BellIcon />}
            supportingText="Collect updates in the notification center."
            textValue="Quiet delivery"
          />
          <ListItem
            end={<RadioButton aria-label="Sound and banner" value="sound" />}
            headline="Sound and banner"
            start={<Volume2Icon />}
            supportingText="Play a tone and show a banner immediately."
            textValue="Sound and banner"
          />
        </ListSection>
      </List>
    </RadioGroup>
  );
}
