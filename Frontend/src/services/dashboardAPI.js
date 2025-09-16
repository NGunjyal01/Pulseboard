import axios from "@/utils/axiosConfig";;
import { toast } from "sonner";
import { dashboardEndpoints } from "./apis";

const {CREATE_DASHBOARD_API,STEP1_API,UPLOAD_CSV_API,CONNECTAPI_API,DELETE_DASHBOARD_API,GET_DASHBOARD_DETAILS_API,GET_COMMENTS_API,GET_ANNOTATIONS_API,
    SIMULATE_DATA_API,PUBLISH_DASHBOARD_API,GET_ALL_DASHBOARD_API } = dashboardEndpoints;
const config ={
  withCredentials: true
};

export const createDashboard = async()=>{
    try{
        const response = await axios.post(CREATE_DASHBOARD_API,{},config);
        console.log("CREATE DASHBOARD API RESPONSE............", response);
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
            console.log("Error During Create Dashboard: ",error);
            // toast.error("Signup Failed");
            // navigate("/dashboards");
        }
    }
}

export const updateStep1BasicInfo = async(dashboardId,updatedFields)=>{
    try{
        const response = await axios.put(`${STEP1_API}${dashboardId}`,updatedFields,config);
        console.log("STEP1 DASHBOARD API RESPONSE............", response);
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
            console.log("Error During Step 1: ",error);
            // toast.error("Signup Failed");
            // navigate("/dashboards");
        }
    }
}

export const updateStep2DataSource = async(dashboardId,updatedFields)=>{
    try{
        let response;
        const {dataSource} = updatedFields;
        if(dataSource==='csv'){
            const formData = new FormData();
            formData.append('file',updatedFields.csvFile);
            response = await axios.post(`${UPLOAD_CSV_API}${dashboardId}`,formData,config);
        }
        else if(dataSource==='api'){
            response = await axios.post(`${CONNECTAPI_API}${dashboardId}`,updatedFields,config);
        }
        else if(dataSource==='simulated'){
            response = await axios.post(`${SIMULATE_DATA_API}${dashboardId}`,updatedFields,config);
        }
        console.log("STEP2 DASHBOARD API RESPONSE............", response);
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
            console.log("Error During Step 2: ",error);
            // toast.error("Signup Failed");
            // navigate("/dashboards");
        }
    }
}

export const publishDashboard = async(dashboardId,updatedFields,navigate)=>{
    try{
        const response = await axios.post(`${PUBLISH_DASHBOARD_API}${dashboardId}`,updatedFields,config);
        console.log("PUBLISH DASHBOARD API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Dashboard Created Successfully");
            navigate("/dashboards");
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Publishing Dashboard: ",error);
        }
    }
}

export const getAllDashboard = async()=>{
    try {
        const response = await axios.get(GET_ALL_DASHBOARD_API,config);
        console.log("GET ALL DASHBOARD API...................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Fetch Dashboard Successfully");
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Publishing Dashboard: ",error);
        }
    }
}

export const deleteDashboard = async(dashboardId)=>{
    try{
        const response = await axios.delete(`${DELETE_DASHBOARD_API}${dashboardId}`,{},config);
        console.log("DELETE DASHBOARD API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Dashboard Deleted Successfully");
            return response.data;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Deleting Dashboard: ",error);
        }
    }
}

export const getDashboardDetails = async(dashboardId)=>{
    try {
        const response = await axios.post(`${GET_DASHBOARD_DETAILS_API}${dashboardId}`,config);
        console.log("GET ALL DASHBOARD DETAILS API...................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Fetched Dashboard Details");
            return response.data;
        }
    } catch (error) {
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Fetching Dashboard Details: ",error);
        }
    }
}

export const getComments = async(dashboardId)=>{
    try {
        const response = await axios.get(`${GET_COMMENTS_API}${dashboardId}`,config);
        console.log("GET COMMENTS API...................",response);
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
        }
        else{
            console.log("Error During Fetching Dashboard Comments: ",error);
        }
    }
}

export const getAnnotations = async(dashboardId)=>{
    try {
        const response = await axios.get(`${GET_ANNOTATIONS_API}${dashboardId}`,config);
        console.log("GET ANNOTATIONS API...................",response);
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
        }
        else{
            console.log("Error During Fetching Dashboard Annotations: ",error);
        }
    }
}