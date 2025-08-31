import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // If not logged in, kick them to login
    return  (user===null?true:!user.state.user) ? <Navigate to='/login' replace /> : children;
};

export default PrivateRoute;