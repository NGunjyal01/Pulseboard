import axios from "axios"
import { toast } from "sonner";
import { authEndpoints } from "./apis";
import useAuthStore from "@/store/useAuthStore";

const {SIGNUP_API, LOGIN_API, LOGOUT_API} = authEndpoints;

export const signup = async(formData,navigate)=>{
    try{
        console.log(formData)
        const response = await axios.post(SIGNUP_API,formData);
        console.log("SIGNUP API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Signup Successful");
            navigate("/login");
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During SignUp: ",error);
            toast.error(error.response.data.message);
            navigate("/signup");
        }
    }
}

export const login = async(formData,navigate)=>{
    try{
        const response = await axios.post(LOGIN_API,formData,{withCredentials:true});
        console.log('login api ',LOGIN_API)
        console.log("LOGIN API RESPONSE..............",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Login Successful");
            const { user } = response.data;
            // useAuthStore.getState().setToken(token);
            useAuthStore.getState().setUser(user);
            navigate('/dashboards');
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Login.................",error);
            toast.error(error.response.data.error);
            navigate('/login');
        }
    }
}

export const logout = async()=>{
    try{
        const response = await axios.post(LOGOUT_API,{},{withCredentials:true});
        console.log("LOGOUT API RESPONSE..............",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Logout Successful");
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Login.................",error);
            toast.error("Logout Failed");
        }
    }
}