import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function M3AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button
        aria-label="Open Jack's profile"
        className="rounded-full p-0"
        size="icon"
        variant="ghost"
      >
        <Avatar>
          <AvatarImage
            alt="Jack"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Jack&backgroundColor=ffffff"
          />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </Button>

      <Button
        aria-label="Open Chase's profile, currently online"
        className="overflow-visible rounded-full p-0"
        size="icon"
        variant="ghost"
      >
        <Avatar>
          <AvatarImage
            alt="Chase"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Chase&backgroundColor=ffffff"
          />
          <AvatarFallback>C</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
      </Button>

      <Button
        aria-label="Open Ryker's profile, 4 notifications"
        className="relative overflow-visible rounded-full p-0"
        size="icon"
        variant="ghost"
      >
        <Avatar>
          <AvatarImage
            alt="Ryker"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Ryker&backgroundColor=ffffff"
          />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <Badge className="absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive px-1 text-white ring-2 ring-background dark:text-white">
          4
        </Badge>
      </Button>
    </div>
  );
}
