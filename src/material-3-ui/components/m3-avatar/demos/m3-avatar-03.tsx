import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/ui/shadcn/react-aria/avatar";

const statuses = [
  { color: "bg-emerald-500", label: "Online", seed: "Jack" },
  { color: "bg-amber-400", label: "Away", seed: "Chase" },
  { color: "bg-rose-500", label: "Busy", seed: "Ryker" },
] as const;

export default function M3AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {statuses.map(({ color, label, seed }) => (
        <div className="flex flex-col items-center gap-3" key={label}>
          <Avatar size="lg">
            <AvatarImage
              alt={seed}
              src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=ffffff`}
            />
            <AvatarFallback>{seed.charAt(0)}</AvatarFallback>
            <AvatarBadge aria-label={label} className={color} role="status" />
          </Avatar>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
