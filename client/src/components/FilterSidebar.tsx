import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  sections: string[];
  selectedSections: string[];
  onSectionToggle: (section: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  sections,
  selectedSections,
  onSectionToggle,
  onClearAll,
}: FilterSidebarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Разделы
        </h3>
        {selectedSections.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs"
            data-testid="button-clear-filters"
          >
            <X className="h-3 w-3 mr-1" />
            Очистить
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section} className="flex items-start space-x-2">
            <Checkbox
              id={`section-${section}`}
              checked={selectedSections.includes(section)}
              onCheckedChange={() => onSectionToggle(section)}
              data-testid={`checkbox-section-${section}`}
            />
            <label
              htmlFor={`section-${section}`}
              className="text-sm leading-tight cursor-pointer text-foreground"
            >
              {section}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
