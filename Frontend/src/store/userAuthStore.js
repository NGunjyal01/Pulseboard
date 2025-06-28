import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            // Called after login (store user object)
            setUser: (user) => set({ user }),

            // Clear user (on logout)
            logout: () => set({ user: null }),
        }),
        {
            name: 'pulseboard-auth', // key in localStorage
            partialize: (state) => ({ user: state.user }), // persist only user
        }
    )
);

export default useAuthStore;
