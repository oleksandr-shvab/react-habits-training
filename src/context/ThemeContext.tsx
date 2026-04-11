import React from "react";

type ThemeContextType = { darkMode: boolean; toggleDarkMode: () => void };

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
