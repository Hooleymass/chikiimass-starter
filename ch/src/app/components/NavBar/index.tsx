"use client";
import { ThemeContext } from "@/app/(app)/context/ThemeContext";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const themes = [
  { name: "light", className: "bg-base-100" },
  { name: "dark", className: "bg-base-100" },
  { name: "valentine", className: "bg-base-100" },
  { name: "retro", className: "bg-base-100" },
  { name: "aqua", className: "bg-base-100" },
  { name: "custom-theme", className: "bg-base-100" },
];

const NavBar = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { changeTheme } = themeContext;

  return (
    <div className="mx-auto max-w-full overflow-x-auto overflow-y-hidden">
      <ul className="flex justify-between items-center">
        <div className="flex flex-row">
          <Menu />
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-5">
          {themes.map((theme) => (
            <div
              key={theme.name}
              data-theme={theme.name}
              className={`theme-card ${theme.className} shadow-md`}
              onClick={() => changeTheme(theme.name)}
            >
              <p className="text-center capitalize">{theme.name.replace("-", " ")}</p>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;