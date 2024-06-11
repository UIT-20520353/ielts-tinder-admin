/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-white": {
          1: "#F5F7FA",
          2: "#DFEAF2",
          3: "#E6EFF5",
        },
        "c-blue": {
          1: "#343C6A",
          2: "#2D60FF",
          3: "#1814F3",
          4: "#718EBF",
        },
        "c-gray": {
          1: "#B1B1B1",
        },
        "c-black": {
          1: "#232323",
        },
        "c-red": {
          1: "#cf1322",
        },
      },
    },
  },
  plugins: [],
};
