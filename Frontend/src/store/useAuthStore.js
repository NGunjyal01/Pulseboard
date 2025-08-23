import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            // token: null,
            user: null,
            // setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),

            clearAuth: () => set({ user: null }),
        }),
        {
            name: "user", // 🔐 Key in localStorage
            partialize: (state) => ({ user: state.user })
        }
    )
);

export default useAuthStore;
