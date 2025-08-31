import { Navigate } from "react-router";


const OpenRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // If logged in, kick them to dashboard
    return (user!==null?user.state.user:false) ? <Navigate to='/dashboards' replace /> : children;
};

export default OpenRoute;
