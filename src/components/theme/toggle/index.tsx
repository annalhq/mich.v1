"use client";

import { LucideSun, MoonIcon } from "lucide-react";

import useSystemTheme from "@/hooks/use-system-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useSystemTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LucideSun className="hidden h-[1.2rem] w-[1.2rem] dark:block" />
      <MoonIcon className="block h-[1.2rem] w-[1.2rem] dark:hidden" />
    </button>
  );
}
