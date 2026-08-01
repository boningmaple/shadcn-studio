import { Card, CardContent, CardHeader } from "@/components/card/card";

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

export default function CardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.variant} variant={card.variant}>
          <CardHeader>
            <span className="text-base leading-6 font-medium">
              {card.title}
            </span>
          </CardHeader>
          <CardContent>{card.description}</CardContent>
        </Card>
      ))}
    </div>
  );
}
