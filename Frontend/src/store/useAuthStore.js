import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,

            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),

            clearAuth: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage", // 🔐 Key in localStorage
            partialize: (state) => ({ token: state.token, user: state.user }), // Optional: store only needed fields
        }
    )
);

export default useAuthStore;
