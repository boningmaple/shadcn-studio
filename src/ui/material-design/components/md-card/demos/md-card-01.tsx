import {
  MDCard,
  MDCardContent,
  MDCardHeader,
} from "@/ui/material-design/components/md-card/md-card";

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

export default function MDCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <MDCard key={card.variant} variant={card.variant}>
          <MDCardHeader>
            <span className="text-base leading-6 font-medium">
              {card.title}
            </span>
          </MDCardHeader>
          <MDCardContent>{card.description}</MDCardContent>
        </MDCard>
      ))}
    </div>
  );
}
