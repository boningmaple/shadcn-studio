import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

import {
  M3Card,
  M3CardContent,
  M3CardHeader,
} from "@/material-3-ui/components/m3-card/m3-card";

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

export default function M3CardDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {cards.map(({ body, icon: Icon, title }) => (
        <M3Card
          aria-label={title}
          interactive
          key={title}
          role="button"
          variant="outlined"
        >
          <M3CardHeader>
            <div className="flex items-center justify-between gap-4">
              <Icon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
              <ArrowRightIcon className="size-5 text-[#49454f] dark:text-[#cac4d0]" />
            </div>
          </M3CardHeader>
          <M3CardContent>
            <span className="block text-base leading-6 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
              {title}
            </span>
            <span className="mt-2 block">{body}</span>
          </M3CardContent>
        </M3Card>
      ))}
    </div>
  );
}
