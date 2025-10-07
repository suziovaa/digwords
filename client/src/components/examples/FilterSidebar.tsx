import FilterSidebar from "../FilterSidebar";
import { useState } from "react";

export default function FilterSidebarExample() {
  const sections = [
    "Методы исследования",
    "Инструменты",
    "Концепции",
    "Технологии",
    "Форматы данных",
  ];
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const handleToggle = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="p-4 max-w-xs">
      <FilterSidebar
        sections={sections}
        selectedSections={selectedSections}
        onSectionToggle={handleToggle}
        onClearAll={() => setSelectedSections([])}
      />
    </div>
  );
}
