// stores/useThemeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const themes = [ "default", "red", "rose", "orange", "yellow", "green","blue", "pink" ];

export const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'default',
            mode: 'light',

            setTheme: (theme) => {
            set({ theme });
            get().applyTheme();
            },
            toggleMode: () => {
            const newMode = get().mode === 'dark' ? 'light' : 'dark';
            set({ mode: newMode });
            get().applyTheme();
            },

            applyTheme: () => {
            const { theme, mode } = get();
            const root = document.documentElement;

            root.classList.remove(
                ...themes.flatMap((t) => [`theme-${t}`, `theme-${t}-dark`]),
                "dark"
            );

            root.classList.add(`theme-${theme}`);
            if (mode === "dark") {
                root.classList.add("dark", `theme-${theme}-dark`);
            }
            }
        }),
        {
            name: 'pulseboard-theme',
        }
    )
);
