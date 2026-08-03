import { StarIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <MDButton variant="elevated">
        <StarIcon />
        Elevated
      </MDButton>
      <MDButton variant="filled">
        <StarIcon />
        Filled
      </MDButton>
      <MDButton variant="tonal">
        <StarIcon />
        Tonal
      </MDButton>
      <MDButton variant="outlined">
        <StarIcon />
        Outlined
      </MDButton>
      <MDButton variant="text">
        <StarIcon />
        Text
      </MDButton>
    </div>
  );
}
