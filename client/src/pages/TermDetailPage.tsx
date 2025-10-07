import { Link, useParams } from "wouter";
import TermDetail from "@/components/TermDetail";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const MOCK_TERM = {
  term: "Корпусная лингвистика",
  section: "Методы исследования",
  definition:
    "Область лингвистики, занимающаяся созданием и анализом корпусов текстов — больших структурированных собраний текстов в электронной форме. Корпусная лингвистика использует количественные методы для изучения языковых явлений на основе реальных примеров употребления языка.",
  usageExample:
    "Корпусная лингвистика позволяет проводить статистический анализ употребления слов в различных контекстах и выявлять закономерности использования языковых единиц.",
  englishEquivalent: "Corpus Linguistics",
  relatedTerms: [
    "Компьютерная лингвистика",
    "Текстовый корпус",
    "Аннотация",
    "Лингвистическая разметка",
  ],
  source: "Баранов А. Н. Введение в прикладную лингвистику. М.: УРСС, 2001.",
};

export default function TermDetailPage() {
  const params = useParams();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 px-2 py-1 rounded-md">
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

        <TermDetail {...MOCK_TERM} />
      </main>
    </div>
  );
}
