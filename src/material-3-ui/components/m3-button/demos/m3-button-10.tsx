import { StarIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <M3Button size="xs">
        <StarIcon />
        XS
      </M3Button>
      <M3Button size="sm">
        <StarIcon />
        SM
      </M3Button>
      <M3Button size="md">
        <StarIcon />
        MD
      </M3Button>
      <M3Button size="lg">
        <StarIcon />
        LG
      </M3Button>
      <M3Button size="xl">
        <StarIcon />
        XL
      </M3Button>
    </div>
  );
}
