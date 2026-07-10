/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // The app's whole palette, on purpose — keeps every screen consistent.
        primary: {
          50: "#eef4ff",
          100: "#d9e6ff",
          500: "#3b5bdb",
          600: "#2f49b0",
          700: "#253a8a"
        },
        status: {
          applied: "#3b5bdb",
          interviewing: "#b8860b",
          offer: "#1a7f4b",
          rejected: "#b3261e"
        }
      }
    }
  },
  plugins: []
}
