import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // If not logged in, kick them to login
    return  !user || !user.state ? <Navigate to='/login' replace /> : children;
};

export default PrivateRoute;