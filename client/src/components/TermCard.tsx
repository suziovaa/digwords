import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SectionBadge from "./SectionBadge";
import { Link } from "wouter";

interface TermCardProps {
  id: string;
  term: string;
  section: string;
  definition: string;
  englishEquivalent?: string;
}

export default function TermCard({
  id,
  term,
  section,
  definition,
  englishEquivalent,
}: TermCardProps) {
  return (
    <Link href={`/term/${id}`}>
      <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-term-${id}`}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <h3 className="text-xl font-semibold text-foreground">{term}</h3>
          <SectionBadge section={section} />
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {definition}
          </p>
          {englishEquivalent && (
            <p className="text-xs text-muted-foreground italic">
              EN: {englishEquivalent}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
