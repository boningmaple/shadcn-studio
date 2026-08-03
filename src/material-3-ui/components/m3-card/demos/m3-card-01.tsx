import {
  M3Card,
  M3CardContent,
  M3CardHeader,
} from "@/material-3-ui/components/m3-card/m3-card";

const cards = [
  {
    variant: "elevated",
    title: "Elevated",
    description: "Adds a soft shadow to separate content from the background.",
  },
  {
    variant: "filled",
    title: "Filled",
    description: "Uses a tonal fill for low-emphasis grouped information.",
  },
  {
    variant: "outlined",
    title: "Outlined",
    description: "Adds a stroke for the strongest container separation.",
  },
] as const;

export default function M3CardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <M3Card key={card.variant} variant={card.variant}>
          <M3CardHeader>
            <span className="text-base leading-6 font-medium">
              {card.title}
            </span>
          </M3CardHeader>
          <M3CardContent>{card.description}</M3CardContent>
        </M3Card>
      ))}
    </div>
  );
}
