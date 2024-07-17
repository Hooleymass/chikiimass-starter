/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //"./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    //"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    //"./node_modules/flowbite/lib/**/*.js",
  ],
  theme: {
    screens: {
      'xs': '320px',    // Extra small screens (mobile phones)
      'sx': '375px',
      'sm': '640px',    // Small screens (tablets)
      'md': '768px',    // Medium screens (small laptops)
      'lg': '1024px',   // Large screens (desktops)
      'xl': '1280px',   // Extra large screens (large desktops)
      '2xl': '1536px',  // 2x large screens (very large desktops)
    },
    extend: {
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        "custom-theme": {
          primary: "#ff00ff",

          secondary: "#ff00ff",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#ff00ff",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#00ff00",

          error: "#ff0000",
        },
      },
    ],
  },
};