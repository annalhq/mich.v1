"use client";

import { useTheme } from "next-themes";

export default function useSystemTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  return {
    theme: resolvedTheme as "dark" | "light" | undefined,
    setTheme,
  };
}
