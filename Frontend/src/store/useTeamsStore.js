import { getAllTeams, creatNewTeam, sendTeamInvitation } from "@/services/teamsAPI";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";


export const useTeamsStore = create((set,get)=>({
    teams: [],
    invitations: [],
    loading: false,
    error: null,
    fetched: { teams:false, invitations:false},

    fetchTeams: async()=>{
        if(get().fetched.teams) return;
        set({loading: true});
        try {
            const data = await getAllTeams();
            set(state=>({teams:data, fetched: {...state.fetched,teams:true}}));
        } catch (err) {
            set({error: err.message});
        } finally {
            set({loading:false});
        }
    },

    fetchInvitations: async()=>{
        if(get().fetched.invitations)   return;
        set({loading: true});
        try {
            // const data = await getAllTeams();
            // set(state=>({teams:data, fetched: {...state.fetched,invitations:true}}));
        } catch (err) {
            set({error: err.message});
        } finally {
            set({loading:false});
        }
    },
     
    createTeam: async(teamData,navigate)=>{
        const user = useAuthStore.getState().user;
        const {name,description,imageUrl,members} = teamData;
        const formData = {name};
        if(description){
            formData.description = description;
        }
        if(imageUrl){
            formData.imageUrl = imageUrl;
        }
        const transformedMembers = members.map(m => ({
            user: m._id,
            role: m.role || "member",        
        }));
        transformedMembers.push({user:user._id,role:'owner'});
        formData.members = transformedMembers;
        console.log(formData);
        set({loading: true});
        try {
            console.log('called')
            await creatNewTeam(formData,navigate);
            
        } catch (err) {
            set({error: err.message});
        } finally {
            set({loading: false});
        }
    },
    
    sendInvite: async(teamId,email,role)=>{
        set({loading:true});
        try {
            await sendTeamInvitation(teamId,email,role);
        } catch (err) {
            set({error:err.message});
        } finally {
            set({loading: true});
        }
    }
}))