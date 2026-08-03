import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";

const people = ["Jack", "Chase", "Ryker", "Katherine"];

export default function M3AvatarDemo() {
  return (
    <div className="flex max-w-full items-center gap-3 rounded-full border bg-background px-3 py-2 shadow-sm">
      <AvatarGroup
        aria-label="Community members"
        className="-space-x-1.5"
        role="group"
      >
        {people.map((person) => (
          <Avatar key={person} size="sm">
            <AvatarImage
              alt={person}
              src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${person}&backgroundColor=ffffff`}
            />
            <AvatarFallback>{person.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount aria-label="9 additional members">
          +9
        </AvatarGroupCount>
      </AvatarGroup>
      <p className="min-w-0 text-sm text-muted-foreground">
        Loved by <strong className="font-semibold text-foreground">10K+</strong>{" "}
        developers.
      </p>
    </div>
  );
}
