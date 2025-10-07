import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AlphabetNavProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

const RUSSIAN_ALPHABET = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

export default function AlphabetNav({
  selectedLetter,
  onLetterSelect,
}: AlphabetNavProps) {
  return (
    <div className="w-full border-b bg-card">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-1 p-2">
          <Button
            size="sm"
            variant={selectedLetter === null ? "default" : "ghost"}
            onClick={() => onLetterSelect(null)}
            className="h-8 min-w-[48px]"
            data-testid="button-all"
          >
            Все
          </Button>
          {RUSSIAN_ALPHABET.map((letter) => (
            <Button
              key={letter}
              size="sm"
              variant={selectedLetter === letter ? "default" : "ghost"}
              onClick={() => onLetterSelect(letter)}
              className="h-8 min-w-[32px] px-2"
              data-testid={`button-letter-${letter}`}
            >
              {letter}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
