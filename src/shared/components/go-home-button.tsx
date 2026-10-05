import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export function GoHomeButton() {
  return (
    <Link to="/" className={buttonVariants({ className: "not-prose" })}>
      Go home
    </Link>
  );
}
