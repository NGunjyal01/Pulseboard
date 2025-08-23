import { Navigate } from "react-router";


const OpenRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("open route...............",user)
    // If logged in, kick them to dashboard
    return user ? <Navigate to='/dashboards' replace /> : children;
};

export default OpenRoute;
