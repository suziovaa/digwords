import { Badge } from "@/components/ui/badge";

interface SectionBadgeProps {
  section: string;
}

const SECTION_COLORS: Record<string, string> = {
  "Методы исследования": "bg-primary/10 text-primary border-primary/20",
  "Инструменты": "bg-secondary/10 text-secondary border-secondary/20",
  "Концепции": "bg-accent/10 text-accent-foreground border-accent/20",
  "Технологии": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "Форматы данных": "bg-chart-5/10 text-chart-5 border-chart-5/20",
  "Визуализация": "bg-chart-2/10 text-chart-2 border-chart-2/20",
};

export default function SectionBadge({ section }: SectionBadgeProps) {
  const colorClass = SECTION_COLORS[section] || "bg-muted text-muted-foreground";
  
  return (
    <Badge variant="outline" className={`text-xs font-semibold ${colorClass}`}>
      {section}
    </Badge>
  );
}
