import { getAllTeams, creatNewTeam, sendTeamInvitation, getAllInvitations, acceptInvitation, rejectInvitation, cancelInvitation, getTeamDetails, addNewMembers, removeMember } from "@/services/teamsAPI";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

export const useTeamsStore = create((set,get)=>({
    teams: [],
    invitations: [],
    teamDetails: null,
    loading: false,
    error: null,
    fetched: { teams:false, invitations:false },

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
            const data = await getAllInvitations();
            set(state=>({invitations:data, fetched: {...state.fetched,invitations:true}}));
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

    addMembers: async(teamId,members)=>{
        set({loading:true});
        try {
            const data = await addNewMembers(teamId,members);
            set({teamDetails:data})
        } catch (err) {
            set({error:err.message})
        } finally {
            set({loading: false});
        }
    },

    removeMember: async(teamId,memberId)=>{
        set({loading:true});
        try {
            await removeMember(teamId,memberId);
            set(state=>({teamDetails: {...state.teamDetails, 
                members:state.teamDetails.members.filter(m=>m.user._id!==memberId)}}))
            console.log(get().teamDetails);
        } catch (err) {
            set({error:err.message})
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
    },

    acceptInvite: async(inviteId)=>{
        set({loading:true});
        try {
            const data = await acceptInvitation(inviteId);
            set(state=>({invitations: state.invitations.filter(i=>i._id!==inviteId),
                teams: [...state.teams,data]
            }));
        } catch (err) {
            set({error:err.message});
        } finally {
            set({loading:false});
        }
    },

    rejectInvite: async(inviteId)=>{
        set({loading:true});
        try {
            await rejectInvitation(inviteId);
            set(state=>({invitations: state.invitations.filter(i=>i._id!==inviteId)}));
        } catch (err) {
            set({error:err.message});
        } finally {
            set({loading:false});
        }
    },

    cancelInvite: async(inviteId)=>{
        set({loading:true});
        try {
            await cancelInvitation(inviteId);
        } catch (err) {
            set({error:err.message});
        } finally {
            set({loading:false});
        }
    },

    fetchTeamDetails: async(teamId)=>{
        set({loading: true});
        const user = useAuthStore.getState().user;
        const userId = user._id;
        try {
            const data = await getTeamDetails(teamId);
            const member = data.members.find(m=>m.user._id===userId);
            const role = member.role;
            set({teamDetails:{...data,role:role}});
        } catch (err) {
            set({error: err.message});
        } finally {
            set({loading: false});
        }
    }

}))