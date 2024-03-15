import { ThemeProvider } from "./contexts/theme-context.tsx";
import { Pokedex } from "./components/pokedex.tsx";

export function App() {
  return (
    <main>
      <ThemeProvider>
        <Pokedex />
      </ThemeProvider>
    </main>
  );
}