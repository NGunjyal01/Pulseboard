import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {

    const user = localStorage.getItem('auth-storage');

    if(user)
        return children
    return <Navigate to='/login'/>
}

export default PrivateRoute;
