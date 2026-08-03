import { StarIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <MDButton size="xs">
        <StarIcon />
        XS
      </MDButton>
      <MDButton size="sm">
        <StarIcon />
        SM
      </MDButton>
      <MDButton size="md">
        <StarIcon />
        MD
      </MDButton>
      <MDButton size="lg">
        <StarIcon />
        LG
      </MDButton>
      <MDButton size="xl">
        <StarIcon />
        XL
      </MDButton>
    </div>
  );
}
