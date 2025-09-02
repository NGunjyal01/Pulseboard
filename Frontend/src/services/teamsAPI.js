import axios from "axios";
import { teamsEndpoints } from "./apis";
import { toast } from "sonner";


const { GET_ALL_TEAMS_API, GET_TEAM_DETAILS_API, CREATE_TEAM_API, ADD_MEMBERS_API, REMOVE_MEMBER_API, SEND_INVITATION_API,
    ACCEPT_INVITATION_API, REJECT_INVITATION_API, CANCEL_INVITATION_API, GET_ALL_INVITATIONS_API
 } = teamsEndpoints;
const config ={
  withCredentials: true
};

export const getAllTeams = async()=>{
    try {
        const response = await axios.get(GET_ALL_TEAMS_API,config);
        console.log("GET ALL TEAMS API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Fetch All Teams!");
            return response.data.teams;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Fetching Teams: ", error);
            toast.error("Something went wrong while fetching teams list.");
        }  
    }
}

export const getTeamDetails = async(teamId)=>{
    try {
        const response = await axios.get(`${GET_TEAM_DETAILS_API}${teamId}`,config);
        console.log("GET TEAM DETAILS API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Fetched Team Details!");
            return response.data.teamDetails;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Fetching Team Details: ", error);
            toast.error("Something went wrong while fetching team details.");
        }  
    }
}

export const creatNewTeam = async(teamData,navigate)=>{
    try {
        const response = await axios.post(CREATE_TEAM_API,teamData,config);
        console.log("CREATE TEAM API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Team Created!');
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Creating Team: ", error);
        }  
    } finally {
        navigate('/teams')
    }
}

export const addNewMembers = async(teamId,members)=>{
    try {
        const response = await axios.post(ADD_MEMBERS_API,{teamId,members},config);
        console.log("ADD MEMBERS API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            return response.data.team;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Adding Members: ", error);
        }  
    }
}

export const removeMember = async(teamId,memberId)=>{
    try {
        const response = await axios.post(REMOVE_MEMBER_API,{teamId,memberId},config);
        console.log("REMOVE MEMBER API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Removing Member: ", error);
        }  
    }
}

export const sendTeamInvitation = async(teamId,email,role)=>{
    try {
        const response = await axios.post(`${SEND_INVITATION_API}${teamId}`,{email,role},config);
        console.log("SEND INVITE API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Invitation Sent!');
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            toast.error(error.response.data.message);
            console.log("Error During Sending Invite: ", error);
        }  
    }
}

export const getAllInvitations = async()=>{
    try {
        const response = await axios.get(GET_ALL_INVITATIONS_API,config);
        console.log("GET ALL INVITATION API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Fetch Invitations!');
            return response.data.invitations;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Fetching Invitations: ", error);
        }  
    }
}

export const acceptInvitation = async(inviteId)=>{
    try {
        const response = await axios.delete(`${ACCEPT_INVITATION_API}${inviteId}`,{},config);
        console.log("ACCEPT INVITE API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Invitation Accepted!');
            return response.data.team;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Accepting Invitation: ", error);
        }  
    }
}

export const rejectInvitation = async(inviteId)=>{
    try {
        const response = await axios.delete(`${REJECT_INVITATION_API}${inviteId}`,{},config);
        console.log("REJECT INVITE API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Invitation Rejected!');
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Rejecting Invitation: ", error);
        }  
    }
}

export const cancelInvitation = async(inviteId)=>{
    try {
        const response = await axios.delete(`${CANCEL_INVITATION_API}${inviteId}`,{},config);
        console.log("CANCEL INVITE API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success('Invitation Cancelled!');
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Cancelling Invitation: ", error);
        }  
    }
}