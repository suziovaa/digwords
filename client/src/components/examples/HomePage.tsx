import HomePage from "../../pages/HomePage";
import { ThemeProvider } from "../ThemeProvider";

export default function HomePageExample() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
