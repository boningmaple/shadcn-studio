import { StarIcon } from "lucide-react";

import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <Button variant="elevated">
        <StarIcon />
        Elevated
      </Button>
      <Button variant="filled">
        <StarIcon />
        Filled
      </Button>
      <Button variant="tonal">
        <StarIcon />
        Tonal
      </Button>
      <Button variant="outlined">
        <StarIcon />
        Outlined
      </Button>
      <Button variant="text">
        <StarIcon />
        Text
      </Button>
    </div>
  );
}
