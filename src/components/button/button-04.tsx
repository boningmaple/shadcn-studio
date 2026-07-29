import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <Button>
      Get In Touch
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  );
}
