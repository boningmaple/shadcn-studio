import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export default function Button02() {
  return (
    <Button variant="outline">
      Open search
      <Kbd className="ml-1">⌘ K</Kbd>
    </Button>
  );
}
