import axios from "@/utils/axiosConfig";;
import { toast } from "sonner";
import { settingsEndpoints } from "./apis";

const { UPDATE_PROFILE_API, UPDATE_EMAIL_API, UPDATE_PASSWORD_API } = settingsEndpoints;
const config ={
  withCredentials: true
};

export const updateProfile = async(updatedData)=>{
    try{
        console.log(updatedData)
        const response = await axios.put(UPDATE_PROFILE_API,updatedData,config);
        console.log("UPDATE PROFILE API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Updating Profile: ",error);
            toast.error(error.response.data.message);
        }
    }
}

export const updatePassword = async(updatedData)=>{
    try{
        const response = await axios.put(UPDATE_PASSWORD_API,updatedData,config);
        console.log("UPDATE PASSWORD API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Changing Password: ",error);
        }
    }
}

export const updateEmail = async(newEmail)=>{
    try{
        const response = await axios.put(UPDATE_EMAIL_API,{newEmail},config);
        console.log("UPDATE EMAIL API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Changing Email: ",error);
        }
    }
}