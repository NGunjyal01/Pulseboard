import { useEffect } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { themes } from "@/utils/constants";

const ThemeToggle = () => {
    const { theme, mode, toggleMode, setTheme, applyTheme } = useThemeStore();

    useEffect(() => {
        applyTheme();
    }, []); // apply once on load

    return (
    <div className="flex items-center gap-2">
        {/* Toggle Dark/Light */}
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleMode}
            className="p-2 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-all duration-300 cursor-pointer"
        >
        {mode === "dark" ? (
            <Sun className="w-5 h-5" />
        ) : (
            <Moon className="w-5 h-5" />
        )}
        </Button>

        {/* Theme Palette Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-all duration-300 cursor-pointer"
                >
                <Palette className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2 grid grid-cols-4 gap-2" align="end">
                {themes.map((t) => (
                    <button
                        key={t.name}
                        onClick={() => setTheme(t.name)}
                        className={`${t.color} w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-all cursor-pointer`}
                        title={t.name}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    );
};

export default ThemeToggle;
