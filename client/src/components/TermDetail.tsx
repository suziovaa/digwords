import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionBadge from "./SectionBadge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Term } from "@shared/schema";
import { ArrowRight } from "lucide-react";

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
  // Fetch all terms to find related term IDs
  const { data: allTerms = [] } = useQuery<Term[]>({
    queryKey: ["/api/terms"],
  });

  // Map related term names to their IDs and sort alphabetically
  const relatedTermsWithIds = relatedTerms
    ?.map((relatedTermName) => {
      const foundTerm = allTerms.find((t) => t.term === relatedTermName);
      return { name: relatedTermName, id: foundTerm?.id };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

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

      {relatedTermsWithIds && relatedTermsWithIds.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Смежные термины
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {relatedTermsWithIds.map((relatedTerm, index) => (
                relatedTerm.id ? (
                  <Link key={index} href={`/term/${relatedTerm.id}`}>
                    <Badge
                      variant="outline"
                      className="hover-elevate active-elevate-2 cursor-pointer group"
                      data-testid={`badge-related-${index}`}
                    >
                      {relatedTerm.name}
                      <ArrowRight className="h-3 w-3 ml-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Badge>
                  </Link>
                ) : (
                  <Link key={index} href={`/dictionary?q=${encodeURIComponent(relatedTerm.name)}`}>
                    <Badge
                      variant="outline"
                      className="hover-elevate active-elevate-2 cursor-pointer opacity-70"
                      data-testid={`badge-related-${index}`}
                    >
                      {relatedTerm.name}
                    </Badge>
                  </Link>
                )
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
