import { getAnnotations, getComments, getDashboardDetails } from "@/services/dashboardAPI";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardStore = create(persist((set,get)=>({
    dashboardId:null,
    dashboardDetails:{},
    dataSample:[],
    comments:[],
    annotations:[],
    loading:false,
    fetched:false,
    fetchDashboardDetails: async(dashboardId) =>{
        set({loading:true});
        try {
            const [dashboardRes, commentsRes, annotationsRes] = await Promise.all([
                getDashboardDetails(dashboardId),
                getComments(dashboardId),
                getAnnotations(dashboardId),
            ]);
            console.log(annotationsRes)
            if(dashboardRes.success && commentsRes.success && annotationsRes.success){
                const {dashboardDetails:dd} = dashboardRes;
                const {dataSource} = dd;
                let dataSample;
                if(dataSource.type==='csv') dataSample = dataSource.csvConfig.parsedData;
                else if(dataSource.type==='api') dataSample = dataSource.apiConfig.responseSnapshot;
                else dataSample = dataSource.simulatedConfig.sampleData;
                set({dashboardDetails:dd,
                    comments:commentsRes.comments,
                    annotations:annotationsRes.annotations,
                    dashboardId:dashboardId,fetched:true,dataSample
                });
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