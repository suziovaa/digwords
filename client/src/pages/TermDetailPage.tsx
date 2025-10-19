import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TermDetail from "@/components/TermDetail";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { type Term } from "@shared/schema";

export default function TermDetailPage() {
  const params = useParams();
  const { theme, toggleTheme } = useTheme();
  const termId = params.id;

  const { data: term, isLoading } = useQuery<Term>({
    queryKey: ["/api/terms", termId],
    enabled: !!termId,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 px-2 py-1 rounded-md" data-testid="link-home">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">DH Dictionary</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6">
          <Link href="/dictionary">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Загрузка термина...
          </div>
        ) : !term ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-2">
              Термин не найден
            </p>
            <Link href="/dictionary">
              <Button variant="default" className="mt-4" data-testid="button-back-to-dictionary">
                Вернуться к словарю
              </Button>
            </Link>
          </div>
        ) : (
          <TermDetail
            term={term.term}
            section={term.section}
            definition={term.definition}
            usageExample={term.usageExample ?? undefined}
            englishEquivalent={term.englishEquivalent ?? undefined}
            relatedTerms={term.relatedTerms ?? undefined}
            source={term.source ?? undefined}
          />
        )}
      </main>
    </div>
  );
}
