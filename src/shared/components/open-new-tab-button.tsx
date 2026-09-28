import { ScanSquareIcon } from "lucide-react";

import { LinkButton } from "@/components/ui/button";

type OpenNewTabButtonProps = {
  label: string;
  url: string;
};

export function OpenNewTabButton(props: OpenNewTabButtonProps) {
  return (
    <LinkButton
      aria-label={props.label}
      href={props.url}
      rel="noopener noreferrer"
      target="_blank"
      variant="outline"
      size="icon"
      className="transition-none"
    >
      <ScanSquareIcon />
    </LinkButton>
  );
}
