"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;

  return <div data-theme={theme}>{children}</div>;
}