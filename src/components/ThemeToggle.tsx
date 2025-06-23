import { useTheme } from "@/components/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-muted transition"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
    </button>
  );
};

export default ThemeToggle;
