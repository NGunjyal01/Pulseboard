import axios from "@/utils/axiosConfig";
import { friendsEndpoints } from "./apis"
import { toast } from "sonner";


const { GET_ALL_FRIENDS_API,SEND_REQUEST_API,ACCEPT_REQUEST_API,REJECT_REQUEST_API,REMOVE_FRIEND_API } = friendsEndpoints;
const config ={
  withCredentials: true
};

export const getAllFriends = async()=>{
    try {
        const response = await axios.get(GET_ALL_FRIENDS_API,config);
        console.log("GET ALL FRIENDS API RESPONSE..........................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Fetch All Friends!");
            return response.data.friends;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else {
            console.log("Error During Fetching Friends: ", error);
            toast.error("Something went wrong while fetching friends list.");
        }  
    }
}

export const sendFriendRequest = async(emailId)=>{
    try{
        const response = await axios.post(`${SEND_REQUEST_API}/${emailId}`,{},config);
        console.log("SEND FRIEND REQUEST API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Friend request sent!");
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        } else if (error.response && error.response.data && error.response.data.message) {
            // Handle API errors (like 404, 409, etc.)
            toast.error(error.response.data.message);
        } else {
            console.log("Error During Send Friend Request: ", error);
            toast.error("Something went wrong while sending the friend request.");
        }
    }
}