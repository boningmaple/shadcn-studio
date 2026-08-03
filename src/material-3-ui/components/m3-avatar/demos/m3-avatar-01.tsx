import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";

export default function M3AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Avatar>
        <AvatarImage
          alt="Jack"
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=Jack&backgroundColor=ffffff"
        />
        <AvatarFallback>J</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="Taylor Smith" src="/avatars/unavailable-user.png" />
        <AvatarFallback>TS</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
    </div>
  );
}
