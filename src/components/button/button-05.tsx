import { Redo2Icon, Undo2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Undo2Icon data-icon="inline-start" />
        Undo
      </Button>
      <Button variant="outline">
        Redo
        <Redo2Icon data-icon="inline-end" />
      </Button>
    </div>
  );
}
