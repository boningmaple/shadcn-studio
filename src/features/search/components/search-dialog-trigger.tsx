import { useEffect, useState } from "react";

import { SearchDialog } from "@/features/search/components/search-dialog";
import { SearchDialogOpenButton } from "@/features/search/components/search-dialog-open-button";
import type { QuickLink } from "@/features/search/types/quick-links";

export function SearchDialogTrigger({ quickLinks }: { quickLinks: readonly QuickLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Escape is taken in the capture phase because the palette's `SearchField`
  // would otherwise swallow it to clear itself — but only while the palette is
  // open, or every other overlay on the page would lose the key.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen]);

  return (
    <div>
      <SearchDialogOpenButton onPress={() => setIsOpen(true)} />
      {isOpen && <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} quickLinks={quickLinks} />}
    </div>
  );
}
