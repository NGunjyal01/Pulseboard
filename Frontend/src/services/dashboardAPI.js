import axios from "axios";
import { toast } from "sonner";
import { dashboardEndpoints } from "./apis";

const {CREATE_DASHBOARD_API,STEP1_API,UPLOAD_CSV_API,CONNECTAPI_API,SIMULATE_DATA_API } = dashboardEndpoints;
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
        console.log(STEP1_API+"/"+dashboardId)
        const response = await axios.put(STEP1_API+"/"+dashboardId,updatedFields,config);
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
        console.log(updatedFields)
        if(dataSource==='csv'){
            const formData = new FormData();
            formData.append('file',updatedFields.csvFile);
            response = await axios.post(UPLOAD_CSV_API+"/"+dashboardId,formData,config);
        }
        else if(dataSource==='api'){
            response = await axios.post(CONNECTAPI_API+"/"+dashboardId,updatedFields,config);
        }
        else if(dataSource==='simulated'){
            response = await axios.post(SIMULATE_DATA_API+"/"+dashboardId,updatedFields,config);
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