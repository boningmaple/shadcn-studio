import {
  ArchiveIcon,
  ChevronRightIcon,
  MailIcon,
  MoreVerticalIcon,
  StarIcon,
  UserRoundIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDList,
  MDListItem,
} from "@/ui/material-design/components/md-list/md-list";

const initialsClassName =
  "flex size-10 items-center justify-center rounded-full bg-[#eaddff] text-sm font-medium text-[#21005d] dark:bg-[#4f378b] dark:text-[#eaddff]";

export default function MDListDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#1d1b20]">
      <MDList aria-label="Inbox messages">
        <MDListItem
          end={<ChevronRightIcon />}
          headline="Maya Stone"
          start={<span className={initialsClassName}>MS</span>}
          supportingText="Sent the workspace invite and notes from the planning session."
          textValue="Maya Stone"
          trailingSupportingText="12 min"
        />
        <MDListItem
          end={
            <MDIconButton
              aria-label="More options for supplier update"
              size="xs"
              variant="standard"
            >
              <MoreVerticalIcon />
            </MDIconButton>
          }
          headline="Supplier update"
          start={<ArchiveIcon />}
          supportingText="Three invoices are ready for review before Friday."
          textValue="Supplier update"
          trailingSupportingText="1 hr"
        />
        <MDListItem
          end={<StarIcon />}
          headline="Release notes"
          start={<MailIcon />}
          supportingText="Version 4.2 includes export filters and calmer notifications."
          textValue="Release notes"
          trailingSupportingText="Wed"
        />
        <MDListItem
          end={<ChevronRightIcon />}
          headline="Team profile"
          start={<UserRoundIcon />}
          textValue="Team profile"
        />
      </MDList>
    </div>
  );
}
