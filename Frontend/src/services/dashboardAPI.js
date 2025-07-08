import axios from "axios";
import { toast } from "sonner";
import { dashboardEndpoints } from "./apis";

const {CREATE_DASHBOARD_API,STEP1_API,UPLOAD_CSV_API,CONNECTAPI_API } = dashboardEndpoints;

export const createDashboard = async()=>{
    try{
        console.log("called")
        const response = await axios.post(CREATE_DASHBOARD_API);
        console.log("CREATE DASHBOARD API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            // toast.success("Dashboard Created Successful");
            // navigate("/");
            return response;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Create Dashboard: ",error);
            // toast.error("Signup Failed");
            // navigate("/");
        }
    }
}