import { useState } from "react";
import { Link } from "wouter";
import SearchBar from "@/components/SearchBar";
import AlphabetNav from "@/components/AlphabetNav";
import FilterSidebar from "@/components/FilterSidebar";
import TermCard from "@/components/TermCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MOCK_TERMS = [
  {
    id: "1",
    term: "Корпусная лингвистика",
    section: "Методы исследования",
    definition: "Область лингвистики, занимающаяся созданием и анализом корпусов текстов — больших структурированных собраний текстов в электронной форме.",
    englishEquivalent: "Corpus Linguistics",
    usageExample: "Корпусная лингвистика позволяет проводить статистический анализ употребления слов.",
    relatedTerms: ["Компьютерная лингвистика", "Текстовый корпус"],
    source: "Баранов А. Н. Введение в прикладную лингвистику. М.: УРСС, 2001.",
  },
  {
    id: "2",
    term: "Визуализация данных",
    section: "Инструменты",
    definition: "Представление данных в графической или визуальной форме для облегчения понимания и анализа информации.",
    englishEquivalent: "Data Visualization",
  },
  {
    id: "3",
    term: "Машинное обучение",
    section: "Технологии",
    definition: "Область искусственного интеллекта, изучающая методы построения алгоритмов, способных обучаться.",
    englishEquivalent: "Machine Learning",
  },
  {
    id: "4",
    term: "Текстовая аналитика",
    section: "Методы исследования",
    definition: "Процесс преобразования неструктурированного текста в структурированные данные для анализа.",
    englishEquivalent: "Text Analytics",
  },
  {
    id: "5",
    term: "Метаданные",
    section: "Концепции",
    definition: "Структурированные данные, описывающие характеристики других данных.",
    englishEquivalent: "Metadata",
  },
  {
    id: "6",
    term: "Аннотация текста",
    section: "Методы исследования",
    definition: "Процесс разметки текста для выделения и классификации элементов.",
    englishEquivalent: "Text Annotation",
  },
];

const SECTIONS = [
  "Методы исследования",
  "Инструменты",
  "Концепции",
  "Технологии",
  "Форматы данных",
  "Визуализация",
];

export default function DictionaryPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const filteredTerms = MOCK_TERMS.filter((term) => {
    const matchesSearch =
      !searchValue ||
      term.term.toLowerCase().includes(searchValue.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchValue.toLowerCase()) ||
      term.englishEquivalent?.toLowerCase().includes(searchValue.toLowerCase());

    const matchesLetter =
      !selectedLetter || term.term.startsWith(selectedLetter);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.includes(term.section);

    return matchesSearch && matchesLetter && matchesSection;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 px-2 py-1 rounded-md">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">DH Dictionary</span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
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
          </div>
          <div className="flex justify-center">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Поиск по терминам, определениям..."
            />
          </div>
        </div>
      </header>

      <AlphabetNav
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar
                sections={SECTIONS}
                selectedSections={selectedSections}
                onSectionToggle={handleSectionToggle}
                onClearAll={() => setSelectedSections([])}
              />
            </div>
          </aside>

          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" data-testid="button-filters">
                  <Menu className="h-4 w-4 mr-2" />
                  Фильтры
                  {selectedSections.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
                      {selectedSections.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar
                    sections={SECTIONS}
                    selectedSections={selectedSections}
                    onSectionToggle={handleSectionToggle}
                    onClearAll={() => setSelectedSections([])}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex-1 min-w-0">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                Найдено терминов: {filteredTerms.length}
              </p>
            </div>

            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Термины не найдены. Попробуйте изменить параметры поиска.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredTerms.map((term) => (
                  <TermCard
                    key={term.id}
                    id={term.id}
                    term={term.term}
                    section={term.section}
                    definition={term.definition}
                    englishEquivalent={term.englishEquivalent}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
