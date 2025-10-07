import { Badge } from "@/components/ui/badge";

interface SectionBadgeProps {
  section: string;
}

export default function SectionBadge({ section }: SectionBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs font-medium">
      {section}
    </Badge>
  );
}
