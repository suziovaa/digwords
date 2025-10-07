import { useState } from "react";
import { Link } from "wouter";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const MOCK_SECTIONS = [
  { name: "Методы исследования", count: 24 },
  { name: "Инструменты", count: 18 },
  { name: "Концепции", count: 32 },
  { name: "Технологии", count: 15 },
  { name: "Форматы данных", count: 12 },
  { name: "Визуализация", count: 9 },
];

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();

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
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                Словарь терминов цифровой гуманитаристики
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
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
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    onClick={handleSearch}
                    className="bg-background text-foreground hover:bg-background/90"
                    data-testid="button-search"
                  >
                    Искать
                  </Button>
                  <Link href="/dictionary">
                    <Button
                      variant="outline"
                      className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
                      data-testid="button-browse"
                    >
                      Просмотреть все
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">110</div>
                <div className="text-sm text-muted-foreground">Всего терминов</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-muted-foreground">Разделов</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">2</div>
                <div className="text-sm text-muted-foreground">Языка</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Разделы</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_SECTIONS.map((section) => (
                <Link key={section.name} href={`/dictionary?section=${encodeURIComponent(section.name)}`}>
                  <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-section-${section.name}`}>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {section.count} {section.count === 1 ? "термин" : section.count < 5 ? "термина" : "терминов"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4">
            <Upload className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-2xl font-semibold">Загрузите свой словарь</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Импортируйте термины из Excel-файла для быстрого наполнения словаря
            </p>
            <Link href="/dictionary">
              <Button data-testid="button-upload">
                Перейти к загрузке
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
