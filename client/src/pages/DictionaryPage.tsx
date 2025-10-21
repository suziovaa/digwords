import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import AlphabetNav from "@/components/AlphabetNav";
import FilterSidebar from "@/components/FilterSidebar";
import TermCard from "@/components/TermCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { type Term } from "@shared/schema";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DictionaryPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [location] = useLocation();

  // Parse URL parameters to set initial section filter and search query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    const searchParam = params.get('q');
    
    if (sectionParam) {
      setSelectedSections([sectionParam]);
    }
    if (searchParam) {
      setSearchValue(searchParam);
    }
  }, [location]);
  const { theme, toggleTheme } = useTheme();

  // Fetch all terms
  const { data: terms = [], isLoading } = useQuery<Term[]>({
    queryKey: ["/api/terms"],
  });

  // Get unique sections from terms
  const sections = Array.from(new Set(terms.map((term) => term.section))).sort();

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleClearFilters = () => {
    setSelectedSections([]);
  };

  const filteredTerms = terms
    .filter((term) => {
      const matchesSearch =
        !searchValue ||
        term.term.toLowerCase().includes(searchValue.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchValue.toLowerCase()) ||
        term.englishEquivalent?.toLowerCase().includes(searchValue.toLowerCase()) ||
        term.usageExample?.toLowerCase().includes(searchValue.toLowerCase());

      const matchesLetter =
        !selectedLetter || term.term.startsWith(selectedLetter);

      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.includes(term.section);

      return matchesSearch && matchesLetter && matchesSection;
    })
    .sort((a, b) => a.term.localeCompare(b.term, 'ru'));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Sidebar */}
        <div className="w-72 border-r bg-card flex flex-col">
          <div className="p-6 border-b">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 p-2 rounded-md transition-all" data-testid="link-home">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">DH Dictionary</span>
              </div>
            </Link>
          </div>
          <FilterSidebar
            sections={sections}
            selectedSections={selectedSections}
            onSectionToggle={handleSectionToggle}
            onClearAll={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-card p-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
              <div className="flex-1 max-w-2xl">
                <SearchBar
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Поиск по термину, определению или английскому эквиваленту..."
                  data-testid="input-search"
                />
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

          {/* Alphabet Navigation */}
          <div className="border-b bg-card/50 py-3 px-4">
            <div className="max-w-5xl mx-auto">
              <AlphabetNav
                selectedLetter={selectedLetter}
                onLetterSelect={setSelectedLetter}
              />
            </div>
          </div>

          {/* Terms Grid */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Загрузка терминов...
                </div>
              ) : filteredTerms.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-2">
                    {terms.length === 0 
                      ? "Словарь пуст"
                      : "Термины не найдены"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {terms.length === 0
                      ? "Загрузите Excel-файл через API для наполнения словаря"
                      : "Попробуйте изменить критерии поиска или фильтры"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredTerms.map((term, index) => (
                    <motion.div
                      key={term.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                    >
                      <TermCard term={term} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="sticky top-0 z-50 bg-card border-b">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center gap-2" data-testid="link-home-mobile">
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
                placeholder="Поиск терминов..."
                data-testid="input-search-mobile"
              />
            </div>
          </div>

          <div className="border-t bg-card/50 py-2 px-4">
            <AlphabetNav
              selectedLetter={selectedLetter}
              onLetterSelect={setSelectedLetter}
            />
          </div>

          <div className="border-t p-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full" data-testid="button-filters">
                  <Menu className="h-4 w-4 mr-2" />
                  Фильтры по разделам
                  {selectedSections.length > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {selectedSections.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <FilterSidebar
                  sections={sections}
                  selectedSections={selectedSections}
                  onSectionToggle={handleSectionToggle}
                  onClearAll={handleClearFilters}
                />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="p-4">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Загрузка терминов...
            </div>
          ) : filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-2">
                {terms.length === 0 
                  ? "Словарь пуст"
                  : "Термины не найдены"}
              </p>
              <p className="text-sm text-muted-foreground">
                {terms.length === 0
                  ? "Загрузите Excel-файл через API для наполнения словаря"
                  : "Попробуйте изменить критерии поиска или фильтры"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTerms.map((term, index) => (
                <motion.div
                  key={term.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                >
                  <TermCard term={term} />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
