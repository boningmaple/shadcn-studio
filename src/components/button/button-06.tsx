import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button>Save Changes</Button>
    </div>
  );
}
