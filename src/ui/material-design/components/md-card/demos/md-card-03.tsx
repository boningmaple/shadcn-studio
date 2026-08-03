import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

import {
  MDCard,
  MDCardContent,
  MDCardHeader,
} from "@/ui/material-design/components/md-card/md-card";

const cards = [
  {
    icon: CalendarDaysIcon,
    title: "Schedule review",
    body: "Check campaign launch milestones and owner readiness.",
  },
  {
    icon: MapPinIcon,
    title: "Plan site visit",
    body: "Review travel windows and field notes for the next stop.",
  },
] as const;

export default function MDCardDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {cards.map(({ body, icon: Icon, title }) => (
        <MDCard
          aria-label={title}
          interactive
          key={title}
          role="button"
          variant="outlined"
        >
          <MDCardHeader>
            <div className="flex items-center justify-between gap-4">
              <Icon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
              <ArrowRightIcon className="size-5 text-[#49454f] dark:text-[#cac4d0]" />
            </div>
          </MDCardHeader>
          <MDCardContent>
            <span className="block text-base leading-6 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
              {title}
            </span>
            <span className="mt-2 block">{body}</span>
          </MDCardContent>
        </MDCard>
      ))}
    </div>
  );
}
