import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

const people = ["Jack", "Chase", "Ryker", "Katherine"];

export default function M3AvatarDemo() {
  return (
    <AvatarGroup aria-label="Project members" role="group">
      {people.map((person) => (
        <Avatar key={person}>
          <AvatarImage
            alt={person}
            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${person}&backgroundColor=ffffff`}
          />
          <AvatarFallback>{person.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
