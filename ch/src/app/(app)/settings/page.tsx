"use client";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const themes = [
  { name: "light", className: "bg-base" },
  { name: "dark", className: "bg-base" },
  { name: "valentine", className: "bg-base" },
  { name: "retro", className: "bg-base" },
  { name: "aqua", className: "bg-base" },
  { name: "forest", className: "bg-base" },
  { name: "night", className: "bg-base" },
  { name: "dracula", className: "bg-base" },
  { name: "lemonade", className: "bg-base" },
  { name: "garden", className: "bg-base" },
  { name: "black", className: "bg-base" },
  { name: "luxury", className: "bg-base" },
  { name: "sunset", className: "bg-base" },
  { name: "dim", className: "bg-base" },
  { name: "acid", className: "bg-base" },
];

const Settings = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, changeTheme } = themeContext;

  return (
    <div>
    <div className="mx-auto mt-4 ml-4 max-w-full">
      <ul className="flex justify-between items-center">
        <div className="flex gap-5">
          {themes.map((themeItem) => (
            <div
              key={themeItem.name}
              className={`theme-card w-16 h-16 rounded-md cursor-pointer shadow-md border-2 border-transparent hover:border-white ${themeItem.className} ${theme === themeItem.name ? 'border-white' : ''}`}
              onClick={() => changeTheme(themeItem.name)}
              data-theme={themeItem.name}
            >
              <p className="text-center capitalize ">{themeItem.name.replace("-", " ")}</p>
            </div>
          ))}
        </div>
      </ul>
    </div>
    </div>
  );
};

export default Settings;