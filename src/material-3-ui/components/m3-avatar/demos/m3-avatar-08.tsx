import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";

const people = [
  { name: "Jack", stack: "z-30" },
  { name: "Chase", stack: "z-20" },
  { name: "Ryker", stack: "z-10" },
  { name: "Katherine", stack: "z-0" },
] as const;

export default function M3AvatarDemo() {
  return (
    <AvatarGroup
      aria-label="Project members, ordered from left to right"
      role="group"
    >
      {people.map(({ name, stack }) => (
        <Avatar className={stack} key={name}>
          <AvatarImage
            alt={name}
            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${name}&backgroundColor=ffffff`}
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
