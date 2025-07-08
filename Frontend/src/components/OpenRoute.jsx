import { Navigate } from "react-router";


const OpenRoute = ({children}) => {

    const user = localStorage.getItem('auth-storage');

    if(user===null) {
        //  When is User not loged in
        return children;
    }
    // When user is loged in
    return <Navigate to='/dashboards'/>
}

export default OpenRoute;
