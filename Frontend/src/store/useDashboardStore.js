    // src/store/dashboardStore.js
    import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    const useDashboardStore = create(
    persist(
        (set) => ({
            step: 1,
            dashboardId: null,
            dashboardData: {
                title: '',
                description: '',
                collaborators: [],
                dataSource: '',
                csvFileName: '',
                apiUrl: '',
                apiMethod: '',
                apiParams: {},
                apiBody: {},
                apiDataPath: '',
                selectedDataset: '',
                parsedData: null,
                dataFields: [],
                charts: [],
            },
            setStep: (newStep) => set(() => ({ step: newStep })),
            setDashboardId: (id)=> set(()=>({dashboardId: id})),
            setDashboardData: (data) =>
                set((state) => ({
                    dashboardData: { ...state.dashboardData, ...data },
                })),
            resetDashboardData: () =>
                set({
                    step: 1,
                    dashboardId: null,
                    dashboardData: {
                    title: '',
                    description: '',
                    collaborators: [],
                    dataSource: '',
                    csvFileName: '',
                    apiUrl: '',
                    apiMethod: '',
                    apiParams: {},
                    apiBody: {},
                    apiDataPath: '',
                    selectedDataset: '',
                    parsedData: null,
                    dataFields: [],
                    charts: [],
                    },
                }),
        }),
        {
            name: 'dashboard-creation',
            storage: {
                getItem: (name) => {
                    const value = sessionStorage.getItem(name);
                    try {
                        return value ? JSON.parse(value) : null;
                    } catch (err) {
                        console.error("Failed to parse sessionStorage item", name, err);
                        return null;
                    }
                    },
                setItem: (name, value) => {
                    try {
                        sessionStorage.setItem(name, JSON.stringify(value));
                    } catch (err) {
                        console.error("Failed to stringify sessionStorage item", name, err);
                    }
                    },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            },
        }
    )
    );

    export default useDashboardStore;
