import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sizes = [
  { label: "Small", seed: "Chase", size: "sm" },
  { label: "Default", seed: "Jack", size: "default" },
  { label: "Large", seed: "Katherine", size: "lg" },
] as const;

export default function M3AvatarDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map(({ label, seed, size }) => (
        <div className="flex flex-col items-center gap-3" key={size}>
          <Avatar size={size}>
            <AvatarImage
              alt={seed}
              src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=ffffff`}
            />
            <AvatarFallback>{seed.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
