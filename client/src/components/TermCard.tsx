import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SectionBadge from "./SectionBadge";
import { Link } from "wouter";
import { type Term } from "@shared/schema";

interface TermCardProps {
  term: Term;
}

export default function TermCard({ term }: TermCardProps) {
  const { id, term: termName, section, definition, englishEquivalent } = term;
  return (
    <Link href={`/term/${id}`}>
      <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-term-${id}`}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
          <h3 className="text-xl font-semibold text-foreground">{termName}</h3>
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
