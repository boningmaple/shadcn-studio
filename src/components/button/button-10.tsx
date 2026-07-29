import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <Button variant="destructive">
      <Trash2Icon data-icon="inline-start" />
      Delete
    </Button>
  );
}
