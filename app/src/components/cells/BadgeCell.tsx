import { Badge } from "@medusajs/ui";

type BadgeColor = "grey" | "orange" | "red" | "purple" | "blue" | "green";

export function BadgeCell({ label, color }: { label: string; color: BadgeColor }) {
  return (
    <Badge color={color} size="2xsmall" rounded="full">
      {label}
    </Badge>
  );
}
