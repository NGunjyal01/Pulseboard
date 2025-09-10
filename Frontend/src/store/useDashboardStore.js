import { getDashboardDetails } from "@/services/dashboardAPI";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardStore = create(persist((set,get)=>({
    dashboardId:null,
    dashboardDetails:{},
    comments:[],
    annotations:[],
    loading:false,
    fetched:false,
    fetchDashboardDetails: async(dashboardId) =>{
        set({loading:true});
        try {
            const data = await getDashboardDetails(dashboardId);
            if(data.success){
                set({dashboardDetails:data.dashboardDetails,dashboardId:dashboardId,fetched:true});
            }
        } catch (err) {
            
        } finally {
            set({loading:false});
        }
    },
    resetDashboardDetails: () => set({dashboardId:null,dashboardDetails:{},comments:[],annotations:[],fetched:false}),
    addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
    addAnnotation: (annotation) => set((state) => ({ annotations: [...state.annotations, annotation] })),
}),{
    name:'dashboard-details'
}));

export default useDashboardStore;