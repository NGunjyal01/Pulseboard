import { sampleDatasets } from '@/components/dashboard/CreateDashboard/constants';
import { createDashboard, deleteDashboard, publishDashboard, updateStep1BasicInfo, updateStep2DataSource } from '@/services/dashboardAPI';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardStore = create(
    persist(
        (set,get) => ({
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
            loading: false,
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
            handleBack: () => { 
                const {step,setStep} = get();
                step > 1 && setStep(step - 1)
            },
            handleCreateDashboardClick: async() => {
                const {setDashboardId} = get();
                set({loading:true});
                try{
                    const result = await createDashboard();
                    setDashboardId(result.dashboardId);
                }catch(error){
                    toast.error("Error While Creating Dashboard");
                } finally {
                    set({loading:false});
                }
            },
            deleteDashboard: async()=>{
                set({loading:true});
                const {dashboardId} = get();
                try {
                    await deleteDashboard(dashboardId)
                    return true;
                } catch (error) {
                    return false;
                } finally {
                    set({loading:false});
                }
            },
            // === Collaborator actions ===
            addCollaborator: (item, type) => {
                const { dashboardData } = get();
                if (type === "friend") {
                    if (dashboardData.collaborators.find(c => c.userId === item._id)) return;
                    // skip if already included via team
                    const isInTeam = dashboardData.collaborators.some(c => c.addedVia === "team" && c.memberIds?.includes(item._id));
                    if (isInTeam) {
                        toast.warning(`${item.firstName} ${item.lastName} is already part of an added team`);
                        return;
                    }
                    set({
                        dashboardData: {
                            ...dashboardData,
                            collaborators: [...dashboardData.collaborators,{
                                userId: item._id,
                                name: `${item.firstName}${item.lastName}`,
                                email: item.email,
                                imageUrl: item.imageUrl,
                                role: "viewer",
                                addedVia: "friend"
                            }]}
                    });
                }
                if (type === "team") {
                    if (dashboardData.collaborators.find(c => c.teamId === item._id)) return;
                    const memberIds = item.members.map(m => m.user);
                    const conflictUsers = dashboardData.collaborators.filter(c => c.userId && memberIds.includes(c.userId));
                    if (conflictUsers.length > 0) {
                        toast.warning(
                            `Some members of "${item.name}" are already added as friends. Remove them first.`
                        );
                        return;
                    }
                    set({
                        dashboardData: {
                            ...dashboardData,
                            collaborators: [ ...dashboardData.collaborators,{
                                teamId: item._id,
                                name: item.name,
                                imageUrl: item.imageUrl,
                                memberCount: item.members.length,
                                memberIds,
                                role: "viewer",
                                addedVia: "team"
                            }]
                        }
                    });
                }
            },
            removeCollaborator: (collaborator) => {
                const { dashboardData } = get();
                set({
                    dashboardData: {...dashboardData, collaborators: dashboardData.collaborators.filter(c =>
                        (c.addedVia === "friend" && c.userId !== collaborator.userId) ||
                        (c.addedVia === "team" && c.teamId !== collaborator.teamId))
                    }
                });
            },
            updateCollaboratorRole: (collaborator, role) => {
                const { dashboardData } = get();
                set({ dashboardData: { ...dashboardData, collaborators: dashboardData.collaborators.map(c => {
                        if (c.addedVia === "friend" && c.userId === collaborator.userId) {
                            return { ...c, role };
                        }
                        if (c.addedVia === "team" && c.teamId === collaborator.teamId) {
                            return { ...c, role };
                        }
                        return c;
                    })}
                });
            },
            completeStep1: async()=>{
                const { dashboardId,dashboardData, step, setStep } = get();
                set({loading:true});
                try{
                    const updatedFields = {};
                    const {title,description,collaborators} = dashboardData;
                    if (title) updatedFields.title = title;
                    if (description) updatedFields.description = description;
                    if (collaborators) updatedFields.collaborators = collaborators;
                    console.log(dashboardId,updatedFields)
                    await updateStep1BasicInfo(dashboardId,updatedFields);
                    if(step<3){
                        setStep(step+1);
                    }
                }catch(error){
                    // toast.error("Error while step1");
                }finally{
                    set({loading:false});
                }
            },
            handleDataSourceChange: (source) => {
                const {dashboardData,setDashboardData} = get();
                if(dashboardData.dataSource!==source){
                  setDashboardData({
                    dataSource: source,
                    parsedData: null,
                    dataFields: [],
                    csvFileName: "",
                    apiUrl: "",
                    apiMethod: '',
                    apiParams: {},
                    apiBody: {},
                    apiDataPath: '',
                    selectedDataset: "",
                    parsedData: null,
                    dataFields: [],
                  });
                }
            },
            handleFileUpload: async(event) => {
                const file = event.target.files?.[0];
                const {dashboardId,setDashboardData} = get();
                if (file && file.type === "text/csv") {
                  set({loading:true});
                  try {
                    const updatedFields = {dataSource:'csv',csvFile:file};
                    const result = await updateStep2DataSource(dashboardId,updatedFields);
                    setDashboardData({csvFileName: file.name, dataFields: result.headers, parsedData: result.sampleData});
                  } catch (error) {
                    toast.error("Error While Uploading CSV File");
                  }finally{
                    set({loading:false});
                  }
                }
                else{
                  toast.error("Invalid File Type")
                }
            },
            handleApiPreview: async() => {
                const {dashboardData,dashboardId,setDashboardData} = get();
                if (dashboardData.apiUrl) {
                    set({loading:true});
                    try {
                        const {apiMethod,apiUrl,apiParams,apiBody,apiDataPath} = dashboardData;
                        let updatedFields = {dataSource:'api',method:apiMethod,endpoint:apiUrl};
                        if(apiParams) updatedFields.params = apiParams;  
                        if(apiBody) updatedFields.body = apiBody;
                        if(apiDataPath) updatedFields.dataPath = apiDataPath;
                        const result = await updateStep2DataSource(dashboardId,updatedFields);
                        setDashboardData({dataFields: result.headers, parsedData: result.sampleData});
                    } catch (error) {
                        toast.error("Error While Fetching Preview");
                    }finally{
                        set({loading:false});
                    }
                }
            },
            handleSimulatedData: async(datasetKey) => {
                const dataset = sampleDatasets[datasetKey];
                const {dashboardData,dashboardId,setDashboardData} = get();
                if (dataset && dashboardData.selectedDataset !== datasetKey) {
                  set({loading:true});
                  try {
                    const {name,fields,preview} = dataset;
                    setDashboardData({
                      selectedDataset: datasetKey,
                      dataFields: fields,
                      parsedData: preview,
                    });
                    const updatedFields = {dataSource:'simulated',type:name,sampleData:preview}
                    await updateStep2DataSource(dashboardId,updatedFields);
                  } catch (error) {
                    
                  }finally{
                    set({loading:false});
                  }
                }
            },
            handleCreate: async(navigate)=> {
                const { dashboardId,dashboardData,resetDashboardData} = get();
                set({loading:true});
                try {
                    const result = await publishDashboard(dashboardId, {charts:dashboardData.charts}, navigate);
                    if(result.success)resetDashboardData();
                } catch (error) {
                    
                } finally {
                    set({loading:false})
                }
            }
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
