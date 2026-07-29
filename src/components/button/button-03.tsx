import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <Button>
      <StarIcon data-icon="inline-start" />
      Star
    </Button>
  );
}
