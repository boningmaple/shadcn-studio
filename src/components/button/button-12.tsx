import { BookmarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <Button aria-label="Bookmark" size="icon" variant="outline">
      <BookmarkIcon />
    </Button>
  );
}
