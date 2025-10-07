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
        <section className="relative bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-10 left-10 text-8xl opacity-5 font-bold">АБВ</div>
          <div className="absolute bottom-10 right-10 text-8xl opacity-5 font-bold">XYZ</div>
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
                <div className="mt-6 flex justify-center gap-3">
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

        <section className="bg-gradient-to-r from-secondary/10 via-accent/10 to-primary/10 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
            <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Загрузите свой словарь</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Импортируйте термины из Excel-файла для быстрого наполнения словаря
            </p>
            <Link href="/dictionary">
              <Button size="lg" className="rounded-full px-8" data-testid="button-upload">
                Перейти к загрузке
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
