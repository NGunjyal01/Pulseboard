import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardListStore = create(
  persist(
    (set) => ({
      dashboards: [],
      setDashboards: (data) => set({ dashboards: data }),
      resetDashboards: () => set({ dashboards: [] }),
    }),
    {
      name: 'dashboard-list', // key in localStorage
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          try {
            return value ? JSON.parse(value) : null;
          } catch (err) {
            console.error("Failed to parse localStorage item", name, err);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (err) {
            console.error("Failed to stringify localStorage item", name, err);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useDashboardListStore;
