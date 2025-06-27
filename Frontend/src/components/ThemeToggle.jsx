import { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const themes = [
  { name: "default", color: "bg-[oklch(0.606_0.25_292.717)]" },
  { name: "red", color: "bg-[oklch(0.622_0.257_27.325)]" },
  { name: "rose", color: "bg-[oklch(0.688_0.251_20.637)]" },
  { name: "orange", color: "bg-[oklch(0.698_0.217_55.68)]" },
  { name: "amber", color: "bg-[oklch(0.79_0.175_80.92)]" },
  { name: "yellow", color: "bg-[oklch(0.874_0.129_100)]" },
  { name: "green", color: "bg-[oklch(0.621_0.184_152.94)]" },
  { name: "emerald", color: "bg-[oklch(0.605_0.167_157.53)]" },
  { name: "teal", color: "bg-[oklch(0.598_0.174_189.43)]" },
  { name: "cyan", color: "bg-[oklch(0.598_0.176_206.61)]" },
  { name: "sky", color: "bg-[oklch(0.625_0.168_235.58)]" },
  { name: "blue", color: "bg-[oklch(0.597_0.184_263.18)]" },
  { name: "indigo", color: "bg-[oklch(0.569_0.201_278.48)]" },
  { name: "purple", color: "bg-[oklch(0.585_0.199_300.51)]" },
  { name: "fuchsia", color: "bg-[oklch(0.626_0.203_316.84)]" },
  { name: "pink", color: "bg-[oklch(0.649_0.222_342.43)]" },
];

const  ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");
    const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

    useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(
        ...themes.map(t => `theme-${t.name}`),
        ...themes.map(t => `theme-${t.name}-dark`),
        "dark"
    );

    root.classList.add(`theme-${theme}`);
    if (mode === "dark") {
        root.classList.add("dark", `theme-${theme}-dark`);
    }

    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
    }, [theme, mode]);

    const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
    };

    const handleThemeChange = (name) => {
    setTheme(name);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Toggle Dark/Light */}
            <Button variant="ghost" size="icon" onClick={toggleMode} className={"p-2 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-all duration-300"}>
            {mode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            {/* Theme Palette Dropdown with Tooltip */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={"p-2 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-all duration-300"}>
                    <Palette className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 grid grid-cols-4 gap-2" align="end">
                    {themes.map((t) => (
                    <button
                        key={t.name}
                        onClick={() => handleThemeChange(t.name)}
                        className={`${t.color} w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-all`}
                        title={t.name}
                    />
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default ThemeToggle;