import SearchBar from "../SearchBar";
import { useState } from "react";

export default function SearchBarExample() {
  const [value, setValue] = useState("");

  return (
    <div className="p-4 max-w-2xl">
      <SearchBar value={value} onChange={setValue} />
    </div>
  );
}
