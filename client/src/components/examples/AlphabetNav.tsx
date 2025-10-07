import AlphabetNav from "../AlphabetNav";
import { useState } from "react";

export default function AlphabetNavExample() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return <AlphabetNav selectedLetter={selectedLetter} onLetterSelect={setSelectedLetter} />;
}
