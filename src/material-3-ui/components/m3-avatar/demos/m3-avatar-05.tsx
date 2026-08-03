import { CircleCheckIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";
import { Badge } from "@/ui/shadcn/react-aria/badge";

export default function M3AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <div className="relative">
        <Avatar
          className="ring-2 ring-rose-500 ring-offset-2 ring-offset-background"
          size="lg"
        >
          <AvatarImage
            alt="Jack streaming live"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Jack&backgroundColor=ffffff"
          />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
        <Badge className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-rose-600 text-white dark:text-white">
          Live
        </Badge>
      </div>

      <div className="relative">
        <Avatar
          className="ring-2 ring-emerald-500 ring-offset-2 ring-offset-background"
          size="lg"
        >
          <AvatarImage
            alt="Verified account for Katherine"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Katherine&backgroundColor=ffffff"
          />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        <Badge
          aria-label="Verified account"
          className="absolute -right-2 -bottom-2 size-5 rounded-full bg-background p-0 text-emerald-600 ring-2 ring-background"
          role="img"
          variant="outline"
        >
          <CircleCheckIcon className="fill-emerald-500" />
        </Badge>
      </div>
    </div>
  );
}
