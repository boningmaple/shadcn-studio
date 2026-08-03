import { BadgeCheckIcon } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";
import { Badge } from "@/ui/shadcn/react-aria/badge";

const notificationCounts = ["4", "32", "999+"];

export default function MDAvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-7">
      <Avatar size="lg">
        <AvatarImage
          alt="Jack"
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=Jack&backgroundColor=ffffff"
        />
        <AvatarFallback>J</AvatarFallback>
        <AvatarBadge
          aria-label="Online"
          className="bg-emerald-500"
          role="status"
        />
      </Avatar>

      <div className="relative">
        <Avatar size="lg">
          <AvatarImage
            alt="Katherine"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Katherine&backgroundColor=ffffff"
          />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        <Badge
          aria-label="Verified account"
          className="absolute -top-1 -right-1 size-5 rounded-full bg-background p-0 text-sky-600 ring-2 ring-background"
          role="img"
          variant="outline"
        >
          <BadgeCheckIcon className="fill-sky-500" />
        </Badge>
      </div>

      {notificationCounts.map((count) => (
        <div className="relative" key={count}>
          <Avatar size="lg">
            <AvatarImage
              alt="Ryker"
              src="https://api.dicebear.com/9.x/lorelei/svg?seed=Ryker&backgroundColor=ffffff"
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <Badge
            aria-label={`${count} notifications`}
            className="absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive px-1 text-white ring-2 ring-background dark:text-white"
            role="status"
          >
            {count}
          </Badge>
        </div>
      ))}
    </div>
  );
}
