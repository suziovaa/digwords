import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun, Sparkles, Shuffle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { type Term } from "@shared/schema";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  const { data: terms = [] } = useQuery<Term[]>({
    queryKey: ["/api/terms"],
  });

  const sections = Array.from(
    terms.reduce((acc, term) => {
      acc.set(term.section, (acc.get(term.section) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Animated counts
  const animatedTermCount = useCountUp(terms.length);
  const animatedSectionCount = useCountUp(sections.length);

  // Featured term of the day (deterministic based on date)
  const featuredTerm = useMemo(() => {
    if (terms.length === 0) return null;
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % terms.length;
    return terms[index];
  }, [terms]);

  const handleRandomTerm = () => {
    if (terms.length > 0) {
      const randomIndex = Math.floor(Math.random() * terms.length);
      setLocation(`/term/${terms[randomIndex].id}`);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      window.location.href = `/dictionary?q=${encodeURIComponent(searchValue)}`;
    } else {
      window.location.href = "/dictionary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">DH Dictionary</span>
          </div>
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

      <main>
        <section className="relative bg-gradient-to-br from-primary/80 to-secondary text-primary-foreground py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
                <span>🌐</span>
                <span>RU · EN</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Словарь терминов цифровой гуманитаристики
              </h1>
              <p className="text-xl text-primary-foreground/95 max-w-2xl mx-auto font-medium">
                Онлайн-словарь с определениями на русском и английском языках
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <SearchBar
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Поиск терминов..."
                />
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-8"
                    data-testid="button-search"
                  >
                    Искать
                  </Button>
                  <Link href="/dictionary">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm rounded-full px-8"
                      data-testid="button-browse"
                    >
                      Просмотреть все
                    </Button>
                  </Link>
                  {terms.length > 0 && (
                    <Button
                      onClick={handleRandomTerm}
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm rounded-full px-8"
                      data-testid="button-random"
                    >
                      <Shuffle className="h-5 w-5 mr-2" />
                      Случайный термин
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1" data-testid="text-total-terms">{animatedTermCount}</div>
                  <div className="text-sm text-muted-foreground">Всего терминов</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1" data-testid="text-total-sections">{animatedSectionCount}</div>
                  <div className="text-sm text-muted-foreground">Разделов</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">2</div>
                  <div className="text-sm text-muted-foreground">Языка</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {featuredTerm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Термин дня</h3>
                  </div>
                  <Link href={`/term/${featuredTerm.id}`}>
                    <div className="hover-elevate active-elevate-2 p-4 rounded-lg transition-all cursor-pointer">
                      <h4 className="text-2xl font-bold mb-2">{featuredTerm.term}</h4>
                      <p className="text-muted-foreground line-clamp-2 mb-2">{featuredTerm.definition}</p>
                      {featuredTerm.englishEquivalent && (
                        <p className="text-sm text-primary italic">EN: {featuredTerm.englishEquivalent}</p>
                      )}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {sections.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Разделы</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section) => (
                  <Link key={section.name} href={`/dictionary?section=${encodeURIComponent(section.name)}`}>
                    <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-section-${section.name}`}>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.count} {section.count === 1 ? "термин" : section.count < 5 ? "термина" : "терминов"}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
