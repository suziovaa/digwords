import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionBadge from "./SectionBadge";
import { Link } from "wouter";

interface TermDetailProps {
  term: string;
  section: string;
  definition: string;
  usageExample?: string;
  englishEquivalent?: string;
  relatedTerms?: string[];
  source?: string;
}

export default function TermDetail({
  term,
  section,
  definition,
  usageExample,
  englishEquivalent,
  relatedTerms,
  source,
}: TermDetailProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{term}</h1>
          <SectionBadge section={section} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Определение
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-loose text-foreground">{definition}</p>
        </CardContent>
      </Card>

      {usageExample && (
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Пример употребления
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed italic text-muted-foreground bg-muted p-4 rounded-md">
              {usageExample}
            </p>
          </CardContent>
        </Card>
      )}

      {englishEquivalent && (
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Английский эквивалент
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground">{englishEquivalent}</p>
          </CardContent>
        </Card>
      )}

      {relatedTerms && relatedTerms.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Смежные термины
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((relatedTerm, index) => (
                <Link key={index} href={`/search?q=${encodeURIComponent(relatedTerm)}`}>
                  <Badge
                    variant="outline"
                    className="hover-elevate active-elevate-2 cursor-pointer"
                    data-testid={`badge-related-${index}`}
                  >
                    {relatedTerm}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {source && (
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Источник
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-mono text-muted-foreground">{source}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
