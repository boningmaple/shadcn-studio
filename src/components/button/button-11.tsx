import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <Button isDisabled>
      <LoaderCircleIcon className="animate-spin" data-icon="inline-start" />
      Loading
    </Button>
  );
}
