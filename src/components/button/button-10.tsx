import { StarIcon } from "lucide-react";

import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <Button size="xs">
        <StarIcon />
        XS
      </Button>
      <Button size="sm">
        <StarIcon />
        SM
      </Button>
      <Button size="md">
        <StarIcon />
        MD
      </Button>
      <Button size="lg">
        <StarIcon />
        LG
      </Button>
      <Button size="xl">
        <StarIcon />
        XL
      </Button>
    </div>
  );
}
