import SectionBadge from "../SectionBadge";

export default function SectionBadgeExample() {
  return (
    <div className="flex gap-2">
      <SectionBadge section="Методы исследования" />
      <SectionBadge section="Инструменты" />
      <SectionBadge section="Концепции" />
    </div>
  );
}
