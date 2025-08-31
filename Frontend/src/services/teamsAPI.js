import axios from "axios";
import { teamsEndpoints } from "./apis";
import { toast } from "sonner";


const { GET_ALL_TEAMS_API, GET_TEAM_DETAILS_API, CREATE_TEAM_API, ADD_MEMBERS_API, REMOVE_MEMBER_API, SEND_INVITATION_API } = teamsEndpoints;
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

export const addMembers = async()=>{
    try {
        const response = await axios.get(ADD_MEMBERS_API,config);
        console.log("ADD MEMBERS API RESPONSE..........................",response);
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
            console.log("Error During Fetching Friends: ", error);
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
            console.log("Error During Sending Invite: ", error);
        }  
    }
}